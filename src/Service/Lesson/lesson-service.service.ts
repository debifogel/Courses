import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../Models/Lesson';
import { Observable } from 'rxjs';
import { Env } from '../../Models/Env';

@Injectable({
  providedIn: 'root'
})
export class LessonServiceService {

  private baseUrl = `${Env.apiUrl}/courses`;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('Token'); // Replace 'yourTokenKey' with the actual key used to store the token
    return new HttpHeaders({ 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json' 
    });
  }

  getLessonsByCourseId(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }

  getLessonById(courseId: string, id: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}/${courseId}/lessons/${id}`, { headers: this.getHeaders() });
  }

  createLesson(courseId: string, lessonData: Lesson) {
    this.http.post<Lesson>(`${this.baseUrl}/${courseId}/lessons`, lessonData, { headers: this.getHeaders() })
        .subscribe(); // Subscribe to handle response
  }

  updateLesson(courseId: string, id: string, lessonData: Lesson) {
    this.http.put<Lesson>(`${this.baseUrl}/${courseId}/lessons/${id}`, lessonData, { headers: this.getHeaders() })
        .subscribe(); // Subscribe to handle response
  }

  deleteLesson(courseId: string, id: string) {
    this.http.delete<void>(`${this.baseUrl}/${courseId}/lessons/${id}`, { headers: this.getHeaders() })
        .subscribe(); // Subscribe to handle response
  }
}
