// Supporting Components for Login Modal
// These components can be used alongside the main LoginModal

import React from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Error Component
interface AuthErrorProps {
  message: string;
  onDismiss?: () => void;
}

export function AuthError({ message, onDismiss }: AuthErrorProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
      <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
      <div className="flex-1">
        <p className="text-red-700 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 ml-2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// Success Component
interface AuthSuccessProps {
  message: string;
  onDismiss?: () => void;
}

export function AuthSuccess({ message, onDismiss }: AuthSuccessProps) {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
      <CheckCircle className="text-green-500 mr-3 mt-0.5" size={20} />
      <div className="flex-1">
        <p className="text-green-700 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-green-400 hover:text-green-600 ml-2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// Loading Component
interface AuthLoadingProps {
  message?: string;
}

export function AuthLoading({ message = "Loading..." }: AuthLoadingProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-blue-600 mr-3" size={20} />
      <span className="text-gray-600 text-sm">{message}</span>
    </div>
  );
}

// Google Auth Button Component
interface GoogleAuthButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function GoogleAuthButton({ onClick, isLoading, disabled }: GoogleAuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
      ) : (
        <>
          <FcGoogle size={20} className="mr-3" />
          Continue with Google
        </>
      )}
    </button>
  );
}

// Password Input Component
interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
  error,
  disabled,
  showPassword = false,
  onTogglePassword
}: PasswordInputProps) {
  return (
    <div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={disabled}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Email Input Component
interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export function EmailInput({
  value,
  onChange,
  placeholder = "Enter your email",
  error,
  disabled
}: EmailInputProps) {
  return (
    <div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Form Field Component
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

export function FormField({ label, children, required = false }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`relative w-full ${sizeClasses[size]} mx-4 bg-white rounded-2xl shadow-2xl`}>
        {title && (
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// Input Component
interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled,
  icon,
  className = ''
}: InputProps) {
  return (
    <div className={className}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
