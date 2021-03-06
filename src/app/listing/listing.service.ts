import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Listing } from './listing';
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '../core/notify.service';

// Following along this guy: https://www.youtube.com/watch?v=gUmItHaVL2w

@Injectable()
export class ListingService {
  listingsCollection: AngularFirestoreCollection<Listing>;
  listings: Observable<Listing[]>;
  listingsDoc: AngularFirestoreDocument<Listing>;

  constructor(public afs: AngularFirestore, public notify: NotifyService) {
    // Create new listing, then return as an object
    this.listings = this.afs.collection('listings').valueChanges();

    this.listingsCollection = this.afs.collection('listings', ref => ref.orderBy('createdDate', 'desc'));

    // TODO: Why did this stop working after updating AngularFire lib?
    // Temp fix: Go back to using .valueChanges() in line 17 ^
    // In addition to the listing data (eg. title), we get
    // the id by using snapshotChanges and mapping:
/*     this.listings = this.listingsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Listing;
        data.id = a.payload.doc.id;
        return data;
      });
    }); */
  }

  getListings() {
    // Gets called from the component on ngOnInit
    return this.listings;
  }

  addListing(listing: Listing) {
    this.listingsCollection.add(listing)
    .then((docRef) => {
      this.notify.update('Your listing was succesfully created', 'success');
      console.log(docRef.id);
    })
    .catch((error) => {
      console.log('no success: ' + error);
    });
  }

  deleteListing(listing: Listing) {
    this.listingsDoc = this.afs.doc(`listings/${listing.id}`);
    this.listingsDoc.delete();
  }

  updateListing(listing: Listing) {
    this.listingsDoc = this.afs.doc(`listings/${listing.id}`);
    this.listingsDoc.update(listing);
  }
}


