import moment from "moment";
import { FeedbackInterface } from "../interfaces/Feedback.interface";
import { useAuth } from "../providers/hooks/auth";

interface FeedbackBubbleProps {
    feedback: FeedbackInterface;
}

const ChatBubble: React.FC<FeedbackBubbleProps> = ({ feedback }) => {
    const { user } = useAuth();

    console.log({ feedback, user });

    return (
        <div>
            <div
                className={`chat ${
                    user?._id === feedback.createdBy._id
                        ? "chat-end"
                        : "chat-start"
                }`}
            >
                <div className="chat-image avatar placeholder">
                    <div
                        className={`w-10 !rounded-full shadow-md ${
                            user?._id === feedback.createdBy._id
                                ? "bg-info text-info-content"
                                : "bg-accent text-info-content"
                        }`}
                    >
                        <span className="text-2xl">
                            {feedback.createdBy.name[0].toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="chat-header">{feedback.createdBy.name}</div>
                <div
                    className={`chat-bubble ${
                        user?._id === feedback.createdBy._id
                            ? "chat-bubble-info"
                            : "chat-bubble-accent"
                    }`}
                >
                    {feedback.content}
                </div>
                <div className="chat-footer">
                    <time className="text-xs opacity-50">
                        {moment(feedback.createdAt).fromNow()}
                    </time>
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
