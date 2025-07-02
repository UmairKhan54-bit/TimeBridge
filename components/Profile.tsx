
import React from 'react';
import type { User } from '../types';
import { CheckBadgeIcon, PencilIcon, BriefcaseIcon, LightBulbIcon } from './icons/Icons';

interface ProfileProps {
  user: User;
}

const SkillList: React.FC<{ title: string; skills: User['skillsOffered']; icon: React.ReactNode }> = ({ title, skills, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
                {icon}
                <h3 className="text-xl font-bold text-neutral">{title}</h3>
            </div>
            <button className="text-primary hover:text-primary-focus">
                <PencilIcon className="h-5 w-5"/>
            </button>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill.id} className="bg-base-200 text-neutral-focus px-3 py-1.5 rounded-full text-sm font-medium">
                    {skill.name}
                </span>
            ))}
        </div>
    </div>
);


const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="p-6 relative">
                <img src={user.avatarUrl} alt={user.name} className="h-32 w-32 rounded-full object-cover border-4 border-white -mt-20 shadow-lg"/>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <h1 className="text-3xl font-bold text-neutral">{user.name}</h1>
                            {user.isVerified && <CheckBadgeIcon className="h-7 w-7 text-primary" />}
                        </div>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                    <button className="mt-4 sm:mt-0 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-content font-semibold rounded-lg shadow-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                        <PencilIcon className="h-5 w-5" />
                        Edit Profile
                    </button>
                </div>
                <div className="mt-6 border-t pt-6">
                    <h2 className="text-lg font-semibold text-neutral">Bio</h2>
                    <p className="mt-2 text-gray-600">{user.bio}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkillList title="Skills I Offer" skills={user.skillsOffered} icon={<BriefcaseIcon className="h-6 w-6 text-primary" />}/>
            <SkillList title="Skills I Need" skills={user.skillsNeeded} icon={<LightBulbIcon className="h-6 w-6 text-secondary" />}/>
        </div>

    </div>
  );
};

export default Profile;
