import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {
  students = [
    {
      name: 'Ivanov I.I.',
      group: '16-AS',
      course: 3,
      mark: 3.5
    },
    {
      name: 'NoIvanov NI.NI.',
      group: '16-AS',
      course: 3,
      mark: 4.5
    }
  ];
  constructor() { }
  ngOnInit() {
  }
}
