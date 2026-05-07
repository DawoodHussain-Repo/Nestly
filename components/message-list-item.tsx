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
      className={`w-full p-4 border-b border-border transition-colors hover:bg-muted text-left ${
        isSelected ? 'bg-muted' : 'hover:bg-muted'
      }`}
    >
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <Avatar src={message.senderAvatar} name={message.senderName} size="md" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex-between gap-2 mb-1">
            <h3 className="label-md font-semibold truncate">{message.senderName}</h3>
            <p className="body-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </p>
          </div>

          {/* Property Info */}
          <p className="body-sm text-primary font-medium mb-1 truncate">
            {message.propertyTitle}
          </p>

          {/* Message Preview */}
          <p className={`body-sm truncate ${
            !message.read ? 'text-foreground font-medium' : 'text-muted-foreground'
          }`}>
            {message.content}
          </p>
        </div>

        {/* Unread Indicator */}
        {!message.read && (
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
        )}
      </div>
    </button>
  )
}
