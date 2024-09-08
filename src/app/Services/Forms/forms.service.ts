import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppForm } from 'src/app/Model/AppForm';
import { Option } from 'src/app/Model/Option';
import { Question } from 'src/app/Model/Question';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

 
  private apiUrl = `http://localhost:5022/api/Forms`;

  constructor(private http: HttpClient) {}
  
  getForms(): Observable<AppForm[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<AppForm[]>(this.apiUrl, { headers, withCredentials: true });
  }

  getForm(id: string): Observable<AppForm> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<AppForm>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }

  createForm(form: AppForm): Observable<AppForm> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<AppForm>(this.apiUrl, form, { headers, withCredentials: true });
  }

  updateFormTitle(formId: string, newTitle: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<void>(`${this.apiUrl}/updateForm/${formId}`, JSON.stringify(newTitle), { headers, withCredentials: true });
  }
  
  deleteForm(formId: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<void>(`${this.apiUrl}/Form/${formId}`, { headers, withCredentials: true });
  }

  addQuestion(formId: string, question: Question): Observable<Question> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Question>(`${this.apiUrl}/${formId}/questions`, question, { headers, withCredentials: true });
  }
  addOption(formId: string, questionId: string, option: Option): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<void>(`${this.apiUrl}/${formId}/questions/${questionId}/options`, option, { headers, withCredentials: true });
  }
  setSubQuestion(formId: string, questionId: string, optionId: string, subQuestion: Question): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Service: Setting sub-question with formId:', formId, 'questionId:', questionId, 'optionId:', optionId, 'subQuestion:', subQuestion);
    return this.http.post<void>(`${this.apiUrl}/${formId}/questions/${questionId}/options/${optionId}/subQuestion`, subQuestion, { headers, withCredentials: true });
  }
  autoSetNextQuestions(formId: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<void>(`${this.apiUrl}/${formId}/autoSetNextQuestions`, {}, { headers, withCredentials: true });
  }
  addOptionToSubQuestionOfOption(formId: string, questionId: string, subQuestionId: string, option: Option): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<void>(`${this.apiUrl}/${formId}/questions/${questionId}/subQuestions/${subQuestionId}/options`, option, { headers, withCredentials: true });
  }

  updateQuestion(questionId: string, newTitle: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<void>(`${this.apiUrl}/questions/${questionId}`, JSON.stringify(newTitle), { headers, withCredentials: true });
  }

  updateOption(formId: string, questionId: string, optionId: string, newTitle: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<void>(`${this.apiUrl}/${formId}/questions/${questionId}/options/${optionId}`, JSON.stringify(newTitle), { headers, withCredentials: true });
  }

  deleteQuestion(questionId: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<void>(`${this.apiUrl}/questions/${questionId}`, { headers, withCredentials: true });
  }

  deleteOption(optionId: string): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<void>(`${this.apiUrl}/options/${optionId}`, { headers, withCredentials: true });
  }
}
