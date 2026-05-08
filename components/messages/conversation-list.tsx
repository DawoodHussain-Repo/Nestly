import { Search, CheckCheck, Archive, MoreVertical, Check, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MessageListItem } from "@/components/message-list-item";
import { Message } from "@/lib/mock-data";
import { deduplicateBySender } from "@/lib/utils";

interface ConversationListProps {
  conversations: Message[];
  selectedConversation: string;
  activeTab: string;
  unreadCount: number;
  searchQuery: string;
  showOptions: string | null;
  onSelectConversation: (id: string) => void;
  onSearchChange: (query: string) => void;
  onMarkAllRead: () => void;
  onToggleOptions: (id: string) => void;
  onMarkRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  isRead: (id: string) => boolean;
  isArchived: (id: string) => boolean;
}

export function ConversationList({
  conversations,
  selectedConversation,
  activeTab,
  unreadCount,
  searchQuery,
  showOptions,
  onSelectConversation,
  onSearchChange,
  onMarkAllRead,
  onToggleOptions,
  onMarkRead,
  onArchive,
  onDelete,
  isRead,
  isArchived,
}: ConversationListProps) {
  // Deduplicate so each sender appears only once
  const uniqueConversations = deduplicateBySender(conversations);

  return (
    <>
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
              onClick={onMarkAllRead}
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-styled">
        {uniqueConversations.length === 0 ? (
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
          uniqueConversations.map((conversation) => (
            <div key={conversation.id} className="relative group">
              <MessageListItem
                message={{
                  ...conversation,
                  read: isRead(conversation.senderId)
                }}
                isSelected={selectedConversation === conversation.senderId}
                onClick={() => onSelectConversation(conversation.senderId)}
              />
              <button
                onClick={() => onToggleOptions(conversation.id)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              {showOptions === conversation.id && (
                <div className="absolute right-4 top-full mt-1 bg-background border border-border rounded-xl shadow-lg z-10 py-2 min-w-[160px]">
                  <button
                    onClick={() => onMarkRead(conversation.senderId)}
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
                    onClick={() => onArchive(conversation.senderId)}
                    className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors flex items-center gap-2 text-sm"
                  >
                    <Archive className="h-4 w-4" />
                    {isArchived(conversation.senderId) ? 'Unarchive' : 'Archive'}
                  </button>
                  <button
                    onClick={() => onDelete(conversation.senderId)}
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
    </>
  );
}
