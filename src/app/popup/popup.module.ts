import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BirthYearPipe } from "../custom-pipes/birth-year/birth-year.pipe";
import { PopupComponent } from "./popup/popup.component";

@NgModule({
  declarations: [
    PopupComponent,
    BirthYearPipe,
  ],
  exports: [
    PopupComponent,
    BirthYearPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class PopupModule { }
