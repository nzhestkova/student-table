import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { EditFormComponent } from "./edit-form/edit-form.component";
import { PatternControlDirective } from "./edit-form/pattern-control/pattern-control.directive";

@NgModule({
  declarations: [
    EditFormComponent,
    PatternControlDirective,
  ],
  exports: [
    EditFormComponent,
    PatternControlDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class EditFormModule { }
