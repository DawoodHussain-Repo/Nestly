"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Archive, Trash2 } from "lucide-react";
import { MessageThread } from "@/components/message-thread";
import { mockCurrentUser, mockMessages, Message } from "@/lib/mock-data";
import { toast } from "sonner";
import { MessagesSidebar } from "@/components/messages/messages-sidebar";
import { ConversationList } from "@/components/messages/conversation-list";
import { deduplicateBySender } from "@/lib/utils";

type Tab = 'inbox' | 'archive' | 'requests';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockMessages[0]?.senderId ?? "");
  const [showThread, setShowThread] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('inbox');
  const [searchQuery, setSearchQuery] = useState("");
  const [archivedSenderIds, setArchivedSenderIds] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [deletedSenderIds, setDeletedSenderIds] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<string | null>(null);

  // Filter messages based on tab and search
  const getFilteredMessages = () => {
    let filtered = mockMessages.filter(msg => !deletedSenderIds.includes(msg.senderId));

    // Apply tab filter
    if (activeTab === 'archive') {
      filtered = filtered.filter(msg => archivedSenderIds.includes(msg.senderId));
    } else if (activeTab === 'inbox') {
      filtered = filtered.filter(msg => !archivedSenderIds.includes(msg.senderId));
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

  // Close thread if selected conversation is no longer available
  useEffect(() => {
    if (showThread && !conversationList.find(msg => msg.senderId === selectedConversation)) {
      setShowThread(false);
      setSelectedConversation("");
    }
  }, [conversationList, selectedConversation, showThread]);

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

  const handleArchive = (senderId: string) => {
    if (archivedSenderIds.includes(senderId)) {
      setArchivedSenderIds(archivedSenderIds.filter(aid => aid !== senderId));
      toast.success("Conversation unarchived");
    } else {
      setArchivedSenderIds([...archivedSenderIds, senderId]);
      toast.success("Conversation archived");
      
      // Close thread if this is the selected conversation
      if (selectedConversation === senderId) {
        setShowThread(false);
        setSelectedConversation("");
      }
    }
    setShowOptions(null);
  };

  const handleDelete = (senderId: string) => {
    setDeletedSenderIds([...deletedSenderIds, senderId]);
    toast.success("Conversation deleted");
    setShowOptions(null);
    
    // Close thread if this is the selected conversation
    if (selectedConversation === senderId) {
      setShowThread(false);
      setSelectedConversation("");
    }
  };

  const handleMarkRead = (senderId: string) => {
    if (readIds.includes(senderId)) {
      setReadIds(readIds.filter(rid => rid !== senderId));
      toast.success("Marked as unread");
    } else {
      setReadIds([...readIds, senderId]);
      toast.success("Marked as read");
    }
    setShowOptions(null);
  };

  const handleNewChat = () => {
    toast.info("New chat feature coming soon!");
  };

  const isRead = (senderId: string) => readIds.includes(senderId);
  const isArchived = (senderId: string) => archivedSenderIds.includes(senderId);

  // Calculate counts properly with deduplication
  const inboxMessages = deduplicateBySender(
    mockMessages.filter(msg => 
      !deletedSenderIds.includes(msg.senderId) && 
      !archivedSenderIds.includes(msg.senderId)
    )
  );
  const archivedMessages = deduplicateBySender(
    mockMessages.filter(msg => 
      !deletedSenderIds.includes(msg.senderId) && 
      archivedSenderIds.includes(msg.senderId)
    )
  );
  
  const unreadCount = activeTab === 'inbox' 
    ? inboxMessages.filter(msg => !readIds.includes(msg.senderId)).length
    : 0;

  return (
    <div className="bg-background text-foreground h-screen overflow-hidden flex">
      {/* Spacer for fixed pill nav */}
      <div className="fixed top-0 left-0 right-0 h-28 z-0" />
      
      <div className="flex flex-1 pt-28 h-full overflow-hidden w-full">
        <MessagesSidebar
          activeTab={activeTab}
          unreadCount={unreadCount}
          archivedCount={archivedMessages.length}
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
          {activeMessage ? (
            <>
              <header className="px-5 py-4 border-b border-border bg-background flex items-center gap-3 shadow-sm">
                <button
                  onClick={handleBackToList}
                  className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-heading font-semibold text-foreground truncate">
                    {activeMessage.senderName}
                  </h2>
                  <p className="text-sm text-primary truncate">{activeMessage.propertyTitle}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleArchive(activeMessage.senderId)}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                    title={isArchived(activeMessage.senderId) ? "Unarchive" : "Archive"}
                  >
                    <Archive className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(activeMessage.senderId)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-full transition-colors"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </header>
              <div className="flex-1 min-h-0">
                <MessageThread messages={selectedMessages} currentUserId={mockCurrentUser.id} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm px-6">
                <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                  <Archive className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a conversation from the list to view messages
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
