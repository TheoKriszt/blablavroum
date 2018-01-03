import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembresService } from "./membres.service";
import {MembresComponent} from "./membres.component";
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { InscriptionComponent } from './inscription/inscription.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from "../guards/auth-guard";
import {TrajetsModule} from "../trajets/trajets.module";
import { ProfileComponent } from './profile/profile.component';
import {InplaceModule} from "primeng/primeng";

const routes: Routes = [
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: MembresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule, HttpClientModule, BrowserModule, FormsModule, RouterModule.forChild(routes),
    TrajetsModule, InplaceModule, ReactiveFormsModule //NGPrime
  ],
  declarations: [MembresComponent, AuthComponent, InscriptionComponent, LoginComponent, ProfileComponent],
  exports: [MembresComponent, AuthComponent, InscriptionComponent, LoginComponent, ProfileComponent],
  providers: [MembresService, AuthService, LoginComponent, AuthGuard]
})
export class MembresModule { }
