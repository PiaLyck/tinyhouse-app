import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { RouterModule, Routes } from '@angular/router';

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
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './core/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    ListingModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
