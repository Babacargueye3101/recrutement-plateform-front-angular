import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-grid">
          <div class="footer-column">
            <h3 class="footer-title">TalentMatch</h3>
            <p class="footer-description">
              Connecting the right talent with the right opportunities.
              Our AI-powered platform helps recruiters find qualified candidates
              and candidates find their dream jobs.
            </p>
          </div>
          
          <div class="footer-column">
            <h4 class="footer-heading">For Candidates</h4>
            <ul class="footer-links">
              <li><a routerLink="/jobs">Browse Jobs</a></li>
              <li><a routerLink="/register/candidate">Create Account</a></li>
              <li><a routerLink="/candidate/profile">Profile</a></li>
              <li><a routerLink="/resources/resume-tips">Resume Tips</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4 class="footer-heading">For Recruiters</h4>
            <ul class="footer-links">
              <li><a routerLink="/register/recruiter">Post a Job</a></li>
              <li><a routerLink="/pricing">Pricing</a></li>
              <li><a routerLink="/resources/hiring-tips">Hiring Tips</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4 class="footer-heading">Company</h4>
            <ul class="footer-links">
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/blog">Blog</a></li>
              <li><a routerLink="/privacy">Privacy Policy</a></li>
              <li><a routerLink="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">&copy; {{ currentYear }} TalentMatch. All rights reserved.</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" class="social-link" aria-label="Twitter">Twitter</a>
            <a href="#" class="social-link" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-800);
      color: var(--neutral-200);
      padding: var(--space-8) 0 var(--space-4);
      margin-top: var(--space-16);
    }
    
    .footer-container {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-8);
    }
    
    .footer-column {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .footer-title {
      color: white;
      font-size: 1.5rem;
      margin-bottom: var(--space-2);
    }
    
    .footer-description {
      color: var(--neutral-400);
      line-height: 1.6;
      margin-bottom: var(--space-2);
    }
    
    .footer-heading {
      color: white;
      font-size: 1.1rem;
      margin-bottom: var(--space-4);
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .footer-links a {
      color: var(--neutral-400);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .footer-links a:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--space-4);
      border-top: 1px solid var(--neutral-700);
    }
    
    .copyright {
      color: var(--neutral-500);
      font-size: 0.875rem;
    }
    
    .social-links {
      display: flex;
      gap: var(--space-4);
    }
    
    .social-link {
      color: var(--neutral-400);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .social-link:hover {
      color: white;
    }
    
    @media (max-width: 768px) {
      .footer-bottom {
        flex-direction: column;
        gap: var(--space-4);
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}