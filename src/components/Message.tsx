import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "../supabase/supabaseClient";

import Picker from "@emoji-mart/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { storeFile } from "../context/slices/userSlice";

const Message = () => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { id } = useSelector((state: RootState) => state.user.userData);

    const fileInputRef = useRef<any>(null);
    const dispatch = useDispatch();

    const sendMessage = async (e: any) => {
        e.preventDefault();
        if (message.trim() === "") return;
        const { error } = await supabaseClient.from("messages").insert({ message, is_file: false });
        setMessage("");
        setIsTyping(false);
        if (error) console.log("error:", error);
    };

    const handleEmojiSelect = (emoji: any) => {
        setMessage((prevMessage) => prevMessage + emoji.native);
        setShowEmojiPicker(false);
    };

    const handleKeyDown = async (e: any) => {
        if (e.key === "Enter") {
            await sendMessage(e);
        } else {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            dispatch(storeFile(file));
        }
    };

    useEffect(() => {
        const updateTypingStatus = async () => {
            const typingChannel = supabaseClient.channel('user_typing');
            typingChannel.subscribe();

            const notifyTyping = (typing: boolean) => {
                typingChannel.send({
                    type: 'broadcast',
                    event: 'USER_TYPING',
                    payload: { user_id: id, typing },
                });
            };
            notifyTyping(isTyping);

            return () => {
                typingChannel.unsubscribe();
            };
        };

        updateTypingStatus();
    }, [isTyping]);

    return (
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600" onClick={handleButtonClick}>
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                    </svg>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </button>
                    {showEmojiPicker && (
                        <div className="absolute z-10 bottom-full right-0 mb-4">
                            <Picker
                                onEmojiSelect={handleEmojiSelect}
                                previewPosition="none"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-4">
                <button
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    type="button"
                    onClick={sendMessage}
                >
                    <span>Send</span>
                    <span className="ml-2">
                        <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Message;
