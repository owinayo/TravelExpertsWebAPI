import { Component, OnInit, HostListener } from '@angular/core';
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
  innerWidth: any;
  mobileView: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.mobileView = this.innerWidth < 1024 ;
  }

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.mobileView = this.innerWidth < 1024 ;
  }

  ngAfterViewInit() {
    this.addDropDownBehaviour();
  }

  ngOnChanges() {
    this.addDropDownBehaviour();
  }


  login() {
    this.authService.login(this.model).subscribe(next => {

      this.alertify.success('Logged in successfully');
      this.router.navigate(['/bookedPackages']);
      this.toggleMobile();
    }, error => {
      this.alertify.error(error);
    });

  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out.');
    this.router.navigate(['/home']);
    this.model.Username = '';
    this.model.Password = '';
    this.toggleMobile();
  }

  addDropDownBehaviour() {
    const dropdown = document.querySelector('#dropdownNav');
    if(dropdown == null){return;}
    dropdown.classList.toggle('is-active');
  }

  hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
  }

  closeDropdown() {
    const dropdown = document.querySelector('#dropdownNav');
    dropdown.classList.toggle('is-active');
  }

  toggleMobile() {
    if (this.mobileView) {
      // Toggle is-active on navbar burger and menu
      const navbarBurger = document.getElementById('navbarBurger');
      const navbarMenu = document.getElementById('navbarMenu');
      navbarBurger.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
    }

  }




}
