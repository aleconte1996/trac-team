import { useEffect, useState } from "react";

const Room = () => {
  const [messages, setMessages] = useState([]); //store messages
  const [input, setInput] = useState(""); // new messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:3000/messages");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("error fetching messages", error);
      }
    };
    fetchMessages();
  }, []);

  //send message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = {
      user: "",
      body: input,
      id: messages.length + 1,
    };

    setMessages([...messages, newMessage]); //Updates ui

    try {
      await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: { "Content-type": "application.json" },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error("Could not send message", error);
    }

    setInput(""); // clear input box afer sending message
  };

  return (
    <div className="chat-room">
      <h2>Room</h2>
      <div className="total-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.user === "You" ? "sent" : "received"}`}
          >
            <strong>{msg.user}:</strong>
            {msg.body}
          </div>
        ))}
      </div>
      <div className="input-field">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message here"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Room;
