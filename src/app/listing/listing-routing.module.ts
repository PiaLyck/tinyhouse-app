import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingListComponent } from './listing-list/listing-list.component';
import { AuthGuard } from '../core/auth.guard';

const listingRoutes: Routes = [
  { path: 'listing',  component: ListingListComponent, canActivate: [AuthGuard] },
  { path: 'listing/:id', component: ListingDetailComponent, canActivate: [AuthGuard] }
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
