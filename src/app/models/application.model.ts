export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  cvUrl: string;
  coverLetter?: string;
  aiScore?: number;
  recruiterNotes?: string;
  testResults?: TestResult[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  REVIEWING = 'Reviewing',
  TEST_INVITED = 'Test Invited',
  TEST_COMPLETED = 'Test Completed',
  INTERVIEW_INVITED = 'Interview Invited',
  INTERVIEW_COMPLETED = 'Interview Completed',
  HIRED = 'Hired',
  REJECTED = 'Rejected'
}

export interface TestResult {
  id: string;
  applicationId: string;
  jobId: string;
  candidateId: string;
  testId: string;
  score: number;
  answers: TestAnswer[];
  feedback: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface TestAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  score: number;
  feedback?: string;
}