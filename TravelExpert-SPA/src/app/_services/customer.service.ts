import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/Customer';
import { BookedPackage } from '../_models/BookedPackage';

// Handles requests to api for getting and updating customer information
@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  baseUrl = environment.apiUrl + 'customers/'; // Api url

  // gets reference to http client
  constructor(private http: HttpClient) { }

  // Retrieves the customer info with the given id
  getCustomer(id: number): Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl + id);
  }

  // Updates the customer given the customer id and new customer information
  updateCustomer(id: number, customer: Customer) {
    return this.http.put(this.baseUrl  + id, customer);
  }

  // Gets booked packages for the given customer id
  getBookedPackages(id: number): Observable<BookedPackage>{
    return this.http.get<BookedPackage>(this.baseUrl+'bookedPackages/' + id);
  }

}
