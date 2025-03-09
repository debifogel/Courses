import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Course } from '../../Models/Course';
import { Observable, tap } from 'rxjs';
import { Env } from '../../Models/Env';

@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService implements OnInit {
  ngOnInit(): void {}

    private baseUrl = `${Env.apiUrl}/courses`;
     Courses$?:Observable<Course[]>
    constructor(private http: HttpClient) {
      this.getCourses()
    }
  
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('Token'); // Replace 'yourTokenKey' with the actual key used to store the token
      return new HttpHeaders({ 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
      });
  }
  
  getCourses() {
      this.Courses$ = this.http.get<Course[]>(this.baseUrl, { headers: this.getHeaders() });
  }
  
  getCourseById(id: string): Observable<Course> {
      return this.http.get<Course>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
  
  createCourse(courseData: Course):Observable<any> {
      return this.http.post<any>(this.baseUrl, courseData, { headers: this.getHeaders() })
          .pipe(tap((res) => {
            this.getCourses();
            let { courseId } = res;
            return courseId;
          })); // Use pipe and tap to handle response
  }
  
  updateCourse(id: string, courseData: Course) {
      this.http.put<Course>(`${this.baseUrl}/${id}`, courseData, { headers: this.getHeaders() })
          .subscribe(() => this.getCourses()); // Subscribe to handle response
  }
  
  deleteCourse(id: string) {
      this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
          .subscribe(() => this.getCourses()); // Subscribe to handle response
  }
  enrollStudent(courseId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('Token'); // Retrieve the token from local storage
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    const body = {
        userId: userId
    };

    return this.http.post(`${this.baseUrl}/${courseId}/enroll`, body, { headers });
}

unEnrollStudent(courseId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('Token'); // Retrieve the token from local storage
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    // For un-enrollment, it's better to use DELETE
    return this.http.delete(`${this.baseUrl}/${courseId}/unenroll`, { headers, body: { userId: userId } });
}
getCoursesByUserId(userId: number): Observable<Course[]> {
  const token = localStorage.getItem('Token'); // Retrieve the token from local storage
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
  }
  );
  return this.http.get<Course[]>(`${this.baseUrl}/student/${userId}`, { headers });
}
}