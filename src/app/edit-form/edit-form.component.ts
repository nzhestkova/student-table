import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forbidFieldsWithSameContent, forbidYoungStudents } from "./special-validators";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.css"]
})
export class EditFormComponent implements OnInit {
  get editThisRecord(): object { return this._editThisRecord; }
  @Input() set editThisRecord(value: object) {
    if (value) {
      this.newStudentForm.get("studentRecordBookNumber").setValue(value["recordBookNumber"]);
      const name = this.parseFullName(value["name"]);
      this.newStudentForm.get("studentFullName.studentSurname").setValue(name[0]);
      this.newStudentForm.get("studentFullName.studentName").setValue(name[1]);
      this.newStudentForm.get("studentFullName.studentSecondName").setValue(name[2]);
      this.newStudentForm.controls["studentGroup"].setValue(value["group"]);
      this.newStudentForm.controls["studentCourse"].setValue(value["course"]);
      this.newStudentForm.controls["studentBirth"].setValue(this.parseBirthDate(value["birth"]));
      this.newStudentForm.controls["studentMark"].setValue(value["mark"]);
    }
    this._editThisRecord = value;
  }
  constructor() {
    this.newStudentForm.reset();
    this.newStudentForm.controls["submitButton"].disable();
  }
  @Output() createNewRecord = new EventEmitter();
  @Output() updateRecord = new EventEmitter();
  @Output() cancelCreating = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  @Input() showWindowCreate: boolean;
  @Input() showWindowEdit: boolean;
  private _editThisRecord: object;
  newStudentForm = new FormGroup({
    studentRecordBookNumber: new FormControl(),
    studentFullName: new FormGroup({
      studentSurname: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zА-Яа-я]*$/),
      ]),
      studentName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[A-Za-zА-Яа-я]*$/),
      ]),
      studentSecondName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[A-Za-zА-Яа-я]*$/)]),
    }, {validators: forbidFieldsWithSameContent()}),
    studentGroup: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[0-9]+-[a-zа-я]+$/i),
    ]),
    studentCourse: new FormControl(""),
    studentBirth: new FormControl("", [
      Validators.required,
      forbidYoungStudents(),
    ]),
    studentMark: new FormControl("", [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    submitButton: new FormControl({disabled: true}),
  });
  parseBirthDate(date: Date): string {
    const year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : `${date.getFullYear()}`;
    let month: string;
    date.getMonth() ? (month = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`) : month = `12`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${year}-${month}-${day}`;
  }
  parseFullName(fullName: string): string[] { // поменять в модели поле name на 3 поля
    return fullName.split(" ");
  }
  submitButtonPressed(): void {
    if (this.showWindowCreate) { this.createNewRecord.emit(this.newStudentForm.value); }
    if (this.showWindowEdit) { this.updateRecord.emit(this.newStudentForm.value); }
  }
  cancelButtonPressed(): void {
    if (this.showWindowCreate) { this.cancelCreating.emit(); }
    if (this.showWindowEdit) { this.cancelEdit.emit(); }
  }
  resetForm(): void {
    this.newStudentForm.reset();
    this.newStudentForm.controls["submitButton"].setValue("Submit");
  }
  toggleSubmitButton(): void {
    if (this.newStudentForm.valid) {
      this.newStudentForm.controls["submitButton"].enable();
      return;
    }
    this.newStudentForm.controls["submitButton"].disable();
  }
  ngOnInit(): void {
  }
}
