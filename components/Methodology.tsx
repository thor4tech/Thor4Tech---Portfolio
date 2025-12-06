
import React from 'react';
import CTAButton from './CTAButton';
import { Bot, Zap } from 'lucide-react';

const Methodology: React.FC = () => {
  return (
    <section className="bg-white text-dark-blue py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="flex space-x-4 mb-6">
            <div className="flex items-center space-x-2 bg-dark-blue/5 px-4 py-2 rounded-lg">
                <Bot className="text-accent-blue" />
                <span className="font-bold">IA Avançada</span>
            </div>
            <div className="flex items-center space-x-2 bg-dark-blue/5 px-4 py-2 rounded-lg">
                <Zap className="text-accent-orange" />
                <span className="font-bold">Tráfego Turbo</span>
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl leading-tight font-sans font-extrabold mb-6">
            <span className="text-accent-blue">IA + TRÁFEGO PAGO</span> <br/>
            INTEGRADOS
          </h2>
          <h3 className="text-2xl text-gray-600 font-medium mb-8">
            A tecnologia que transforma desconhecidos em clientes todos os dias.
          </h3>
          <div className="h-1 w-20 bg-accent-orange mb-8"></div>
        </div>
        
        <div className="space-y-8">
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-roboto">
            Unimos Inteligência Artificial, tráfego pago e automação estratégica para criar um sistema que <span className="font-bold text-dark-blue bg-blue-100 px-1">atrai, atende e converte</span> novos clientes enquanto você foca no que importa. 
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-roboto">
            Seu negócio passa a operar com mais velocidade, mais previsibilidade e muito mais resultado.
          </p>
          <div className="pt-4">
            <CTAButton 
              text="SAIBA MAIS" 
              message="Olá! Gostaria de entender melhor como a metodologia IA + Tráfego funciona para meu negócio."
              className="!bg-dark-blue hover:!bg-accent-orange text-white px-8 py-4 shadow-xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
