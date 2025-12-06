
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
        message="Olá! Estou navegando no site e preciso de atendimento imediato."
        variant="success"
        className="py-4 px-8 text-sm" 
      />
    </div>
  );
};

export default FloatingCTA;
