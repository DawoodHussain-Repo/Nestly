"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AuthInputField } from "@/components/auth/auth-input-field";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";

export default function SigninPage() {
  const { visible: showPassword, toggle } = usePasswordVisibility();

  return (
    <AuthPageShell
      title="Welcome Back"
      subtitle="Sign in to continue your journey"
      quote="I have been hosting with Nestly for over two years. The platform is smooth and reliable."
      quoteAuthor="Michael Chen"
      quoteRole="Superhost in San Francisco"
      imageSrc="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80"
      imageAlt="Beautiful hotel pool"
      imageOnRight={false}
    >
      <form className="space-y-5">
        <AuthInputField
          id="email"
          name="email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="john@example.com"
          required
        />

        <AuthInputField
          id="password"
          name="password"
          label="Password"
          icon={Lock}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal">
              Remember me
            </Label>
          </div>
          <Link href="#" className="text-sm text-primary hover:underline underline-offset-4">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12 rounded-full">
          Sign In
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <AuthSocialButtons />

      <p className="mt-8 text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </AuthPageShell>
  );
}
