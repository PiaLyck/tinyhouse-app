import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    SharedModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [FormBuilder]
})
export class UserModule { }
