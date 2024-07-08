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
                <section className="col-start-9 col-end-13 p-3 rounded-lg">
                    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                        <div className="px-4 py-6">
                            <div
                                id="image-preview"
                                className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                            >
                                <img
                                    src={imageUrl}
                                    className="max-h-48 rounded-lg mx-auto"
                                    alt="Image preview"
                                    onClick={() => document.getElementById("upload")?.click()}
                                />
                            </div>
                            <div className="flex justify-between items-center bottom-0 min-w-44  -mb-3 mr-2 ">
                                <div className="flex flex-row items-center justify-start gap-2 w-3/4">
                                    <img
                                        src={content?.user?.picture}
                                        alt="A"
                                        className="h-6 w-6 rounded-full"
                                    />
                                    <span className="text-xs text-gray-500 font-bold">
                                        {content?.user?.name}
                                    </span>
                                </div>

                                <span className="text-xs text-gray-500 w-1/4">
                                    {formatTime(new Date(content.created_at))}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="col-start-1 col-end-5 p-3 rounded-lg">
                    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                        <div className="px-4 py-6">
                            <div
                                id="image-preview"
                                className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                            >
                                <img
                                    src={imageUrl}
                                    className="max-h-48 rounded-lg mx-auto"
                                    alt="Image preview"
                                    onClick={() => document.getElementById("upload")?.click()}
                                />
                            </div>
                            <div className="flex justify-between items-center bottom-0 min-w-44  -mb-3 mr-2 ">
                                <div className="flex flex-row items-center justify-start gap-2 w-3/4">
                                    <img
                                        src={content?.user?.picture}
                                        alt="A"
                                        className="h-6 w-6 rounded-full"
                                    />
                                    <span className="text-xs text-gray-500 font-bold">
                                        {content?.user?.name}
                                    </span>
                                </div>

                                <span className="text-xs text-gray-500 w-1/4">
                                    {formatTime(new Date(content.created_at))}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default FileContent;
