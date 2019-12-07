import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"]
})
export class PopupComponent implements OnInit {
  @Output() answerInput = new EventEmitter();
  @Input() studentName: string;
  onClickConfirmation(increased: boolean): void {
    this.answerInput.emit(increased);
  }
  ngOnInit(): void {
  }
}
