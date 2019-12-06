import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"]
})
export class PopupComponent implements OnInit {
  @Output() Confirm = new EventEmitter();
  @Input() student__name: string;
  onClickConfirmation(increased: boolean): void {
    this.Confirm.emit(increased);
  }
  ngOnInit(): void {
  }
}
