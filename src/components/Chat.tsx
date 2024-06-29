// src/App.tsx
import React, { useEffect, useState } from "react";
import { SOCKET } from "../utils/SOCKET";

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        SOCKET.on("receiveMessage", (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            SOCKET.emit("sendMessage", message);
            setMessage("");
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                className="w-full textarea textarea-bordered"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="btn btn-block">
                Send
            </button>
        </div>
    );
};

export default Chat;
