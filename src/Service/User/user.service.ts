import { Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { BehaviorSubject, Observer } from 'rxjs';
import { Course } from '../../Models/Course';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); // ניתן להאזין למשתנה הזה מכל קומפוננטה
  setUser(user: User) {
    this.userSubject.next(user);
    console.log(this.userSubject);

    
  }

  clearUser() {
    this.userSubject.next(null);
  }
}
