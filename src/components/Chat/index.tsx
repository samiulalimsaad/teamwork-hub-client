import React, { FormEvent, useEffect, useRef, useState } from "react";
import { UserInterface } from "../../interfaces/User.interface";
import {
    useAddChat,
    useFetchChatByDocumentId,
} from "../../services/hooks/chat";
import { SOCKET } from "../../utils/SOCKET";
import Error from "../../utils/ui/Error";
import ChatBubble from "./ChatBubble";

interface ChatProps {
    documentId: string;
}

const Chat: React.FC<ChatProps> = ({ documentId }) => {
    const { data: chats, refetch } = useFetchChatByDocumentId(documentId);
    const addFeedback = useAddChat();

    const [error, setError] = useState("");
    const [newParticipant, setNewParticipant] = useState<UserInterface>();

    const ref = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
    }, []);

    useEffect(() => {
        SOCKET.on(`document-${documentId}`, (data: { user: UserInterface }) => {
            console.log({ data });

            setNewParticipant(data.user);
        });
        SOCKET.on(`messageReceived-${documentId}`, async () => {
            setNewParticipant(undefined);
            await refetch();

            setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: "smooth" });
            }, 500);
        });

        return () => {
            SOCKET.off(`messageReceived-${documentId}`);
        };
    }, [documentId, refetch]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const feedbackData = {
            content: form.message.value,
            document: documentId,
        };
        if (!feedbackData.content) return setError("Feedback is required");

        addFeedback.mutate(feedbackData);
        setTimeout(() => {
            SOCKET.emit("newMessage", { ...feedbackData, _id: documentId });
            form.reset();
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
    };

    return (
        <div className="relative h-full">
            <ul className="p-2 overflow-y-scroll h-[80vh]">
                {chats?.data?.map((fb) => (
                    <li key={fb._id}>
                        <ChatBubble feedback={fb} />
                    </li>
                ))}

                {newParticipant?._id && (
                    <li className="text-xs text-center opacity-25 select-none">
                        {newParticipant.name} joined the discussion
                    </li>
                )}
                <li ref={ref}></li>
            </ul>
            <div className="mt-auto bg-white">
                {error && <Error error={error} />}
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="message"
                        placeholder="write a message..."
                        className="w-full textarea textarea-bordered"
                        required
                    />
                    <button className="w-full btn btn-accent" type="submit">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
