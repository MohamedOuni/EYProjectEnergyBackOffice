import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private apiUrl = 'http://localhost:5022/api/Contact';

  constructor(private http: HttpClient) { }

  getAllClaims(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllClaims`);
  }

  validateClaim(claimId: string, validationMessage: string): Observable<any> {
    const payload = { validationMessage: validationMessage }; 
    return this.http.post(`${this.apiUrl}/ValidateClaim/${claimId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
}
}