import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

// Guard to prevent unauthorized access to protected pages
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Gets reference to auth service, router, and alertify notifications
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ){}

  // Required method that runs when guard is used
  // Checks if user is logged in, otherwise take them to home page
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }

    this.alertify.error('Unauthorized!');
    this.router.navigate(['']);
    return false;
  }

}
