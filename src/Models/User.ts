export class User {
    constructor(
      public userId:number,
      public name: string,
      public email: string,
      public password: string,
      public role: string
    ) {}
  }