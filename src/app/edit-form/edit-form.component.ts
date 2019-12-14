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
      this.newStudentForm.get("studentFullName.studentSurname").setValue(value["surname"]);
      this.newStudentForm.get("studentFullName.studentName").setValue(value["name"]);
      this.newStudentForm.get("studentFullName.studentSecondName").setValue(value["secondName"]);
      this.newStudentForm.controls["studentGroup"].setValue(value["group"]);
      this.newStudentForm.controls["studentCourse"].setValue(value["course"]);
      this.newStudentForm.controls["studentBirth"].setValue(this.parseBirthDate(value["birth"]));
      this.newStudentForm.controls["studentMark"].setValue(value["mark"]);
    }
    this._editThisRecord = value;
  }
  @Output() createNewRecord = new EventEmitter();
  @Output() updateRecord = new EventEmitter();
  @Output() cancelCreating = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  @Input() showWindowCreate: boolean;
  @Input() showWindowEdit: boolean;
  availableSecondNameField = true;
  studentNumber: number;
  currentYear = new Date().getFullYear();
  private _editThisRecord: object;
  newStudentForm = new FormGroup({
    studentRecordBookNumber: new FormControl(),
    studentFullName: new FormGroup({
      studentSurname: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zА-Яа-я]+$/),
      ]),
      studentName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zА-Яа-я]*$/),
      ]),
      studentSecondName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zА-Яа-я]*$/),
      ]),
      haveSecondName: new FormControl(),
    }, {validators: forbidFieldsWithSameContent()}),
    studentGroup: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\S+$/),
    ]),
    studentCourse: new FormControl("", [
      Validators.required,
      Validators.min(1),
      Validators.max(6),
      Validators.pattern(/^[0-9]$/),
    ]),
    studentBirth: new FormControl("", [
      Validators.required,
      forbidYoungStudents(),
    ]),
    studentMark: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
      Validators.pattern(/^[0-9]+\.?[0-9]*$/),
    ]),
    submitButton: new FormControl(),
  });
  toggleSecondNameField(): void {
    this.availableSecondNameField = !this.availableSecondNameField;
    if (this.availableSecondNameField) {
      this.newStudentForm.get("studentFullName.studentSecondName").enable();
      return;
    }
    this.newStudentForm.get("studentFullName.studentSecondName").disable();
  }
  parseBirthDate(date: Date): string {
    const year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : `${date.getFullYear()}`;
    let month: string;
    date.getMonth() ? (month = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`) : month = `12`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${year}-${month}-${day}`;
  }
  toggleSubmitButton(): void {
    if (this.newStudentForm.valid) {
      this.newStudentForm.controls["submitButton"].enable();
      return;
    }
    this.newStudentForm.controls["submitButton"].disable();
  }
  submitButtonPressed(): void {
    if (this.showWindowCreate) {
      this.createNewRecord.emit(this.newStudentForm.getRawValue());
      this.cancelCreating.emit();
    }
    if (this.showWindowEdit) {
      this.updateRecord.emit(this.newStudentForm.getRawValue());
      this.cancelEdit.emit();
    }
    this.newStudentForm.disable();
  }
  cancelButtonPressed(): void {
    if (this.showWindowCreate) { this.cancelCreating.emit(); }
    if (this.showWindowEdit) { this.cancelEdit.emit(); }
  }
  resetForm(): void {
    this.newStudentForm.reset();
    this.newStudentForm.controls["submitButton"].setValue("Сохранить");
  }
  isInvalidField(fieldName: string): boolean {
    return this.newStudentForm.get(fieldName).invalid && this.newStudentForm.get(fieldName).dirty;
  }
  isValidField(fieldName: string): boolean {
    return this.newStudentForm.get(fieldName).valid && this.newStudentForm.get(fieldName).dirty;
  }
  formHaveEmptyFields(): boolean {
    return !(this.newStudentForm.get("studentFullName.studentSurname").value &&
      this.newStudentForm.get("studentFullName.studentName").value &&
      (this.newStudentForm.get("studentFullName.studentSecondName").value ||
        this.newStudentForm.get("studentFullName.studentSecondName").disabled) &&
      this.newStudentForm.get("studentGroup").value &&
      this.newStudentForm.get("studentBirth").value &&
      this.newStudentForm.get("studentMark").value);
  }
  hasLengthError(): boolean {
    if (this.newStudentForm.get("studentFullName.studentSurname").value &&
        this.newStudentForm.get("studentFullName.studentName").value &&
      (this.newStudentForm.get("studentFullName.studentSecondName").value ||
      this.newStudentForm.get("studentFullName.studentSecondName").disabled)) {
      return this.newStudentForm.get("studentFullName.studentSurname").hasError("minlength") &&
        this.newStudentForm.get("studentFullName.studentName").hasError("minlength") &&
        this.newStudentForm.get("studentFullName.studentSecondName").hasError("minlength") ;
    }
    return true;
  }
  ngOnInit(): void {
    if (this.showWindowCreate) { this.newStudentForm.reset(); }
    this.newStudentForm.controls["submitButton"].disable();
    this.newStudentForm.controls["submitButton"].setValue("Сохранить");
  }
}
