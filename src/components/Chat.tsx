import React from 'react'
import { TextContent, VoiceContent } from './utils';

const ChatMessages = () => {
    return (
        <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                    <TextContent currentUser={false} />
                    <TextContent currentUser={true} />
                    <VoiceContent/>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;