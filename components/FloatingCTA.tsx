import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up md:hidden">
      <CTAButton 
        text="INSCREVER AGORA" 
        className="shadow-neon text-sm font-black py-4 px-8 border-2 border-white/20 backdrop-blur-md" 
      />
    </div>
  );
};

export default FloatingCTA;