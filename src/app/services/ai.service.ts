import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Test, TestSubmission, TestResult } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'api/ai'; // This would be your real API endpoint

  constructor(private http: HttpClient) {}

  analyzeCv(cvUrl: string, jobId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/analyze-cv`, { cvUrl, jobId })
      .pipe(catchError(this.handleError));
  }

  generateTest(jobId: string, candidateId: string): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/generate-test`, { jobId, candidateId })
      .pipe(catchError(this.handleError));
  }

  evaluateTestSubmission(submission: TestSubmission): Observable<TestResult> {
    return this.http.post<TestResult>(`${this.apiUrl}/evaluate-test`, submission)
      .pipe(catchError(this.handleError));
  }

  getJobRecommendations(candidateId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job-recommendations/${candidateId}`)
      .pipe(catchError(this.handleError));
  }

  getCandidateRecommendations(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidate-recommendations/${jobId}`)
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