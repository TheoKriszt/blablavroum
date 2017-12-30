import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TrajetsModule} from './trajets/trajets.module';
import {MembresModule} from './membres/membres.module';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from "./guards/auth-guard";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, TrajetsModule, MembresModule, RouterModule, AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
