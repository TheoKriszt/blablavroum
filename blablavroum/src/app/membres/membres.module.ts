import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MembresComponent} from "./membres.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MembresComponent],
  exports: [MembresComponent]
})
export class MembresModule { }
