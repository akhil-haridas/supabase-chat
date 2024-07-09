import React, { useEffect, useState } from "react";
import { supabaseClient } from "../../supabase/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface UserProps {
    user: {
        name: string;
        picture: string;
    };
    userId: any;
}

const User: React.FC<UserProps> = ({ user, userId }) => {

    const [isTyping, setisTyping] = useState(false);

    useEffect(() => {
        const typingChannel = supabaseClient.channel("user_typing");
        typingChannel.on("broadcast", { event: "USER_TYPING" }, async (payload) => {
            if (payload.payload.user_id === userId && payload.payload.typing) setisTyping(true);
            else setisTyping(false);
        });

        return () => {
            typingChannel.unsubscribe();
        };
    }, []);

    return (
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img
                    src={user.picture}
                    alt="User Avatar"
                    className="h-full w-full rounded-full"
                />
            </div>
            {isTyping ? (
                <FontAwesomeIcon icon={faEllipsis} fade size="2x" className="ml-4" />
            ) : (
                <div className="ml-2 text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-left w-36">
                    {user.name}
                </div>
            )}

            <div className="flex items-center justify-center ml-auto text-xs text-white bg-green-500 hover:bg-green-700 h-3 w-3 rounded-full leading-none">
                {/* {true && 2} */}
            </div>
        </button>
    );
};

export default User;
