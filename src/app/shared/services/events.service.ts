import { Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private gtmService: GoogleTagManagerService) { }

  send(event: object): void {
    if (!event) return;
    this.gtm(event);
  }

  private gtm(event: object): void {
    this.gtmService.pushTag(event);
  }
}
