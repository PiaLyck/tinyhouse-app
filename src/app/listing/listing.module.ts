import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListingDetailComponent],
  exports: [ListingDetailComponent]
})
export class ListingModule { }
