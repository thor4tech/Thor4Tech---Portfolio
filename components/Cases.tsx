
import React from 'react';
import CTAButton from './CTAButton';
import { CheckCircle2, TrendingUp, ArrowRight, Wallet, Users, Clock } from 'lucide-react';

const CaseCard = ({ name, type, description, stats, image, logo, estimatedRevenue }: any) => (
  <div className="group relative bg-glass-heavy border border-white/5 rounded-[2rem] overflow-hidden mb-24 backdrop-blur-xl hover:border-accent-blue/50 transition-all duration-500 shadow-card">
    <div className="grid lg:grid-cols-12 gap-0">
      
      {/* Visual Section */}
      <div className="lg:col-span-5 relative h-96 lg:h-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue to-transparent lg:bg-gradient-to-r z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-40"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 filter saturate-0 group-hover:saturate-100"
        />
        
        {/* Logo Overlay - Conditional Rendering */}
        {logo && (
          <div className="absolute top-6 left-6 z-20 bg-white p-3 rounded-xl shadow-xl w-24 h-24 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
            <img src={logo} alt={`${name} logo`} className="w-full h-full object-contain" />
          </div>
        )}

        <div className="absolute bottom-6 left-6 z-20">
           <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-neon-green">
             <h3 className="text-lg font-bold text-white tracking-widest uppercase">{name}</h3>
           </div>
        </div>
      </div>

      {/* Data Section */}
      <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center relative">
        {/* Decorative Background Number */}
        <div className="absolute top-4 right-8 text-[120px] font-black text-white/5 select-none pointer-events-none">
          {name.includes("Pedro") ? "01" : name.includes("Floratta") ? "02" : "03"}
        </div>

        <div className="inline-flex w-fit items-center space-x-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-3 py-1 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
          <span className="text-xs font-bold text-accent-blue uppercase tracking-wider">{type}</span>
        </div>

        <h4 className="text-2xl lg:text-4xl font-extrabold text-white mb-6 leading-tight max-w-xl">
          Transformação Digital e <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-500">Escala Previsível</span>
        </h4>
        
        <div className="text-gray-300 mb-10 space-y-4 leading-relaxed font-roboto text-lg" dangerouslySetInnerHTML={{ __html: description }}></div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                {index === 0 ? <Wallet size={16} /> : index === 1 ? <TrendingUp size={16} /> : index === 2 ? <Users size={16} /> : <Clock size={16} />}
                <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-white font-bold text-lg lg:text-xl font-sans">{stat.value}</div>
            </div>
          ))}
        </div>

        {estimatedRevenue && (
           <div className="relative group/rev overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-neon-green/50 to-transparent mb-8">
             <div className="relative bg-deep-navy rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-neon-green/20 p-3 rounded-full">
                    <TrendingUp className="text-neon-green" size={28} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">Faturamento Estimado</p>
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
            className="w-full sm:w-auto py-4 px-8 text-sm shadow-none hover:shadow-neon transition-all" 
          />
        </div>
      </div>
    </div>
  </div>
);

const Cases: React.FC = () => {
  const cases = [
    {
      name: "Pedro Stivalli",
      type: "Diagnóstico e Clareza",
      description: "Implementamos a estratégia completa <span class='text-white font-bold'>C1, C2 e C3 com IA no Direct e WhatsApp</span>. Com investimento médio de <span class='text-accent-orange font-bold'>R$ 8 mil/mês</span> e ticket de R$ 5 mil, o método Infinite escala há 3 anos com total previsibilidade.",
      // Using a high-quality professional placeholder
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop", 
      logo: null,
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
      description: "Otimizamos criativos e fortalecemos o funil de vendas diretas e recorrência para as duas unidades. Foco total em <span class='text-white font-bold'>LTV (Lifetime Value)</span> e redução de CAC.",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop",
      logo: null, // Removed logo as requested
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
      description: "Criamos um fluxo intenso de <span class='text-white font-bold'>mensagens qualificadas no WhatsApp</span>, aumentando o giro de pneus e elevando o ticket médio para R$ 1.200,00.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop",
      logo: null, // Removed logo as requested
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
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-deep-navy to-deep-navy"></div>
      
      <div className="container mx-auto px-4 text-center mb-20 relative z-10">
        <span className="text-accent-blue font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-pulse">Book de Resultados</span>
        <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tight">
          CASES DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-white to-accent-orange">SUCESSO</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">
          Números não mentem. Veja como transformamos investimento em lucro líquido para nossos parceiros.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {cases.map((c, i) => <CaseCard key={i} {...c} />)}
      </div>
    </section>
  );
};

export default Cases;
