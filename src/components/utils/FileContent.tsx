import React from "react";

interface ContentProps {
    currentUser: boolean;
    content: {
        message: string;
        created_at: string;
        user: any;
        is_file: any;
    };
}

const FileContent: React.FC<ContentProps> = ({ currentUser, content }) => {
    const messageData = JSON.parse(content.message);
    const imageUrl = messageData.publicUrl;

    console.log(currentUser, content);
    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes
            } ${ampm}`;
        return formattedTime;
    };

    return (
        <>
            {currentUser ? (
                <div className="col-start-6 col-end-13 p-6 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            <img
                                src={content?.user?.picture}
                                alt="A"
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div className="absolute text-xs -top-1 right-0 min-w-500 flex justify-end -mt-4 font-bold mr-2 text-gray-500">
                                {content?.user?.name}
                            </div>
                            <div
                                id="image-preview"
                                className="max-w-sm p-6 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                            >
                                <img
                                    src={imageUrl}
                                    className="max-h-48 rounded-lg mx-auto"
                                    alt="Image preview"
                                    onClick={() => document.getElementById("upload")?.click()}
                                />
                            </div>
                            <div className="absolute text-xs bottom-0 min-w-44  -mb-5 mr-2 text-gray-500">
                                {formatTime(new Date(content.created_at))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-start-1 col-end-8 p-6 rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {content?.user?.picture ? (
                                <img
                                    src={content?.user?.picture}
                                    alt="A"
                                    className="h-full w-full rounded-full"
                                />
                            ) : (
                                "A"
                            )}
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div className="absolute text-xs -top-1 left-0 min-w-500 -mt-4 font-bold mr-2 text-gray-500">
                                {content?.user?.name}
                            </div>
                            <div
                                id="image-preview"
                                className="max-w-sm p-6 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                            >
                                <img
                                    src={imageUrl}
                                    className="max-h-48 rounded-lg mx-auto"
                                    alt="Image preview"
                                    onClick={() => document.getElementById("upload")?.click()}
                                />
                            </div>
                            <div className="absolute text-xs bottom-0 min-w-44  -mb-5 mr-2 text-gray-500">
                                {formatTime(new Date(content.created_at))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FileContent;
