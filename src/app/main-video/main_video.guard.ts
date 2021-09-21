import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class MainVideoGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const value = localStorage.getItem('intro_watched') == 'true';
    let res = false;
    
    if (value) {
      res = true;;
    } else {
      this.router.navigate(['/']);
      console.error('Not watched first video');
    }

    return res;
  }
}
