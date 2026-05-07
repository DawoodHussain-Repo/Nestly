'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button3D({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children,
  disabled,
  ...props 
}: Button3DProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[0_6px_0_var(--color-primary-dark)] active:shadow-[0_2px_0_var(--color-primary-dark)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-on-secondary)] shadow-[0_6px_0_var(--color-stone-dark)] active:shadow-[0_2px_0_var(--color-stone-dark)]',
    outlined: 'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] shadow-[0_6px_0_var(--color-primary)] active:shadow-[0_2px_0_var(--color-primary)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        y: -3,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const handleMouseDown = () => {
      gsap.to(button, {
        y: 4,
        duration: 0.1,
        ease: 'power2.in'
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        y: -3,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, [disabled]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative rounded-full font-semibold transition-all duration-200',
        'will-change-transform',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
