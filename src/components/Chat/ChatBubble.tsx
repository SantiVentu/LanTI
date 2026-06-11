import type { ChatMessage } from "@/types/chat";
import styles from "./ChatBubble.module.css";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.bubble} ${isUser ? styles.user : styles.assistant}`}>
      <p className={styles.content}>{message.content}</p>
    </div>
  );
}
