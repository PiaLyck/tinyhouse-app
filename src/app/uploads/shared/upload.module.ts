import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UploadService } from './upload.service';
import { UploadFormComponent } from '../upload-form/upload-form.component';

import { Routes, RouterModule } from '@angular/router';
import { UploadListComponent } from '../upload-list/upload-list.component';
import { UploadDetailComponent } from '../upload-detail/upload-detail.component';

const routes: Routes = [
  { path: '', component: UploadListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFireDatabaseModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UploadFormComponent,
    UploadListComponent,
    UploadDetailComponent,
  ],
  providers: [
    UploadService
  ]
})
export class UploadModule { }
