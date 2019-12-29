import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "birthRus"
})
export class BirthRusPipe implements PipeTransform {

  transform(value: Date): string {
    if (value) {
      const date = value.getDate();
      const month = value.getMonth();
      switch (month) {
        case 1:
          return `${date} января`;
        case 2:
          return `${date} февраля`;
        case 3:
          return `${date} марта`;
        case 4:
          return `${date} апреля`;
        case 5:
          return `${date} мая`;
        case 6:
          return `${date} июня`;
        case 7:
          return `${date} июля`;
        case 8:
          return `${date} августа`;
        case 9:
          return `${date} сентября`;
        case 10:
          return `${date} октября`;
        case 11:
          return `${date} ноября`;
        default:
          return `${date} декабря`;
      }
    }
    return null;
  }

}
