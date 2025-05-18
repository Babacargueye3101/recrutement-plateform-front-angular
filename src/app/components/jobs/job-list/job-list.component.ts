import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../services/job.service';
import { Job, EmploymentType, ExperienceLevel } from '../../../models/job.model';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="job-list-page">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">Find Your Next Career Opportunity</h1>
          <p class="page-description">
            Browse through our curated list of job opportunities from top employers.
          </p>
        </div>
        
        <div class="search-filters">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search by title, skills, or company" 
              [(ngModel)]="searchQuery"
              (input)="applyFilters()"
            />
          </div>
          
          <div class="filters">
            <div class="filter-group">
              <label for="employmentType">Employment Type</label>
              <select id="employmentType" [(ngModel)]="selectedEmploymentType" (change)="applyFilters()">
                <option value="">All Types</option>
                @for (type of employmentTypes; track type) {
                  <option [value]="type">{{ type }}</option>
                }
              </select>
            </div>
            
            <div class="filter-group">
              <label for="experienceLevel">Experience Level</label>
              <select id="experienceLevel" [(ngModel)]="selectedExperienceLevel" (change)="applyFilters()">
                <option value="">All Levels</option>
                @for (level of experienceLevels; track level) {
                  <option [value]="level">{{ level }}</option>
                }
              </select>
            </div>
            
            <button class="clear-filters" (click)="clearFilters()">Clear Filters</button>
          </div>
        </div>
        
        <div class="job-grid">
          @if (isLoading) {
            <div class="loading-state">
              <p>Loading jobs...</p>
            </div>
          } @else if (filteredJobs.length === 0) {
            <div class="empty-state">
              <h3>No jobs found</h3>
              <p>Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          } @else {
            @for (job of filteredJobs; track job.id) {
              <div class="job-card" [routerLink]="['/jobs', job.id]">
                <div class="job-header">
                  <h2 class="job-title">{{ job.title }}</h2>
                  <span class="badge badge-primary">{{ job.employmentType }}</span>
                </div>
                
                <div class="job-company">
                  <span class="company-name">{{ job.company }}</span>
                  <span class="job-location">{{ job.location }}</span>
                </div>
                
                <div class="job-skills">
                  @for (skill of job.skills.slice(0, 3); track skill) {
                    <span class="skill-tag">{{ skill }}</span>
                  }
                  @if (job.skills.length > 3) {
                    <span class="skill-tag more">+{{ job.skills.length - 3 }}</span>
                  }
                </div>
                
                <div class="job-details">
                  <div class="job-experience">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">{{ job.experienceLevel }}</span>
                  </div>
                  
                  @if (job.salary) {
                    <div class="job-salary">
                      <span class="detail-label">Salary:</span>
                      <span class="detail-value">{{ job.salary.min | currency:job.salary.currency }} - {{ job.salary.max | currency:job.salary.currency }} / {{ job.salary.period }}</span>
                    </div>
                  }
                </div>
                
                <div class="job-posted">
                  Posted {{ job.createdAt | date:'mediumDate' }}
                </div>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .job-list-page {
      padding: var(--space-8) 0;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }
    
    .page-title {
      font-size: 2rem;
      margin-bottom: var(--space-2);
    }
    
    .page-description {
      color: var(--neutral-600);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .search-filters {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      margin-bottom: var(--space-8);
    }
    
    .search-box {
      margin-bottom: var(--space-4);
    }
    
    .filters {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
    }
    
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    
    .filter-group label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: 500;
      font-size: 0.875rem;
    }
    
    .clear-filters {
      background: none;
      border: 1px solid var(--neutral-300);
      color: var(--neutral-700);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-4);
      cursor: pointer;
      font-size: 0.875rem;
      margin-top: 1.5rem;
      align-self: flex-end;
    }
    
    .clear-filters:hover {
      background-color: var(--neutral-100);
      border-color: var(--neutral-400);
    }
    
    .job-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-6);
    }
    
    .job-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .job-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-3);
      gap: var(--space-2);
    }
    
    .job-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--neutral-900);
      margin: 0;
    }
    
    .job-company {
      display: flex;
      justify-content: space-between;
      color: var(--neutral-700);
      margin-bottom: var(--space-4);
    }
    
    .company-name {
      font-weight: 500;
    }
    
    .job-location {
      font-size: 0.875rem;
    }
    
    .job-skills {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }
    
    .skill-tag {
      background-color: var(--neutral-100);
      color: var(--neutral-700);
      font-size: 0.75rem;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-md);
    }
    
    .skill-tag.more {
      background-color: var(--primary-light);
      color: white;
    }
    
    .job-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: var(--neutral-600);
      margin-bottom: var(--space-4);
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .detail-label {
      font-weight: 500;
      margin-right: var(--space-1);
    }
    
    .job-posted {
      margin-top: auto;
      font-size: 0.75rem;
      color: var(--neutral-500);
      padding-top: var(--space-3);
      border-top: 1px solid var(--neutral-200);
    }
    
    .loading-state, .empty-state {
      grid-column: 1 / -1;
      padding: var(--space-8);
      text-align: center;
      color: var(--neutral-600);
    }
    
    .empty-state h3 {
      margin-bottom: var(--space-2);
      color: var(--neutral-700);
    }
    
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
      }
      
      .filter-group {
        width: 100%;
      }
      
      .job-header {
        flex-direction: column;
      }
      
      .job-details {
        flex-direction: column;
        gap: var(--space-2);
      }
    }
  `]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  isLoading = true;
  
  searchQuery = '';
  selectedEmploymentType = '';
  selectedExperienceLevel = '';
  
  employmentTypes = Object.values(EmploymentType);
  experienceLevels = Object.values(ExperienceLevel);
  
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
      
      this.loadJobs();
    });
  }
  
  loadJobs(): void {
    this.isLoading = true;
    
    this.jobService.getActiveJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobs', error);
        this.isLoading = false;
      }
    });
  }
  
  applyFilters(): void {
    let filtered = [...this.jobs];
    
    // Apply search query filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply employment type filter
    if (this.selectedEmploymentType) {
      filtered = filtered.filter(job => job.employmentType === this.selectedEmploymentType);
    }
    
    // Apply experience level filter
    if (this.selectedExperienceLevel) {
      filtered = filtered.filter(job => job.experienceLevel === this.selectedExperienceLevel);
    }
    
    this.filteredJobs = filtered;
  }
  
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedEmploymentType = '';
    this.selectedExperienceLevel = '';
    this.applyFilters();
  }
}