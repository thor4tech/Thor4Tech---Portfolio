import React from 'react';
import { Target, TrendingUp, Cpu, AlertTriangle } from 'lucide-react';

const PainPoints: React.FC = () => {
  const points = [
    {
      icon: <Target className="text-accent-blue w-10 h-10" />,
      title: "Depende de Indicações?",
      subtitle: "Quer criar demanda todos os dias",
      desc: "Seu negócio precisa de novos clientes entrando sempre, e você quer construir previsibilidade real de vendas."
    },
    {
      icon: <AlertTriangle className="text-accent-orange w-10 h-10" />,
      title: "Cansado de Gastar?",
      subtitle: "Não aguenta mais investir sem retorno",
      desc: "Você já tentou impulsionar ou trabalhar com outros profissionais, mas nunca viu um resultado consistente de verdade."
    },
    {
      icon: <Cpu className="text-neon-green w-10 h-10" />,
      title: "Falta Estratégia?",
      subtitle: "Entende que sem método não há crescimento",
      desc: "Você sabe que tráfego sem método e IA sem estrutura são só ferramentas, não resultados."
    }
  ];

  return (
    <section className="bg-dark-blue py-24 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,136,229,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(30,136,229,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-16 text-center">
          Este portfólio é <span className="text-accent-blue underline decoration-accent-orange decoration-4 underline-offset-4">para você que…</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <div key={index} className="group bg-deep-navy/50 border border-white/5 p-8 rounded-3xl flex flex-col items-start space-y-6 hover:border-accent-blue hover:bg-deep-navy/80 hover:shadow-glow-blue transition-all duration-300 backdrop-blur-sm cursor-default transform hover:-translate-y-1">
              <div className="bg-dark-blue p-4 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{point.title}</h4>
                <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-accent-blue transition-colors">
                  {point.subtitle}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;