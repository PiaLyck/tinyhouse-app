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

export const firebaseConfig = environment.firebaseConfig;
// Move to SharedModule later
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from './shared/shared.module';

const appRoutes: Routes = [

  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'Auth data sendt frem i router' }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
