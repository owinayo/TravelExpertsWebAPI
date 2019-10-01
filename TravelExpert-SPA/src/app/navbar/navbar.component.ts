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

  }

  ngAfterViewInit(){
    this.addDropDownBehaviour();
  }

  ngOnChanges(){
    this.addDropDownBehaviour();
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
    this.model.Username="";
    this.model.Password="";
  }

  addDropDownBehaviour(){

    this.loadScript('../assets/scripts/navbar.component.js');
    /*
    document.addEventListener('click', (e) => {
      var dropdown = document.getElementsByClassName("dropdown-item");
      for (let i = 0; i < dropdown.length; i++){
      dropdown[i].addEventListener('click', ()=>{
        var dropdown = document.querySelector('#dropdownNav');
        dropdown.classList.toggle('is-active');
      })
    }
    });
    */

  }

  closeDropdown(){
    var dropdown = document.querySelector('#dropdownNav');
    dropdown.classList.toggle('is-active');
  }

  loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


}
