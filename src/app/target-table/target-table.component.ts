import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {
  @Input() markMode: boolean;
  @Input() request;
  students = [
    {
      name: 'Ivanov I.I.',
      group: '16-AS',
      course: 3,
      mark: 3.5,
      birth: new Date(1990, 1, 12)
    },
    {
      name: 'NoIvanov NI.NI.',
      group: '16-AS',
      course: 1,
      mark: 4.5,
      birth: new Date(1997, 4, 11)
    },
    {
      name: 'Bad Student',
      group: '16-AS',
      course: 3,
      mark: 2.9,
      birth: new Date(1998, 5, 10)
    },
    {
      name: 'Very Bad Student',
      group: '16-AS',
      course: 2,
      mark: 2.3,
      birth: new Date(2000, 2, 15)
    },
    {
      name: 'Good Student',
      group: '16-AS',
      course: 4,
      mark: 4,
      birth: new Date(1996, 2, 1)
    }
  ];
  pressSort = 0;
  now = new Date().getFullYear();
  isBad(value: number): boolean {
    return value < 3;
  }
  isGood(value: number): boolean {
    return value >= 4;
  }
  isMedium(value: number): boolean {
    return value >= 3 && value < 4;
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
  contain(line: string, request: string): boolean {
    if (request && request !== ' ') {
      if (line.toLowerCase().includes(request.toLowerCase())) { return true; }
    }
    return false;
  }
  sortNumbers(): void {
    this.students.reverse();
  }
  sortNames(): void {
    this.pressSort += 1;
    function sortByName(arr) {
      arr.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    sortByName(this.students);
    if (this.pressSort % 2 === 0) { this.students.reverse(); }
  }
  sortMarks(): void {
    this.pressSort += 1;
    function sortByMark(arr) {
      arr.sort((a, b) => a.mark < b.mark ? 1 : -1);
    }
    sortByMark(this.students);
    if (this.pressSort % 2 === 0) { this.students.reverse(); }
  }
  sortCourse(): void {
    this.pressSort += 1;
    function sortByCourse(arr) {
      arr.sort((a, b) => a.course > b.course ? 1 : -1);
    }
    sortByCourse(this.students);
    if (this.pressSort % 2 === 0) { this.students.reverse(); }
  }
  sortBirth(): void {
    this.pressSort += 1;
    function sortByBirth(arr) {
      arr.sort((a, b) => a.birth > b.birth ? 1 : -1);
    }
    sortByBirth(this.students);
    if (this.pressSort % 2 === 0) { this.students.reverse(); }
  }
  sortYear(): void {
    this.pressSort += 1;
    function sortByYear(arr, now) {
      arr.sort((a, b) => (now - a.birth.getFullYear()) > (now - b.birth.getFullYear()) ? 1 : -1);
    }
    sortByYear(this.students, this.now);
    if (this.pressSort % 2 === 0) { this.students.reverse(); }
  }
}
