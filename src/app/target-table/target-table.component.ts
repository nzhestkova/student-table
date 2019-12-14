import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { current_number, students, Students } from "src/model/students";
import { Sorting } from "./sorting";

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
  currentBookNumber = current_number;
  studentsList = students;
  countSortClicks = 0;
  editThisRecord: object;
  sort = new Sorting();
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
  sortingByNumberProperty(property: string): void {
    this.countSortClicks += 1;
    this.sort.byNumberProperty(this.studentsList, property);
    if (this.countSortClicks % 2 === 0) {
      this.studentsList.reverse();
    }
  }
  sortingByAge(property: string): void {
    this.countSortClicks += 1;
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    this.sort.byAge(this.studentsList, property);
    if (this.countSortClicks % 2 === 0) {
      this.studentsList.reverse();
    }
  }
  sortingByBirth(property: string): void {
    this.countSortClicks += 1;
    this.sort.byBirthDate(this.studentsList, property);
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
    return new Students(this.currentBookNumber++, studentFullName["studentSurname"], studentFullName["studentName"],
      studentFullName["studentSecondName"] ? studentFullName["studentSecondName"] : "",
      newStudent["studentGroup"], newStudent["studentCourse"], newStudent["studentMark"], new Date(newStudent["studentBirth"]));
  }
  updateRecord(newRecord: object): void {
    const currentRecord = students.find((function (item: object): object {
      if (item["recordBookNumber"] === newRecord["studentRecordBookNumber"]) { return item; }}));
    const studentFullName = newRecord["studentFullName"];
    students[students.indexOf(currentRecord)] = new Students(newRecord["studentRecordBookNumber"],
      studentFullName["studentSurname"], studentFullName["studentName"],
      studentFullName["studentSecondName"] ? studentFullName["studentSecondName"] : "", newRecord["studentGroup"],
      newRecord["studentCourse"], newRecord["studentMark"], new Date(newRecord["studentBirth"]));
  }
  cancelPressed(): void {
    if (this.showWindowCreate) { this.creatingTurnOff.emit(); }
    if (this.showWindowEdit) { this.showWindowEdit = !this.showWindowEdit; }
  }
  ngOnInit(): void {
  }
}
