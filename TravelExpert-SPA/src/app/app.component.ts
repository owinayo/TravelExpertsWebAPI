import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService){

  }

  ngOnInit() {
    // on app load, gets token if it exists and decodes it for auth service
      const token = localStorage.getItem('token');
      if(token){
        this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      }
  }


}
