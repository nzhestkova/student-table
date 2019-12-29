export class Students {
  recordBookNumber: number;
  surname: string;
  name: string;
  secondName: string;
  group: string;
  course: number;
  mark: number;
  birth: Date;
  constructor(recordBookNumber: number, surname: string, name: string, secondName: string, group: string,
              course: number, mark: number, birth: Date) {
    this.recordBookNumber = recordBookNumber;
    this.surname = surname;
    this.name = name;
    this.secondName = secondName;
    this.group = group;
    this.course = course;
    this.mark = mark;
    this.birth = birth;
  }
}
export let current_number: number = 154321;
export let students = [
  new Students(current_number++, "Ivanov", "Ivan", "Ivanovich", "16-AS",
    4, 4.5, new Date(2000, 2, 2)),
  new Students(current_number++, "Sidorov", "Sidor", "", "16-AS",
    4, 3, new Date(1999, 1, 1)),
  new Students(current_number++, "Ivanov", "Ivan", "Ivanovich", "16-AS",
    3, 4.5, new Date(1998, 2, 4)),
  new Students(current_number++, "Bad", "Ivan", "Student", "16-AS",
    5, 4.5, new Date(1999, 2, 13)),
];
