
import React from 'react';

interface CTAButtonProps {
  text: string;
  className?: string;
  fullWidth?: boolean;
  message?: string;
  variant?: 'primary' | 'success' | 'outline';
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  text, 
  className = "", 
  fullWidth = false, 
  message = "Olá! Gostaria de saber mais sobre a Thor4Tech.",
  variant = 'primary'
}) => {
  // Garantindo o número correto
  const phoneNumber = "5511980470203";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const baseStyles = "relative overflow-hidden group font-extrabold rounded-xl transition-all duration-300 ease-out transform hover:-translate-y-1 tracking-wider uppercase text-center inline-block cursor-pointer flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent-blue to-royal-blue hover:from-accent-orange hover:to-orange-600 text-white shadow-lg hover:shadow-2xl border border-white/10",
    success: "bg-gradient-to-r from-neon-green to-green-600 text-dark-blue hover:to-neon-green hover:text-black shadow-[0_0_20px_#00ff0d] hover:shadow-[0_0_40px_#00ff0d] border border-neon-green/50",
    outline: "bg-transparent border-2 border-accent-blue text-white hover:bg-accent-blue hover:text-white hover:shadow-glow-blue"
  };

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${baseStyles}
        ${variants[variant]}
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
