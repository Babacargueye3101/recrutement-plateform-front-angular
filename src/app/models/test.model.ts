export interface Test {
  id: string;
  jobId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  passScore: number; // percentage
  questions: TestQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TestQuestion {
  id: string;
  testId: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  CODING = 'Coding',
  TEXT = 'Text',
  TRUE_FALSE = 'True/False'
}

export interface TestSubmission {
  testId: string;
  applicationId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
}