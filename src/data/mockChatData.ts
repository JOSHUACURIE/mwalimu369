import { type SafeUser } from './mockUsers';

export interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'file' | 'image'; // Added type property
  file?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

export interface ConversationUser extends SafeUser {
  online: boolean;
  lastSeen?: Date;
}

export const mockUsers: ConversationUser[] = [
  {
    id: '1',
    name: 'Dr. Mary Jaoko',
    email: 'mary@lms.com',
    role: 'teacher',
    profilePic: '/images/kenato.jpg',
    online: true,
    lastSeen: new Date()
  },
  {
    id: '2',
    name: 'Prof. Nimrod Osinde',
    email: 'osinde@lms.com',
    role: 'teacher',
    profilePic: '/images/kenato.jpg',
    online: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000) 
  },
  {
    id: '3',
    name: 'Admin Support',
    email: 'admin@lms.com',
    role: 'admin',
    profilePic: '/images/admin.jpg',
    online: true,
    lastSeen: new Date()
  }
];

export const mockMessages: Message[] = [
  {
    id: 1,
    senderId: '1',
    receiverId: 'student-1',
    text: 'Hello! How can I help you with the assignment?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    type: 'text' // Added
  },
  {
    id: 2,
    senderId: 'student-1',
    receiverId: '1',
    text: 'Hi Dr. Johnson, I have a question about question 3.',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    read: true,
    type: 'text' // Added
  },
  {
    id: 3,
    senderId: '1',
    receiverId: 'student-1',
    text: 'Sure! What specific part are you having trouble with?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    read: true,
    type: 'text' // Added
  },
  {
    id: 4,
    senderId: '3',
    receiverId: 'student-1',
    text: 'Your account has been successfully updated.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    type: 'text' // Added
  }
];