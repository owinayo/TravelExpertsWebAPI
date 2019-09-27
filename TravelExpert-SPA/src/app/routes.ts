import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookedPackagesComponent } from './bookedPackages/bookedPackages.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'bookedPackages', component: BookedPackagesComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
