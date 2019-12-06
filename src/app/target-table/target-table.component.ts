import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { students as stud } from "src/model/students";

@Component({
  selector: "app-target-table",
  templateUrl: "./target-table.component.html",
  styleUrls: ["./target-table.component.css"]
})
export class TargetTableComponent implements OnInit {
  confirm: boolean;
  popup: boolean;
  @Input() dateFiltrationInterval: string[];
  @Input() markFiltrationInterval: number[];
  @Input() markMode: boolean;
  @Input() request;
  @Input() removingMode: boolean;
  removing__number: number;
  removing__name: string;
  @Output() Removing = new EventEmitter();
  students = stud;
  pressSort = 0;
  currentAge(year: number): number {
    const now = new Date();
    return now.getFullYear() - year;
  }
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
      case 1: return "января";
      case 2: return "февраля";
      case 3: return "марта";
      case 4: return "апреля";
      case 5: return "мая";
      case 6: return "июня";
      case 7: return "июля";
      case 8: return "августа";
      case 9: return "сентября";
      case 10: return "октября";
      case 11: return "ноября";
      default: return "декабря";
    }
  }
  contain(line: string, request: string): boolean {
    if (!request || request === " ") { return true; }
    return line.toLowerCase().includes(request.toLowerCase());

  }
  sortByBirth(array: object[], property: string): void {
    array.sort((function(a: object, b: object): number {
      if ((a[property].getMonth() > b[property].getMonth()) && (a[property].getDate() > b[property].getDate())) { return 1; }
      if (a[property].getMonth() > b[property].getMonth()) { return 1; }
      return -1;
    }));
  }
  sortByYear(array: object[], now: number, property: string): void {
    array.sort((function(a: object, b: object): number {
      if ((now - a[property].getFullYear()) > (now - b[property].getFullYear())) { return 1; }
      return -1;
    }));
  }
  sortBy(array: object[], property: string): void {
    array.sort((a, b) => a[property] > b[property] ? 1 : -1);
  }
  sorted(property: string): void {
    this.pressSort += 1;
    this.sortBy(this.students, property);
    if (this.pressSort % 2 === 0) {
      this.students.reverse();
    }
  }
  sortedByYear(property: string): void {
    this.pressSort += 1;
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    this.sortByYear(this.students, now.getFullYear(), property);
    if (this.pressSort % 2 === 0) {
      this.students.reverse();
    }
  }
  sortedByBirth(property: string): void {
    this.pressSort += 1;
    this.sortByBirth(this.students, property);
    if (this.pressSort % 2 === 0) {
      this.students.reverse();
    }
  }
  remove__btn(record_book_number: number, name: string): void {
    this.popup = true;
    this.removing__number = record_book_number;
    this.removing__name = name;
  }
  getConfirm(answer: boolean): void {
    this.popup = false;
    this.confirm = answer;
    if (this.confirm) { this.removeFromStudents(this.removing__number); }
  }
  removeFromStudents(id: number): void {
    if (this.confirm) {
      for (const student of this.students) {
        if (student.record_book_number === id) {
          this.students.splice(this.students.indexOf(student), 1);
          return;
        }
      }
    }
  }
  filtrationByDate(date: Date, interval: string[]): boolean {
    if (!interval) { return true; }
    if (interval[0] && interval[1]) {
      return date >= new Date(interval[0]) && date <= new Date(interval[1]);
    }
    if (!interval[0] || interval[0].length === 0) {
      if (!interval[1] || interval[1].length === 0) { return true; }
      if (date <= new Date(interval[1]))  { return true; }
    }
    if (!interval[1] || interval[1].length === 0) {
      if (date >= new Date(interval[0])) { return true; }
    }
  }
  filtrationByMark(mark: number, interval: number[]): boolean {
    if (!interval) { return true; }
    if (interval[0] && interval[1]) {
      return mark >= interval[0] && mark <= interval[1];
    }
    if (!interval[0]) {
      if (!interval[1]) { return true; }
      if (mark <= interval[1])  { return true; }
    }
    if (!interval[1]) {
      if (mark >= interval[0]) { return true; }
    }
    return false;
  }
  ngOnInit(): void {
  }
}
