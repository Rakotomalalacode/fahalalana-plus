"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { IconSend } from "@tabler/icons-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { images } from "@/constants/images"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Message de bienvenue personnalisé
  useEffect(() => {
    if (session?.user?.name && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Bonjour ${session.user.name}, que puis-je faire pour vous aujourd'hui ?`,
        },
      ])
    }
  }, [session?.user?.name])

  // Scroll auto vers le bas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }] as Message[]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      console.log("Réponse reçue du serveur :", data)

      if (!data.result) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "Aucune réponse reçue depuis Mistral." },
        ])
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.result }])
      }
    } catch (err) {
      console.error("Erreur:", err)
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Erreur lors de la réponse." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="w-full h-[620px] lg:h-[500px] relative flex flex-col font-outfit">
      {/* Header */}
      <div className="flex gap-2 justify-center items-center pt-2">
        <h1 className="text-2xl">Chat</h1>
        <div className="flex w-fit text-2xl gap-0.5 items-center">
          <p>falar</p>
          <Image
            src={images.LogoFalarohy}
            width={200}
            height={200}
            className="w-6 h-6"
            alt="LogoFalarohy"
          />
          <p>hy</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <span
              className={`inline-block py-2 px-4 rounded-3xl max-w-[75%] text-sm ${
                msg.role === "user"
                  ? "bg-blue-200 dark:bg-blue-200/50 text-right"
                  : "bg-gray-200 dark:bg-sidebar-accent text-left"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <div className="ml-6">
            <span className="relative flex size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orangeme opacity-75" />
              <span className="relative inline-flex size-4 rounded-full bg-orangeme" />
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </ScrollArea>

      {/* Input */}
      <div className="w-full bg-white dark:bg-transparent px-4 py-3">
        <div className="flex gap-2 items-center w-full">
          <Textarea
            className="flex-1 resize-none bg-white dark:bg-background border border-gray-300 dark:border-gray-700 rounded-full py-2 px-4 min-h-[42px] max-h-32 overflow-y-auto"
            placeholder="Écris un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-orangeme/90 text-white p-2 rounded-full hover:bg-orangeme transition disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading}
          >
            <IconSend size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
