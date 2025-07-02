
import React from 'react';
import type { User, Transaction, ScheduledSession } from '../types';
import { ClockIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, CalendarDaysIcon } from './icons/Icons';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  sessions: ScheduledSession[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
      <div className="bg-primary/10 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-neutral">{value}</p>
      </div>
    </div>
);

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-4">
        <img src={transaction.withUser.avatarUrl} alt={transaction.withUser.name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="font-medium text-gray-800">{transaction.description}</p>
          <p className="text-sm text-gray-500">With {transaction.withUser.name}</p>
        </div>
      </div>
      <div className={`text-right ${transaction.type === 'earn' ? 'text-success' : 'text-error'}`}>
        <p className="font-bold">{transaction.type === 'earn' ? '+' : '-'}{transaction.amount.toFixed(1)}</p>
        <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
      </div>
    </li>
);

const SessionItem: React.FC<{ session: ScheduledSession }> = ({ session }) => (
    <li className="flex items-start space-x-4 py-3">
        <div className="bg-secondary/10 p-2 rounded-full mt-1">
            <CalendarDaysIcon className="h-5 w-5 text-secondary" />
        </div>
        <div>
            <p className="font-medium text-gray-800">{session.title}</p>
            <p className="text-sm text-gray-500">With {session.withUser.name}</p>
            <p className="text-sm text-gray-500">{new Date(session.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
        </div>
    </li>
);

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, sessions }) => {
  const totalEarned = transactions.filter(t => t.type === 'earn').reduce((sum, t) => sum + t.amount, 0);
  const totalSpent = transactions.filter(t => t.type === 'spend').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-500 mt-1">Here's your TimeBridge summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Available Credits" value={user.timeCredits.toFixed(1)} icon={<ClockIcon className="h-6 w-6 text-primary"/>} />
        <StatCard title="Total Earned" value={totalEarned.toFixed(1)} icon={<ArrowUpCircleIcon className="h-6 w-6 text-success"/>} />
        <StatCard title="Total Spent" value={totalSpent.toFixed(1)} icon={<ArrowDownCircleIcon className="h-6 w-6 text-error"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-neutral mb-4">Transaction History</h2>
          <ul className="divide-y divide-gray-200">
            {transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-neutral mb-4">Upcoming Sessions</h2>
           <ul className="divide-y divide-gray-200">
            {sessions.length > 0 ? sessions.map(s => <SessionItem key={s.id} session={s} />) : <p className="text-gray-500">No upcoming sessions scheduled.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
