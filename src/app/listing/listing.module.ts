import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingRoutingModule } from './listing-routing.module';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingListComponent } from './listing-list/listing-list.component';
import { AuthGuard } from '../core/auth.guard';
import { ListingService } from './listing.service';
import { SharedModule } from '../shared/shared.module';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    ListingRoutingModule,
    FormsModule
  ],
  declarations: [
    ListingDetailComponent,
    ListingListComponent,
    AddListingComponent
  ],
  exports: [],
  providers: [ListingService, FormBuilder]
})
export class ListingModule { }
