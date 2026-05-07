import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  footerText?: string
  footerLink?: {
    text: string
    href: string
  }
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 bg-primary rounded-sm flex-center">
            <span className="text-white font-serif font-bold text-lg">N</span>
          </div>
          <span className="font-serif text-xl font-bold text-foreground">Nestly</span>
        </Link>

        {/* Form Container */}
        <div className="card card-padding">
          {/* Title */}
          <h1 className="heading-h3 text-center mb-2">{title}</h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="body-sm text-center text-muted-foreground mb-8">{subtitle}</p>
          )}

          {/* Form Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>

        {/* Footer Link */}
        {footerText && footerLink && (
          <p className="body-sm text-center text-muted-foreground mt-6">
            {footerText}{' '}
            <Link href={footerLink.href} className="text-primary hover:underline font-medium">
              {footerLink.text}
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
