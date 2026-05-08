'use client'

import { Message } from '@/lib/mock-data'
import { formatDistanceToNow } from 'date-fns'
import { Avatar } from './avatar'

interface MessageListItemProps {
  message: Message
  isSelected: boolean
  onClick: () => void
}

export function MessageListItem({
  message,
  isSelected,
  onClick,
}: MessageListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border-b border-border transition-all text-left ${
        isSelected 
          ? 'bg-primary/10 border-l-4 border-l-primary' 
          : 'hover:bg-secondary/50 border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex gap-3 items-start">
        <Avatar src={message.senderAvatar} name={message.senderName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`text-sm font-semibold truncate ${
              isSelected ? 'text-primary' : 'text-foreground'
            }`}>{message.senderName}</h3>
            <p className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </p>
          </div>
          <p className="text-xs text-primary font-medium mb-1 truncate">
            {message.propertyTitle}
          </p>
          <p className={`text-sm truncate ${
            !message.read ? 'text-foreground font-medium' : 'text-muted-foreground'
          }`}>
            {message.content}
          </p>
        </div>
        {!message.read && (
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
        )}
      </div>
    </button>
  )
}
