"use client";

import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col md:flex-row">
      {/* Left Panel (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-surface-container)] flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 mix-blend-multiply"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Crect fill=%22%23e3e2e2%22 width=%221200%22 height=%22800%22/%3E%3C/svg%3E)',
          }}
        ></div>

        <div className="relative z-10">
          {/* Brand Logo */}
          <Link
            href="/"
            className="text-3xl font-serif font-bold text-[var(--color-primary)] tracking-tight block mb-16"
          >
            nestly
          </Link>

          {/* Hero Quote */}
          <h1 className="w-full text-4xl font-serif font-bold text-[var(--color-on-surface)] leading-tight mb-8">
            Welcome back to your next adventure.
          </h1>

          {/* Benefits */}
          <ul className="w-full space-y-6 mb-8">
            {[
              "Manage your property bookings and guest communications.",
              "Quick access to your messages and notifications.",
              "Track your booking history and upcoming stays.",
            ].map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-lg text-[var(--color-secondary)]"
              >
                <span
                  className="material-symbols-outlined text-[var(--color-primary)] mt-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10">
          {/* Subtle Stat */}
          <p className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-widest">
            Trusted by millions worldwide
          </p>
        </div>
      </div>

      {/* Right Panel (Form Area) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:p-12 bg-[var(--color-surface)] min-h-screen lg:min-h-0">
        <div className="w-full max-w-xl bg-[var(--color-surface-container-lowest)] rounded-xl p-8 sm:p-10 border border-[var(--color-surface-dim)] shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="lg:hidden text-2xl font-serif font-semibold text-[var(--color-primary)] tracking-tight block mb-6 text-center"
          >
            nestly
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-semibold text-[var(--color-on-surface)] mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-[var(--color-secondary)]">
              Sign in to your account to continue
            </p>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[var(--color-surface-dim)] hover:bg-[var(--color-surface-container)] transition-colors duration-200">
              <span className="text-sm font-semibold text-[var(--color-on-surface)]">
                Continue with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[var(--color-surface-dim)] hover:bg-[var(--color-surface-container)] transition-colors duration-200">
              <span className="material-symbols-outlined text-[var(--color-on-surface)]">
                ios
              </span>
              <span className="text-sm font-semibold text-[var(--color-on-surface)]">
                Continue with Apple
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-[var(--color-surface-dim)]"></div>
            <span className="px-3 text-xs text-[var(--color-secondary)] uppercase">
              Or sign in with email
            </span>
            <div className="flex-grow border-t border-[var(--color-surface-dim)]"></div>
          </div>

          {/* Sign In Form */}
          <form className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[var(--color-secondary)]">
                    mail
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] placeholder:text-[var(--color-secondary)] transition-all outline-none"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  required
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[var(--color-secondary)]">
                    lock
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] placeholder:text-[var(--color-secondary)] transition-all outline-none"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-secondary)] hover:text-[var(--color-on-surface)] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 rounded bg-[var(--color-surface-container)] border-transparent text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer transition-colors"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm text-[var(--color-secondary)] cursor-pointer"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <a
                className="text-sm font-medium text-[var(--color-primary)] hover:underline underline-offset-2"
                href="#"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                className="w-full py-3 px-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-full text-sm font-semibold hover:bg-[var(--color-primary-container)] transition-colors duration-200 shadow-sm hover:shadow"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-secondary)]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[var(--color-primary)] font-semibold hover:underline underline-offset-2 transition-all"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
