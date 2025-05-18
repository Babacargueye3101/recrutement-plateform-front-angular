import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User, UserRole } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/">
            <span class="logo-text">TalentMatch</span>
          </a>
        </div>
        
        <nav class="nav-menu">
          <ul class="nav-list">
            <li><a routerLink="/jobs" class="nav-link">Browse Jobs</a></li>
            
            @if (!isLoggedIn) {
              <li><a routerLink="/login" class="nav-link">Login</a></li>
              <li>
                <a routerLink="/register" class="nav-link register-btn">Sign Up</a>
              </li>
            } @else {
              @if (isCandidate) {
                <li><a routerLink="/candidate/applications" class="nav-link">My Applications</a></li>
                <li><a routerLink="/candidate/profile" class="nav-link">Profile</a></li>
              }
              
              @if (isRecruiter) {
                <li><a routerLink="/recruiter/dashboard" class="nav-link">Dashboard</a></li>
                <li><a routerLink="/recruiter/jobs" class="nav-link">My Jobs</a></li>
              }
              
              @if (isAdmin) {
                <li><a routerLink="/admin/dashboard" class="nav-link">Admin Panel</a></li>
              }
              
              <li>
                <button (click)="logout()" class="nav-link logout-btn">Logout</button>
              </li>
            }
          </ul>
        </nav>
        
        <button class="mobile-menu-toggle" (click)="toggleMobileMenu()">
          <span class="sr-only">Menu</span>
          <span class="menu-icon"></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) var(--space-4);
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .nav-menu {
      display: flex;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      gap: var(--space-6);
      margin: 0;
      padding: 0;
    }
    
    .nav-link {
      color: var(--neutral-700);
      font-weight: 500;
      transition: color 0.2s ease;
      text-decoration: none;
    }
    
    .nav-link:hover {
      color: var(--primary);
      text-decoration: none;
    }
    
    .register-btn {
      color: white;
      background-color: var(--primary);
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      transition: background-color 0.2s ease;
    }
    
    .register-btn:hover {
      background-color: var(--primary-dark);
      color: white;
    }
    
    .logout-btn {
      background: none;
      border: none;
      color: var(--neutral-700);
      font-weight: 500;
      padding: 0;
      cursor: pointer;
    }
    
    .logout-btn:hover {
      color: var(--error);
    }
    
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: relative;
    }
    
    .menu-icon, 
    .menu-icon::before, 
    .menu-icon::after {
      display: block;
      background-color: var(--neutral-800);
      position: absolute;
      height: 2px;
      width: 100%;
      transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
      border-radius: 2px;
    }
    
    .menu-icon::before {
      content: '';
      margin-top: -8px;
    }
    
    .menu-icon::after {
      content: '';
      margin-top: 8px;
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }
      
      .nav-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease;
      }
      
      .nav-menu.open {
        height: auto;
        padding: var(--space-4) 0;
      }
      
      .nav-list {
        flex-direction: column;
        gap: var(--space-4);
        padding: var(--space-4);
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  
  constructor(private authService: AuthService) {}
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  
  get isCandidate(): boolean {
    return this.authService.isCandidate;
  }
  
  get isRecruiter(): boolean {
    return this.authService.isRecruiter;
  }
  
  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
  
  logout(): void {
    this.authService.logout();
  }
  
  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      if (this.isMenuOpen) {
        navMenu.classList.add('open');
      } else {
        navMenu.classList.remove('open');
      }
    }
  }
}