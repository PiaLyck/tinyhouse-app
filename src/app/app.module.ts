import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RouterModule, Routes } from '@angular/router';

// Authentication AngularFire2 and Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingModule } from './listing/listing.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    ListingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AuthModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
