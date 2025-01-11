// src/types/student.ts
export interface EducationalGoal {
    id: string;
    title: string;
    description: string;
    status: 'not-started' | 'in-progress' | 'completed';
    targetDate: Date;
    progress: number;
  }
  
  export interface Accommodation {
    id: string;
    type: 'environmental' | 'instructional' | 'testing' | 'behavioral';
    description: string;
    implementationDate: Date;
  }
  
  export interface Student {
    id: string;
    name: string;
    dateOfBirth: Date;
    grade: string;
    primaryDiagnosis?: string;
    accommodations: Accommodation[];
    goals: EducationalGoal[];
    teamMembers: {
      role: string;
      name: string;
      email: string;
    }[];
  }
  
  export interface ProgressEntry {
    id: string;
    date: Date;
    category: 'academic' | 'behavioral' | 'social' | 'motor' | 'communication';
    description: string;
    goalId?: string;
    metrics?: {
      name: string;
      value: number;
      unit: string;
    }[];
  }