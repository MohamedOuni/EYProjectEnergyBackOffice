import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoRequestService {

  private apiUrl = 'http://localhost:5022/api/DemoRequest';

  constructor(private http: HttpClient) {}

  getAllDemoRequests(): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any[]>(`${this.apiUrl}`, { headers, withCredentials: true });
  }

  getConsultants(): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any[]>(`${this.apiUrl}/demo/consultants`, { headers, withCredentials: true });
  }
  
  assignConsultant(demoRequestId: string, consultantId: string, demoDate: Date, startTime: string, endTime: string, demoTitle: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const formattedDemoDate = demoDate.toISOString().split('T')[0]; // Prend uniquement la partie date

    const body = { consultantId, demoDate: formattedDemoDate, startTime, endTime, demoTitle };
    console.log('Consultant ID envoyé:', body); // Vérifier ce qui est envoyé
    return this.http.put(`${this.apiUrl}/demo/${demoRequestId}/assign-consultant`, body, { headers, withCredentials: true });
}

updateDemoRequest(demoRequestId: string, consultantId: string, demoDate: Date, startTime: string, endTime: string, demoTitle: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const formattedDemoDate = demoDate.toISOString().split('T')[0]; // Prend uniquement la partie date

  const body = { consultantId, demoDate: formattedDemoDate, startTime, endTime, demoTitle, status };
  return this.http.put(`${this.apiUrl}/demo/${demoRequestId}/update`, body, { headers, withCredentials: true });
}

getConsultantById(consultantId: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.get<any>(`${this.apiUrl}/demo/consultant/${consultantId}`, { headers, withCredentials: true });
}

getDemosByConsultant(consultantId: string): Observable<any[]> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.get<any[]>(`${this.apiUrl}/consultant/${consultantId}/demos`, { headers, withCredentials: true });
}

}
