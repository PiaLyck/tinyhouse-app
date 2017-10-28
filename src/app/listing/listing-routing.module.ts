import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingListComponent } from './listing-list/listing-list.component';

const listingRoutes: Routes = [
  { path: 'listing',  component: ListingListComponent },
  { path: 'listing/:id', component: ListingDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(listingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ListingRoutingModule { }
