import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Your API URL

  constructor(private http: HttpClient) { }

  // Method for user registration
  register(name: string, email: string, password: string, role: string): Observable<any> {
    const body = { name, email, password, role };
    return this.http.post(`${this.apiUrl}/register`, body).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
      })
    );
  }

  // Method for user login
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
       
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('Token', token);
  }

  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem('Token');
  }
}
