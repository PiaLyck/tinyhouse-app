import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upload } from './upload';
import { Observable } from 'rxjs/Observable';

// https://angularfirebase.com/lessons/angular-file-uploads-to-firebase-storage/

@Injectable()
export class UploadService {

  uploadCollection: AngularFirestoreCollection<Upload>;
  uploadDoc: AngularFirestoreDocument<Upload>;

  private basePath = '/uploads';
  uploads: Observable<Upload[]>;

  constructor(private afs: AngularFirestore) {
    this.uploadCollection = this.afs.collection('uploads');

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
    let uploadTask: any;

    uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        console.log('in progress');
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.uploadCollection.add(upload);
  }

  /*   deleteUpload(upload: Upload) {
      this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string) {
      return this.db.list(`${this.basePath}/`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name:string) {
      const storageRef = firebase.storage().ref();
      storageRef.child(`${this.basePath}/${name}`).delete();
    } */
}

