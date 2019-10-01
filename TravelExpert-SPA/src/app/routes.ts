import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookedPackagesComponent } from './bookedPackages/bookedPackages.component';
import { AuthGuard } from './_guards/auth.guard';
import { CustomerEditResolver } from './_resolvers/member-edit.resolver';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { BookedPackagesResolver } from './_resolvers/booked-packages.resolver';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'customer/edit', component: CustomerEditComponent, resolve: {Customer: CustomerEditResolver},
        canDeactivate: [PreventUnsavedChanges]},
      { path: 'bookedPackages', component: BookedPackagesComponent, resolve: {BookedPackages: BookedPackagesResolver}},
    ]
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
