"use client";

import { useState } from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleAction(formData: FormData) {
    const trimmed = (formData.get("message") as string).trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form className={styles.form} action={handleAction}>
      <input
        className={styles.input}
        type="text"
        name="message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        placeholder="Escribí tu consulta..."
        disabled={disabled}
        aria-label="Mensaje"
      />
      <button
        className={styles.button}
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Enviar mensaje"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
}
