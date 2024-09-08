import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  private apiUrl = 'http://localhost:5022/api';

  constructor(private http: HttpClient) {}

  getAssignedCompanies(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.apiUrl}/Company/consultant/companies`, { headers, withCredentials: true });
  }

  getCompanyResponses(companyId: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.apiUrl}/ClientResponses/consultant/responses/${companyId}`, { headers, withCredentials: true });
  }

  exportResponsesToPdf(companyId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/Company/exportResponses/${companyId}`, { responseType: 'blob' });
  }
  
}