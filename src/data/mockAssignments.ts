export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  maxPoints: number;
  submissionCount: number;
  averageGrade?: number;
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
  attachments?: string[];
}

export const mockAssignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Algebra Fundamentals Quiz',
    description: 'Complete the quiz covering basic algebraic equations and expressions.',
    subject: 'Mathematics',
    teacherId: 'teacher-1',
    teacherName: 'Mary Jaoko',
    dueDate: '2024-02-15T23:59:00',
    maxPoints: 100,
    submissionCount: 24,
    averageGrade: 85,
    status: 'active',
    createdAt: '2024-01-20T10:00:00',
    attachments: ['quiz_questions.pdf', 'reference_material.docx']
  },
  {
    id: 'a2',
    title: 'Physics Lab Report - Motion',
    description: 'Write a comprehensive lab report on the motion experiment conducted in class.',
    subject: 'Physics',
    teacherId: 'teacher-1',
    teacherName: 'Brian Odoyo',
    dueDate: '2024-02-20T23:59:00',
    maxPoints: 50,
    submissionCount: 18,
    averageGrade: 78,
    status: 'active',
    createdAt: '2024-01-25T14:30:00'
  },
  {
    id: 'a3',
    title: 'Essay: Modern Literature',
    description: 'Analyze the themes in modern American literature with specific examples.',
    subject: 'English Language',
    teacherId: 'teacher-2',
    teacherName: 'Caleb Odhiambo',
    dueDate: '2024-02-10T23:59:00',
    maxPoints: 100,
    submissionCount: 32,
    averageGrade: 92,
    status: 'completed',
    createdAt: '2024-01-15T09:15:00',
    attachments: ['essay_rubric.pdf']
  },
  {
    id: 'a4',
    title: 'Cell Biology Research Paper',
    description: 'Research and write about recent advancements in cell biology.',
    subject: 'Biology',
    teacherId: 'teacher-2',
    teacherName: 'Kenney Odoyo',
    dueDate: '2024-03-01T23:59:00',
    maxPoints: 100,
    submissionCount: 15,
    averageGrade: 81,
    status: 'active',
    createdAt: '2024-02-01T11:45:00'
  },
  {
    id: 'a5',
    title: 'Chemical Reactions Worksheet',
    description: 'Complete the worksheet on chemical reactions and balancing equations.',
    subject: 'Chemistry',
    teacherId: 'teacher-2',
    teacherName: 'Kennedy Odoyo',
    dueDate: '2024-02-08T23:59:00',
    maxPoints: 30,
    submissionCount: 28,
    status: 'active',
    createdAt: '2024-01-28T16:20:00'
  }
];