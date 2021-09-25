import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/services/events.service';

@Component({
  selector: 'app-main-video',
  templateUrl: './main-video.component.html',
})
export class MainVideoComponent implements OnInit {

  config = {
    instagramLink: 'https://www.instagram.com/wheresbebo',
  };

  videoWatched = false;
  testimonialsOpts = {
    byline: false,
    portrait: false,
    title: false
  };

  canSeek = true;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  onHalfProgress(val: number): void {
    if (!val) return;
    this.eventsService.send({ event: 'setTag', title: 'second_video_half_progress' });
  }

  onVideoEnded(res: boolean): void {
    if (!res) return;
    this.videoWatched = res;
    localStorage.setItem('main_video_watched', 'true');
    this.eventsService.send({ event: 'setTag', title: 'second_video_ended' });
  }

  instagramClicked(): void {
    this.eventsService.send({ event: 'setTag', title: 'contact_instagram' });
  }

}
