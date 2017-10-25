import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* CoreModule should have only services and be imported only once in the AppModule.

* Create a CoreModule with providers for the singleton services you load when the application starts.
* Import CoreModule in the root AppModule only. Never import CoreModule in any other module.
* Consider making CoreModule a pure services module with no declarations.

*/

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule { }
