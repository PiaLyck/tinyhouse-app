import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [FileUploadComponent]
})
export class FileUploadModule { }
