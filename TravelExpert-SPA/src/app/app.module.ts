import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
      TermsAndConditionsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
