import moment from "moment";
import { FeedbackInterface } from "../interfaces/Feedback.interface";

interface FeedbackBubbleProps {
    feedback: FeedbackInterface;
}

const FeedbackBubble: React.FC<FeedbackBubbleProps> = ({ feedback }) => {
    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-header">
                    {feedback.createdBy.name}
                    <time className="text-xs opacity-50">
                        {moment(feedback.createdAt).fromNow()}
                    </time>
                </div>
                <div className="chat-bubble">{feedback.content}</div>
            </div>
        </div>
    );
};

export default FeedbackBubble;
