import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FeedbackInterface } from "../interfaces/Feedback.interface";
import { fetchFeedbackByDocumentId } from "../services/api/feedback";

interface FeedbackProps {
    projectId: string;
    documentId: string;
    userId: string;
}

const Feedback: React.FC<FeedbackProps> = ({
    projectId,
    documentId,
    userId,
}) => {
    const [feedback, setFeedback] = useState<FeedbackInterface[]>([]);
    const [newFeedback, setNewFeedback] = useState<string>("");
    userId;
    useEffect(() => {
        const getFeedback = async () => {
            const response = await fetchFeedbackByDocumentId(documentId);
            setFeedback(response.data);
        };

        getFeedback();
    }, [projectId, documentId]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setNewFeedback("");
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewFeedback(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newFeedback}
                    onChange={handleChange}
                    placeholder="Leave your feedback"
                    required
                    className="w-full textarea textarea-bordered"
                />
                <button className="w-full btn btn-accent" type="submit">
                    Submit
                </button>
            </form>
            <ul>
                {feedback?.map((fb) => (
                    <li key={fb._id}>{fb.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Feedback;
