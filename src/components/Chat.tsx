import React, { Suspense, useEffect, useState, useRef } from "react";
import { FileContent, FileUpload, TextContent, Typing } from "./utils";
import { Loading } from "../pages";
import { supabaseClient } from "../supabase/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { supabaseAdmin } from "../supabase/supabaseAdmin";
import { format, isToday, isYesterday, parseISO } from 'date-fns';

const ChatMessages = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [typingUsers, setTypingUsers] = useState<any>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { id } = useSelector((state: RootState) => state.user.userData);
    const users = useSelector((state: RootState) => state.user.usersData);
    const storedFile = useSelector((state: RootState) => state.user.file);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getMessages = async () => {
        try {
            const { data, error } = await supabaseClient.from("messages").select("*");

            if (error) throw new Error("Error fetching messages");

            const userMap = users.reduce((map: any, user: any) => {
                map[user.id] = user;
                return map;
            }, {});

            const messagesWithUsers = data.map((msg: any) => ({
                ...msg,
                user: userMap[msg.from]?.user_metadata,
            }));

            setMessages(messagesWithUsers);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        getMessages();
    }, [users]);

    const getUserById = async (userId: string): Promise<any> => {
        try {
            const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(userId)
            if (error) throw new Error("Error fetching user");
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const channel = supabaseClient
            .channel("chat-room")
            .on(
                'postgres_changes',
                { event: "INSERT", schema: "public", table: 'messages' },
                async (payload: any) => {
                    let message = payload?.new;
                    const sentBy = await getUserById(payload?.new?.from);
                    message.user = sentBy?.user_metadata;
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, storedFile]);

    useEffect(() => {
        const channel = supabaseClient
            .channel("chat-room1")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "typing" },
                async (payload: any) => {
                    if (payload.new.user_id !== id) {
                        const user = await getUserById(payload?.new?.user_id);
                        setTypingUsers((prevTypingUsers: any[]) => {
                            const newTypingUsers = new Set(prevTypingUsers.map((u) => u.id));

                            if (payload?.new?.is_typing) {
                                if (!newTypingUsers.has(user.id)) {
                                    return [...prevTypingUsers, user];
                                }
                            } else {
                                return prevTypingUsers.filter((preUser: any) => preUser.id !== user.id);
                            }
                        });
                        scrollToBottom();
                    }
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const groupMessagesByDate = (messages: any[]) => {
        const groupedMessages: { [key: string]: any[] } = {};
        messages.forEach((msg) => {
            const date = format(parseISO(msg.created_at), 'yyyy-MM-dd');
            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }
            groupedMessages[date].push(msg);
        });
        return groupedMessages;
    };

    const renderDateHeader = (date: string) => {
        const parsedDate = parseISO(date);
        if (isToday(parsedDate)) {
            return "Today";
        } else if (isYesterday(parsedDate)) {
            return "Yesterday";
        } else {
            return format(parsedDate, 'MMMM dd, yyyy');
        }
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col h-full overflow-x-hidden mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        {Object.keys(groupedMessages).map((date) => (
                            <React.Fragment key={date}>
                                <div className="col-span-12 text-center text-gray-500 my-2">
                                    {renderDateHeader(date)}
                                </div>
                                {groupedMessages[date].map((msg: any) =>
                                    msg.is_file ? (
                                        <FileContent
                                            key={msg.id}
                                            currentUser={msg.from === id}
                                            content={msg} />
                                    ) : (
                                        <TextContent
                                            key={msg.id}
                                            currentUser={msg.from === id}
                                            content={msg}
                                        />
                                    )
                                )}
                            </React.Fragment>
                        ))}
                        {storedFile && <FileUpload file={storedFile} />}
                        {typingUsers?.length > 0 && typingUsers.map((user: any) => (
                            <Typing key={user.id} user={user?.user_metadata} />
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default ChatMessages;
