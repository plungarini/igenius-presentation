import {
  animate, state,
  style, transition, trigger
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOutHeader', [
      state('show', style({
        height: '55vh',
      })),
      state('hide', style({
        height: '85vh',
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutBody', [
      state('show', style({
        height: 'auto',
      })),
      state('hide', style({
        height: '0px',
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
  ]
})
  

export class AppComponent {
  showBody = 'show';
}
