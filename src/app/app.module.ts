import { NgModule } from '@angular/core';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/compat/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from './shared/shared.module';


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
    AngularFireAnalyticsModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-58TBL5Q',
    }),
  ],
  providers: [
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
