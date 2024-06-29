import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FeedbackInterface } from "../interfaces/Feedback.interface";
import { useAddChat, useFetchChatByDocumentId } from "../services/hooks/chat";
import { SOCKET } from "../utils/SOCKET";
import Error from "../utils/ui/Error";
import ChatBubble from "./ChatBubble";

interface ChatProps {
    documentId: string;
}

const Chat: React.FC<ChatProps> = ({ documentId }) => {
    const { data: chats, refetch } = useFetchChatByDocumentId(documentId);
    const addFeedback = useAddChat();
    const [error, setError] = useState("");
    const ref = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
    }, []);

    useEffect(() => {
        SOCKET.emit("joinDocument", { documentId });

        SOCKET.on("messageReceived", async (data: FeedbackInterface) => {
            if (data._id === documentId) {
                await refetch();
                setTimeout(() => {
                    ref.current?.scrollIntoView({ behavior: "smooth" });
                }, 500);
            }
        });

        return () => {
            SOCKET.emit("leaveDocument", { documentId });
            SOCKET.off("messageReceived");
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
            <ul className="p-2 overflow-y-scroll h-[calc(80vh-5rem)]">
                {chats?.data?.map((fb) => (
                    <li key={fb._id}>
                        <ChatBubble feedback={fb} />
                    </li>
                ))}
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
