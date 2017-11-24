import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrajetsService } from "./trajets.service";
import {TrajetsComponent} from "./trajets.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  exports:[TrajetsComponent],
  declarations: [TrajetsComponent],
  providers: [TrajetsService]
})
export class TrajetsModule { }
