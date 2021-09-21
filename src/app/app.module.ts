import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    /* Components Modules */
    AppRoutingModule,
    SharedModule,

    /* Imported Modules */
    ReactiveFormsModule,

    /* Integrations */
    AngularFireModule.initializeApp(environment.firebase),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-58TBL5Q',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
