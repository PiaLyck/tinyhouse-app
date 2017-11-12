import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../listing';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddListingComponent implements OnInit {

  listing: Listing = {
    title: '',
    description: '',
    monthlyRent: 0,
    image: '',
    postcode: 0,
    timestamp: ''
  };

  constructor(private listingService: ListingService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.listing.title !== '' && this.listing.description !== '') {
      this.listingService.addListing(this.listing);
      // and then clear the fields:
      this.listing.title = '';
      this.listing.description = '';
    }
  }

}
