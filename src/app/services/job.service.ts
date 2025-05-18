import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Job, JobCreateRequest, JobUpdateRequest } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'api/jobs'; // This would be your real API endpoint

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getActiveJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/active`)
      .pipe(catchError(this.handleError));
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getJobsByRecruiter(recruiterId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/recruiter/${recruiterId}`)
      .pipe(catchError(this.handleError));
  }

  createJob(job: JobCreateRequest): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job)
      .pipe(catchError(this.handleError));
  }

  updateJob(id: string, job: JobUpdateRequest): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job)
      .pipe(catchError(this.handleError));
  }

  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  searchJobs(query: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/search?q=${query}`)
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