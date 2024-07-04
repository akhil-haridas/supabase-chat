import { Suspense, useEffect, useState, useRef } from "react";
import { TextContent } from "./utils";
import { Loading } from "../pages";
import { supabaseClient } from "../supabase/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

const ChatMessages = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { id } = useSelector((state: RootState) => state.user.userData);
    const users = useSelector((state: RootState) => state.user.usersData);

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

    useEffect(() => {
        const channel = supabaseClient
            .channel("chat-room")
            .on(
                'postgres_changes',
                { event: "INSERT", table: "messages" },
                (payload: any) => {
                    let message = payload?.new;
                    const sentBy = users[payload?.new?.from]?.user_metadata;
                    message.user = sentBy;
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
    }, [messages]);

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        {messages.map((msg: any) => (
                            <TextContent
                                key={msg.id}
                                currentUser={msg.from === id}
                                content={msg}
                            />
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default ChatMessages;
