import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  href,
  to,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'bg-transparent border border-dark-200 text-dark-800 hover:bg-dark-50 focus:ring-dark-300',
    ghost: 'bg-transparent text-dark-800 hover:bg-dark-50 focus:ring-dark-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-xl',
    xl: 'text-lg px-8 py-4 rounded-xl',
  };

  const baseStyles = `
    inline-flex items-center justify-center font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const styles = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${className}
  `;

  // Loading and icon logic
  const content = (
    <>
      {isLoading && (
        <Loader2 className={`animate-spin ${children ? 'mr-2' : ''}`} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {!isLoading && icon && iconPosition === 'left' && (
        <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === 'right' && (
        <span className={`${children ? 'ml-2' : ''}`}>{icon}</span>
      )}
    </>
  );

  // Render as Link if 'to' prop is provided (for internal routing)
  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {content}
      </Link>
    );
  }

  // Render as anchor if 'href' prop is provided (for external links)
  if (href) {
    return (
      <a href={href} className={styles} {...props}>
        {content}
      </a>
    );
  }

  // Render as button by default
  return (
    <button
      type={type}
      className={styles}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;