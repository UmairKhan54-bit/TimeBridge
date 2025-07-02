
import React from 'react';
import type { User } from '../types';
import { PaperAirplaneIcon } from './icons/Icons';

interface ChatProps {
    currentUser: User;
}

const contacts = [
    { id: 'user_002', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/janesmith/200', lastMessage: 'Sure, I can help with that!', unread: 2 },
    { id: 'user_003', name: 'Carlos Ray', avatarUrl: 'https://picsum.photos/seed/carlosray/200', lastMessage: 'Awesome, see you then.', unread: 0 },
    { id: 'user_004', name: 'Priya Patel', avatarUrl: 'https://picsum.photos/seed/priyapatel/200', lastMessage: 'Thanks for the help today!', unread: 0 },
    { id: 'user_005', name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/emilywhite/200', lastMessage: 'Are you available next week?', unread: 1 },
];

const messages = [
    { id: 'msg1', senderId: 'user_002', text: 'Hey Alex! I saw you need help with Graphic Design. I\'d be happy to offer my skills.', timestamp: '10:30 AM' },
    { id: 'msg2', senderId: 'user_001', text: 'Hi Jane! That would be amazing. I\'m working on a personal project and need a simple logo.', timestamp: '10:31 AM' },
    { id: 'msg3', senderId: 'user_002', text: 'Sounds fun! We can schedule a 1-hour session to discuss. That would be 1 Time Credit.', timestamp: '10:32 AM' },
    { id: 'msg4', senderId: 'user_001', text: 'Perfect, that works for me. When are you free?', timestamp: '10:33 AM' },
];

const Chat: React.FC<ChatProps> = ({ currentUser }) => {
    const [activeContact, setActiveContact] = React.useState(contacts[0]);

    return (
        <div className="h-[calc(100vh-10rem)] flex bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Contacts List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-neutral">Messages</h2>
                </div>
                <ul className="overflow-y-auto">
                    {contacts.map(contact => (
                        <li key={contact.id} 
                            onClick={() => setActiveContact(contact)}
                            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${activeContact.id === contact.id ? 'bg-teal-50' : ''}`}
                        >
                            <img src={contact.avatarUrl} alt={contact.name} className="h-12 w-12 rounded-full object-cover"/>
                            <div className="ml-4 flex-grow">
                                <p className="font-semibold text-gray-800">{contact.name}</p>
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && (
                                <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{contact.unread}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
                {activeContact ? (
                    <>
                        <div className="p-4 border-b flex items-center space-x-4 bg-gray-50">
                            <img src={activeContact.avatarUrl} alt={activeContact.name} className="h-12 w-12 rounded-full object-cover"/>
                            <div>
                                <h3 className="text-lg font-bold text-neutral">{activeContact.name}</h3>
                                <p className="text-sm text-green-500">Online</p>
                            </div>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto bg-gray-100 space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-primary text-white' : 'bg-white shadow-sm'}`}>
                                        <p>{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.senderId === currentUser.id ? 'text-teal-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-white border-t">
                            <div className="relative">
                                <input type="text" placeholder="Type a message..." className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-primary focus:border-primary"/>
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-full text-white hover:bg-primary-focus">
                                    <PaperAirplaneIcon className="h-6 w-6"/>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                     <div className="flex-grow flex items-center justify-center text-gray-500">
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
