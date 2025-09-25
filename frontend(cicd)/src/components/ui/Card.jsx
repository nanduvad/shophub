import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  to,
  href,
  onClick,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-dark-100',
    elevated: 'bg-white shadow-soft',
    flat: 'bg-dark-50',
    outline: 'bg-white border border-dark-200',
  };

  // Hover effect
  const hoverStyles = hover ? 'hover:shadow-hover transition-all duration-300' : '';

  const baseStyles = `
    rounded-xl overflow-hidden
    ${variantStyles[variant] || variantStyles.default}
    ${hoverStyles}
    ${className}
  `;

  // Render as Link if 'to' prop is provided (for internal routing)
  if (to) {
    return (
      <Link to={to} className={baseStyles} {...props}>
        {children}
      </Link>
    );
  }

  // Render as anchor if 'href' prop is provided (for external links)
  if (href) {
    return (
      <a href={href} className={baseStyles} {...props}>
        {children}
      </a>
    );
  }

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button onClick={onClick} className={baseStyles} {...props}>
        {children}
      </button>
    );
  }

  // Render as div by default
  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
};

// Card subcomponents
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`p-4 border-b border-dark-100 ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`p-4 border-t border-dark-100 ${className}`} {...props}>
    {children}
  </div>
);

Card.Image = ({ src, alt = '', className = '', ...props }) => (
  <div className="relative w-full overflow-hidden">
    <img 
      src={src} 
      alt={alt} 
      className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${className}`}
      {...props}
    />
  </div>
);

Card.Title = ({ children, className = '', ...props }) => (
  <h3 className={`font-medium text-dark-900 ${className}`} {...props}>
    {children}
  </h3>
);

export default Card;