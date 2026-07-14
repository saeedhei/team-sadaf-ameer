import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  className = '',
  variant = 'default',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    default: 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 border border-blue-600',
    secondary: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-blue-100 shadow-sm',
    ghost: 'hover:bg-slate-100/80 text-slate-600',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10 border border-rose-600'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2.5 text-xs sm:text-sm',
    lg: 'px-5 py-3 text-sm sm:text-base rounded-2xl'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
