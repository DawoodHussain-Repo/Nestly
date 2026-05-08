import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Message } from './mock-data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Deduplicate messages by senderId — keep only the latest message per unique sender.
 * This prevents the same user from appearing multiple times in the conversation list.
 */
export function deduplicateBySender(messages: Message[]): Message[] {
  const seen = new Map<string, Message>();

  // Sort by timestamp descending so we keep the most recent message per sender
  const sorted = [...messages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  for (const msg of sorted) {
    if (!seen.has(msg.senderId)) {
      seen.set(msg.senderId, msg);
    }
  }

  return Array.from(seen.values());
}
