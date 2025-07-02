
export interface Skill {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  skillsOffered: Skill[];
  skillsNeeded: Skill[];
  timeCredits: number;
  isVerified?: boolean;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  date: string;
  withUser: Pick<User, 'id' | 'name' | 'avatarUrl'>;
}

export interface ScheduledSession {
  id: string;
  title: string;
  withUser: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  dateTime: string;
}

export enum Page {
  Dashboard = 'DASHBOARD',
  Browse = 'BROWSE',
  Profile = 'PROFILE',
  Chat = 'CHAT',
}
