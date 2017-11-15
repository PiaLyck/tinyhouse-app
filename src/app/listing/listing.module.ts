import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingListComponent } from './listing-list/listing-list.component';
import { AuthGuard } from '../core/auth.guard';
import { ListingService } from './listing.service';

import { MaterialComponentsModule } from '../shared/material-components.module';
import { AddListingComponent } from './add-listing/add-listing.component';


@NgModule({
  imports: [
    CommonModule,
    ListingRoutingModule,
    MaterialComponentsModule,
    FormsModule
  ],
  declarations: [
    ListingDetailComponent,
    ListingListComponent,
    AddListingComponent
  ],
  exports: [],
  providers: [ListingService]
})
export class ListingModule { }
