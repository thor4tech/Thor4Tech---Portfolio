
import React from 'react';
import CTAButton from './CTAButton';
import { Globe2 } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section className="bg-royal-blue relative overflow-hidden py-24">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
         <Globe2 className="w-[800px] h-[800px] absolute -right-64 -top-64 text-white" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-2 text-sm font-bold mb-8 uppercase tracking-widest">
          Nomes que inspiram. Conteúdos que transformam.
        </div>
        
        <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-10 leading-tight">
          🌍 Thor4Tech em <br/> <span className="text-neon-green">5 Anos de Performance</span>
        </h2>
        
        <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-sm mb-12 text-left lg:text-center shadow-xl">
          <p className="text-lg lg:text-xl leading-relaxed text-white/90 font-roboto">
            Ao longo dos <span className="font-bold text-white">últimos cinco anos</span>, gerenciamos mais de <span className="font-bold text-neon-green">150 empresas</span>, criando, testando e escalando estratégias de tráfego pago no Brasil e em mercados internacionais (Portugal, Inglaterra, Europa).
            <br/><br/>
            Com mais de <span className="font-bold text-neon-green">5 milhões de reais gerenciados</span> em anúncios e mais de <span className="font-bold text-neon-green">15 milhões gerados em faturamento</span>, acumulamos dados e expertise para construir campanhas <span className="font-bold text-white">previsíveis, lucrativas e consistentes</span>. 
            <br/><br/>
            Resultados que vão desde pequenos negócios locais até operações multinacionais, impulsionados por <span className="font-bold border-b-2 border-neon-green">performance, estratégia e execução precisa.</span>
          </p>
        </div>

        <CTAButton 
          text="QUERO ME INSCREVER NA MENTORIA" 
          message="Olá Rafael! Tenho interesse na Mentoria e na gestão da Thor4Tech."
          className="!bg-white !text-royal-blue hover:!bg-dark-blue hover:!text-white font-black text-lg px-10 py-5 shadow-2xl hover:shadow-none" 
        />
      </div>
    </section>
  );
};

export default Experience;
