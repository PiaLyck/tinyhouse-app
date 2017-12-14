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

  constructor(private fb: FormBuilder, private listingService: ListingService, private notify: NotifyService) { }

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
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), // At least one number present
        Validators.minLength(6),
        Validators.maxLength(600)
      ]]

    });

  }

  // Using getters cuts down on the HTML in the template, so, apparently worth it.
  get title() { return this.listingForm.get('title'); }
  get description() { return this.listingForm.get('description'); }


  onSubmit() {
    if (this.listing.title !== '' && this.listing.description !== '') {
      this.listingService.addListing(this.listing);
      // and then clear the fields:
      this.listing.title = '';
      this.listing.description = '';
      this.notify.update('Your listing was succesfully created', 'success');
    }
    else {
      this.notify.update('Something went wrong', 'error');
    }
  }

}
