import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Listing } from './listing';
import { Observable } from 'rxjs/Observable';

// Following along this guy: https://www.youtube.com/watch?v=gUmItHaVL2w

@Injectable()
export class ListingService {
  listingsCollection: AngularFirestoreCollection<Listing>;
  listings: Observable<Listing[]>;

  constructor(public afs: AngularFirestore) {
    // Create new listing, then return as an object

    this.listings = this.afs.collection('listings').valueChanges();
  }

  getListings() {
    // Being called from component
    return this.listings;
  }
}


