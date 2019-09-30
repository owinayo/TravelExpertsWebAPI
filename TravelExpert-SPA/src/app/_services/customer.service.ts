import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/Customer';


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

}
