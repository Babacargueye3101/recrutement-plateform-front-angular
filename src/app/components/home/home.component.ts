import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-container">
          <div class="hero-content">
            <h1 class="hero-title slide-up">Find Your Perfect <span class="highlight">Career Match</span></h1>
            <p class="hero-subtitle fade-in">
              Connect with top employers and get matched with opportunities that fit your skills.
              Powered by AI for smarter job matches and skill assessments.
            </p>
            
            <div class="cta-buttons slide-up">
              <a routerLink="/register/candidate" class="cta-button primary">Find a Job</a>
              <a routerLink="/register/recruiter" class="cta-button secondary">Hire Talent</a>
            </div>
          </div>
          
          <div class="hero-search slide-up">
            <h2 class="search-title">Search for your dream job</h2>
            <div class="search-form">
              <div class="search-input-group">
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  class="search-input"
                  [(ngModel)]="searchQuery"
                />
              </div>
              <button type="submit" class="search-button" [routerLink]="['/jobs']" [queryParams]="{q: searchQuery}">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">How TalentMatch Works</h2>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🔍</div>
              <h3 class="feature-title">AI-Powered Matching</h3>
              <p class="feature-description">
                Our advanced AI analyzes your skills and experience to match you with the perfect job opportunities.
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3 class="feature-title">Skill Assessment</h3>
              <p class="feature-description">
                Get evaluated with tailored tests that assess your skills relevant to the jobs you apply for.
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3 class="feature-title">Career Growth</h3>
              <p class="feature-description">
                Receive feedback and suggestions to improve your skills and advance your career.
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">👥</div>
              <h3 class="feature-title">Smart Recruitment</h3>
              <p class="feature-description">
                Recruiters get matched with pre-screened candidates who are the best fit for their openings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- How It Works Section -->
      <section class="how-it-works">
        <div class="container">
          <h2 class="section-title">For Job Seekers</h2>
          
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Create Your Profile</h3>
                <p class="step-description">
                  Sign up and upload your CV. Our AI will analyze your skills and experience.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Apply to Jobs</h3>
                <p class="step-description">
                  Browse job listings and apply to positions that match your profile.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Take Skill Tests</h3>
                <p class="step-description">
                  Complete personalized assessments to showcase your abilities to employers.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3 class="step-title">Get Hired</h3>
                <p class="step-description">
                  Connect with employers and land your dream job based on your proven skills.
                </p>
              </div>
            </div>
          </div>
          
          <h2 class="section-title mt-large">For Recruiters</h2>
          
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Post Job Openings</h3>
                <p class="step-description">
                  Create detailed job listings with required skills and experience.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Get Matched Candidates</h3>
                <p class="step-description">
                  Our AI matches your jobs with the most qualified candidates in our database.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Review Skill Assessments</h3>
                <p class="step-description">
                  Evaluate candidates based on their performance on tailored skill tests.
                </p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3 class="step-title">Hire the Best Fit</h3>
                <p class="step-description">
                  Make data-driven hiring decisions based on verified skills and experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">Success Stories</h2>
          
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p class="testimonial-text">
                  "TalentMatch helped me find the perfect software developer role that matched my skills.
                  The skill assessment gave me confidence in the interview process."
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-info">
                  <h4 class="author-name">Sarah Johnson</h4>
                  <p class="author-role">Software Developer</p>
                </div>
              </div>
            </div>
            
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p class="testimonial-text">
                  "As a recruiter, I was able to find qualified candidates faster than ever before.
                  The AI-powered skills matching saved us weeks in the hiring process."
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-info">
                  <h4 class="author-name">Michael Chen</h4>
                  <p class="author-role">HR Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p class="testimonial-text">
                  "The personalized skill tests helped me identify gaps in my knowledge and prepare better.
                  I landed a job that truly values my strengths."
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-info">
                  <h4 class="author-name">Emma Rodriguez</h4>
                  <p class="author-role">UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-container">
            <h2 class="cta-title">Ready to Find Your Perfect Match?</h2>
            <p class="cta-description">
              Join thousands of job seekers and recruiters who have found success with TalentMatch.
            </p>
            <div class="cta-buttons">
              <a routerLink="/register/candidate" class="cta-button primary">Find Jobs</a>
              <a routerLink="/register/recruiter" class="cta-button secondary">Post Jobs</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      min-height: 100vh;
    }
    
    .hero-section {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--accent-dark) 100%);
      color: white;
      padding: var(--space-12) 0;
      position: relative;
      overflow: hidden;
    }
    
    .hero-container {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }
    
    .hero-content {
      max-width: 700px;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: var(--space-4);
    }
    
    .highlight {
      background: linear-gradient(to right, var(--secondary-light), var(--accent-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: var(--space-6);
    }
    
    .cta-buttons {
      display: flex;
      gap: var(--space-4);
    }
    
    .cta-button {
      padding: var(--space-3) var(--space-6);
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 1rem;
      text-align: center;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    
    .cta-button.primary {
      background-color: var(--secondary);
      color: white;
    }
    
    .cta-button.primary:hover {
      background-color: var(--secondary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .cta-button.secondary {
      background-color: transparent;
      color: white;
      border: 2px solid white;
    }
    
    .cta-button.secondary:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    
    .hero-search {
      background-color: white;
      padding: var(--space-6);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
    }
    
    .search-title {
      color: var(--neutral-800);
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
    }
    
    .search-form {
      display: flex;
      gap: var(--space-2);
    }
    
    .search-input-group {
      flex: 1;
    }
    
    .search-input {
      width: 100%;
      padding: var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--neutral-200);
      font-size: 1rem;
    }
    
    .search-button {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-4);
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }
    
    .search-button:hover {
      background-color: var(--primary-dark);
    }
    
    .section-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: var(--space-8);
      color: var(--neutral-900);
    }
    
    .features-section {
      padding: var(--space-16) 0;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-6);
    }
    
    .feature-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: var(--space-4);
    }
    
    .feature-title {
      font-size: 1.25rem;
      margin-bottom: var(--space-2);
      color: var(--neutral-900);
    }
    
    .feature-description {
      color: var(--neutral-600);
      line-height: 1.6;
    }
    
    .how-it-works {
      padding: var(--space-16) 0;
      background-color: var(--neutral-100);
    }
    
    .steps {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      margin-bottom: var(--space-12);
    }
    
    .step {
      display: flex;
      gap: var(--space-6);
      align-items: flex-start;
    }
    
    .step-number {
      background-color: var(--primary);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    
    .step-content {
      flex: 1;
    }
    
    .step-title {
      font-size: 1.25rem;
      margin-bottom: var(--space-2);
      color: var(--neutral-900);
    }
    
    .step-description {
      color: var(--neutral-600);
      line-height: 1.6;
    }
    
    .mt-large {
      margin-top: var(--space-16);
    }
    
    .testimonials-section {
      padding: var(--space-16) 0;
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-6);
    }
    
    .testimonial-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
    }
    
    .testimonial-content {
      flex: 1;
      margin-bottom: var(--space-4);
    }
    
    .testimonial-text {
      color: var(--neutral-700);
      font-style: italic;
      line-height: 1.6;
      position: relative;
    }
    
    .testimonial-text::before {
      content: '"';
      font-size: 3rem;
      color: var(--primary-light);
      opacity: 0.2;
      position: absolute;
      top: -20px;
      left: -10px;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .author-name {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      color: var(--neutral-900);
    }
    
    .author-role {
      font-size: 0.875rem;
      color: var(--neutral-500);
      margin: 0;
    }
    
    .cta-section {
      padding: var(--space-12) 0;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      color: white;
    }
    
    .cta-container {
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }
    
    .cta-title {
      font-size: 2rem;
      margin-bottom: var(--space-4);
    }
    
    .cta-description {
      font-size: 1.125rem;
      margin-bottom: var(--space-6);
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1rem;
      }
      
      .cta-buttons {
        flex-direction: column;
        gap: var(--space-2);
      }
      
      .search-form {
        flex-direction: column;
      }
      
      .step {
        flex-direction: column;
        gap: var(--space-2);
        align-items: flex-start;
      }
      
      .cta-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {
  searchQuery: string = '';
}