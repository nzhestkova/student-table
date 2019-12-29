import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "startWithUp"
})
export class StartWithUpPipe implements PipeTransform {
  transform(value: string): string {
    if (value && !value.match(/^[A-ZА-Я][a-zа-я]+$/)) {
      return this.calculateNewLine(value);
    }
    return value;
  }
  calculateNewLine(line: string): string {
    let newLine = ``;
    for (let i = 0; i < line.length; i++) {
      if (i === 0) {
        newLine += line[i].toUpperCase();
        continue;
      }
      newLine += line[i].toLowerCase();
    }
    return newLine;
  }
}
