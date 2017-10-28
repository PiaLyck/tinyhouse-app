import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingRoutingModule } from './listing-routing.module';

import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingListComponent } from './listing-list/listing-list.component';

@NgModule({
  imports: [
    CommonModule,
    ListingRoutingModule
  ],
  declarations: [
    ListingDetailComponent,
    ListingListComponent],
  exports: [
    ListingDetailComponent,
    ListingListComponent]
})
export class ListingModule { }
