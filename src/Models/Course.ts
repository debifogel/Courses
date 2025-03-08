export class Course {
    constructor(
      public id:number|null,
      public title: string,
      public description: string,
      public teacherId: number
    ) {}
  }