import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembresService } from "./membres.service";
import {MembresComponent} from "./membres.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  declarations: [MembresComponent],
  exports: [MembresComponent],
  providers: [MembresService]
})
export class MembresModule { }
