import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { students, Students } from "src/model/students";

@Component({
  selector: "app-target-table",
  templateUrl: "./target-table.component.html",
  styleUrls: ["./target-table.component.css"]
})
export class TargetTableComponent implements OnInit {
  @Input() dateFiltrationBorders: string[];
  @Input() markFiltrationBorders: number[];
  @Input() highlightMarkMode: boolean;
  @Input() searchRequest: string;
  @Input() removingModeOff: boolean;
  @Input() showWindowCreate: boolean;
  showWindowEdit = false;
  @Output() creatingTurnOff = new EventEmitter();
  showPopup: boolean;
  studentRemovingNumber: number;
  studentRemovingName: string;
  studentsList = students;
  countSortClicks = 0;
  editThisRecord: object;
  studentCurrentAge(year: number): number {
    const now = new Date();
    return now.getFullYear() - year;
  }
  isBadMark(value: number): boolean {
    return value < 3;
  }
  isGoodMark(value: number): boolean {
    return value >= 4;
  }
  isMediumMark(value: number): boolean {
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
  nameContainRequest(line: string, request: string): boolean {
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
  sortByNumber(array: object[], property: string): void {
    array.sort((a, b) => a[property] > b[property] ? 1 : -1);
  }
  sortingByNumberProperty(property: string): void {
    this.countSortClicks += 1;
    this.sortByNumber(this.studentsList, property);
    if (this.countSortClicks % 2 === 0) {
      this.studentsList.reverse();
    }
  }
  sortedByYear(property: string): void {
    this.countSortClicks += 1;
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    this.sortByYear(this.studentsList, now.getFullYear(), property);
    if (this.countSortClicks % 2 === 0) {
      this.studentsList.reverse();
    }
  }
  sortedByBirth(property: string): void {
    this.countSortClicks += 1;
    this.sortByBirth(this.studentsList, property);
    if (this.countSortClicks % 2 === 0) {
      this.studentsList.reverse();
    }
  }
  startRemoving(recordBookNumber: number, name: string): void {
    this.showPopup = true;
    this.studentRemovingNumber = recordBookNumber;
    this.studentRemovingName = name;
  }
  confirmationReceived(answerIsYes: boolean): void {
    this.showPopup = false;
    if (answerIsYes) { this.removeStudent(this.studentRemovingNumber); }
  }
  removeStudent(id: number): void {
    for (const student of this.studentsList) {
      if (student.recordBookNumber === id) {
        this.studentsList.splice(this.studentsList.indexOf(student), 1);
        return;
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
  startEditStudentInformation(record: Students): void {
    this.showWindowEdit = !this.showWindowEdit;
    this.editThisRecord = record;
  }
  addNewRecord(newStudent: object): void {
    this.studentsList.push(this.createNewRecord(newStudent));
  }
  createNewRecord(newStudent: object): Students {
    const studentFullName = newStudent["studentFullName"];
    const concatName = `${studentFullName["studentSurname"]} ${studentFullName["studentName"]} ${studentFullName["studentSecondName"]}`;
    return new Students(0, concatName, newStudent["studentGroup"],
      newStudent["studentCourse"], newStudent["studentMark"], new Date(newStudent["studentBirth"]));
  }
  updateRecord(newRecord: object): void {
    const currentRecord = students.find((function (item: object): object {
      if (item["recordBookNumber"] === newRecord["studentRecordBookNumber"]) { return item; }
    }));
    const studentFullName = newRecord["studentFullName"];
    const concatName = `${studentFullName["studentSurname"]} ${studentFullName["studentName"]} ${studentFullName["studentSecondName"]}`;
    students[students.indexOf(currentRecord)] = new Students(newRecord["studentRecordBookNumber"], concatName, newRecord["studentGroup"],
      newRecord["studentCourse"], newRecord["studentMark"], new Date(newRecord["studentBirth"]));
  }
  cancelPressed(): void {
    if (this.showWindowCreate) { this.creatingTurnOff.emit(); }
    if (this.showWindowEdit) { this.showWindowEdit = !this.showWindowEdit; }
  }
  ngOnInit(): void {
  }
}
