import moment from "moment";
import { FeedbackInterface } from "../../interfaces/Feedback.interface";
import { useAuth } from "../../providers/hooks/auth";

interface FeedbackBubbleProps {
    feedback: FeedbackInterface;
}

const FeedbackBubble: React.FC<FeedbackBubbleProps> = ({ feedback }) => {
    const { user } = useAuth();

    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar placeholder">
                    <div
                        className={`w-10 !rounded-full shadow-md ${
                            user?._id === feedback.createdBy._id
                                ? "bg-info text-info-content"
                                : "bg-accent text-info-content"
                        }`}
                    >
                        <span className="text-2xl select-none drop-shadow-md">
                            {feedback.createdBy.name[0].toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="text-xs select-none chat-header opacity-30">
                    {feedback.createdBy.name}
                </div>
                <div
                    className={`chat-bubble text-xs ${
                        user?._id === feedback.createdBy._id
                            ? "chat-bubble-info"
                            : "chat-bubble-accent"
                    }`}
                >
                    {feedback.content}
                </div>
                <div className="chat-footer">
                    <time className="text-xs select-none opacity-30">
                        {moment(feedback.createdAt).fromNow()}
                    </time>
                </div>
            </div>
        </div>
    );
};

export default FeedbackBubble;
