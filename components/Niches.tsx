import React from 'react';
import { Scale, Utensils, Pizza, Plane, BookOpen, BrainCircuit, Box, Shirt, ShoppingBag, Baby, Flame, Hammer, Scissors, MonitorPlay, Mic2, Building2, Home } from 'lucide-react';

const niches = [
  { name: "Direito", icon: <Scale />, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300" },
  { name: "Sushi", icon: <Utensils />, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=300" },
  { name: "Pizzaria", icon: <Pizza />, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300" },
  { name: "Visto Americano", icon: <Plane />, img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=300" },
  { name: "Infoprodutos", icon: <BookOpen />, img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=300" },
  { name: "Esotéricos", icon: <BrainCircuit />, img: "https://images.unsplash.com/photo-1534083264897-aeabfc750013?auto=format&fit=crop&q=80&w=300" },
  { name: "Dropshipping", icon: <Box />, img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=300" },
  { name: "Moda Premium", icon: <Shirt />, img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=300" },
  { name: "Atacado", icon: <ShoppingBag />, img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=300" },
  { name: "Infantil", icon: <Baby />, img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=300" },
  { name: "Velas", icon: <Flame />, img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300" },
  { name: "Construção", icon: <Hammer />, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=300" },
  { name: "Beleza", icon: <Scissors />, img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=300" },
  { name: "Cursos Online", icon: <MonitorPlay />, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300" },
  { name: "Palestras", icon: <Mic2 />, img: "https://images.unsplash.com/photo-1475721027767-f7567aac6884?auto=format&fit=crop&q=80&w=300" },
  { name: "Engenharia", icon: <Building2 />, img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=300" },
  { name: "Imóveis", icon: <Home />, img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300" },
];

const Niches: React.FC = () => {
  return (
    <section className="bg-deep-navy py-24 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-transparent to-deep-navy z-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Experiência <span className="text-neon-green px-2 bg-neon-green/10 rounded-lg">COMPROVADA</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Já atuamos e escalamos resultados em dezenas de mercados. Se o seu nicho está aqui, nós já sabemos o caminho.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="py-12 animate-marquee-fast whitespace-nowrap flex space-x-6">
          {niches.concat(niches).concat(niches).map((niche, index) => (
            <div 
              key={index} 
              className="relative w-64 h-80 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 border border-white/10 hover:border-accent-blue shadow-lg group-hover:blur-[2px] hover:!blur-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img src={niche.img} alt={niche.name} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/50 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center justify-end h-full z-10">
                <div className="bg-accent-blue/20 p-4 rounded-full mb-4 backdrop-blur-md border border-white/20 text-white group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300 shadow-neon">
                  {React.cloneElement(niche.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{niche.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Niches;