import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { ButtonToggleComponent } from "./button-toggle/button-toggle.component";
import { StylesToggleDirective } from "./custom-directives/styles-toggle.directive";
import { BirthRusPipe } from "./custom-pipes/birth-rus/birth-rus.pipe";
import { StartWithUpPipe } from "./custom-pipes/start-with-upper-case/start-with-up.pipe";
import { EditFormModule } from "./form/edit-form.module";
import { PopupModule } from "./popup/popup.module";
import { TargetTableComponent } from "./target-table/target-table.component";

@NgModule({
  declarations: [
    AppComponent,
    TargetTableComponent,
    ButtonToggleComponent,
    StylesToggleDirective,
    BirthRusPipe,
    StartWithUpPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EditFormModule,
    PopupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
