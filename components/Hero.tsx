import React from 'react';
import CTAButton from './CTAButton';
import { Star, ShieldCheck, PlayCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-deep-navy">
      {/* Video Background Fallback / Image */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-2794-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/90 via-dark-blue/80 to-dark-blue"></div>
      </div>
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-8 items-center h-full pt-20 lg:pt-0">
        
        {/* Left Content */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fade-in-up">
          
          {/* Logo Placeholder - User should replace src with local asset if available */}
          <div className="mb-4 animate-float">
             <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(30,136,229,0.8)]">
               THOR<span className="text-accent-blue">4</span>TECH
             </h2>
             <p className="text-[10px] tracking-[0.4em] text-accent-blue uppercase text-center mt-1">Soluções Tecnológicas</p>
          </div>

          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-glow-blue">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest text-white uppercase">Método Validado • +150 Empresas</span>
          </div>

          <h1 className="text-4xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400 drop-shadow-sm">RESULTADOS!</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-300 font-roboto leading-relaxed max-w-lg">
             A Thor4Tech combina <b className="text-white">Inteligência Artificial</b>, <b className="text-white">automação profunda</b> e <b className="text-accent-orange">tráfego pago</b> para gerar escala, previsibilidade e <b className="text-neon-green border-b border-neon-green">faturamento real</b>.
          </p>

          <div className="bg-glass-heavy p-4 rounded-xl border border-white/10 backdrop-blur-md w-full max-w-md shadow-lg flex items-center justify-between">
             <div className="flex flex-col text-left">
               <div className="flex text-yellow-400 mb-1">
                 {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={16} />)}
               </div>
               <span className="text-xs text-gray-400">Classificação média 5.0</span>
             </div>
             <div className="h-8 w-[1px] bg-white/10"></div>
             <div className="text-right">
                <span className="block text-2xl font-bold text-white">+15MM</span>
                <span className="text-[10px] text-accent-blue uppercase tracking-wider">Gerados em Vendas</span>
             </div>
          </div>

          <div className="pt-2 w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <CTAButton text="QUERO ME INSCREVER" fullWidth={false} className="shadow-neon hover:scale-105" />
            <button className="flex items-center justify-center space-x-2 text-white font-bold px-6 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all">
               <PlayCircle size={20} className="text-accent-blue" />
               <span>Ver Vídeo</span>
            </button>
          </div>
        </div>

        {/* Right Image - Rafael */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative group h-[500px] lg:h-[700px] items-end">
          {/* Cyberpunk Platform */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-accent-blue/20 to-transparent blur-3xl"></div>
          
          {/* Main Character */}
          <img 
            src="https://pages.greatpages.com.br/www.acria.com.br-rafaeltorquato/1764124767/imagens/desktop/3415726_1_1763478509691c8bedc91ef350645611.png" 
            alt="Rafael Torquato"
            className="relative z-10 h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] filter contrast-110"
          />
          
          {/* Floating UI Elements */}
          <div className="absolute top-1/4 -right-4 lg:right-10 bg-dark-blue/80 backdrop-blur-md p-4 rounded-lg border border-accent-blue/30 shadow-glow-blue animate-float">
             <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-blue to-cyan-400 flex items-center justify-center text-white font-bold">ROAS</div>
                <div>
                   <div className="text-xs text-gray-400">Retorno Médio</div>
                   <div className="text-xl font-bold text-white">20x 🚀</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;