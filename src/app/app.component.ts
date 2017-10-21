import { Component, OnInit } from '@angular/core';

// https://youtu.be/0Nah3foeyCM tutorial
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface IPost {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app';

  postCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>;

  constructor(private _afs: AngularFirestore){}

  ngOnInit() {
    this.postCollection = this._afs.collection('posts'); // what we named our collection when setting up firebase
    this.posts = this.postCollection.valueChanges();
  }
}
