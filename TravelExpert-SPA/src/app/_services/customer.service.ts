import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/Customer';
import { BookedPackage } from '../_models/BookedPackage';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCustomer(id): Observable<Customer>{
    console.log(this.baseUrl + 'customers/' + id);
    return this.http.get<Customer>(this.baseUrl + 'customers/' + id);
  }

  updateCustomer(id: number, customer: Customer) {
    return this.http.put(this.baseUrl + 'customers/' + id, customer);
  }

  getBookedPackages(id): Observable<BookedPackage>{
    return this.http.get<BookedPackage>(this.baseUrl+'customers/bookedPackages/' + id);
  }

}
