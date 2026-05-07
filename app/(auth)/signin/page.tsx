"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AuthInputField } from "@/components/auth/auth-input-field";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function SigninPage() {
  const { visible: showPassword, toggle } = usePasswordVisibility();
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to sign in");
        return;
      }

      setUser(data.user);
      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <AuthInputField
            id="email"
            name="email"
            label="Email address"
            icon={Mail}
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div>
          <AuthInputField
            id="password"
            name="password"
            label="Password"
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
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
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={formData.remember}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, remember: checked as boolean })
              }
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal">
              Remember me
            </Label>
          </div>
          <Link href="#" className="text-sm text-primary hover:underline underline-offset-4">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12 rounded-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
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
