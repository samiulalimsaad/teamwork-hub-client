import React, { FormEvent, useEffect } from "react";
import { FeedbackInterface } from "../interfaces/Feedback.interface";
import {
    useAddFeedback,
    useFetchFeedbackByDocumentId,
} from "../services/hooks/feedback";
import { SOCKET } from "../utils/SOCKET";
import FeedbackBubble from "./FeedbackBubble";

interface FeedbackProps {
    projectId: string;
    documentId: string;
    userId: string;
}

const Feedback: React.FC<FeedbackProps> = ({ documentId }) => {
    const { data: feedback, refetch } =
        useFetchFeedbackByDocumentId(documentId);
    const addFeedback = useAddFeedback();

    useEffect(() => {
        SOCKET.emit("joinDocument", { documentId });

        SOCKET.on("feedbackReceived", (data: FeedbackInterface) => {
            console.log(data);
            if (data._id === documentId) {
                refetch();
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

        addFeedback.mutate(feedbackData);
        setTimeout(() => {
            SOCKET.emit("newFeedback", { ...feedbackData, _id: documentId });
            form.reset();
        }, 1500);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="feedback"
                    placeholder="Leave your feedback"
                    required
                    className="w-full textarea textarea-bordered"
                />
                <button className="w-full btn btn-accent" type="submit">
                    Submit
                </button>
            </form>
            <ul>
                {feedback?.data?.map((fb) => (
                    <li key={fb._id}>
                        <FeedbackBubble feedback={fb} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feedback;
