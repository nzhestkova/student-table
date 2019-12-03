import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {
  @Input() markMode: boolean;
  students = [
    {
      name: 'Ivanov I.I.',
      group: '16-AS',
      course: 3,
      mark: 3.5,
      birth: new Date(1998, 2, 15)
    },
    {
      name: 'NoIvanov NI.NI.',
      group: '16-AS',
      course: 3,
      mark: 4.5,
      birth: new Date(1998, 2, 15)
    },
    {
      name: 'Bad Student',
      group: '16-AS',
      course: 3,
      mark: 2.9,
      birth: new Date(1998, 2, 15)
    },
    {
      name: 'Very Bad Student',
      group: '16-AS',
      course: 3,
      mark: 2.3,
      birth: new Date(1998, 2, 15)
    },
    {
      name: 'Good Student',
      group: '16-AS',
      course: 3,
      mark: 4,
      birth: new Date(1998, 2, 15)
    }
  ];
  now = new Date().getFullYear();
  isBad(value: number): boolean {
    return value < 3;
  }
  parseMonth(value: number): string {
    switch (value) {
      case 1: return 'января';
      case 2: return 'февраля';
      case 3: return 'марта';
      case 4: return 'апреля';
      case 5: return 'мая';
      case 6: return 'июня';
      case 7: return 'июля';
      case 8: return 'августа';
      case 9: return 'сентября';
      case 10: return 'октября';
      case 11: return 'ноября';
      case 12: return 'декабря';
    }
  }
  constructor() { }
  ngOnInit() {
  }
}
