import React from "react";

interface ContentProps {
    currentUser: boolean;
    content: {
        message: string;
        created_at: string;
        user: any;
    };
}

const Content: React.FC<ContentProps> = ({ currentUser, content }) => {
    console.log(content);

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

                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div className="absolute text-xs -top-1 right-0 -mt-4 font-bold mr-2 text-gray-500">
                                {content?.user?.name}
                            </div>
                            <div>{content.message}</div>
                            <div className="absolute text-xs bottom-0 min-w-44  -mb-5 mr-2 text-gray-500">
                                {formatTime(new Date(content.created_at))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
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
                            <div className="absolute text-xs -top-1 left-0 -mt-4 font-bold mr-2 text-gray-500">
                                {content?.user?.name}
                            </div>
                            <div>{content.message}</div>
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

export default Content;
