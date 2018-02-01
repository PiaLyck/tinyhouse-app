import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './material-components.module';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { ControlMessagesComponent } from './control-message/control-message.component';
import { FileSizePipe } from './file-size.pipe';
import { DropZoneDirective } from './drop-zone.directive';

/* SharedModule should have anything but services,
and be imported in all modules that need the shared stuff (which could also be the AppModule)

* Create a SharedModule with the components, directives, and pipes that you use everywhere in your app.
This module should consist entirely of declarations, most of them exported.

* The SharedModule may re-export other widget modules,
such as CommonModule, FormsModule, and modules with the UI controls that you use most widely.

* The SharedModule should not have providers for reasons explained previously.
Nor should any of its imported or re-exported modules have providers.
If you deviate from this guideline, know what you're doing and why.

* Import the SharedModule in your feature modules,
both those loaded when the app starts and those you lazy load later.

*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NotificationMessageComponent, ControlMessagesComponent, FileSizePipe, DropZoneDirective],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NotificationMessageComponent,
    ControlMessagesComponent,
    FileSizePipe,
    DropZoneDirective
  ]
})
export class SharedModule { }
