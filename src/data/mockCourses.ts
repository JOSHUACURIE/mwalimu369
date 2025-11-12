export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  students: string[];
  lessonsCount: number;
  thumbnail: string;
}

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Mathematics',
    description: 'Learn algebra, geometry, and trigonometry fundamentals.',
    teacherId: 'teacher-1',
    students: ['u4'],
    lessonsCount: 12,
    thumbnail: '/images/maths.webp',
  },
  {
    id: 'c2',
    title: 'English Language',
    description: 'Master grammar, comprehension, and essay writing.',
    teacherId: 'teacher-2',
    students: ['u4', 'u5'],
    lessonsCount: 10,
    thumbnail: '/images/english.webp',
  },
  {
    id: 'c3',
    title: 'Physics',
    description: 'Explore motion, forces, energy, and waves.',
    teacherId: 'teacher-3',
    students: ['u5'],
    lessonsCount: 8,
    thumbnail: '/images/physics.webp',
  },
];
