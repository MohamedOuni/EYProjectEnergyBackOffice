import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { ClientResponse } from 'src/app/Model/ClientResponse';
import { Company } from 'src/app/Model/Company';
import { Question } from 'src/app/Model/Question';
import { User } from 'src/app/Model/User';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private apiUrl = 'http://localhost:5022/api/Company';
  private userApiUrl = 'http://localhost:5022/api/Admin';
  private FileApiUrl = 'http://localhost:5022/api/Files';
  private responsesApiUrl = 'http://localhost:5022/api/ClientResponses';
  private questionsApiUrl = 'http://localhost:5022/api/Forms/questions';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Company[]>(`${this.apiUrl}/ListCompany`, { headers, withCredentials: true }).pipe(
      switchMap(companies => {
        const requests = companies.map(company => {
          const customerRequest = this.getUserById(company.customerId).pipe(
            map(customer => ({ ...company, customerUsername: customer.username }))
          );

          const consultantIds = company.consultantIds || [];
          const consultantRequests = consultantIds.map(id => this.getUserById(id));
          
          return forkJoin([customerRequest, ...consultantRequests]).pipe(
            map(results => {
              const [updatedCompany, ...consultants] = results;
              return {
                ...updatedCompany,
                consultantUsernames: consultants.map(consultant => consultant.username)
              };
            })
          );
        });
        return forkJoin(requests);
      })
    );
  }
  
  getUserById(userId: string): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const formattedId = this.getObjectIdString(userId);
    console.log('Fetching user with ID:', formattedId);
    return this.http.get<User>(`${this.userApiUrl}/${formattedId}`, { headers, withCredentials: true });
  }

  getConsultants(): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User[]>(`${this.apiUrl}/consultants`, { headers,withCredentials: true });
  }

  assignConsultant(model: { companyId: string; consultantId: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Sending assign consultant request with model:', model);
    return this.http.post<any>(`${this.apiUrl}/assign-consultant`, model, { headers, withCredentials: true });
  }
  getQuestionById(questionId: string): Observable<Question> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Question>(`${this.questionsApiUrl}/${questionId}`, { headers, withCredentials: true });
  }

  downloadFile(fileId: string): Observable<Blob> {
    console.log('Requesting file download with ID:', fileId);
    const encodedFileId = encodeURIComponent(fileId);
    return this.http.get(`${this.FileApiUrl}/${encodedFileId}`, { responseType: 'blob' });
  }
  
  getObjectIdString(id: any): string {
    console.log('Original ID:', id); 
    if (id && typeof id === 'object') {
      if (id.toHexString) {
        return id.toHexString();
      }
      if (id.$oid) {
        return id.$oid;
      }
      if (id.timestamp && id.machine && id.pid && id.increment) {
        const hexString = new Date(id.timestamp * 1000).getTime().toString(16).padStart(8, '0') +
                          id.machine.toString(16).padStart(6, '0') +
                          id.pid.toString(16).padStart(4, '0') +
                          id.increment.toString(16).padStart(6, '0');
        return hexString;
      }
    }
    return id ? id.toString() : '';
  }
  
 
  exportResponsesByFormToPdf(companyId: string): Observable<Blob> {
    return this.http.get(`${this.responsesApiUrl}/exportResponsesByForm/${companyId}`, { responseType: 'blob' });
  }
  
  exportResponseByFormToPdf(companyId: string, formId: string): Observable<Blob> {
    return this.http.get(`${this.responsesApiUrl}/exportResponseByForm/${companyId}/${formId}`, { responseType: 'blob' });
  }
  
 
  getResponsesByCompanyGroupedByForm(companyId: string): Observable<{ [formTitle: string]: ClientResponse[] }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<{ [formTitle: string]: ClientResponse[] }>(`${this.responsesApiUrl}/company/${companyId}/groupedByForm`, { headers, withCredentials: true });
  }
}