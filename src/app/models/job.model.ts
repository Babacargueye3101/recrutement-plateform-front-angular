export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  salary?: SalaryRange;
  skills: string[];
  recruiterId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  applicationDeadline?: Date;
}

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
  TEMPORARY = 'Temporary'
}

export enum ExperienceLevel {
  ENTRY = 'Entry-level',
  JUNIOR = 'Junior',
  MID = 'Mid-level',
  SENIOR = 'Senior',
  EXPERT = 'Expert'
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: SalaryPeriod;
}

export enum SalaryPeriod {
  HOURLY = 'Hourly',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export interface JobCreateRequest {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  salary?: SalaryRange;
  skills: string[];
  applicationDeadline?: Date;
}

export interface JobUpdateRequest extends Partial<JobCreateRequest> {
  isActive?: boolean;
}