export enum UserRole {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  CANDIDATE = 'candidate'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recruiter extends User {
  role: UserRole.RECRUITER;
  company: string;
  position: string;
  phoneNumber?: string;
}

export interface Candidate extends User {
  role: UserRole.CANDIDATE;
  skills: string[];
  experience: number; // in years
  education: string;
  cvUrl?: string;
  phoneNumber?: string;
  linkedinUrl?: string;
  github?: string;
}

export interface Admin extends User {
  role: UserRole.ADMIN;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface RecruiterRegisterRequest extends RegisterRequest {
  role: UserRole.RECRUITER;
  company: string;
  position: string;
  phoneNumber?: string;
}

export interface CandidateRegisterRequest extends RegisterRequest {
  role: UserRole.CANDIDATE;
  skills?: string[];
  experience?: number;
  education?: string;
  phoneNumber?: string;
  linkedinUrl?: string;
  github?: string;
}