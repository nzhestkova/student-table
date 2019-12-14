import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ButtonToggleComponent } from "./button-toggle/button-toggle.component";
import { PatternControlDirective } from "./custom-directives/pattern-control.directive";
import { EditFormComponent } from "./edit-form/edit-form.component";
import { PopupComponent } from "./popup/popup.component";
import { TargetTableComponent } from "./target-table/target-table.component";

@NgModule({
  declarations: [
    AppComponent,
    TargetTableComponent,
    ButtonToggleComponent,
    PopupComponent,
    EditFormComponent,
    PatternControlDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
