import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upload } from './upload';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/user';
import { NotifyService } from '../../core/notify.service';

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
    this.uploadCollection = this.afs.collection(`${this.basePath}`);

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

        // console.log('upload success! writing file to /uploads folder in FireStore database as well.');
        // Workaround while Cloud Firestore fixes the custom Object issue...
        const uploadUrl: string = uploadTask.snapshot.downloadURL;
        const uploadFileName: string = upload.file.name;
        this.uploadCollection.add({
          uploadDate: new Date(),
          uid: user.uid,
          name: uploadFileName,
          imgUrl: uploadUrl
        })
          .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch(function (error) {
            this.notify.update('Error adding image', 'error');
          });


      });


    // Writes the file details to the Firestore db
    /*   private saveFileData(upload: Upload) {
        console.log(this.uploadCollection);
        console.log(upload);
        this.uploadCollection.add(upload)
          .then(() => {
            console.log('inde i then');
          })
          .catch(error => console.log(error));
        return undefined;
      } */



  }
