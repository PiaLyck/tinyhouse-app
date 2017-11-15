import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  signupForm: FormGroup;
  detailForm: FormGroup;

  constructor(public auth: AuthService, public fb: FormBuilder) { }

  ngOnInit() {

    // First step of sign up process
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), // At least one number present
        Validators.minLength(6),
        Validators.maxLength(60)
      ]]

    });

    this.detailForm = this.fb.group({
      'favouriteColor': ['', [
        Validators.required
      ]]
    });
  }

  // Using getters cuts down on the HTML in the template, so, apparently worth it.
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get favouriteColor() { return this.detailForm.get('favouriteColor'); }

  // Step 1
  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value);
  }

  // Set FavouriteColor
  setFavColor(user) {
    return this.auth.updateUser(user, { favouriteColor: this.favouriteColor.value });
  }


}
