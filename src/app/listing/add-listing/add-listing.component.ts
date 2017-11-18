import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../listing';
import { NotifyService } from '../../core/notify.service';


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
    createdDate: new Date()
  };

  constructor(private listingService: ListingService, private notify: NotifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.listing.title !== '' && this.listing.description !== '') {
      this.listingService.addListing(this.listing);
      // and then clear the fields:
      this.listing.title = '';
      this.listing.description = '';
      this.notify.update('Your listing was succesfully created', 'success');
    }
    else {
      this.notify.update('Something went wrong', 'error');
    }
  }

}
