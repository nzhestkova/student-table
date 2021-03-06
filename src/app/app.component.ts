import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private _dateFiltrationBorders: string[];
  set dateFiltrationBorders(interval: string[]) { this._dateFiltrationBorders = interval; }
  get dateFiltrationBorders(): string[] { return this._dateFiltrationBorders; }
  private _markFiltrationBorders: number[];
  set markFiltrationBorders(value: number[]) { this._markFiltrationBorders = value; }
  get markFiltrationBorders(): number[] { return this._markFiltrationBorders; }
  highlightMarkMode = true;
  removingModeOff = true;
  searchRequest: string;
  showWindowCreate = false;
  toggleHighlightMode(): void {
    this.highlightMarkMode = !this.highlightMarkMode;
  }
  toggleRemoveMode(): void {
    this.removingModeOff = !this.removingModeOff;
  }
  toggleCreatingMode(): void {
    this.showWindowCreate = !this.showWindowCreate;
  }
}
