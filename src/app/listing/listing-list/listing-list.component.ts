import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../listing';


@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.scss']
})
export class ListingListComponent implements OnInit {
  /*   title = 'Se alle de smukke tiny house grunde vi har';
    noOfListings = 4;
    listings = ['43kvm i Hillerød', '51kvm i Uggerby', '30kvm i Roskilde']; */

    listings: Listing[];

  // Constructors is used for injecting things like services
  constructor(private listingService: ListingService) {
  }

  // Initializations go here, like fetching stuff
  ngOnInit() {
    this.listingService.getListings().subscribe(listings => {
      this.listings = listings;
    });
  }

}
