import React, { useState } from "react";

const ChatModal = ({ host, systemPrompt }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: "user" };
            setMessages([...messages, userMessage]);
            setLoading(true);
            const response = await fetch(`${host}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: input },
                    ],
                }),
            });

            const data = await response.json();
            const botMessage = {
                text: data?.choices?.[0]?.message?.content || 'Sorry, I could not fetch a response.',
                sender: 'bot',
            };
            setMessages([...messages, botMessage]);
            setInput("");
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Chat
            </button>

            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "400px",
                            maxHeight: "80%",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                padding: "10px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                borderBottom: "1px solid #ddd",
                                textAlign: "center",
                            }}
                        >
                            Chat
                            <button
                                onClick={toggleModal}
                                style={{
                                    float: "right",
                                    fontSize: "16px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div
                            style={{
                                flex: "1",
                                padding: "10px",
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        alignSelf:
                                            msg.sender === "user" ? "flex-end" : "flex-start",
                                        backgroundColor: msg.sender === "user" ? "#007bff" : "#eee",
                                        color: msg.sender === "user" ? "white" : "black",
                                        padding: "8px 12px",
                                        borderRadius: "18px",
                                        maxWidth: "70%",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                padding: "10px",
                                borderTop: "1px solid #ddd",
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type a message"
                                style={{
                                    flex: "1",
                                    padding: "8px",
                                    borderRadius: "18px",
                                    border: "1px solid #ddd",
                                    marginRight: "8px",
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    padding: "8px 12px",
                                    borderRadius: "18px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                {loading ? (
                                    <div
                                        style={{
                                            alignSelf: 'flex-start',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        Sending
                                        <span className="dot">.</span>
                                        <span className="dot">.</span>
                                        <span className="dot">.</span>
                                    </div>
                                ) : `Send`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatModal;
