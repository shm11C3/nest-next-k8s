import io from "socket.io-client";

import { useState, useEffect } from "react";

export default function WS() {
  type Message = {
    data: string;
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  useEffect(() => {
    console.log(0);

    socket.connect();

    socket.on("broadcast_event", (data: Message) => {
      console.log("receive", data);
      setMessages((messages) => {
        return [...messages, data];
      });
    });
  }, []);

  const send = (): void => {
    socket.emit("input_event", input);
  };

  return (
    <div className="m-5">
      <div>
        <h1 className="text-4xl">WS test</h1>
      </div>
      <div className="my-4 border-2 border-blue-900 rounded p-4">
        <input
          type="text"
          className="border rounded-full text-black py-1 px-2"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="inline-block bg-blue-400 ml-1 rounded-full px-5 py-1 shadow"
          onClick={send}
        >
          送信
        </button>
      </div>
      <div>
        {messages.map((message: Message, index: any) => (
          <p key={index}>{message.data}</p>
        ))}
      </div>
    </div>
  );
}
