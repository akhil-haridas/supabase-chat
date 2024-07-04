import React from "react";

interface UserProps {
    user: {
        name: string;
        picture: string;
    };
}

const User: React.FC<UserProps> = ({ user }) => {
    return (
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img
                    src={user.picture}
                    alt="User Avatar"
                    className="h-full w-full rounded-full"
                />
            </div>
            <div className="ml-2 text-sm font-semibold">{user.name}</div>
            <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                {true && 2}
            </div>
        </button>
    );
};

export default User;
