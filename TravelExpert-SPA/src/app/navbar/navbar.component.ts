import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.loadScript('../assets/scripts/navbar.component.js');
  }

  login(){
    this.authService.login(this.model).subscribe(next =>{

      this.alertify.success('Logged in successfully');
      this.router.navigate(['/bookedPackages']);
    }, error =>{
      this.alertify.error(error);
    });

  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('Logged out.');
    this.router.navigate(['/home']);
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }



}
