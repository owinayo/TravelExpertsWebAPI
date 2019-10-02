
import { Injectable } from '@angular/core';
import { Customer } from '../_models/Customer';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Intercepts customer edit request to add customer id to request from token
@Injectable()
export class CustomerEditResolver implements Resolve<Customer> {

  // Get all required services
  constructor(private customerService: CustomerService, private authService: AuthService,
    private router: Router, private alertify: AlertifyService){

    }

    // Required method to intercept request and add required customer id from token. Alerts if error.
    resolve(route: ActivatedRouteSnapshot): Observable<Customer> {
      return this.customerService.getCustomer(this.authService.decodedToken.nameid).pipe(
        catchError(error => {
          this.alertify.error("Problem retrieving your customer information");
          this.router.navigate(['/bookedPackages']);
          return of(null);
        })
      );
    }

}
