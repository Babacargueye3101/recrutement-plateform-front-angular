import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, finalize, map, of, switchMap, tap } from 'rxjs';

type UserRole = 'admin' | 'candidate' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface LoginResponse {
  token: string;
}

interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'recruiter' | 'candidate';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuth();
  }

  private checkAuth(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe({
        error: () => {
          localStorage.removeItem('token');
          this.isLoadingSubject.next(false);
        }
      });
    } else {
      this.isLoadingSubject.next(false);
    }
  }

  private getCurrentUser(): Observable<User> {
    return this.http.get<UserResponse>(`${this.apiUrl}/api/users/me/`).pipe(
      map(userData => ({
        id: userData.id.toString(),
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email,
        role: (userData.role === 'recruiter' ? 'admin' : 'candidate') as UserRole
      })),
      tap(user => {
        this.currentUserSubject.next(user);
        this.isLoadingSubject.next(false);
      }),
      catchError(error => {
        console.error('Erreur de vérification de l\'authentification:', error);
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.isLoadingSubject.next(false);
        throw error;
      })
    );
  }

  private get apiUrl(): string {
    // Remplacez par votre variable d'environnement ou configuration
    return 'https://votre-api.com';
  }

  login(email: string, password: string, role: UserRole): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/token/`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      switchMap(() => this.getCurrentUser()),
      map(user => {
        if (user.role !== role) {
          throw new Error('Role mismatch');
        }
        return true;
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return of(false);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  register(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    company?: string,
    position?: string
  ): Observable<boolean> {
    this.isLoadingSubject.next(true);
    const [first_name, last_name = ''] = name.split(' ');

    return this.http.post(`${this.apiUrl}/api/register/`, {
      email,
      password,
      password_confirm: password,
      first_name,
      last_name,
      role: role === 'admin' ? 'recruiter' : 'candidate',
      company,
      position
    }).pipe(
      switchMap(() => this.login(email, password, role)),
      catchError(error => {
        console.error('Erreur d\'inscription:', error);
        return of(false);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get user(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get isCandidate(): boolean {
    return this.currentUserSubject.value?.role === 'candidate';
  }

  get isRecruiter(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }


  get isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}