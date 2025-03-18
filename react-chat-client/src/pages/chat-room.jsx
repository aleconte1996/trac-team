import React, { useEffect, useState } from "react";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Hardcoded values for now; you'll eventually pull these from auth/context
  const roomId = "Main";
  const currentUser = "John";

  // Function to fetch messages from your backend
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/messages?room=${roomId}`
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: currentUser,
          room: roomId,
          body: newMessage,
        }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={{ background: "#333", color: "#fff", padding: "1rem" }}>
        <h2>Chat Room: {roomId}</h2>
      </header>

      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          background: "#f4f4f4",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id || msg.id} style={{ marginBottom: "1rem" }}>
              <strong>{msg.user}:</strong> {msg.body}
              <br />
              <small>{new Date(msg.when).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSendMessage}
        style={{ display: "flex", padding: "1rem", background: "#ddd" }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
