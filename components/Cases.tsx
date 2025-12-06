
import React from 'react';
import CTAButton from './CTAButton';
import { TrendingUp, Wallet, Users, Clock } from 'lucide-react';

const CaseCard = ({ name, type, description, stats, image, estimatedRevenue }: any) => (
  <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden mb-20 backdrop-blur-md hover:border-accent-blue/50 transition-all duration-500 shadow-card hover:shadow-glow-blue">
    <div className="grid lg:grid-cols-12 gap-0">
      
      {/* Visual Section */}
      <div className="lg:col-span-5 relative h-96 lg:h-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent lg:bg-gradient-to-r z-10 opacity-60"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000"
        />
        
        <div className="absolute bottom-8 left-8 z-20">
           <div className="bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-xl border-l-4 border-neon-green shadow-lg">
             <h3 className="text-lg font-bold text-white tracking-widest uppercase">{name}</h3>
           </div>
        </div>
      </div>

      {/* Data Section */}
      <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center relative">
        <div className="inline-flex w-fit items-center space-x-2 bg-accent-blue/20 border border-accent-blue/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
          <span className="text-xs font-bold text-accent-blue uppercase tracking-wider">{type}</span>
        </div>

        <h4 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
          Transformação & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-500">Escala Previsível</span>
        </h4>
        
        <div className="text-gray-300 mb-10 space-y-4 leading-relaxed font-roboto text-lg" dangerouslySetInnerHTML={{ __html: description }}></div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="bg-dark-blue/40 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                {index === 0 ? <Wallet size={16} /> : index === 1 ? <TrendingUp size={16} /> : index === 2 ? <Users size={16} /> : <Clock size={16} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-white font-bold text-lg lg:text-xl font-sans">{stat.value}</div>
            </div>
          ))}
        </div>

        {estimatedRevenue && (
           <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-neon-green to-transparent mb-8 shadow-[0_0_15px_rgba(0,255,13,0.15)]">
             <div className="relative bg-[#0a1625] rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-neon-green/20 p-3 rounded-full">
                    <TrendingUp className="text-neon-green" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Faturamento Estimado</p>
                    <p className="text-2xl lg:text-3xl font-black text-white font-sans tracking-tight">{estimatedRevenue}</p>
                  </div>
                </div>
             </div>
           </div>
        )}
        
        <div className="flex justify-start">
          <CTAButton 
            text="QUERO ESSES NÚMEROS" 
            message="Olá! Vi os cases de sucesso no site e quero ter essa previsibilidade de faturamento."
            variant="outline"
            className="w-full sm:w-auto py-4 px-10 text-sm hover:shadow-glow-orange" 
          />
        </div>
      </div>
    </div>
  </div>
);

const Cases: React.FC = () => {
  const cases = [
    {
      name: "Palestrante", // Renamed from Pedro Stivalli
      type: "Diagnóstico e Clareza",
      description: "Implementamos a estratégia completa <span class='text-white font-bold'>C1, C2 e C3 com IA no Direct e WhatsApp</span>. Com investimento médio de <span class='text-accent-orange font-bold'>R$ 8 mil/mês</span> e ticket de R$ 5 mil, o método Infinite escala há 3 anos com total previsibilidade.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop", 
      stats: [
        { label: "Investimento", value: "R$ 377.535,82" },
        { label: "Campanhas", value: "949 Ativas" },
        { label: "Alcance", value: "13.5M+ Pessoas" },
        { label: "Tempo", value: "3 Anos" },
      ],
      estimatedRevenue: "R$ 1MM a R$ 3MM"
    },
    {
      name: "Pizzaria Floratta",
      type: "Delivery Scale",
      description: "Otimizamos criativos e fortalecemos o funil de vendas diretas e recorrência. Foco total em <span class='text-white font-bold'>LTV (Lifetime Value)</span> e redução de CAC.",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop",
      stats: [
        { label: "Investimento", value: "R$ 25.132,35" },
        { label: "Campanhas", value: "24 Otimizadas" },
        { label: "Alcance", value: "5.5M+ Pessoas" },
        { label: "Foco", value: "Venda Direta" },
      ],
      estimatedRevenue: "R$ 448.749,59"
    },
    {
      name: "Rally Centro Automotivo",
      type: "Vendas WhatsApp",
      description: "Criamos um fluxo intenso de <span class='text-white font-bold'>mensagens qualificadas no WhatsApp</span>, aumentando o giro de pneus e elevando o ticket médio.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop",
      stats: [
        { label: "Investimento", value: "R$ 101.359,39" },
        { label: "Leads", value: "20k+ Conversas" },
        { label: "Conversão", value: "10% Real" },
        { label: "Ticket", value: "R$ 1.200+" },
      ],
      estimatedRevenue: "R$ 2.6MM a R$ 2.8MM"
    }
  ];

  return (
    <section className="bg-deep-navy py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-deep-navy to-deep-navy"></div>
      
      <div className="container mx-auto px-4 text-center mb-20 relative z-10">
        <span className="text-accent-blue font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-pulse">Book de Resultados</span>
        <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tight">
          CASES DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-white to-accent-orange">SUCESSO</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">
          Números não mentem. Veja como transformamos investimento em lucro líquido.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {cases.map((c, i) => <CaseCard key={i} {...c} />)}
      </div>
    </section>
  );
};

export default Cases;
