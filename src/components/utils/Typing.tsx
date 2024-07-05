import React from 'react'

interface UserProps {
    user: {
        name: string;
        picture: string;
        message:string;
    };
}

const Typing: React.FC<UserProps> =  ({ user }) => {
    console.log("USER ::",user)
    return (
        <div className="col-start-1 col-end-8 p-6 rounded-lg">
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    <img
                        src={user?.picture}
                        alt="A"
                        className="h-full w-full rounded-full"
                    />

                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div className="absolute text-xs -top-1 left-0 min-w-500 -mt-4 font-bold mr-2 text-gray-500">
                        {user?.name}
                    </div>
                    <div>{user?.message}</div>
                    <div className="absolute text-xs bottom-0 min-w-44  -mb-5 mr-2 text-gray-500">
                        {/* {formatTime(new Date(content.created_at))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Typing