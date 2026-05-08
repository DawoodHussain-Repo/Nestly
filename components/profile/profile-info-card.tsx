import { Mail, User, Calendar, Shield, LogOut } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { InfoItem } from "@/components/ui/info-item";

interface ProfileInfoCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const profileFields = [
  { icon: Mail, label: "Email Address", key: "email" as const },
  { icon: User, label: "Full Name", key: "name" as const },
  { icon: Calendar, label: "Member Since", key: "memberSince" as const },
  { icon: Shield, label: "Account Status", key: "status" as const },
];

export function ProfileInfoCard({ user, onLogout }: ProfileInfoCardProps) {
  const fieldValues = {
    email: user.email,
    name: user.name,
    memberSince: "May 2026",
    status: "Active",
  };

  return (
    <div className="card-base elevation-lg p-8 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <Avatar 
          src={user.avatar || "/placeholder-user.jpg"} 
          name={user.name} 
          size="lg"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-heading font-bold mb-1">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button 
          variant="destructive" 
          onClick={onLogout}
          className="rounded-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileFields.map((field) => (
          <InfoItem
            key={field.key}
            icon={field.icon}
            label={field.label}
            value={fieldValues[field.key]}
            valueClassName={field.key === "status" ? "font-semibold text-green-600" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
