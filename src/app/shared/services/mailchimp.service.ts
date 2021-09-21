import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface userForm {
  fullName: string;
  phone: string;
  email: string;
  consent: string;
}
interface MailChimpResponse {
  result: string;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {

  private mailChimpEndpoint = 'https://wheresbebo.us5.list-manage.com/subscribe/post-json?u=1309ac3e479d0aefcb1796697&amp;id=c6280027b7&';
  private tokenizedHiddenInput = 'b_1309ac3e479d0aefcb1796697_c6280027b7';

  private submitted = false;
  private error = '';

  constructor(private http: HttpClient) { }

  submitForm(form: userForm): void {
    const params = new HttpParams()
      .set('FNAME', form.fullName.split(' ')[0])
      .set('LNAME', form.fullName.split(' ')[1])
      .set('PHONE', form.phone)
      .set('EMAIL', form.email)
      .set('b_123abc123abc123abc123abc123abc123abc', '');
    
    const mailChimpUrl = this.mailChimpEndpoint + params.toString();

    this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
				if (response.result && response.result !== 'error') {
          this.submitted = true;
          console.log('Subscribed to newsletter successfully');
				}
				else {
					this.error = response.msg;
				}
			}, error => {
				console.error(error);
				this.error = 'Sorry, an error occurred.';
    });
    
    localStorage.setItem('user_form_submitted', 'true');
  }

}
