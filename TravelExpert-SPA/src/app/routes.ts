import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookedPackagesComponent } from './bookedPackages/bookedPackages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'bookedPackages', component: BookedPackagesComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
