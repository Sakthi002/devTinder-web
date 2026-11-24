import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

function Chat() {
    const { targetUserId } = useParams();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const user = useSelector((store) => store.user);

    const userId = user?._id;

    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    const [targetUser, setTargetUser] = useState(null);
    const fetchChat = async () => {
        try {
            const chat = await axios.get(
                API_BASE_URL + "/chat/" + targetUserId,
            );

            let messages = chat.data.messages.map((msg) => {
                return {
                    senderId: msg?.senderId?._id,
                    firstName: msg?.senderId?.firstName,
                    lastName: msg?.senderId?.lastName,
                    photoURL: msg?.senderId?.photoURL,
                    text: msg.text,
                    createdAt: msg.createdAt,
                };
            });

            setMessages(messages);

            const other = chat.data.participants.find(
                (p) => p._id === targetUserId,
            );
            setTargetUser(other);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        fetchChat();
    }, [targetUserId]);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("joinChat", {
            firstName: user?.firstName,
            userId,
            targetUserId,
        });

        socket.on(
            "messageReceived",
            ({ senderId, firstName, lastName, photoURL, text, createdAt }) => {
                setMessages((messages) => [
                    ...messages,
                    {
                        senderId,
                        firstName,
                        lastName,
                        photoURL,
                        text,
                        createdAt,
                    },
                ]);
            },
        );

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        socketRef.current.emit("sendMessage", {
            firstName: user?.firstName,
            lastName: user?.lastName,
            photoURL: user?.photoURL,
            userId,
            targetUserId,
            text,
        });
        setText("");
    };

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        user && (
            <div className="flex justify-center px-4 py-6">
                <div className="card w-full max-w-2xl h-[75vh] bg-base-100 shadow-md border border-base-300 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={targetUser?.photoURL}
                                    alt={targetUser?.firstName || "User"}
                                />
                            </div>
                        </div>
                        <h2 className="font-semibold">
                            {targetUser
                                ? `${targetUser.firstName} ${targetUser.lastName || ""}`
                                : "Chat"}
                        </h2>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 bg-base-200/40">
                        {messages.map((msg, index) => {
                            const fromMe = msg.senderId === userId;

                            return (
                                <div
                                    key={index}
                                    className={`chat ${fromMe ? "chat-end" : "chat-start"}`}
                                >
                                    {!fromMe && (
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    alt={msg.firstName}
                                                    src={msg.photoURL}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="chat-header">
                                        {msg.firstName} {msg.lastName}
                                    </div>
                                    <div
                                        className={`chat-bubble ${fromMe ? "chat-bubble-neutral" : ""}`}
                                    >
                                        {msg.text}
                                    </div>
                                    <div className="chat-footer opacity-50 text-xs mt-1">
                                        {msg.createdAt &&
                                            formatTime(msg.createdAt)}
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 px-4 py-3 border-t border-base-300">
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                        />
                        <button
                            className="btn btn-neutral"
                            onClick={sendMessage}
                            disabled={!text.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default Chat;
