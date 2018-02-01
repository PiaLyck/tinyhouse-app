import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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

/* Comment in again once dev is done

Raven
  .config(environment.sentryConfig)
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
} */

// New things auto-put-here
import { FaqModule } from './faq/faq.module';
import { AboutModule } from './about/about.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NotifyService } from './core/notify.service';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ListingModule,
    BrowserAnimationsModule,
    AuthModule,
    FileUploadModule,
    DashboardModule,
    UserModule,
    FaqModule,
    AboutModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  providers: [AuthGuard, NotifyService
    // , { provide: ErrorHandler, useClass: HandleError }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
