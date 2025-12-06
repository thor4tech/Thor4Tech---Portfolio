
import React from 'react';

interface CTAButtonProps {
  text: string;
  className?: string;
  fullWidth?: boolean;
  message?: string; // Mensagem personalizada para o WhatsApp
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  text, 
  className = "", 
  fullWidth = false, 
  message = "Olá! Gostaria de saber mais sobre a Thor4Tech." 
}) => {
  const phoneNumber = "5511980470203";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative overflow-hidden group
        bg-gradient-to-r from-accent-blue to-royal-blue hover:from-accent-orange hover:to-orange-600
        text-white font-extrabold py-4 px-8 rounded-xl shadow-lg 
        transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-2xl
        border border-white/10 tracking-wider uppercase text-center inline-block cursor-pointer
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
    >
      {/* Shine Effect */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {text}
      </span>
    </a>
  );
};

export default CTAButton;
