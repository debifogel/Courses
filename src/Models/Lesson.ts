export class Lesson {
    constructor(
      public id: number | null,
      public title: string,
      public content: string,
      public courseId: number
    ) {}
  }