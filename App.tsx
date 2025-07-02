
import React, { useState, useCallback, useMemo } from 'react';
import type { User, Transaction, ScheduledSession, Page } from './types';
import { Page as PageEnum } from './types';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Chat from './components/Chat';

// Mock Data
const MOCK_USER: User = {
  id: 'user_001',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/alexdoe/200',
  bio: 'Full-stack developer with a passion for building beautiful and functional web applications. In my free time, I love to bake sourdough bread and explore hiking trails.',
  skillsOffered: [
    { id: 'react-dev', name: 'React Development' },
    { id: 'sourdough-baking', name: 'Sourdough Baking' },
    { id: 'copywriting', name: 'Copywriting' },
  ],
  skillsNeeded: [
    { id: 'graphic-design', name: 'Graphic Design' },
    { id: 'yoga-instruction', name: 'Yoga Instruction' },
  ],
  timeCredits: 25.5,
  isVerified: true,
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'txn_1', type: 'earn', amount: 2, description: 'Website consultation', date: '2024-07-20', withUser: { id: 'user_002', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/janesmith/200' }},
  { id: 'txn_2', type: 'spend', amount: 1, description: 'Guitar lesson', date: '2024-07-18', withUser: { id: 'user_003', name: 'Carlos Ray', avatarUrl: 'https://picsum.photos/seed/carlosray/200' }},
  { id: 'txn_3', type: 'earn', amount: 3, description: 'Helped move furniture', date: '2024-07-15', withUser: { id: 'user_004', name: 'Priya Patel', avatarUrl: 'https://picsum.photos/seed/priyapatel/200' }},
];

const MOCK_SESSIONS: ScheduledSession[] = [
  { id: 'ses_1', title: 'Graphic design session', withUser: { id: 'user_005', name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/emilywhite/200' }, dateTime: '2024-07-28T14:00:00Z' },
  { id: 'ses_2', title: 'Yoga instruction', withUser: { id: 'user_006', name: 'Ben Carter', avatarUrl: 'https://picsum.photos/seed/bencarter/200' }, dateTime: '2024-08-02T10:00:00Z' },
];


export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(PageEnum.Dashboard);

  const handleLogin = useCallback(() => {
    setCurrentUser(MOCK_USER);
    setCurrentPage(PageEnum.Dashboard);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const renderPage = useMemo(() => {
    switch (currentPage) {
      case PageEnum.Dashboard:
        return <Dashboard user={currentUser!} transactions={MOCK_TRANSACTIONS} sessions={MOCK_SESSIONS} />;
      case PageEnum.Browse:
        return <Browse />;
      case PageEnum.Profile:
        return <Profile user={currentUser!} />;
      case PageEnum.Chat:
        return <Chat currentUser={currentUser!} />;
      default:
        return <Dashboard user={currentUser!} transactions={MOCK_TRANSACTIONS} sessions={MOCK_SESSIONS} />;
    }
  }, [currentPage, currentUser]);

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Header 
        user={currentUser} 
        onLogout={handleLogout} 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderPage}
      </main>
    </div>
  );
}
