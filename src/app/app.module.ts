import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
export const firebaseConfig = environment.firebaseConfig;

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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AuthModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  providers: [],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
