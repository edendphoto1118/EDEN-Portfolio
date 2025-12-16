import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number; // delay in ms
}

const Section: React.FC<SectionProps> = ({ children, className = "", id, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Section;