
import React, { useState, useRef, useEffect } from 'react';
import type { User, Page } from '../types';
import { Page as PageEnum } from '../types';
import { ClockIcon, UsersIcon, UserCircleIcon, ChatBubbleLeftRightIcon, ArrowRightOnRectangleIcon } from './icons/Icons';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-primary-content'
        : 'text-neutral hover:bg-base-300'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);


const Header: React.FC<HeaderProps> = ({ user, onLogout, currentPage, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary tracking-tighter">TimeBridge</span>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <NavItem label="Dashboard" icon={<ClockIcon className="h-5 w-5"/>} isActive={currentPage === PageEnum.Dashboard} onClick={() => onNavigate(PageEnum.Dashboard)} />
              <NavItem label="Browse" icon={<UsersIcon className="h-5 w-5"/>} isActive={currentPage === PageEnum.Browse} onClick={() => onNavigate(PageEnum.Browse)} />
              <NavItem label="Chat" icon={<ChatBubbleLeftRightIcon className="h-5 w-5"/>} isActive={currentPage === PageEnum.Chat} onClick={() => onNavigate(PageEnum.Chat)} />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-teal-50 text-primary px-3 py-1.5 rounded-full">
              <ClockIcon className="h-5 w-5"/>
              <span className="font-bold text-sm">{user.timeCredits} Credits</span>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <img className="h-9 w-9 rounded-full object-cover" src={user.avatarUrl} alt="User avatar" />
              </button>
              {menuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate(PageEnum.Profile); setMenuOpen(false); }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-3" />
                    My Profile
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onLogout(); setMenuOpen(false); }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
