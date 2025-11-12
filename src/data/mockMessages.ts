export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export const mockMessages: Message[] = [
  {
    id: 'm1',
    chatId: 'chat1',
    senderId: 'u2',
    content: 'Good morning everyone!',
    timestamp: '2025-10-30T08:00:00Z',
  },
  {
    id: 'm2',
    chatId: 'chat1',
    senderId: 'u4',
    content: 'Morning sir!',
    timestamp: '2025-10-30T08:01:00Z',
  },
  {
    id: 'm3',
    chatId: 'chat1',
    senderId: 'u5',
    content: 'Ready for today’s physics session!',
    timestamp: '2025-10-30T08:02:30Z',
  },
];
