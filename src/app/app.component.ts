import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventsService } from './shared/services/events.service';

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
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };

        this.eventsService.send(gtmTag);
      }
    });
  }

}
