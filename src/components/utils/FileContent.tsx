import React from "react";

interface ContentProps {
    currentUser: boolean;
    content: {
        message: string;
        created_at: string;
        user: any;
        is_file: any;
        file_type: any;
    };
}

const FileContent: React.FC<ContentProps> = ({ currentUser, content }) => {
    const messageData = JSON.parse(content.message);
    const fileUrl = messageData.publicUrl;
    const fileType = content.file_type;

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
        return formattedTime;
    };


    const UserAvatar = ({ picture }: { picture: string }) => (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            <img src={picture} alt="Avatar" className="h-full w-full rounded-full" />
        </div>
    );

    const MessageBubble = ({ children, user, createdAt }: any) => (
        <div className={`relative text-sm ${currentUser ? "mr-3 bg-indigo-100" : 'ml-3 bg-white'} py-4 px-4 shadow rounded-xl`}>
            <div className={`absolute text-xs -top-1 ${currentUser ? "right-0 flex justify-end" : 'left-0'} min-w-500 -mt-4 font-bold mr-2 text-gray-500`}>
                {currentUser ? "You" : user?.name}
            </div>
            {children}
            <div className={`absolute text-xs bottom-0 ${currentUser ? "right-0 flex justify-end" : 'left-0'} min-w-44 -mb-5 mr-2 text-gray-500`}>
                {formatTime(new Date(createdAt))}
            </div>
        </div>
    );

    const ImagePreview = ({ url }: { url: string }) => (
        <div
            id="image-preview"
            className="max-w-sm bg-gray-10 rounded-lg items-center mx-auto"
        >
            <img src={url} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
        </div>
    );

    const VideoPreview = ({ url }: { url: string }) => (
        <div
            id="video-preview"
            className="max-w-sm p-6 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
        >
            <video src={url} className="max-h-48 rounded-lg mx-auto" controls />
        </div>
    );

    const OtherFilesPreview = () => (
        <div className="flex items-center justify-center">
            <button className="relative z-0 inline-block overflow-visible rounded-full bg-gradient-to-r from-[#f5ae4a] to-[#f76e54] text-white transition duration-300 focus:outline-none">
                <div className="relative flex items-center overflow-hidden rounded-full px-7 py-3 transition duration-125 hover:bg-opacity-10 active:bg-opacity-5">
                    <svg
                        className="mr-2 h-6 w-6"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M8 17l4 4 4-4" />
                        <path d="M12 12v9" />
                        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
                    </svg>
                    <span className="text-base">Download File</span>
                    <div className="absolute inset-0 transform -skew-x-12 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-750 hover:translate-x-full"></div>
                </div>
            </button>
        </div>
    );

    const renderFilePreview = () => {
        if (fileType.startsWith('image/')) {
            return <ImagePreview url={fileUrl} />;
        } else if (fileType.startsWith('video/')) {
            return <VideoPreview url={fileUrl} />;
        } else {
            return <OtherFilesPreview />;
        }
    };

    return (
        <div
            className={`col-start-${currentUser ? 6 : 1} col-end-${currentUser ? 13 : 8} p-6 rounded-lg`}
        >
            <div className={`flex ${currentUser ? "flex-row-reverse" : "flex-row"} items-center`}>
                <UserAvatar picture={content?.user?.picture} />
                <MessageBubble user={content.user} createdAt={content.created_at}>
                    {renderFilePreview()}
                </MessageBubble>
            </div>
        </div>
    );
};

export default FileContent;
