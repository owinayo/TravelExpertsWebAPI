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
  model: any = {}; // stores username and password
  innerWidth: any; // gets reference to window width
  mobileView: boolean; // are we in mobile view?

  // Listens to resize and determines if we're in mobile view
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.mobileView = this.innerWidth < 1024 ;
  }

  // reference to all services
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    // sets mobile view parameters
    this.innerWidth = window.innerWidth;
    this.mobileView = this.innerWidth < 1024 ;
  }

  // add dropdown behaviour after content initialized
  ngAfterViewInit() {
    this.addDropDownBehaviour();
  }

  // readds dropdown behaviour if view is changed
  ngOnChanges() {
    this.addDropDownBehaviour();
  }


  // uses auth service to login and navigates to booked packages
  login() {
    this.authService.login(this.model).subscribe(next => {

      this.alertify.success('Logged in successfully');
      this.router.navigate(['/bookedPackages']);
      this.toggleMobile();
    }, error => {
      this.alertify.error(error);
    });

  }

  // checks if we are logged in
  loggedIn() {
    return this.authService.loggedIn();
  }

  // logs out, removing token, and navigates home
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out.');
    this.router.navigate(['/home']);
    this.model.Username = '';
    this.model.Password = '';
    this.toggleMobile();
  }

  // adds dropdown behaviour to dropdown menu
  addDropDownBehaviour() {
    const dropdown = document.querySelector('#dropdownNav');
    if(dropdown == null){return;}
    dropdown.classList.toggle('is-active');
  }

  // checks if element has the requested classname
  hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
  }

  // closes dropdown menu (when you click on a dropdown menu link)
  closeDropdown() {
    const dropdown = document.querySelector('#dropdownNav');
    dropdown.classList.toggle('is-active');
  }

  // adds toggles to mobile navbar burger and menu
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
