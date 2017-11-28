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
  uploadCollection: AngularFirestoreCollection<Upload>;
  uploadDoc: AngularFirestoreDocument<Upload>;

  private basePath = '/uploads';
  uploads: Observable<Upload[]>;

  constructor(private afs: AngularFirestore,
    private notify: NotifyService) {

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
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    let uploadTask: any;

    uploadTask = storageRef.child(`${this.basePath}/${user.uid}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        console.log('in progress');
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log('Øv, fejlede: ' + error);
        this.notify.update('Your upload failed', 'error');
      },
      () => {
        // upload success
        console.log('upload success!');
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  // Writes the file details to the Firestore db
  private saveFileData(upload) {
    // const convertedUploadObj = this.convertObject(upload);
    // console.log(convertedUploadObj);
    this.uploadCollection.add(upload)
      .then(function () {
        console.log('inde i then i saveFileData!');
      })
      .catch(function (error) {
        console.log('Øv, fejlede i saveFileData: ' + error);
        this.handleError(error);
      });

    console.log('upload success efter .add(upload)');
    return undefined;
  }

  // Workaround while Firestore fixes the custom Object issue...
  convertObject(data: any) {
    let obj = {};
    Object.keys(data).forEach(function (key, index) {
      console.log(key);
      obj[key] = data[key];
    });
    return obj;
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

