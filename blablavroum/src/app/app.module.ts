import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TrajetsModule} from "./trajets/trajets.module";
import {MembresModule} from "./membres/membres.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, TrajetsModule, MembresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
