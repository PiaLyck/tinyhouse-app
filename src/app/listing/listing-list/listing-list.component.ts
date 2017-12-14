import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../listing';


@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.scss']
})
export class ListingListComponent implements OnInit {

  listings: Listing[];
  editState: Boolean = false;
  listingToEdit: Listing;

  // Constructors is used for injecting things like services
  constructor(private listingService: ListingService) {
  }

  // Initializations go here, like fetching stuff
  ngOnInit() {
    this.listingService.getListings().subscribe(listings => {
      this.listings = listings;
    });
  }

  deleteListing(event, listing: Listing) {
    this.clearState(); // remove the state of the item to avoid console errors
    this.listingService.deleteListing(listing);
  }

  editListing(event, listing: Listing) {
    this.editState = true;
    this.listingToEdit = listing;
  }

  updateListing(listing: Listing) {
    this.listingService.updateListing(listing);
    this.clearState(); // fold form up again after edit
  }

  clearState() {
    this.editState = false;
    this.listingToEdit = null;
  }

}
