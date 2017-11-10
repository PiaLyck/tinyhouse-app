import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingListComponent } from './listing-list/listing-list.component';
import { AuthGuard } from '../core/auth.guard';
import { ListingService } from './listing.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ListingRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    ListingDetailComponent,
    ListingListComponent
  ],
  exports: [],
  providers: [ListingService]
})
export class ListingModule { }
