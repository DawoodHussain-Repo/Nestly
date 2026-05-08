import { Home, MessageSquare, Settings } from "lucide-react";
import { ActionCard } from "@/components/ui/action-card";

interface QuickActionsProps {
  onBrowseListings: () => void;
  onViewMessages: () => void;
  onOpenSettings: () => void;
}

const actions = [
  {
    icon: Home,
    title: "Browse Listings",
    description: "Find your perfect stay",
    key: "browse" as const,
  },
  {
    icon: MessageSquare,
    title: "Messages",
    description: "Check your conversations",
    key: "messages" as const,
  },
  {
    icon: Settings,
    title: "Settings",
    description: "Manage preferences",
    key: "settings" as const,
  },
];

export function QuickActions({ onBrowseListings, onViewMessages, onOpenSettings }: QuickActionsProps) {
  const handlers = {
    browse: onBrowseListings,
    messages: onViewMessages,
    settings: onOpenSettings,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <ActionCard
          key={action.key}
          icon={action.icon}
          title={action.title}
          description={action.description}
          onClick={handlers[action.key]}
        />
      ))}
    </div>
  );
}
