import React from 'react';
import { AppLogo, ChatMessages, Users, Profile, Message } from '../components';

interface ChatPageProps {
    user: any;
}

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    <AppLogo />
                    <Profile user={user}/>
                    <Users />
                </div>
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                        <ChatMessages />
                        <Message />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
