import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AngularFireAuth]
})
export class AuthComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) {
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginFacebook() {

  }
/*   firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  }); */

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
