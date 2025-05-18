import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Application, ApplicationStatus } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'api/applications'; // This would be your real API endpoint

  constructor(private http: HttpClient) {}

  getApplicationsByCandidate(candidateId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/candidate/${candidateId}`)
      .pipe(catchError(this.handleError));
  }

  getApplicationsByJob(jobId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/job/${jobId}`)
      .pipe(catchError(this.handleError));
  }

  getApplicationById(id: string): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createApplication(jobId: string, coverLetter?: string): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, { jobId, coverLetter })
      .pipe(catchError(this.handleError));
  }

  updateApplicationStatus(id: string, status: ApplicationStatus): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}/status`, { status })
      .pipe(catchError(this.handleError));
  }

  addRecruiterNotes(id: string, notes: string): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}/notes`, { notes })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}, Message: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}