import React from "react";

interface ContentProps {
    currentUser: boolean;
    content: {
        message: string;
        created_at: string;
    };
}

const Content: React.FC<ContentProps> = ({ currentUser, content }) => {
    console.log(content);

    return (
        <>
            {currentUser ? (
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{content.message}</div>
                            <div className="absolute text-xs bottom-0  -mb-5 mr-2 text-gray-500">
                                10.00pm
                            </div>
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                Seen
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{content.message}</div>
                            <div className="absolute text-xs bottom-0  -mb-5 mr-2 text-gray-500">
                                10.00pm
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Content;
