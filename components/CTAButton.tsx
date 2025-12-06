import React from 'react';

interface CTAButtonProps {
  text: string;
  className?: string;
  fullWidth?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, className = "", fullWidth = false }) => {
  return (
    <button 
      className={`
        bg-gradient-to-r from-accent-blue to-royal-blue hover:from-accent-orange hover:to-orange-600
        text-white font-extrabold py-4 px-8 rounded-xl shadow-lg 
        transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-2xl
        border border-white/10 tracking-wider uppercase
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default CTAButton;