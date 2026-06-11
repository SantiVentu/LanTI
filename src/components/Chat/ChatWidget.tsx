"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatFlow } from "@/hooks/useChatFlow";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import styles from "./ChatWidget.module.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, status, sendMessage } = useChatFlow();
  const bottomRef = useRef<HTMLDivElement>(null);

  /* Scroll al último mensaje cada vez que llega uno nuevo */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <header className={styles.header}>
              <span className={styles.title}>LanTI</span>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </header>

            <div className={styles.messages}>
              {messages.length === 0 && (
                <p className={styles.empty}>¿En qué te podemos ayudar?</p>
              )}

              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {status === "loading" && (
                <div className={styles.typing}>
                  <span /><span /><span />
                </div>
              )}

              {status === "error" && (
                <p className={styles.error}>
                  Algo falló. Intentá de nuevo.
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            <ChatInput onSend={sendMessage} disabled={status === "loading"} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.fab}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? "✕" : "💬"}
      </motion.button>
    </div>
  );
}
