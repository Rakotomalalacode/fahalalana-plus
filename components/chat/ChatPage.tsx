"use client";

import { images } from "@/constants/images";
import { IconSend } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react"

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage( ) {
   const { data: session, status } = useSession()
  const [messages, setMessages] = useState<Message[]>([
  {
    role: "assistant",
    content: `Bonjour ${session?.user?.name}, que puis-je faire pour vous aujourd'hui ?`
  }
]);

  // const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    //const newMessages = [...messages, { role: "user", content: input }];
    const newMessages = [...messages, { role: "user", content: input }] as Message[];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.result }]);
    } catch (err) {
      console.error("Erreur:", err);
      setMessages([...newMessages, { role: "assistant", content: "❌ Erreur lors de la réponse." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-[620px] lg:h-[470px] relative">
      <div className="flex gap-2 justify-center items-center">
        <h1 className="text-2xl">Chat</h1>
        <div className="flex w-fit text-2xl gap-0.5 qualyneue items-center">
          <p>falar</p>
          <Image
            src={images.LogoFalarohy}
            width={200}
            height={200}
            className="w-6 h-6"
            alt={"LogoFalarohy"} />
          <p>hy</p>
        </div>
      </div>
      <ScrollArea className="p-4 h-[520px] lg:h-full  w-[100%]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block py-2 rounded-3xl px-4 ${msg.role === "user" ? "bg-blue-200" : "bg-gray-200 dark:bg-foreground"
                }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {/* {loading && <p className="text-sm text-gray-500">⏳ Génération en cours...</p>} */}
        {loading && <span className="relative flex ml-6 size-4">  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orangeme opacity-75"></span>  <span className="relative inline-flex size-4 rounded-full bg-orangeme"></span></span>}
      </ScrollArea>

      <div className="absolute bottom-0 w-full lg:w-[50%] left-1/2 transform -translate-x-1/2  flex">
        <div className="flex gap-3 w-full items-center">
          <Textarea
            className="flex-1 border bg-white rounded-full p-2 px-6 min-h-5 resize-none overflow-hidden"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écris un message..."
          />
          <button
            className="bg-orangeme/90 text-white p-2 rounded-full hover:bg-orangeme"
            onClick={sendMessage}
            disabled={loading}
          >
            <IconSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
