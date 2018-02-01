import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';
import 'rxjs/add/operator/switchMap';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public notify: NotifyService) {

    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

  }

  //// Email/Password Auth - START ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user); // create initial user document
      })
      .catch(error => {
        this.handleError(error);
      });
  }



  //// Email/Password Auth - END ////

  //// Update properties on the user document eg. from a Tell Us About Yourself form ////
  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data)
      .then(() => {
        this.notify.update('Your user was updated', 'success');
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  private setUserDoc(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // Set custom data here
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.setUserDoc(credential.user);
        this.notify.update('You have succesfully logged in', 'info');
      })
      .catch(error => {
        this.handleError(error);
      });
    /*     .catch(function (error) {
            // Handle Errors here.
           const errorCode = error.code;
           const errorMessage = error.message;
           // The email of the user's account used.
           const email = error.email;
           // The firebase.auth.AuthCredential type that was used.
           const credential = error.credential;
           // Print out to user
           console.log(errorCode + ': ' + errorMessage + ': ' + email + ' ' + credential);
           this.notify.update(`An error occured: ${errorCode} and ${errorMessage}`, 'info');
         });*/
  }

  signOut() {
    firebase.auth().signOut()
      .then(notify => {
        this.notify.update('You have succesfully logged out', 'success');
      })
      .catch(error => {
        this.handleError(error);
      });
  }


  private handleError(error) {
    console.log(error);
    this.notify.update(error.message, 'error');
  }

  getLoggedInUserID() {
    return firebase.auth().currentUser.uid;
  }

}
