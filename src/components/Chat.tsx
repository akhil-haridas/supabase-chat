import { Suspense, useEffect } from "react";
import { TextContent, VoiceContent } from "./utils";
import { Loading } from "../pages";
import { supabaseClient } from "../supabase/supabaseClient";

const ChatMessages = () => {
    useEffect(() => {
        const getMessages = async () => {
            const { data } = await supabaseClient.from("messages").select("*");
            console.log("DATA :", data);
        };
        getMessages();
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        <TextContent currentUser={false} />
                        <TextContent currentUser={true} />
                        <VoiceContent />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default ChatMessages;
