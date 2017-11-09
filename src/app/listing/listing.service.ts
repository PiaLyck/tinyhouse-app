import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

// Listing default values
export class Listing {
  title = 'Your title';
  content = 'Listing content';
  monthlyRent = 2000;
  image = 'http://via.placeholder.com/350x150';
}

@Injectable()
export class ListingService {

  constructor(private afs: AngularFirestore) {
    // Create new listing, then return as an object


  }

}
