import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../listing';
import { NotifyService } from '../../core/notify.service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../core/validation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddListingComponent implements OnInit {
  // Need help? Check this: https://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html#formgroup-and-formcontrol
  // and this: https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html

  listingForm: FormGroup;
  listing: Listing;

  constructor(public fb: FormBuilder, private listingService: ListingService, private router: Router, private notify: NotifyService) { }

  // https://github.com/angular/angular/issues/15741
  // https://github.com/angular/material2/issues/4190#issuecomment-311488176
  /*   resetForm(formGroup: FormGroup) {
      console.log('holler fra resetForm');
      let control: AbstractControl = null;
      formGroup.reset();
      formGroup.markAsUntouched();
      Object.keys(formGroup.controls).forEach((name) => {
        control = formGroup.controls[name];
        control.setErrors(null);
      });
    }
   */
  ngOnInit() {
    this.listingForm = this.fb.group({
      details: this.fb.group({
        title: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(60)
        ]],
        description: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(600),
          ValidationService.emailValidator
        ]],
      }),
      address: this.fb.group({
        street: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)]
        ],
        streetnumber: ['', [
          Validators.required,
          Validators.minLength(1),
        ]],
        postcode: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]],
        city: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80)
        ]]
      },
        /*   { validator: myCustomValidatorForThisGroupGoesHere} */
      )
    });
  }

  getErrorMessage(formControlName) {
    // Implement ErrorMessage func here
    console.log('Hej fra GetErrorMessage');
  }


  onSubmit() {
    if (this.listingForm.valid) {
      console.log(this.listingForm.value);
      // Get form input and add to listings in Firebase
      this.listingService.addListing(this.listingForm.value);

      // and then clear the form:

      const id = 365;
      // Navigate to ListingDetailComponent
      this.router.navigate(['/listing/' + id]);
    }
    else {
      this.notify.update('Something went wrong', 'error');
    }

  }

}


