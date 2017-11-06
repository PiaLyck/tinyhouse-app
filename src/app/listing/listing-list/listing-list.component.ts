import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.scss']
})
export class ListingListComponent implements OnInit {
  title = 'Se alle de smukke tiny house grunde vi har';
  noOfListings = 4;
  listings = ['43kvm i Hillerød', '51kvm i Uggerby', '30kvm i Roskilde'];

  constructor() { }

  ngOnInit() {
  }

}
