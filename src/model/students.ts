class Students {
  record_book_number: number;
  name: string;
  group: string;
  course: number;
  mark: number;
  birth: Date;
  constructor(record_book_number: number, name: string, group: string,
              course: number, mark: number, birth: Date) {
    this.record_book_number = record_book_number;
    this.name = name;
    this.group = group;
    this.course = course;
    this.mark = mark;
    this.birth = birth;
  }
}
let current_number: number = 154321;
export let students = [
  new Students(current_number++, "Ivanov I.I.", "16-AS",
    3, 3.5, new Date(2019, 1, 1)),
  new Students(current_number++, "Not Ivanov NI.NI.", "16-AS",
    1, 4.5, new Date(2019, 11, 6)),
  new Students(current_number++, "Bad Student", "16-AS",
    3, 2.9, new Date(1998, 10, 12)),
  new Students(current_number++, "Very Bad Student", "16-AS",
    2, 2.3, new Date(2000, 2, 15)),
  new Students(current_number++, "Good Student", "16-AS",
    4, 4, new Date(1996, 2, 1)),
];