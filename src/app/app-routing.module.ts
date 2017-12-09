import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { ListingListComponent } from './listing/listing-list/listing-list.component';
import { ListingDetailComponent } from './listing/listing-detail/listing-detail.component';
import { ProfileComponent } from './user/profile.component';
import { AddListingComponent } from './listing/add-listing/add-listing.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { UploadListComponent } from './uploads/upload-list/upload-list.component';

const appRoutes: Routes = [
  { path: 'login', component: ProfileComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload-form', component: UploadFormComponent, canActivate: [AuthGuard] },
  { path: 'upload-list', component: UploadListComponent, canActivate: [AuthGuard] },
  { path: 'listing', component: ListingListComponent },
  { path: 'listing/:id', component: ListingDetailComponent },
  { path: 'add-listing', component: AddListingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
