
import React from 'react';
import type { User } from '../types';
import { ChatBubbleLeftEllipsisIcon, CheckBadgeIcon } from './icons/Icons';

interface UserProfileCardProps {
  user: User;
}

const SkillTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">
        {children}
    </span>
);


const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <div className="relative">
        <img className="w-full h-32 object-cover" src={`https://picsum.photos/seed/${user.id}/400/200`} alt="Profile background" />
        <img className="w-24 h-24 rounded-full object-cover absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-white shadow-md" src={user.avatarUrl} alt={user.name} />
        {user.isVerified && <CheckBadgeIcon className="h-7 w-7 text-primary absolute top-2 right-2 bg-white rounded-full p-1" />}
      </div>
      
      <div className="pt-14 px-6 pb-6 text-center flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-neutral">{user.name}</h3>
        <p className="text-gray-500 text-sm mt-1 flex-grow">{user.bio}</p>
        
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">Offers</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {user.skillsOffered.slice(0, 3).map(skill => (
              <SkillTag key={skill.id}>{skill.name}</SkillTag>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full bg-primary text-primary-content font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-focus transition-colors">
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5"/>
          <span>Request Service</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
