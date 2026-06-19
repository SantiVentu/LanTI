"use client";
import { useState, useCallback } from "react";
import type { ChatMessage, ChatStatus, ChatInput, ChatOutput } from "@/types/chat";

// Genera un ID único para cada mensaje
const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function useChatFlow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");

  // Agrega un mensaje al array de mensajes
  const addMessage = useCallback((role: ChatMessage["role"], content: string) => {
    const message: ChatMessage = {
      id: generateId(),
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, message]);
  }, []);

  // Envía mensaje del usuario y obtiene respuesta del bot
  const sendMessage = useCallback(async (text: string) => {
    if (status === "loading") return;

    addMessage("user", text);
    setStatus("loading");

    const payload: ChatInput = {
      messages: [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: text },
      ],
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data: ChatOutput = await response.json();
      addMessage("assistant", data.reply);
      setStatus("idle");

    } catch (err) {
      console.error("Error en sendMessage:", err);
      setStatus("error");
    }
  }, [messages, status, addMessage]);

  // Resetea la conversación
  const resetChat = useCallback(() => {
    setMessages([]);
    setStatus("idle");
  }, []);

  return { messages, status, sendMessage, resetChat };
}