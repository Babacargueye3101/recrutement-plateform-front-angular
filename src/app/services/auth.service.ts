import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  UserRole,
  RecruiterRegisterRequest,
  CandidateRegisterRequest
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private apiUrl = 'api/auth'; // This would be your real API endpoint
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // In a real app, you would have a utility to decode JWT tokens
      // For this example, we're just simulating that we have a valid user from storage
      const storedUser = localStorage.getItem('current_user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
        } catch (error) {
          this.logout();
        }
      }
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    // In a real app, this would call your backend API
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  registerRecruiter(recruiter: RecruiterRegisterRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/recruiter`, recruiter)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  registerCandidate(candidate: CandidateRegisterRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/candidate`, candidate)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isRecruiter(): boolean {
    return this.currentUser?.role === UserRole.RECRUITER;
  }

  get isCandidate(): boolean {
    return this.currentUser?.role === UserRole.CANDIDATE;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === UserRole.ADMIN;
  }

  private handleAuthentication(response: AuthResponse): void {
    if (response && response.token) {
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem('current_user', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
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