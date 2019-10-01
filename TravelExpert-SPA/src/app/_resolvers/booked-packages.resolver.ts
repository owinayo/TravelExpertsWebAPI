
import { Injectable } from '@angular/core';
import { Customer } from '../_models/Customer';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookedPackage } from '../_models/BookedPackage';


@Injectable()
export class BookedPackagesResolver implements Resolve<BookedPackage> {

  constructor(private customerService: CustomerService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService) {

    }

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
