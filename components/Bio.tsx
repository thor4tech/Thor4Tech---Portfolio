import React from 'react';
import CTAButton from './CTAButton';

const Bio: React.FC = () => {
  return (
    <section className="relative py-24 bg-deep-navy overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="text-accent-blue text-sm font-bold tracking-[0.3em] uppercase mb-4">Uma troca que transforma</div>
          <h2 className="text-5xl lg:text-8xl font-extrabold mb-10 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white">RAFAEL</span> <br/>
            <span className="text-white">TORQUATO</span>
          </h2>
          
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-roboto max-w-2xl">
            <p>
              Mais de <b className="text-white">5 anos</b> transformando <b className="text-white">leads em clientes</b>. Mais de <b className="text-neon-green">150 empresas atendidas</b>. Mais de <b className="text-neon-green">R$ 15 milhões gerados</b> em faturamento.
            </p>
            <p className="border-l-4 border-accent-blue pl-4 italic text-gray-300">
              A verdade é que a maioria das empresas gasta fortunas em tráfego pago e gera centenas de leads, mas não tem estrutura para converter. O dinheiro vai pelo ralo.
            </p>
            <p>
              Eu resolvo isso unindo duas frentes: <b className="text-accent-blue">Tráfego Pago Estratégico (Thor4Tech)</b> e <b className="text-accent-orange">Automação com IA (CRIA™)</b>. Não vendo curso. Não ensino teoria. Eu implemento sistemas que funcionam.
            </p>
            <p>
              Enquanto seu time dorme, a IA trabalha. Em 14 dias, está no ar.
              <br/>
              Um exemplo real: <b className="text-white bg-accent-blue/20 px-1">R$ 8 mil investidos geraram R$ 168 mil em retorno. ROAS de 20x</b>.
            </p>
          </div>

          <div className="mt-12 w-full lg:w-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">Isso não é sorte, é <span className="underline decoration-neon-green">sistema.</span></h3>
            <CTAButton text="QUERO FAZER PARTE DESTE SISTEMA!" className="w-full lg:w-auto shadow-neon animate-pulse-slow hover:animate-none" />
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-navy/50 to-deep-navy z-10"></div>
           <div className="absolute -inset-4 bg-accent-blue/20 blur-3xl rounded-full opacity-50"></div>
           
           <img 
             src="https://pages.greatpages.com.br/www.acria.com.br-rafaeltorquato/1764124767/imagens/desktop/3415726_1_1763478509691c8bedc9380188197150.png"
             alt="Rafael Torquato Portrait"
             className="w-full h-auto object-contain relative z-10 drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
           />
           
           {/* Rotating Brain Element */}
           <img 
             src="https://pages.greatpages.com.br/www.acria.com.br-rafaeltorquato/1764124767/imagens/desktop/3415726_1_1763478509691c8bedc9d04886422723.png"
             alt="Brain Circuit"
             className="absolute -top-20 -right-20 w-3/4 opacity-40 animate-spin-slow mix-blend-screen"
           />
        </div>

      </div>
    </section>
  );
};

export default Bio;