import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upload } from './upload';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/user';
import { NotifyService } from '../../core/notify.service';
import { merge } from 'rxjs/operators/merge';

// https://angularfirebase.com/lessons/angular-file-uploads-to-firebase-storage/

@Injectable()
export class UploadService {
  // Type 'any' because Firestore cannot receive a custom Object (Upload)
  uploadCollection: AngularFirestoreCollection<any>;
  uploadDoc: AngularFirestoreDocument<Upload>;
  uploads: Observable<Upload[]>;

  // Get logged in user
  user = firebase.auth().currentUser;

  // Paths for databases etc.
  private basePath = '/uploads';
  private storageRefChild = `${this.basePath}/${this.user.uid}`;



  constructor(private afs: AngularFirestore,
    private notify: NotifyService) {
    this.uploadCollection = this.afs.collection(`${this.basePath}`).doc(`${this.user.uid}`).collection('images');

    // In addition to the upload data (eg. title), we get
    // the id by using snapshotChanges and mapping:
    this.uploads = this.uploadCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getUploads() {
    return this.uploads;
  }

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    let uploadTask;

    uploadTask = storageRef.child(`${this.storageRefChild}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // Three observers
      // 1) State_changed observer
      (snapshot) => {
        // upload in progress
        console.log('in progress');
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      // 2) Error observer
      (error) => {
        // upload failed
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('User does not have permission to access the object');
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;
          case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;
        }
        this.notify.update('Your upload failed', 'error');
      },
      // 3) Success observer
      (): any => {
        // upload success
        const uploadUrl: string = uploadTask.snapshot.downloadURL;
        const uploadFileName: string = upload.file.name;
        this.saveToFS(uploadUrl, uploadFileName, this.user);
      });
  }

  // Save file details in Firestore
  saveToFS(uploadUrl, uploadFileName, user): void {
    this.uploadCollection.add({
      uploadDate: new Date(),
      uid: user.uid,
      name: uploadFileName,
      imgUrl: uploadUrl
    })
      .then(function () {
        console.log('Successfully saved to Firestore as well as Firebase Storage');
      })
      .catch(function (error) {
        this.notify.update('Error adding image', 'error');
      });
  }



  // Deletes file details in Firestore
  private deleteFileData(id: string) {
    return this.uploadCollection.doc(id).delete();
  }

  // Delete files in Firebase Storage
  // Firebase Storage files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.storageRefChild}/${name}`).delete();
  }

  deleteUpload(upload: Upload) {
    // First, delete Firestore image details
    this.deleteFileData(upload.id)
      .then(() => {
        // Then, delete actual file in Firebase Storage
        this.deleteFileStorage(upload.name);
      })
      .catch((error) => console.log(error));
  }

  cancelUpload() {

  }

}
