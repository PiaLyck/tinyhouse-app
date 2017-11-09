import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class UserModule { }
