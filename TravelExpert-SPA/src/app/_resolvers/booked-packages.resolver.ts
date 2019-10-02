
import { Injectable } from '@angular/core';
import { Customer } from '../_models/Customer';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookedPackage } from '../_models/BookedPackage';

// Intercepts requests for booked packages, adds user token to request to ensure that request can pass
@Injectable()
export class BookedPackagesResolver implements Resolve<BookedPackage> {

  // Gets a reference to customer service, auth service, router, and alertify notifications
  constructor(private customerService: CustomerService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService) {
    }

    // Required method. Adds customer id from token to request for booked packages. Alerts error if unsuccessful.
    resolve(route: ActivatedRouteSnapshot): Observable<BookedPackage> {
      return this.customerService.getBookedPackages(this.authService.decodedToken.nameid).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving your booked packages');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
    }

}
