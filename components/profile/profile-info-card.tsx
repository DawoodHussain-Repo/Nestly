import { Mail, User, Calendar, Shield, LogOut } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";

interface ProfileInfoCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export function ProfileInfoCard({ user, onLogout }: ProfileInfoCardProps) {
  return (
    <div className="bg-card border border-border rounded-3xl p-8 mb-6 shadow-lg">
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
        {/* Email */}
        <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email Address</p>
            <p className="font-semibold">{user.email}</p>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
            <p className="font-semibold">{user.name}</p>
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Member Since</p>
            <p className="font-semibold">May 2026</p>
          </div>
        </div>

        {/* Account Status */}
        <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Account Status</p>
            <p className="font-semibold text-green-600">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
