import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent implements OnInit {
  constructor() { }
  request: string;
  @Output() Input = new EventEmitter();
  @Output() Changed = new EventEmitter();
  searching(increased: string) {
    this.Input.emit(increased);
  }
  change() {
    this.Changed.emit();
  }
  ngOnInit() {
  }
}
