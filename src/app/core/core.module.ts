import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';
import { ValidationService } from './validation.service';

/* CoreModule should have only services and be imported only once in the AppModule.

* Create a CoreModule with providers for the singleton services you load when the application starts.
* Import CoreModule in the root AppModule only. Never import CoreModule in any other module.
* Consider making CoreModule a pure services module with no declarations.

*/

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [AuthService, NotifyService, ValidationService]
})
export class CoreModule { }
