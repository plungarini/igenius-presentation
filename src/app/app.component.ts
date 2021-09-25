import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventsService } from './shared/services/events.service';
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})


export class AppComponent {

  socials = {
    instagram: 'https://www.instagram.com/wheresbebo',
    facebook: 'https://www.facebook.com/pietrolungarini',
    linkedin: 'https://www.linkedin.com/in/plungarini/',
  }

  constructor(
    private router: Router,
    private eventsService: EventsService,
  ) {
    /* const app = initializeApp({
      projectId: 'wheresbebo-finance',
      apiKey: 'AIzaSyBxoBXDPaqJTyi43EB31jueCCqAqV6Ow3U',
      authDomain: 'wheresbebo-finance.firebaseapp.com',
    });
    const functions = getFunctions(app); */

    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'pageNavigation',
          title: item.url
        };

        this.eventsService.send(gtmTag);
      }
    });
  }

}
