import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/app/Model/Publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  private apiUrl = 'http://localhost:5022/api/Publication'; 

  constructor(private http: HttpClient) { }

  getFileTypeStatistics(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/file-type-stats`);
  }

  getPublicationReviewStatsByFileType(fileType: string): Observable<{ title: string, reviewCount: number }[]> {
    return this.http.get<{ title: string, reviewCount: number }[]>(`${this.apiUrl}/publication-review-stats/${fileType}`);
  }

  getBestPublications(): Observable<{ [key: string]: { title: string } }> {
    return this.http.get<{ [key: string]: { title: string } }>(`${this.apiUrl}/best-publications`);
  }
  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  getBestCustomers(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`${this.apiUrl}/best-customers`);
  }
  

  createPublication(publication: Publication, files: File[]): Observable<Publication> {
    const formData: FormData = new FormData();
    formData.append('title', publication.title);
    formData.append('content', publication.content);
    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    return this.http.post<Publication>(this.apiUrl+'/CreatePublication', formData);
  }
  updatePublication(id: string, publication: Publication, files: File[]): Observable<Publication> {
    const formData: FormData = new FormData();
    formData.append('title', publication.title);
    formData.append('content', publication.content);
    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    return this.http.put<Publication>(`${this.apiUrl}/${id}`, formData);
  }

  deletePublication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  getFileUrl(fileId: string): string {
    return `${this.apiUrl}/files/${fileId}`;
  }

}