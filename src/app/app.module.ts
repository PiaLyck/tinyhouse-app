import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Move to SharedModule later
import { FormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: 'AIzaSyDD3Xl1mv4AUyI5HLML6pyAPCmLwQCP9NY',
  authDomain: 'tinyhouse-app.firebaseapp.com',
  databaseURL: 'https://tinyhouse-app.firebaseio.com',
  projectId: 'tinyhouse-app',
  storageBucket: 'tinyhouse-app.appspot.com',
  messagingSenderId: '182420977432'
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
