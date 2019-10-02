import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Customer } from '../_models/Customer';

// Authorization service to request methods from the api for login/register
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/'; // Gets url for api service
  jwtHelper = new JwtHelperService(); // Jwt helper for encoding/decoding
  decodedToken: any; // Stores decoded token
  // Gets reference to http client
  constructor(private http: HttpClient) { }

  // Takes in an object with username and password information and sends request to api
  login(model: any){
    return this.http.post(this.baseUrl + 'login', model) // Request with model attached
    .pipe( // Creates sequence of methods to run
      map((response: any) => {
        const user = response; // Accepts response from api as user
        if (user){ // If response is not null
          localStorage.setItem('token', user.token); // Sets user token, and stores decoded token with jwt helper
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      }));
  }

  // Sends request to register the given customer
  register(customer: Customer){
    return this.http.post(this.baseUrl + 'register', customer);
  }

  // Returns logged in status
  loggedIn(){
    // Gets token and checks that its not expired
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
