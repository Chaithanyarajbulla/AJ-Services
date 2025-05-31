import React from 'react';

// This is a simple animation library wrapper to prevent direct imports
// of framer-motion which isn't installed in this project.
// We're creating a minimal API to handle basic animations

export type MotionProps = {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

// A simplified motion component that uses CSS transitions instead of a full animation library
export function motion<T extends keyof JSX.IntrinsicElements>(tagName: T) {
  return function MotionComponent({ 
    initial, 
    animate, 
    transition, 
    className = "", 
    style = {}, 
    children, 
    ...props 
  }: MotionProps & JSX.IntrinsicElements[T]) {
    // Convert transition settings to CSS
    const transitionStyle = transition ? {
      transitionProperty: 'all',
      transitionDuration: `${transition.duration || 0.3}s`,
      transitionDelay: transition.delay ? `${transition.delay}s` : '0s',
      transitionTimingFunction: transition.ease ? 'ease' : 'ease-in-out',
    } : {};

    // Combine the animation styles with any passed-in styles
    const combinedStyle = {
      ...style,
      ...transitionStyle,
      ...animate, // Apply the "animate" styles directly
    };

    // Create the element with the given tag name
    const Tag = tagName as any;
    return (
      <Tag
        className={className}
        style={combinedStyle}
        {...props}
      >
        {children}
      </Tag>
    );
  };
}

// Add common element types
motion.div = motion('div');
motion.span = motion('span');
motion.button = motion('button');