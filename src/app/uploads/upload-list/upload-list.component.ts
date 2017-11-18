import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadListComponent implements OnInit {

    uploads: Observable<Upload[]>;
    showSpinner = true;

    constructor(private upSvc: UploadService) { }

    ngOnInit() {
      this.uploads = this.upSvc.getUploads();
      this.uploads.subscribe(() => this.showSpinner = false);
    }
}
