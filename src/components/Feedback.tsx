import React, { FormEvent } from "react";
import {
    useAddFeedback,
    useFetchFeedbackByDocumentId,
} from "../services/hooks/feedback";
import FeedbackBubble from "./FeedbackBubble";

interface FeedbackProps {
    projectId: string;
    documentId: string;
    userId: string;
}

const Feedback: React.FC<FeedbackProps> = ({ documentId }) => {
    const { data: feedback } = useFetchFeedbackByDocumentId(documentId);
    const addFeedback = useAddFeedback();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const feedbackData = {
            content: form.feedback.value,
            document: documentId,
        };
        addFeedback.mutate(feedbackData);
        form.reset();
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
