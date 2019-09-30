import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorInterceptorProvider } from './_services/error.intercepter';
import { BookedPackagesComponent } from './bookedPackages/bookedPackages.component';
import { VacationPackagesComponent } from './vacationPackages/vacationPackages.component';
import { appRoutes } from './routes';
import { TermsAndConditionsComponent } from './termsAndConditions/termsAndConditions.component';
import { CustomerEditResolver } from './_resolvers/member-edit.resolver';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      CustomerComponent,
      NavbarComponent,
      RegisterComponent,
      HomeComponent,
      FooterComponent,
      BookedPackagesComponent,
      VacationPackagesComponent,
      TermsAndConditionsComponent,
      CustomerEditComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      CustomerEditResolver,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
