import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookedPackagesComponent } from './bookedPackages/bookedPackages.component';
import { AuthGuard } from './_guards/auth.guard';
import { CustomerEditResolver } from './_resolvers/member-edit.resolver';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { BookedPackagesResolver } from './_resolvers/booked-packages.resolver';

// Handles all routing
export const appRoutes: Routes = [
  { path: '', component: HomeComponent}, // Home page shows home component
  // Home page has children pages that can only be accessed if authorized with token
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard], // guard class for access
    children: [
      // pages that you need to be authorized to access
      // edit page uses customer edit resolver, requested data stored as data.Customer, runs PreventUnsavedChanges if try to close
      {path: 'customer/edit', component: CustomerEditComponent, resolve: {Customer: CustomerEditResolver},
        canDeactivate: [PreventUnsavedChanges]},
        // Booked packages uses bookedpackages resolver, requested data stored as data.BookedPackages
      { path: 'bookedPackages', component: BookedPackagesComponent, resolve: {BookedPackages: BookedPackagesResolver}},
    ]
  },

  // Any path not listed here redirects to home page
  { path: '**', redirectTo: '', pathMatch: 'full'},
];
