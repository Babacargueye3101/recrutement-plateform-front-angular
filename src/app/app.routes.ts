import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { JobListComponent } from './components/jobs/job-list/job-list.component';
// Other component imports will be added as needed

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'jobs', component: JobListComponent },
  // Add more routes as components are created
  // { path: 'jobs/:id', component: JobDetailComponent },
  // { path: 'register/candidate', component: CandidateRegisterComponent },
  // { path: 'register/recruiter', component: RecruiterRegisterComponent },
  // { path: 'candidate/applications', component: CandidateApplicationsComponent },
  // { path: 'candidate/profile', component: CandidateProfileComponent },
  // { path: 'recruiter/dashboard', component: RecruiterDashboardComponent },
  // { path: 'recruiter/jobs', component: RecruiterJobsComponent },
  // { path: 'admin/dashboard', component: AdminDashboardComponent },
  // Fallback route
  { path: '**', redirectTo: '' }
];