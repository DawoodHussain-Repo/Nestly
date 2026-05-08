"use client";

import { useState } from 'react';
import { Message } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from './avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

interface MessageThreadProps {
  messages: Message[]
  currentUserId: string
}

export function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Create a new message object
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      receiverId: messages[0]?.receiverId || 'other-user',
      senderName: 'You',
      senderAvatar: '/placeholder-user.jpg',
      propertyId: messages[0]?.propertyId || 'property-1',
      propertyTitle: messages[0]?.propertyTitle || 'Property',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    };

    // Add to local messages
    setLocalMessages([...localMessages, message]);
    setNewMessage('');
    toast.success("Message sent!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const displayMessages = localMessages.length > 0 ? localMessages : messages;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {displayMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-lg text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start a conversation by sending a message</p>
          </div>
        ) : (
          displayMessages.map((message) => {
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            className="h-11 rounded-full px-5"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
