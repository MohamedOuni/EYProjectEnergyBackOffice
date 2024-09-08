import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private http: HttpClient) { 
  } 
  login(username: string, password: string, rememberMe:false): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:5022/api/Authentication/login', { username, password,rememberMe }, { headers, withCredentials: true });
  } 
  logout(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:5022/api/Authentication/logout', {},{ headers, withCredentials: true });
  }
}