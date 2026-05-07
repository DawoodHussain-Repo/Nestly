import { Button } from "@/components/ui/button";

export function AuthSocialButtons() {
  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Button variant="outline" className="w-full h-12 rounded-full border-border hover:bg-secondary">
          Google
        </Button>
      </div>
    </div>
  );
}
