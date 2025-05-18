import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="login-page">
      <div class="container">
        <div class="auth-container">
          <div class="auth-card">
            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Sign in to your TalentMatch account</p>
            
            @if (errorMessage) {
              <div class="error-alert">
                {{ errorMessage }}
              </div>
            }
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email" 
                  placeholder="name@example.com"
                />
                @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                  <div class="error-message">
                    Please enter a valid email address.
                  </div>
                }
              </div>
              
              <div class="form-group">
                <label for="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  formControlName="password" 
                  placeholder="Enter your password"
                />
                @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                  <div class="error-message">
                    Password is required.
                  </div>
                }
              </div>
              
              <div class="form-options">
                <div class="remember-me">
                  <input type="checkbox" id="remember" />
                  <label for="remember">Remember me</label>
                </div>
                <a routerLink="/forgot-password" class="forgot-password">Forgot password?</a>
              </div>
              
              <button 
                type="submit" 
                class="login-button" 
                [disabled]="loginForm.invalid || isLoading"
              >
                @if (isLoading) {
                  <span>Signing in...</span>
                } @else {
                  <span>Sign In</span>
                }
              </button>
            </form>
            
            <div class="auth-divider">
              <span>Don't have an account?</span>
            </div>
            
            <div class="register-options">
              <a routerLink="/register/candidate" class="register-option">
                <span class="register-icon">👤</span>
                <div class="register-content">
                  <h3 class="register-title">I'm a Candidate</h3>
                  <p class="register-description">Looking for job opportunities</p>
                </div>
              </a>
              
              <a routerLink="/register/recruiter" class="register-option">
                <span class="register-icon">🏢</span>
                <div class="register-content">
                  <h3 class="register-title">I'm a Recruiter</h3>
                  <p class="register-description">Looking to hire talent</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 60px);
      display: flex;
      align-items: center;
      padding: var(--space-8) 0;
    }
    
    .auth-container {
      max-width: 500px;
      margin: 0 auto;
    }
    
    .auth-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-8);
    }
    
    .auth-title {
      font-size: 2rem;
      margin-bottom: var(--space-2);
      text-align: center;
    }
    
    .auth-subtitle {
      color: var(--neutral-600);
      text-align: center;
      margin-bottom: var(--space-6);
    }
    
    .auth-form {
      margin-bottom: var(--space-6);
    }
    
    .form-group {
      margin-bottom: var(--space-4);
    }
    
    .form-group label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: 500;
    }
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    
    .remember-me {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .remember-me input {
      width: auto;
    }
    
    .forgot-password {
      color: var(--primary);
      font-size: 0.875rem;
    }
    
    .login-button {
      width: 100%;
      padding: var(--space-3);
      margin-top: var(--space-4);
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .login-button:hover {
      background-color: var(--primary-dark);
    }
    
    .login-button:disabled {
      background-color: var(--neutral-400);
      cursor: not-allowed;
    }
    
    .auth-divider {
      text-align: center;
      margin: var(--space-6) 0;
      position: relative;
    }
    
    .auth-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--neutral-200);
      z-index: 1;
    }
    
    .auth-divider span {
      position: relative;
      z-index: 2;
      background-color: white;
      padding: 0 var(--space-4);
      color: var(--neutral-600);
    }
    
    .register-options {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .register-option {
      display: flex;
      align-items: center;
      padding: var(--space-3);
      border: 1px solid var(--neutral-200);
      border-radius: var(--radius-md);
      text-decoration: none;
      color: var(--neutral-800);
      transition: all 0.2s ease;
    }
    
    .register-option:hover {
      border-color: var(--primary-light);
      background-color: var(--neutral-50);
      transform: translateY(-2px);
    }
    
    .register-icon {
      font-size: 1.5rem;
      margin-right: var(--space-3);
    }
    
    .register-title {
      font-size: 1rem;
      margin: 0;
      font-weight: 600;
    }
    
    .register-description {
      font-size: 0.875rem;
      color: var(--neutral-600);
      margin: 0;
    }
    
    .error-alert {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--error);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-4);
      font-size: 0.875rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (user) => {
          this.isLoading = false;
          if (user.role === 'recruiter') {
            this.router.navigate(['/recruiter/dashboard']);
          } else if (user.role === 'candidate') {
            this.router.navigate(['/jobs']);
          } else if (user.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Failed to sign in. Please check your credentials.';
        }
      });
  }
}