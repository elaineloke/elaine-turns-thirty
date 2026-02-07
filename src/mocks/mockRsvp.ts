import type { RsvpRecord } from '../pages/AdminPage';

export const MOCK_RSVPS: RsvpRecord[] = [
  {
    id: 1,
    name: 'John Doe',
    attending: 'Yes',
    message: 'Can’t wait!',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    attending: 'Maybe',
    message: 'Sounds fun 🎉',
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Alex Tan',
    attending: 'No',
    message: 'Out of town 😢',
    created_at: new Date().toISOString(),
  },
];
