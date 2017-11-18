import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Upload } from './upload';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';


// https://angularfirebase.com/lessons/angular-file-uploads-to-firebase-storage/

@Injectable()
export class UploadService {

  constructor(private af: AngularFirestore,
    private db: ,
    private auth: AuthService
  ) { }

  uploadCollection: AngularFirestoreCollection<Listing>;
  uploadDoc: AngularFirestoreDocument<Upload>;

  private basePath = '/uploads';
  uploads: Observable<Upload[]>;

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();

    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error)
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
    this.db.list(`${this.basePath}/`).push(upload);
  }
}
