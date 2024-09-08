import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getAllConsultant(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>('http://localhost:5022/api/User/GetAllConsultant', { headers, withCredentials: true });
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>('http://localhost:5022/api/User/GetAllConsultantAndClient', { headers, withCredentials: true });
  }
  getMyProfile(): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User>('http://localhost:5022/api/User/GetMyProfile', { headers, withCredentials: true });
  }
  updateProfile(phone: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { phone };
    return this.http.post<any>('http://localhost:5022/api/User/UpdateProfile', body, { headers , withCredentials: true });
  }
  forgotPassword(email: string) {
    return this.http.post<any>('http://localhost:5022/api/User/forgot-password', { email });
  }
  resetPassword(token: string, newPassword: string) {
    return this.http.post<any>('http://localhost:5022/api/User/reset-password', { token, newPassword });
  }
}
