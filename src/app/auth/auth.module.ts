import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import '../shared/forms.ts';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
