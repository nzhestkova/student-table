import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbidFieldsWithSameContent(): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const allValues = [control.controls["studentName"].value,
      control.controls["studentSurname"].value,
      control.controls["studentSecondName"].value];
    for (const value of allValues) {
      allValues.splice(allValues.indexOf(value), 1);
      if (allValues.includes(value)) { return { "fieldsNotUnique": true }; }
    }
    return null;
  };
}
export function forbidYoungStudents(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const now = new Date();
    const dateBirth = new Date(control.value);
    return dateBirth && now.getFullYear() - dateBirth.getFullYear() < 10 ? { "studentTooYoung": true } : null;
  };
}
