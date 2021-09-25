import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/services/events.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MailchimpService } from '../shared/services/mailchimp.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
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
    trigger('slideInOutHeaderMobile', [
      state('show', style({
        height: '55vh',
      })),
      state('hide', style({
        height: '80vh',
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
    trigger('slideInOutHero', [
      state('show', style({
        height: '85vh',
        opacity: '1'
      })),
      state('hide', style({
        height: '0vh',
        opacity: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutHeroMobile', [
      state('show', style({
        height: '80vh',
        opacity: '1'
      })),
      state('hide', style({
        height: '0vh',
        opacity: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutVideo', [
      state('show', style({
        height: 'auto',
        opacity: '1'
      })),
      state('hide', style({
        height: '0px',
        opacity: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutForm', [
      state('show', style({
        height: '100vh',
        opacity: '1'
      })),
      state('hide', style({
        height: '0px',
        opacity: '0vh'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit, OnDestroy {

  showHero = 'hide';
  showBody = 'hide';
  showFirstVideo = 'hide';
  showSecondVideo = 'show';
  showUserForm = 'hide';

  firstVideoWatched = false;
  userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    consent: new FormControl('', [Validators.required]),
  });
  userFormError = '';
  userFormErrorControl = '';
  formValueSub = new Subscription();

  canSeek = false;

  socials = {
    instagram: 'https://www.instagram.com/wheresbebo',
    facebook: 'https://www.facebook.com/pietrolungarini',
    linkedin: 'https://www.linkedin.com/in/plungarini/',
  }

  constructor(
    private eventsService: EventsService,
    private mailchimp: MailchimpService,
  ) { }

  ngOnInit(): void {
    const introWatched = localStorage.getItem('intro_watched') === 'true';
    if (introWatched) this.canSeek = true;

    this.formValueSub = this.userForm.valueChanges.subscribe(res => {
      if (this.userFormError) this.userFormError = '';
    });
  }

  ngOnDestroy(): void {
    this.formValueSub.unsubscribe();
  }

  interestedCategory(val: string): void {
    if (!val) return;
    this.eventsService.send({ event: 'setTag', title: 'userCategory_' + val });
  }

  onHalfProgress(val: number): void {
    if (!val) return;
    this.eventsService.send({ event: 'setTag', title: 'first_video_half_progress' });
  }

  onVideoEnded(res: boolean): void {
    if (!res) return;
    this.firstVideoWatched = res;
    localStorage.setItem('intro_watched', 'true');
    this.eventsService.send({ event: 'setTag', title: 'first_video_ended' });
  }

  showSecondVideoFn(): void {
    this.showFirstVideo = 'hide';
    this.showSecondVideo = 'show';
    this.eventsService.send({ event: 'setTag', title: 'second_video_btn_click' });
  }

  showBodyFn(): void {
    this.showFirstVideo = 'hide';
    this.showBody = 'show';
    this.showHero = 'show';
    this.eventsService.send({ event: 'setTag', title: 'read_more_btn_click' });
  }

  showContactForm(): void {
    const newUser = localStorage.getItem('user_form_submitted') !== 'true';
    if (newUser)
      this.showUserForm = 'show';
    else
      this.showFirstVideoFn();
  }

  hideContactForm(): void {
    this.showUserForm = 'hide';
    this.eventsService.send({ event: 'setTag', title: 'closed_optin_form' })
  }

  submitUserForm(): void {
    const controls = this.userForm.controls;
    let hasErrors = false;

    for (const control in controls) {
      const errors = controls[control].errors;
      const controlName =
        control === 'fullName' ? 'Nome e Cognome' :
        control === 'phone' ? 'Numero di Telefono' :
        control === 'email' ? 'Email' :
        control === 'consent' ? 'Consenso alle News via Email' : '';
        
      hasErrors = !!errors;
      if (!!errors && 'required' in errors)
        this.userFormError = `Compila il campo '${controlName}', è richiesto.`;
      if (!!errors && 'email' in errors)
        this.userFormError = `Questa email non sembra valida, correggi e riprova.`;
      
      if (hasErrors) {
        this.userFormErrorControl = control;
        break;
      };
    }

    if (!hasErrors) {
      this.showFirstVideoFn();
      this.mailchimp.submitForm(this.userForm.value);
    };
  }

  private showFirstVideoFn(): void {
    this.showUserForm = 'hide';
    this.showFirstVideo = 'show';
    this.showBody = 'hide';
    this.eventsService.send({ event: 'setTag', title: 'first_video_btn_click' });
  }

}
