import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { NotifyService } from '../core/notify.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public notify: NotifyService,
    private auth: AuthService) {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const userID = this.auth.getLoggedInUserID();

    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `uploads/${userID}/images/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Tinyland.dks lovely app!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap);
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update Firestore on completion
          this.db.collection('uploads').doc(`${userID}`).collection('images').add({ path, size: snap.totalBytes })
            .then(() => {
              this.notify.update('Your image was succesfully uploaded', 'success');
            })
            .catch(error => {
              this.notify.update('Something went wrong when uploading. Try again later', 'error');
              // TODO: handle error
            });
        }
      })
    );

    // The file's download URL
    this.downloadURL = this.task.downloadURL();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnInit() {
  }

}
