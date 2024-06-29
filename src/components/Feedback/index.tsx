import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FeedbackInterface } from "../../interfaces/Feedback.interface";
import {
    useAddFeedback,
    useFetchFeedbackByDocumentId,
} from "../../services/hooks/feedback";
import { SOCKET } from "../../utils/SOCKET";
import Error from "../../utils/ui/Error";
import FeedbackBubble from "./FeedbackBubble";

interface FeedbackProps {
    documentId: string;
}

const Feedback: React.FC<FeedbackProps> = ({ documentId }) => {
    const { data: feedback, refetch } =
        useFetchFeedbackByDocumentId(documentId);
    const addFeedback = useAddFeedback();
    const [error, setError] = useState("");
    const ref = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
    }, []);

    useEffect(() => {
        SOCKET.emit("joinDocument", { documentId });

        SOCKET.on("feedbackReceived", async (data: FeedbackInterface) => {
            if (data._id === documentId) {
                await refetch();
                setTimeout(() => {
                    ref.current?.scrollIntoView({ behavior: "smooth" });
                }, 500);
            }
        });

        return () => {
            SOCKET.emit("leaveDocument", { documentId });
            SOCKET.off("feedbackReceived");
        };
    }, [documentId, refetch]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const feedbackData = {
            content: form.feedback.value,
            document: documentId,
        };
        if (!feedbackData.content) return setError("Feedback is required");

        addFeedback.mutate(feedbackData);
        setTimeout(() => {
            SOCKET.emit("newFeedback", { ...feedbackData, _id: documentId });
            form.reset();
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
    };

    return (
        <div className="relative h-full">
            <ul className="p-2 overflow-y-scroll h-[calc(80vh-5rem)]">
                {feedback?.data?.map((fb) => (
                    <li key={fb._id}>
                        <FeedbackBubble feedback={fb} />
                    </li>
                ))}
                <li key={crypto.randomUUID()} ref={ref}></li>
            </ul>
            <div className="mt-auto bg-white">
                {error && <Error error={error} />}
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="feedback"
                        placeholder="Leave your feedback"
                        className="w-full textarea textarea-bordered"
                        required
                    />
                    <button className="w-full btn btn-accent" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
