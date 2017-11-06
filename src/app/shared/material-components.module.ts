import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

/* "be sure to import the Angular Material modules after Angular's BrowserModule,
as the import order matters for NgModules." */

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})
export class MaterialComponentsModule { }
