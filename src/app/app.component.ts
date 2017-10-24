import { Component, OnInit } from '@angular/core';
// https://youtu.be/0Nah3foeyCM tutorial
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface IPost {
  title: string;
  content: string;
  id?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app';

  // Firestore Collection
  postCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>; // Get array of posts
  snapshot: any;

  // Firestore Document
  postDoc: AngularFirestoreDocument<IPost>;
  postItem: Observable<IPost>; // Get single post item
  newContent: string;

  constructor(private _afs: AngularFirestore) { }

  ngOnInit() {
    this.postDoc = this._afs.doc('posts/Mp9wIWcrXgnS2qt0cEPE');
    this.postItem = this.postDoc.valueChanges();
  }

  updateContent() {
    this.postDoc.update({ title: this.newContent });
  }

/*     this.postCollection = this._afs.collection('posts', ref => { // what we named our collection when setting up firebase
      return ref.orderBy('title', 'asc'); // Firestore query language
      // Another example: return ref.where('content', '>=', 5)
    });
    this.posts = this.postCollection.valueChanges(); // observable of posts
    this.snapshot = this.postCollection.snapshotChanges()
      .map(arr => {
        console.log(arr);
        return arr.map(snap => snap.payload.doc.data());
      });
  }
}
*/
}
