export interface User {
  id: string;
  name: string;
  email: string;
  password: string; 
  role: 'admin' | 'teacher' | 'student';
  assignedSubjects?: string[]; 
  enrolledSubjects?: string[]; 
  profilePic?: string;
  avatarColor?: string; 
}


export type SafeUser = Omit<User, 'password'>;

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@lms.com',
    password: 'admin123', 
    role: 'admin',
    profilePic: '/images/admin.jpg',
    avatarColor: '#3B82F6' 
  },
  {
    id: 'teacher-1',
    name: 'Mary Jaoko',
    email: 'sundie@lms.com',
    password: 'teacher123',
    role: 'teacher',
    assignedSubjects: ['Mathematics', 'Physics'],
    profilePic: '/images/sundie.jpg', 
    avatarColor: '#10B981' 
  },
 
  {
    id: 'teacher-2',
    name: 'Kennedy Odoyo',
    email: 'kennedy@lms.com',
    password: 'teacher123',
    role: 'teacher',
    assignedSubjects: ['Biology', 'Chemistry'],
    profilePic: '/images/kenato.jpg',
    avatarColor: '#F59E0B' // Amber
  },
     {
    id: 'teacher-3',
    name: 'Caleb Odhiambo',
    email: 'lebo@lms.com',
    password: 'teacher123',
    role: 'teacher',
    assignedSubjects: ['Mathematics', 'Physics'],
    profilePic: '/images/sundie.jpg', 
    avatarColor: '#10B981' 
  },
  {
    id: '1',
    name: 'Vidah Limaya',
    email: 'vida@lms.com',
    password: 'student123',
    role: 'student',
    enrolledSubjects: ['Mathematics', 'Biology'],
    profilePic: '/images/vida.jpg',
    avatarColor: '#EF4444' // Red
  },
  {
    id: '2',
    name: 'Bathseba Kerubo',
    email: 'kerubo@lms.com',
    password: 'student123',
    role: 'student',
    enrolledSubjects: ['English', 'Physics'],
    profilePic: '/images/kerubo.jpg',
    avatarColor: '#8B5CF6' // Purple
  },
];