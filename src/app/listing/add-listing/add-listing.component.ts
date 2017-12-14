import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../listing';
import { NotifyService } from '../../core/notify.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddListingComponent implements OnInit {

  listingForm: FormGroup;

  listing: Listing = {
    title: '',
    description: '',
    monthlyRent: 0,
    image: '',
    postcode: 0
  };

  constructor(public fb: FormBuilder, private listingService: ListingService, private notify: NotifyService) { }

  ngOnInit() {
    // First step of sign up process
    this.listingForm = this.fb.group({
      'title': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60)
      ]
      ],
      'description': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(600)
      ]],
      'postcode': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]]
    });

  }

  // Using getters cuts down on the HTML in the template, so, apparently worth it.
  /* get title() { return this.listingForm.get('title'); }
  get description() { return this.listingForm.get('description'); } */

  getFormInput() {
    const title = this.listingForm.get('title');
    const description = this.listingForm.get('description');
    const postcode = this.listingForm.get('postcode');
    return this.listing;
  }

  onSubmit() {
    if (this.listingForm.valid) {
      console.log('VALID MAND');
      this.getFormInput();
      this.listingService.addListing(this.listing);

      // and then clear the fields:
      this.listingForm.reset();
      this.notify.update('Your listing was succesfully created', 'success');
    }
    else {
      this.notify.update('Something went wrong', 'error');
    }

  }

}

}
