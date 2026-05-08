import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tab = 'inbox' | 'archive' | 'requests';

interface MessagesSidebarProps {
  activeTab: Tab;
  unreadCount: number;
  archivedCount: number;
  onTabChange: (tab: Tab) => void;
  onNewChat: () => void;
}

export function MessagesSidebar({ activeTab, unreadCount, archivedCount, onTabChange, onNewChat }: MessagesSidebarProps) {
  return (
    <aside className="hidden lg:flex h-full w-72 border-r border-border bg-secondary/30 flex-col p-5">
      <div className="mb-6">
        <h2 className="text-2xl font-heading text-foreground">Messages</h2>
        <p className="text-sm text-muted-foreground">Manage your guest conversations</p>
      </div>
      <Button className="w-full rounded-full mb-6" onClick={onNewChat}>
        <Plus className="h-4 w-4" />
        New Chat
      </Button>
      <nav className="space-y-2 text-sm">
        <button 
          onClick={() => onTabChange('inbox')}
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
          onClick={() => onTabChange('archive')}
          className={`w-full rounded-full px-4 py-2 text-left transition-colors ${
            activeTab === 'archive' 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary text-muted-foreground'
          }`}
        >
          Archive {archivedCount > 0 && (
            <span className="ml-2 text-xs opacity-70">({archivedCount})</span>
          )}
        </button>
        <button 
          onClick={() => onTabChange('requests')}
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
  );
}
