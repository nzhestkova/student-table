import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-button-toggle",
  templateUrl: "./button-toggle.component.html",
  styleUrls: ["./button-toggle.component.css"]
})
export class ButtonToggleComponent implements OnInit {
  @Output() GetMarkInterval = new EventEmitter();
  @Output() GetDateInterval = new EventEmitter();
  @Output() RemoveMode = new EventEmitter();
  @Output() Input = new EventEmitter();
  @Output() Changed = new EventEmitter();
  request: string;
  mode_isOff = true;
  date_interval_left: string;
  date_interval_right: string;
  mark_interval_left = 0;
  mark_interval_right = 5;
  searching(increased: string): void {
    this.Input.emit(increased);
  }
  change(): void {
    this.Changed.emit();
  }
  removeMode(mode: boolean): void {
    this.mode_isOff = !this.mode_isOff;
    this.RemoveMode.emit(mode);
  }
  getDateInterval(left: string, right: string): void {
    this.GetDateInterval.emit([left, right]);
  }
  getMarkInterval(left: number, right: number): void {
    console.log(`${left} + ${right}`);
    this.GetMarkInterval.emit([left, right]);
  }
  resetFiltration(): void {
    this.mark_interval_left = 0;
    this.mark_interval_right = 5;
    this.date_interval_left = "";
    this.date_interval_right = "";
    this.getDateInterval(this.date_interval_left, this.date_interval_right);
    this.getMarkInterval(this.mark_interval_left, this.mark_interval_right);
  }
  ngOnInit(): void {
  }
}
