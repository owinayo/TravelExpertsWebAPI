import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorInterceptorProvider } from './_services/error.intercepter';
import { BookedPackagesComponent } from './bookedPackages/bookedPackages.component';
import { appRoutes } from './routes';
import { TermsAndConditionsComponent } from './termsAndConditions/termsAndConditions.component';
import { CustomerEditResolver } from './_resolvers/member-edit.resolver';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { BookedPackagesResolver } from './_resolvers/booked-packages.resolver';
import { SafeHtmlImagePipe } from './_pipes/SafeHtmlImage.pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      RegisterComponent,
      HomeComponent,
      FooterComponent,
      BookedPackagesComponent,
      TermsAndConditionsComponent,
      CustomerEditComponent,
      SafeHtmlImagePipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
          tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      CustomerEditResolver,
      BookedPackagesResolver,
      PreventUnsavedChanges,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
