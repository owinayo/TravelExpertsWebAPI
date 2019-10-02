import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false; // if page is in home page mode or register mode
  // get services
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  // returns logged in status from auth service
  loggedIn() {
    return this.authService.loggedIn();
  }

  // shows register mode
  toggleRegisterMode() {
    this.registerMode = true;
  }

  // cancels register mode
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }


}
