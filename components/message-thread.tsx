import { Message } from '@/lib/mock-data'
import { formatDistanceToNow } from 'date-fns'
import { Avatar } from './avatar'

interface MessageThreadProps {
  messages: Message[]
  currentUserId: string
}

export function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex-col-center h-full text-center">
            <p className="body-lg text-muted-foreground">No messages yet</p>
            <p className="body-sm text-muted-foreground">Start a conversation by sending a message</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {!isOwn && <Avatar src={message.senderAvatar} name={message.senderName} />}

                {/* Message Content */}
                <div
                  className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} gap-1`}
                >
                  <p
                    className={`body-md px-4 py-2 rounded-sm max-w-xs lg:max-w-md ${
                      isOwn
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </p>
                  <p className="body-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="input-base flex-1"
          />
          <button className="btn-primary btn-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
