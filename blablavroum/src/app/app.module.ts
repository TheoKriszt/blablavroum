import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrajetsComponent } from './trajets/trajets.component';
import {MembresComponent} from "./membres/membres.component";
import {TrajetsService} from "./trajets/trajets.service";


@NgModule({
  declarations: [
    AppComponent,
    TrajetsComponent,
    MembresComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TrajetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
