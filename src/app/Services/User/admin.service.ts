import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { User } from 'src/app/Model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:5022/api/Admin';

  createUser(user: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:5022/api/Admin/create-user', user, { headers, withCredentials: true });
  }

  getAllCustomer(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>('http://localhost:5022/api/Admin/customers', { headers, withCredentials: true });
  }

  getAllCustomerValid(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>('http://localhost:5022/api/Admin/Validcustomers', { headers, withCredentials: true });
  }
  
  getAllCostumerCombined(): Observable<User[]> {
    return forkJoin({
      allCustomers: this.getAllCustomer(),
      validCustomers: this.getAllCustomerValid()
    }).pipe(
      map(result => {
        const allUsers = result.allCustomers.map(user => ({ ...user, isValid: false }));
        const validUsers = result.validCustomers.map(user => ({ ...user, isValid: true }));
        return [...allUsers, ...validUsers];
      })
    );
  }

  validUser(username: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username };
    return this.http.post<any>('http://localhost:5022/api/Admin/ManageCustomer', body, { headers, withCredentials: true });
  }

  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>('http://localhost:5022/api/Admin/getallUserForEY', { headers, withCredentials: true });
  }

  getAllUsersBlocked(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>('http://localhost:5022/api/Admin/getallUserBlocked', { headers, withCredentials: true });
  }

  assignRole(username: string, role: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, role };
    return this.http.post<any>('http://localhost:5022/api/Admin/assign-role', body,{ headers, withCredentials: true });
  }

  BannedUser(username: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username };
    return this.http.post<any>('http://localhost:5022/api/Admin/BanedUser', body, { headers, withCredentials: true });
  }

  AllowedUser(username: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username };
    return this.http.post<any>('http://localhost:5022/api/Admin/AllowedUser', body, { headers, withCredentials: true });
  }

  getAllUsersCombined(): Observable<User[]> {
    return new Observable(observer => {
      let combinedUsers: User[] = [];
      this.getAllUsers().subscribe(activeUsers => {
        combinedUsers = activeUsers.map(user => ({ ...user, status: 'active' }));
        this.getAllUsersBlocked().subscribe(blockedUsers => {
          combinedUsers = [...combinedUsers, ...blockedUsers.map(user => ({ ...user, status: 'blocked' }))];
          observer.next(combinedUsers);
          observer.complete();
        });
      });
    });
  }


  searchUsersByUsername(username: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>(`${this.apiUrl}/search-by-username`, { headers, withCredentials: true, params: { username } });
  }

  searchUsersByRole(role: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>(`${this.apiUrl}/search-by-role`, { headers, withCredentials: true, params: { role } });
  }
  
}
