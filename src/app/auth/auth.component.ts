import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  posts: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.posts = db.collection('posts').valueChanges();
  }

  ngOnInit() {
  }

}
