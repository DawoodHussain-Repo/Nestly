"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { MessageListItem } from "@/components/message-list-item";
import { MessageThread } from "@/components/message-thread";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCurrentUser, mockMessages } from "@/lib/mock-data";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockMessages[0]?.senderId ?? "");
  const conversationList = mockMessages;
  const selectedMessages = mockMessages.filter(
    (message) => message.senderId === selectedConversation || message.receiverId === selectedConversation
  );
  const activeMessage = conversationList.find((message) => message.senderId === selectedConversation);

  return (
    <div className="bg-background text-foreground h-screen overflow-hidden flex">
      {/* Spacer for fixed pill nav */}
      <div className="fixed top-0 left-0 right-0 h-28 z-0" />
      
      <div className="flex flex-1 pt-28 h-full overflow-hidden w-full">
        <aside className="hidden lg:flex h-full w-72 border-r border-border bg-secondary/30 flex-col p-5">
          <div className="mb-6">
            <h2 className="text-2xl font-heading text-foreground">Messages</h2>
            <p className="text-sm text-muted-foreground">Manage your guest conversations</p>
          </div>
          <Button className="w-full rounded-full mb-6">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <nav className="space-y-2 text-sm">
            <button className="w-full rounded-full px-4 py-2 text-left bg-primary text-primary-foreground">
              Inbox
            </button>
            <button className="w-full rounded-full px-4 py-2 text-left hover:bg-secondary text-muted-foreground">
              Archive
            </button>
            <button className="w-full rounded-full px-4 py-2 text-left hover:bg-secondary text-muted-foreground">
              Requests
            </button>
          </nav>
        </aside>

        <div className="w-full md:w-96 border-r border-border bg-background flex flex-col h-full">
          <div className="p-5 border-b border-border space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-heading text-foreground">Inbox</h3>
              <button className="text-sm text-primary hover:underline">Mark all read</button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 h-10 rounded-full bg-secondary border-border" placeholder="Search messages..." />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversationList.map((conversation) => (
              <MessageListItem
                key={conversation.id}
                message={conversation}
                isSelected={selectedConversation === conversation.senderId}
                onClick={() => setSelectedConversation(conversation.senderId)}
              />
            ))}
          </div>
        </div>

        <main className="flex-1 hidden md:flex flex-col h-full bg-background">
          <header className="px-5 py-4 border-b border-border bg-background">
            <h2 className="text-lg font-heading text-foreground">{activeMessage?.senderName ?? "Conversation"}</h2>
            <p className="text-sm text-primary">{activeMessage?.propertyTitle ?? "No property selected"}</p>
          </header>
          <div className="flex-1 min-h-0">
            <MessageThread messages={selectedMessages} currentUserId={mockCurrentUser.id} />
          </div>
        </main>
      </div>
    </div>
  );
}
