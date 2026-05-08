"use client";

import { useState } from "react";
import { Plus, Search, ArrowLeft, Archive, Check, CheckCheck, MoreVertical, Trash2 } from "lucide-react";
import { MessageListItem } from "@/components/message-list-item";
import { MessageThread } from "@/components/message-thread";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCurrentUser, mockMessages } from "@/lib/mock-data";
import { toast } from "sonner";

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
    // Mark as read when opening
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
        <aside className="hidden lg:flex h-full w-72 border-r border-border bg-secondary/30 flex-col p-5">
          <div className="mb-6">
            <h2 className="text-2xl font-heading text-foreground">Messages</h2>
            <p className="text-sm text-muted-foreground">Manage your guest conversations</p>
          </div>
          <Button className="w-full rounded-full mb-6" onClick={handleNewChat}>
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <nav className="space-y-2 text-sm">
            <button 
              onClick={() => setActiveTab('inbox')}
              className={`w-full rounded-full px-4 py-2 text-left transition-colors ${
                activeTab === 'inbox' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-muted-foreground'
              }`}
            >
              Inbox {unreadCount > 0 && activeTab === 'inbox' && (
                <span className="ml-2 px-2 py-0.5 bg-primary-foreground text-primary rounded-full text-xs font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('archive')}
              className={`w-full rounded-full px-4 py-2 text-left transition-colors ${
                activeTab === 'archive' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-muted-foreground'
              }`}
            >
              Archive {archivedIds.length > 0 && (
                <span className="ml-2 text-xs opacity-70">({archivedIds.length})</span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              className={`w-full rounded-full px-4 py-2 text-left transition-colors ${
                activeTab === 'requests' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-muted-foreground'
              }`}
            >
              Requests
            </button>
          </nav>
        </aside>

        {/* Conversation List - Hidden on mobile when thread is shown */}
        <div className={`w-full md:w-96 border-r border-border bg-background flex flex-col h-full ${showThread ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-5 border-b border-border space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-heading text-foreground capitalize">
                {activeTab} {unreadCount > 0 && activeTab === 'inbox' && (
                  <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                    {unreadCount}
                  </span>
                )}
              </h3>
              {unreadCount > 0 && activeTab === 'inbox' && (
                <button 
                  onClick={handleMarkAllRead}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all read
                </button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9 h-10 rounded-full bg-secondary border-border" 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversationList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  {activeTab === 'archive' ? (
                    <Archive className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <Search className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  {searchQuery ? 'No messages found' : activeTab === 'archive' ? 'No archived messages' : 'No messages yet'}
                </p>
              </div>
            ) : (
              conversationList.map((conversation) => (
                <div key={conversation.id} className="relative group">
                  <MessageListItem
                    message={{
                      ...conversation,
                      read: isRead(conversation.senderId)
                    }}
                    isSelected={selectedConversation === conversation.senderId}
                    onClick={() => handleSelectConversation(conversation.senderId)}
                  />
                  <button
                    onClick={() => setShowOptions(showOptions === conversation.id ? null : conversation.id)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {showOptions === conversation.id && (
                    <div className="absolute right-4 top-full mt-1 bg-background border border-border rounded-xl shadow-lg z-10 py-2 min-w-[160px]">
                      <button
                        onClick={() => handleMarkRead(conversation.senderId)}
                        className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors flex items-center gap-2 text-sm"
                      >
                        {isRead(conversation.senderId) ? (
                          <>
                            <Check className="h-4 w-4" />
                            Mark unread
                          </>
                        ) : (
                          <>
                            <CheckCheck className="h-4 w-4" />
                            Mark read
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleArchive(conversation.senderId)}
                        className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors flex items-center gap-2 text-sm"
                      >
                        <Archive className="h-4 w-4" />
                        {isArchived(conversation.senderId) ? 'Unarchive' : 'Archive'}
                      </button>
                      <button
                        onClick={() => handleDelete(conversation.senderId)}
                        className="w-full px-4 py-2 text-left hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
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
