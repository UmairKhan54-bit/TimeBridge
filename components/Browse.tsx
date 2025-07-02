
import React, { useState, useCallback, useEffect } from 'react';
import type { User } from '../types';
import UserProfileCard from './UserProfileCard';
import { generateSampleUsers } from '../services/geminiService';
import { SparklesIcon, MagnifyingGlassIcon } from './icons/Icons';

const initialUsers: User[] = [
    { id: 'user_002', name: 'Jane Smith', email: 'jane.smith@example.com', avatarUrl: 'https://picsum.photos/seed/janesmith/200', bio: 'Graphic designer and illustrator. I love bringing ideas to life with color and shape.', skillsOffered: [{id: 'graphic-design', name: 'Graphic Design'}, {id: 'illustration', name: 'Illustration'}], skillsNeeded: [{id: 'copywriting', name: 'Copywriting'}], timeCredits: 12, isVerified: true},
    { id: 'user_003', name: 'Carlos Ray', email: 'carlos.ray@example.com', avatarUrl: 'https://picsum.photos/seed/carlosray/200', bio: 'Musician and guitar teacher. Let\'s jam!', skillsOffered: [{id: 'guitar-lessons', name: 'Guitar Lessons'}], skillsNeeded: [{id: 'video-editing', name: 'Video Editing'}], timeCredits: 30, isVerified: false},
    { id: 'user_004', name: 'Priya Patel', email: 'priya.patel@example.com', avatarUrl: 'https://picsum.photos/seed/priyapatel/200', bio: 'Professional organizer and home chef. I can help you declutter your life and your kitchen.', skillsOffered: [{id: 'home-organizing', name: 'Home Organizing'}, {id: 'meal-prep', name: 'Meal Prep'}], skillsNeeded: [{id: 'gardening', name: 'Gardening Help'}], timeCredits: 8.5, isVerified: true},
];


const Browse: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleGenerateUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newUsers = await generateSampleUsers();
            setUsers(prevUsers => [...prevUsers, ...newUsers]);
        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-neutral">Browse Community</h1>
                <p className="text-gray-500 mt-1">Find members to exchange services with.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                    <input 
                        type="text"
                        placeholder="Search by name or skill..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                 <button 
                    onClick={handleGenerateUsers}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-content font-semibold rounded-lg shadow-md hover:bg-secondary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="h-5 w-5"/>
                            Generate Sample Users with AI
                        </>
                    )}
                </button>
            </div>
            {error && <div className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.map(user => (
                    <UserProfileCard key={user.id} user={user} />
                ))}
            </div>
             {filteredUsers.length === 0 && !isLoading && (
                <div className="text-center py-12 col-span-full">
                    <p className="text-gray-500">No users found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}

export default Browse;
