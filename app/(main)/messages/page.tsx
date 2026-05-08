"use client";

import { useState } from "react";
import { ArrowLeft, Archive } from "lucide-react";
import { MessageThread } from "@/components/message-thread";
import { mockCurrentUser, mockMessages } from "@/lib/mock-data";
import { toast } from "sonner";
import { MessagesSidebar } from "@/components/messages/messages-sidebar";
import { ConversationList } from "@/components/messages/conversation-list";

type Tab = 'inbox' | 'archive' | 'requests';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockMessages[0]?.senderId ?? "");
  const [showThread, setShowThread] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('inbox');
  const [searchQuery, setSearchQuery] = useState("");
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<string | null>(null);

  // Filter messages based on tab and search
  const getFilteredMessages = () => {
    let filtered = mockMessages.filter(msg => !deletedIds.includes(msg.id));

    // Apply tab filter
    if (activeTab === 'archive') {
      filtered = filtered.filter(msg => archivedIds.includes(msg.id));
    } else if (activeTab === 'inbox') {
      filtered = filtered.filter(msg => !archivedIds.includes(msg.id));
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.senderName.toLowerCase().includes(q) ||
        msg.content.toLowerCase().includes(q) ||
        msg.propertyTitle.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  const conversationList = getFilteredMessages();
  const selectedMessages = mockMessages.filter(
    (message) => message.senderId === selectedConversation || message.receiverId === selectedConversation
  );
  const activeMessage = conversationList.find((message) => message.senderId === selectedConversation);

  const handleSelectConversation = (senderId: string) => {
    setSelectedConversation(senderId);
    setShowThread(true);
    if (!readIds.includes(senderId)) {
      setReadIds([...readIds, senderId]);
    }
  };

  const handleBackToList = () => {
    setShowThread(false);
  };

  const handleMarkAllRead = () => {
    const allIds = conversationList.map(msg => msg.senderId);
    setReadIds([...new Set([...readIds, ...allIds])]);
    toast.success("All messages marked as read");
  };

  const handleArchive = (id: string) => {
    if (archivedIds.includes(id)) {
      setArchivedIds(archivedIds.filter(aid => aid !== id));
      toast.success("Conversation unarchived");
    } else {
      setArchivedIds([...archivedIds, id]);
      toast.success("Conversation archived");
    }
    setShowOptions(null);
  };

  const handleDelete = (id: string) => {
    setDeletedIds([...deletedIds, id]);
    toast.success("Conversation deleted");
    setShowOptions(null);
    if (selectedConversation === id) {
      setShowThread(false);
    }
  };

  const handleMarkRead = (id: string) => {
    if (readIds.includes(id)) {
      setReadIds(readIds.filter(rid => rid !== id));
      toast.success("Marked as unread");
    } else {
      setReadIds([...readIds, id]);
      toast.success("Marked as read");
    }
    setShowOptions(null);
  };

  const handleNewChat = () => {
    toast.info("New chat feature coming soon!");
  };

  const isRead = (id: string) => readIds.includes(id);
  const isArchived = (id: string) => archivedIds.includes(id);

  const unreadCount = conversationList.filter(msg => !readIds.includes(msg.senderId)).length;

  return (
    <div className="bg-background text-foreground h-screen overflow-hidden flex">
      {/* Spacer for fixed pill nav */}
      <div className="fixed top-0 left-0 right-0 h-28 z-0" />
      
      <div className="flex flex-1 pt-28 h-full overflow-hidden w-full">
        <MessagesSidebar
          activeTab={activeTab}
          unreadCount={unreadCount}
          archivedCount={archivedIds.length}
          onTabChange={setActiveTab}
          onNewChat={handleNewChat}
        />

        {/* Conversation List - Hidden on mobile when thread is shown */}
        <div className={`w-full md:w-96 border-r border-border bg-background flex flex-col h-full ${showThread ? 'hidden md:flex' : 'flex'}`}>
          <ConversationList
            conversations={conversationList}
            selectedConversation={selectedConversation}
            activeTab={activeTab}
            unreadCount={unreadCount}
            searchQuery={searchQuery}
            showOptions={showOptions}
            onSelectConversation={handleSelectConversation}
            onSearchChange={setSearchQuery}
            onMarkAllRead={handleMarkAllRead}
            onToggleOptions={(id) => setShowOptions(showOptions === id ? null : id)}
            onMarkRead={handleMarkRead}
            onArchive={handleArchive}
            onDelete={handleDelete}
            isRead={isRead}
            isArchived={isArchived}
          />
        </div>

        {/* Message Thread - Shown on mobile when conversation is selected */}
        <main className={`flex-1 flex flex-col h-full bg-background ${showThread ? 'flex' : 'hidden md:flex'}`}>
          <header className="px-5 py-4 border-b border-border bg-background flex items-center gap-3">
            <button
              onClick={handleBackToList}
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-heading text-foreground">{activeMessage?.senderName ?? "Conversation"}</h2>
              <p className="text-sm text-primary">{activeMessage?.propertyTitle ?? "No property selected"}</p>
            </div>
            <button
              onClick={() => {
                if (activeMessage) {
                  handleArchive(activeMessage.senderId);
                }
              }}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              title={activeMessage && isArchived(activeMessage.senderId) ? "Unarchive" : "Archive"}
            >
              <Archive className="h-5 w-5" />
            </button>
          </header>
          <div className="flex-1 min-h-0">
            <MessageThread messages={selectedMessages} currentUserId={mockCurrentUser.id} />
          </div>
        </main>
      </div>
    </div>
  );
}
