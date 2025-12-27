
import React from 'react';
import CTAButton from './CTAButton';
import { Star, PlayCircle, Brain, Rocket, Target } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-deep-navy">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-20 mix-blend-screen"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-2794-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/95 via-dark-blue/80 to-deep-navy"></div>
        {/* Mobile Light Spot */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,136,229,0.25),_transparent_70%)] md:hidden"></div>
      </div>

      {/* Mobile Top CTA (Floating Persuasive Bar) */}
      <div className="absolute top-4 left-0 w-full z-50 px-4 md:hidden animate-fade-in-up">
        <div className="bg-glass-heavy/90 backdrop-blur-xl border border-neon-green/60 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,255,13,0.15)] text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
           <p className="text-xs font-black text-white leading-tight tracking-wide relative z-10">
             A ÚNICA ESTRATÉGIA QUE UNE <span className="text-neon-green">TRÁFEGO + IA</span> PARA ESCALAR SEU NEGÓCIO
           </p>
        </div>
      </div>
      
      {/* Animated Glow Orbs (Desktop) */}
      <div className="hidden lg:block absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="hidden lg:block absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>

      {/* Floating Elements - Repositioned for Mobile to avoid emptiness */}
      <div className="absolute top-28 left-4 md:top-24 md:left-20 animate-float opacity-40 md:opacity-30 z-20">
         <Brain size={48} className="text-accent-blue md:w-16 md:h-16" />
      </div>
      <div className="absolute top-36 right-4 md:top-32 md:right-32 animate-float opacity-40 md:opacity-30 z-20" style={{ animationDelay: '2s' }}>
         <Rocket size={40} className="text-accent-orange md:w-12 md:h-12" />
      </div>
      <div className="absolute bottom-40 left-8 md:bottom-32 md:left-1/2 animate-float opacity-30 md:opacity-20 z-20" style={{ animationDelay: '4s' }}>
         <Target size={40} className="text-neon-green md:w-14 md:h-14" />
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full pt-32 lg:pt-0">
        
        {/* Left Content */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in-up pb-20 lg:pb-0 -mt-20 lg:mt-0 relative z-30">
          
          {/* Desktop Logo Position */}
          <div className="hidden lg:block mb-2">
             <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(30,136,229,0.6)]">
               THOR<span className="text-accent-blue">4</span>TECH
             </h2>
             <p className="text-[8px] lg:text-[10px] tracking-[0.6em] text-accent-blue uppercase text-left mt-1 pl-1">Soluções Tecnológicas</p>
          </div>

          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#00ff0d]"></div>
            <span className="text-xs font-bold tracking-widest text-white uppercase">Método Validado • +150 Empresas</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-extrabold leading-none tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400 drop-shadow-sm block">RESULTADOS!</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-300 font-roboto leading-relaxed max-w-xl">
             Combinamos <b className="text-white">Inteligência Artificial</b>, <b className="text-white">automação profunda</b> e <b className="text-accent-orange">tráfego pago</b> para gerar escala, previsibilidade e <b className="text-neon-green border-b border-neon-green/50">faturamento real</b>.
          </p>

          <div className="bg-gradient-to-r from-white/10 to-transparent p-5 rounded-2xl border-l-4 border-accent-blue backdrop-blur-md w-full max-w-md shadow-lg flex items-center justify-between">
             <div className="flex flex-col text-left">
               <div className="flex text-yellow-400 mb-1">
                 {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={18} />)}
               </div>
               <span className="text-xs text-gray-400 font-medium">Classificação média 5.0</span>
             </div>
             <div className="h-10 w-[1px] bg-white/10"></div>
             <div className="text-right">
                <span className="block text-3xl font-black text-white">+15MM</span>
                <span className="text-[10px] text-accent-blue uppercase tracking-widest font-bold">Gerados em Vendas</span>
             </div>
          </div>

          <div className="pt-6 w-full lg:w-auto flex flex-col sm:flex-row gap-5 mb-10 lg:mb-0">
            <CTAButton 
              text="QUERO ME INSCREVER" 
              message="Olá! Vi o site e quero escalar minha empresa com Tráfego e IA." 
              variant="success"
              fullWidth={false} 
              className="px-10 py-5 text-lg w-full sm:w-auto shadow-[0_0_30px_rgba(0,255,13,0.5)] border-neon-green"
            />
            <button className="flex items-center justify-center space-x-3 text-white font-bold px-8 py-5 rounded-xl border border-white/20 hover:bg-white/5 transition-all hover:border-accent-blue group w-full sm:w-auto">
               <PlayCircle size={24} className="text-accent-blue group-hover:scale-110 transition-transform" />
               <span>Ver Vídeo</span>
            </button>
          </div>
        </div>

        {/* Right Image - Rafael */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative group h-[85vh] lg:h-[850px] items-end overflow-visible w-full mt-[-10vh] lg:mt-0 pointer-events-none">
          {/* Back Glow */}
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-accent-blue/20 to-transparent blur-3xl rounded-full"></div>
          
          {/* Main Character - z-30 on desktop to stay IN FRONT of the card (z-20) */}
          <img 
            src="https://pages.greatpages.com.br/www.acria.com.br-rafaeltorquato/1764124767/imagens/desktop/3415726_1_1763478509691c8bedc91ef350645611.png" 
            alt="Rafael Torquato"
            className="relative z-10 lg:z-30 h-full w-auto object-cover object-top filter contrast-110 transform scale-125 lg:scale-105 translate-y-10 lg:translate-y-0"
          />
          
          {/* Gradient Mask for Bottom Cut-off - Removed Solid Fog Bar */}
          <div className="absolute bottom-0 left-0 w-full h-64 lg:h-80 bg-gradient-to-t from-deep-navy via-deep-navy/90 to-transparent z-40"></div>
          
          {/* Floating Stats Card - Mobile: Bottom-32 | Desktop: Top-42% */}
          <div className="absolute bottom-32 left-8 lg:bottom-auto lg:top-[42%] lg:right-12 bg-dark-blue/90 backdrop-blur-xl p-8 rounded-3xl border border-accent-blue/30 shadow-[0_0_30px_rgba(30,136,229,0.3)] animate-float z-50 lg:z-20 transform scale-110 lg:scale-125 origin-bottom-left lg:origin-bottom-right pointer-events-auto">
             <div className="flex items-center space-x-5">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-tr from-accent-blue to-cyan-400 flex items-center justify-center text-white font-black text-lg lg:text-xl shadow-lg">ROAS</div>
                <div>
                   <div className="text-xs lg:text-sm text-gray-400 uppercase tracking-wider font-bold mb-1">Retorno Médio</div>
                   <div className="text-4xl lg:text-5xl font-black text-white leading-none">20x 🚀</div>
                </div>
             </div>
          </div>

          {/* LOGO MOBILE FIXO - Abaixo do Card ROAS (Left Aligned) */}
          <div className="absolute bottom-10 left-8 z-50 lg:hidden pointer-events-auto">
             <h2 className="text-3xl font-black italic tracking-tighter text-white drop-shadow-md">
               THOR<span className="text-accent-blue">4</span>TECH
             </h2>
             <p className="text-[8px] tracking-[0.6em] text-accent-blue uppercase text-left mt-1 pl-1">Soluções Tecnológicas</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
