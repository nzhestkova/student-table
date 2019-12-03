import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent implements OnInit {
  constructor() { }
  @Output() Changed = new EventEmitter();
  change() {
    console.log(`Button was pressed`);
    this.Changed.emit();
  }
  ngOnInit() {
  }
}
