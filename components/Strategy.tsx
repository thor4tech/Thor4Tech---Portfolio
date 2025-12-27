
import React from 'react';
import { Eye, MousePointerClick, ShoppingCart, ArrowRight } from 'lucide-react';

const Strategy: React.FC = () => {
  return (
    <section className="relative py-24 bg-deep-navy overflow-hidden">
      {/* Background Pattern - Fixed URL */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative group">
             <div className="absolute inset-0 bg-accent-blue/20 blur-3xl rounded-full group-hover:bg-accent-blue/30 transition-all duration-500"></div>
             {/* Tech Graphic - Fixed URL */}
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
               alt="Tech Graphic" 
               className="relative z-10 w-full max-w-sm mx-auto animate-float drop-shadow-[0_0_15px_rgba(30,136,229,0.5)] rounded-2xl border border-white/10"
             />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-sans font-extrabold leading-tight mb-6">
              A Estratégia <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-cyan-400">TURBO</span> <br/>
              <span className="text-accent-orange text-2xl lg:text-4xl block mt-2">Unida à Inteligência Artificial</span>
            </h2>
            <p className="text-xl text-gray-400 font-roboto">
              Não é sorte. É um sistema validado que leva empresas comuns ao próximo nível de faturamento.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="relative grid md:grid-cols-3 gap-8">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent -translate-y-1/2 z-0"></div>

          {/* C1 */}
          <div className="relative z-10 bg-dark-blue border border-blue-900/50 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-glow-blue hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 border border-accent-blue/30 group-hover:border-accent-blue/80 transition-colors">
              <Eye size={36} className="text-accent-blue" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">C1 • Atração</h3>
            <div className="bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-4">TOPO DE FUNIL</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Trazemos novas pessoas para conhecer sua empresa todos os dias. Objetivo: gerar atenção qualificada, aumentar alcance e abrir portas.
            </p>
          </div>

          {/* C2 */}
          <div className="relative z-10 bg-dark-blue border border-accent-orange/20 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-glow-orange hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-20 h-20 bg-orange-900/20 rounded-full flex items-center justify-center mb-6 border border-accent-orange/30 group-hover:border-accent-orange/80 transition-colors">
              <MousePointerClick size={36} className="text-accent-orange" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">C2 • Engajamento</h3>
            <div className="bg-accent-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-4">MEIO DE FUNIL</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transformamos desconhecidos em potenciais compradores com conteúdo, anúncios de reforço e provas sociais que geram confiança.
            </p>
          </div>

          {/* C3 */}
          <div className="relative z-10 bg-dark-blue border border-neon-green/20 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-[0_0_20px_rgba(0,255,13,0.2)] hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-6 border border-neon-green/30 group-hover:border-neon-green/80 transition-colors">
              <ShoppingCart size={36} className="text-neon-green" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">C3 • Conversão</h3>
            <div className="bg-neon-green text-black text-xs font-bold px-3 py-1 rounded-full mb-4">FUNDO DE FUNIL</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hora de vender. Campanhas focadas em ação, ofertas, ativação de desejo e direcionamento direto para o fechamento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
