export class Sorting {
  byNumberProperty(sortingArray: object[], property: string): void {
    sortingArray.sort((a, b) => a[property] > b[property] ? 1 : -1);
  }
  byBirthDate(sortingArray: object[], property: string): void {
    sortingArray.sort((function(a: object, b: object): number {
      if ((a[property].getMonth() > b[property].getMonth()) && (a[property].getDate() > b[property].getDate())) {
        return 1;
      }
      if (a[property].getMonth() > b[property].getMonth()) {
        return 1;
      }
      return -1;
    }));
  }
  byAge(sortingArray: object[], property: string): void {
    const now = new Date().getFullYear();
    sortingArray.sort((function(a: object, b: object): number {
      if ((now - a[property].getFullYear()) > (now - b[property].getFullYear())) {
        return 1;
      }
      return -1;
    }));
  }
}
