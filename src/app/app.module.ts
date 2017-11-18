import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';

// HammerJS - Gesture support
import 'hammerjs';

// Authentication AngularFire2 and Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingModule } from './listing/listing.module';
import { AuthModule } from './core/auth.module';
import { AuthGuard } from './core/auth.guard';
// import { ProfileComponent } from './user/profile.component';
import { AddListingComponent } from './listing/add-listing/add-listing.component';

// Fixing build issues
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';

// New things auto-put-here
import { UploadModule } from './uploads/shared/upload.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    ListingModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    UserModule,
    UploadModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
