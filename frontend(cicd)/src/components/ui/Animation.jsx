import React, { useState, useEffect, useRef } from 'react';

const Animation = ({
  children,
  type = 'fade',
  direction = 'up',
  duration = 500,
  delay = 0,
  threshold = 0.1,
  className = '',
  disabled = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold, disabled]);

  // Animation types
  const animationTypes = {
    fade: 'opacity-0',
    scale: 'opacity-0 scale-95',
    slide: `opacity-0 translate-${direction === 'up' ? 'y-10' : 
                                direction === 'down' ? 'y-[-10px]' : 
                                direction === 'left' ? 'x-10' : 'x-[-10px]'}`,
  };

  const animationStyle = {
    transition: `all ${duration}ms ease-out ${delay}ms`,
  };

  return (
    <div
      ref={domRef}
      className={`
        ${!isVisible ? animationTypes[type] || animationTypes.fade : 'opacity-100 transform-none'}
        ${className}
      `}
      style={animationStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Animation;