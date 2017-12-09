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

  private basePath = '/uploads';
  uploads: Observable<Upload[]>;

  constructor(private afs: AngularFirestore,
    private notify: NotifyService) {
    const user = firebase.auth().currentUser;
    this.uploadCollection = this.afs.collection(`${this.basePath}`).doc(`${user.uid}`).collection('images');

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
    console.log(this.uploads);
    return this.uploads;
  }

  pushUpload(upload: Upload) {
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    let uploadTask;

    uploadTask = storageRef.child(`${this.basePath}/${user.uid}/${upload.file.name}`).put(upload.file);

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
        console.log('Øv, fejlede: ' + error);
        this.notify.update('Your upload failed', 'error');
      },
      // 3) Success observer
      (): any => {
        // upload success
        const uploadUrl: string = uploadTask.snapshot.downloadURL;
        const uploadFileName: string = upload.file.name;
        this.saveToFS(uploadUrl, uploadFileName, user);
      });
  }

  // Save uploads in Firestore
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



  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    console.log('Delete file data');
    // return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

  deleteUpload(upload: Upload) {
    console.log('deleteUpload(upload: Upload)');
    /*     this.deleteFileData(upload.$key)
          .then(() => {
            this.deleteFileStorage(upload.name);
          })
          .catch((error) => console.log(error)); */
  }

}
