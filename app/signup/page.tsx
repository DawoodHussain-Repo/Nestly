"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AuthInputField } from "@/components/auth/auth-input-field";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";

export default function SignupPage() {
  const { visible: showPassword, toggle } = usePasswordVisibility();

  return (
    <AuthPageShell
      title="Create Account"
      subtitle="Join a curated travel community"
      quote="Nestly helped us find our dream stay in days, not weeks."
      quoteAuthor="Sarah Johnson"
      quoteRole="Traveled to Bali"
      imageSrc="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"
      imageAlt="Luxury resort"
      imageOnRight
    >
      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInputField id="firstName" name="firstName" label="First Name" icon={User} placeholder="John" required />
          <AuthInputField id="lastName" name="lastName" label="Last Name" icon={User} placeholder="Doe" required />
        </div>

        <AuthInputField id="email" name="email" label="Email Address" icon={Mail} type="email" placeholder="john@example.com" required />
        <AuthInputField
          id="password"
          name="password"
          label="Password"
          icon={Lock}
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password"
          required
          rightAdornment={
            <button
              type="button"
              onClick={toggle}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        <div className="flex items-start gap-3">
          <Checkbox id="terms" required className="mt-1" />
          <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal leading-relaxed">
            I agree to the{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full h-12 rounded-full">
          Create Account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <AuthSocialButtons />

      <p className="mt-8 text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </AuthPageShell>
  );
}
