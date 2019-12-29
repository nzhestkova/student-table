import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "birthYear"
})
export class BirthYearPipe implements PipeTransform {

  transform(value: Date): number {
    if (value) {
      const now = new Date();
      return now.getFullYear() - value.getFullYear();
    }
  }
}
