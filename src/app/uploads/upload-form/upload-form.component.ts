import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Upload } from '../shared/upload';
import { UploadService } from '../shared/upload.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  cancelUpload() {
    this.upSvc.cancelUpload();
  }

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }

  ngOnInit() {
  }

}
