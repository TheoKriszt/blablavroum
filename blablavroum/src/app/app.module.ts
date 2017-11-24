import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrajetsComponent } from './trajets/trajets.component';
import {MembresComponent} from "./membres/membres.component";


@NgModule({
  declarations: [
    AppComponent,
    TrajetsComponent,
    MembresComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
