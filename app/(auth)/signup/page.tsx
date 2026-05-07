"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AuthInputField } from "@/components/auth/auth-input-field";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function SignupPage() {
  const { visible: showPassword, toggle } = usePasswordVisibility();
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to create account");
        return;
      }

      setUser(data.user);
      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <AuthInputField
              id="firstName"
              name="firstName"
              label="First Name"
              icon={User}
              placeholder="John"
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                if (errors.firstName) setErrors({ ...errors, firstName: "" });
              }}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>
          <div>
            <AuthInputField
              id="lastName"
              name="lastName"
              label="Last Name"
              icon={User}
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                if (errors.lastName) setErrors({ ...errors, lastName: "" });
              }}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <AuthInputField
            id="email"
            name="email"
            label="Email Address"
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
            placeholder="Create a strong password"
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

        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              required
              className="mt-1"
              checked={formData.terms}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, terms: checked as boolean });
                if (errors.terms) setErrors({ ...errors, terms: "" });
              }}
            />
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
          {errors.terms && (
            <p className="mt-1 text-sm text-destructive">{errors.terms}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-12 rounded-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
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
