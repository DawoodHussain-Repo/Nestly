import { Message } from '@/lib/mock-data'
import { formatDistanceToNow } from 'date-fns'
import { Avatar } from './avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface MessageThreadProps {
  messages: Message[]
  currentUserId: string
}

export function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-lg text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start a conversation by sending a message</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isOwn && <Avatar src={message.senderAvatar} name={message.senderName} />}
                <div
                  className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} gap-1`}
                >
                  <p
                    className={`px-4 py-2 rounded-2xl max-w-xs lg:max-w-md text-sm ${
                      isOwn
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-secondary text-foreground rounded-tl-sm border border-border'
                    }`}
                  >
                    {message.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-1 h-11 rounded-full bg-secondary border-border"
          />
          <Button className="h-11 rounded-full px-5">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
