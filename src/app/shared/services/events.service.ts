import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { MailchimpService, MailChimpMemberTag } from './mailchimp.service';


interface WBEvent {
  event: string;
  title?: string;
}
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private gtmService: GoogleTagManagerService,
    private mcService: MailchimpService,
    private analytics: AngularFireAnalytics
  ) { }

  send(e: WBEvent): void {
    if (!e) return;
    if (!e.title) e.title = e.event;
    this.gtm(e);
    this.setAnalyticsEvent(e);
    if (e.event === 'setTag') {
      this.setMCTag({ name: e.title, status: 'active' });
    }
  }

  private gtm(event: WBEvent): void {
    this.gtmService.pushTag(event);
  }

  private setMCTag(tag: MailChimpMemberTag): void {
    this.mcService.setUserTags(tag);
  }

  private setAnalyticsEvent(event: WBEvent): void {
    this.analytics.logEvent(event.event, { title: event.title });
  }
}
