"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row font-body-md">
      {/* Left Panel (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-container flex-col justify-between p-xl relative overflow-hidden">
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
            className="text-headline-lg font-headline-lg text-primary tracking-tight block mb-xxl"
          >
            nestly
          </Link>

          {/* Hero Quote */}
          <h1 className="text-display-md font-display-md text-on-surface max-w-lg leading-tight mb-xl">
            Every great trip starts with finding the right space.
          </h1>

          {/* Benefits */}
          <ul className="gap-lg mb-xl max-w-md flex flex-col">
            {[
              "Access to thousands of verified, premium properties worldwide.",
              "Secure booking process with 24/7 dedicated support.",
              "Flexible cancellation policies for peace of mind.",
            ].map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start gap-sm text-body-lg font-body-lg text-secondary"
              >
                <span
                  className="material-symbols-outlined text-primary mt-1"
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
          <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
            Join over 2 million travelers globally
          </p>
        </div>
      </div>

      {/* Right Panel (Form Area) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:p-xl bg-surface min-h-screen lg:min-h-0">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-lg sm:p-xl border border-surface-dim shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="lg:hidden text-headline-md font-headline-md text-primary tracking-tight block mb-lg text-center"
          >
            nestly
          </Link>

          <div className="text-center mb-xl">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-sm">
              Create your account
            </h2>
            <p className="text-body-sm font-body-sm text-secondary">
              Welcome to the modern heritage of travel.
            </p>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-md mb-lg">
            <button className="w-full flex items-center justify-center gap-sm py-3 px-4 rounded-full border border-surface-dim hover:bg-surface-container transition-colors duration-200">
              <span className="text-label-lg font-label-lg text-on-surface">
                Continue with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-sm py-3 px-4 rounded-full border border-surface-dim hover:bg-surface-container transition-colors duration-200">
              <span className="material-symbols-outlined text-on-surface">
                ios
              </span>
              <span className="text-label-lg font-label-lg text-on-surface">
                Continue with Apple
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-lg">
            <div className="flex-grow border-t border-surface-dim"></div>
            <span className="px-3 text-label-sm font-label-sm text-secondary uppercase">
              Or sign up with email
            </span>
            <div className="flex-grow border-t border-surface-dim"></div>
          </div>

          {/* Sign Up Form */}
          <form className="flex flex-col gap-md">
            {/* Full Name */}
            <div>
              <label className="sr-only" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary">
                    person
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-full border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md text-on-surface placeholder-secondary transition-colors"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary">
                    mail
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-full border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md text-on-surface placeholder-secondary transition-colors"
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
                  <span className="material-symbols-outlined text-secondary">
                    lock
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-surface-container rounded-full border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md text-on-surface placeholder-secondary transition-colors"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary hover:text-on-surface transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="sr-only" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary">
                    lock
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-surface-container rounded-full border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md text-on-surface placeholder-secondary transition-colors"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  type="password"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-sm">
              <div className="flex items-center h-5">
                <input
                  className="h-4 w-4 rounded bg-surface-container border-transparent text-primary focus:ring-primary focus:ring-offset-surface-container-lowest cursor-pointer transition-colors"
                  id="terms"
                  name="terms"
                  required
                  type="checkbox"
                />
              </div>
              <div className="ml-3 text-body-sm font-body-sm">
                <label
                  className="text-secondary cursor-pointer"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a
                    className="text-primary hover:underline underline-offset-2"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-primary hover:underline underline-offset-2"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-sm">
              <button
                className="w-full py-3 px-4 bg-primary text-on-primary rounded-full text-label-lg font-label-lg hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 shadow-sm hover:shadow"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-lg text-center">
            <p className="text-body-sm font-body-sm text-secondary">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary font-label-lg hover:underline underline-offset-2 transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
