import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-button-toggle",
  templateUrl: "./button-toggle.component.html",
  styleUrls: ["./button-toggle.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleComponent implements OnInit {
  get markBorderRight(): number { return this._markBorderRight; }
  set markBorderRight(value: number) {
    this._markBorderRight = value;
    this.markIntervalSet.emit([this.markBorderLeft, value]);
  }
  get markBorderLeft(): number { return this._markBorderLeft; }
  set markBorderLeft(value: number) {
    this._markBorderLeft = value;
    this.markIntervalSet.emit([value, this.markBorderRight]);
  }
  get dateBorderLeft(): string { return this._dateBorderLeft; }
  set dateBorderLeft(value: string) {
    this._dateBorderLeft = value;
    this.dateIntervalSet.emit([value, this._dateBorderRight]);
  }
  get dateBorderRight(): string { return this._dateBorderRight; }
  set dateBorderRight(value: string) {
    this._dateBorderRight = value;
    this.dateIntervalSet.emit([this.dateBorderLeft, value]);
  }
  private _dateBorderLeft: string;
  private _dateBorderRight: string;
  private _markBorderLeft = 0;
  private _markBorderRight = 5;
  @Output() markIntervalSet = new EventEmitter();
  @Output() dateIntervalSet = new EventEmitter();
  @Output() removeModeToggle = new EventEmitter();
  @Output() searchRequestInput = new EventEmitter();
  @Output() markHighlightToggle = new EventEmitter();
  @Output() creatingModeToggle = new EventEmitter();
  searchRequest: string;
  startCreating(): void {
    this.creatingModeToggle.emit();
  }
  startSearching(increased: string): void {
    this.searchRequestInput.emit(increased);
  }
  toggleHighlightMode(): void {
    this.markHighlightToggle.emit();
  }
  toggleRemoveMode(): void {
    this.removeModeToggle.emit();
  }
  resetAllFiltration(): void {
    this.markBorderLeft = 0;
    this.markBorderRight = 5;
    this.dateBorderLeft = "";
    this.dateBorderRight = "";
  }
  ngOnInit(): void {
  }
}
