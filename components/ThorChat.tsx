
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, Loader2, Phone, ExternalLink } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ThorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou a Inteligência **Thor4Tech**.\n\nVocê quer **escalar suas vendas** ou apenas resolver problemas de atendimento?\n\nMe diga seu desafio atual.' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper to format text with bold and line breaks
  const formatMessage = (text: string) => {
    // Regex para identificar links
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split('\n').map((line, i) => (
      <div key={i} className={`mb-1 last:mb-0 ${line.trim() === '' ? 'h-2' : ''}`}>
        {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
          }
          
          // Split por espaço para achar links
          return part.split(' ').map((word, k) => {
             if (word.match(urlRegex)) {
                return (
                  <a 
                    key={k} 
                    href={word} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-neon-green underline font-bold hover:text-white transition-colors"
                  >
                    {word}
                  </a>
                );
             }
             return <span key={k}>{word} </span>;
          });
        })}
      </div>
    ));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    // Timeout de segurança: Se a IA demorar mais de 12s, aborta e manda pro Whats.
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 12000)
    );

    // Delay mínimo para parecer humano (UX)
    const minDelayPromise = new Promise<void>(resolve => setTimeout(resolve, 1500));

    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        **ROLE & PERSONA**
        Você é a "Inteligência Thor4Tech", uma IA de elite especializada em Estratégia de Vendas, Tráfego Pago e Automação.
        Sua personalidade é "Nano Banana Style": Impecável, futurista, direta, confiante e focada em resultados (ROI, Escala, Lucro). Você não é um atendente passivo; você é um consultor estratégico ativo.

        **OBJECTIVE**
        Seu único objetivo é qualificar o lead e convencê-lo a clicar no link do WhatsApp para falar com o time humano. Você vende a "Reunião de Diagnóstico" e a "Solução", nunca o preço final.

        **KNOWLEDGE BASE (O QUE VENDEMOS - BENEFÍCIOS)**
        Use estes serviços como base para suas sugestões, focando no impacto, não no custo:

        1. **Tráfego Pago (Growth):**
           - Foco: Gestão de alta performance (Meta/Google/TikTok/Linkedin), instalação profissional de Pixel/Rastreamento, Dashboards de relatórios em tempo real (Reportei/Metrifiquei).
           - Argumento: "Transformamos cliques em **lucro previsível** com rastreamento avançado."

        2. **IA de Atendimento (SDR 24/7):**
           - Foco: Implantação completa, CRM organizado automaticamente, Agentes de IA treinados, Suporte e personalização.
           - Argumento: "Sua empresa nunca mais perderá um lead por demora. **Atendimento imediato** e qualificação automática no seu CRM."

        3. **Gestão de Criatividade & Social Media:**
           - Foco: Identidade visual estratégica, Roteirização de vídeos (Reels/VSL), Design de alta conversão, Landing Pages e Social Selling (atendimento via Direct).
           - Argumento: "Branding não é só beleza, é **conversão**. Criamos a autoridade visual que faz seu cliente confiar e comprar."

        4. **SDR Humano (Inside Sales):**
           - Foco: Atendimento consultivo, ligações de vendas, propostas comerciais (Gamma) e fechamento.
           - Argumento: "Para negociações complexas, nosso time humano garante a organização do CRM e o fechamento de contratos."

        **AUTHORITY (QUEM É RAFAEL)**
        Rafael é o CEO, Fundador e Estrategista-Chefe da Thor4Tech.
        - Se perguntarem sobre ele: "O Rafael é a mente por trás da metodologia que usamos para escalar empresas. Ele desenha a estratégia macro enquanto nossa tecnologia executa."

        **BEHAVIORAL GUIDELINES (REGRAS DE OURO)**

        1. **O "Não" ao Preço:**
           - JAMAIS informe valores (R$, horas ou custos fixos).
           - Se perguntarem "Quanto custa?", responda: "Nossos projetos são modulares. O investimento depende se você precisa apenas de Tráfego ou de um Ecossistema completo com IA e CRM. Para te passar um valor exato e justo, preciso de 2 minutos no WhatsApp para entender seu cenário."

        2. **Transparência Charmosa:**
           - Se perguntarem "Você é um robô?", responda: "Sou uma Inteligência Artificial treinada pela Thor4Tech para garantir que você tenha atendimento imediato. Minha agilidade é digital, mas os resultados que geramos são bem reais. **Vamos escalar?**"

        3. **Gestão de Erros:**
           - Se o usuário perguntar algo fora do seu escopo ou se você não souber a resposta, diga: "Essa é uma excelente pergunta estratégica. O Rafael (nosso CEO) costuma tratar desses pontos específicos pessoalmente no diagnóstico."

        4. **O "Ecossistema" (Upsell Sutil):**
           - Sempre que possível, sugira que as soluções funcionam melhor juntas (Ex: Tráfego traz o lead + IA atende o lead). Isso cria valor.

        5. **CTA (Chamada para Ação) Mandatória:**
           - TODA resposta deve terminar direcionando para o WhatsApp.
           - Link Obrigatório: https://wa.me/5511980470203

        **TONE OF VOICE**
        - Use termos de autoridade: "**Escalar**", "**Previsibilidade**", "**Ecossistema**", "**Conversão**", "**Diagnóstico**", "**Implementação**".
        - Use **Negrito** para destacar essas palavras chaves.
        - Seja breve (Max 500 caracteres). Respostas longas perdem a atenção.
        - Use Quebra de linhas.
      `;

      const apiCall = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          maxOutputTokens: 350,
          temperature: 0.7, 
        }
      });

      const [response] = await Promise.all([
        Promise.race([apiCall, timeoutPromise]),
        minDelayPromise
      ]);

      const result = response as any;
      const responseText = result?.text || "Tive uma breve oscilação neural. Vamos garantir seu atendimento agora?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Minha conexão oscilou devido à alta demanda.\n\nNão perca tempo: **Chame diretamente nosso especialista no WhatsApp** para atendimento prioritário.\n\nToque no botão verde abaixo ou no link: https://wa.me/5511980470203" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] md:w-[380px] h-[550px] bg-deep-navy/95 backdrop-blur-xl border border-accent-blue/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up ring-1 ring-white/10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-dark-blue to-blue-900 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-gradient-to-tr from-accent-blue to-cyan-400 p-2 rounded-full shadow-lg">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-blue"></div>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm tracking-wide">Thor4Tech <span className="text-accent-blue">AI</span></h3>
                <span className="text-[10px] text-gray-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-neon-green rounded-full mr-1 animate-pulse"></span>
                  Online agora
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-md
                  ${msg.role === 'user' 
                    ? 'bg-accent-blue text-white rounded-br-sm' 
                    : 'bg-[#1a2c42] text-gray-200 rounded-bl-sm border border-white/5'}
                `}>
                  {formatMessage(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1a2c42] p-4 rounded-2xl rounded-bl-sm border border-white/5 flex items-center space-x-2">
                  <Loader2 size={16} className="text-accent-blue animate-spin" />
                  <span className="text-xs text-gray-400">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp CTA Fixo */}
          <div className="px-4 pb-2 bg-deep-navy">
             <a 
               href="https://wa.me/5511980470203?text=Ol%C3%A1!%20Estava%20falando%20com%20a%20IA%20e%20quero%20falar%20com%20um%20especialista." 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-neon transform hover:-translate-y-0.5 group"
             >
               <Phone size={18} className="mr-2 fill-current" />
               Falar com Especialista no WhatsApp
               <ExternalLink size={14} className="ml-2 opacity-50 group-hover:opacity-100" />
             </a>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/10 bg-dark-blue">
            <div className="relative flex items-center bg-deep-navy border border-white/10 rounded-full px-2 py-1 focus-within:border-accent-blue/50 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua dúvida aqui..."
                className="flex-1 bg-transparent py-3 pl-3 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-accent-blue p-2.5 rounded-full text-white hover:bg-accent-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send size={16} className={loading ? 'opacity-0' : 'opacity-100'} />
              </button>
            </div>
            <div className="text-center mt-2 pb-1">
               <span className="text-[9px] text-gray-600 uppercase tracking-widest">Thor4Tech Intelligence System</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-gradient-to-br from-accent-blue to-royal-blue hover:from-accent-orange hover:to-orange-600 text-white p-4 rounded-full shadow-glow-blue hover:shadow-glow-orange transition-all duration-500 transform hover:scale-110 z-50"
      >
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-neon-green border-2 border-dark-blue"></span>
          </span>
        )}
        
        {isOpen ? (
          <X size={28} className="animate-spin-slow" style={{ animationDuration: '0.5s' }} />
        ) : (
          <MessageSquare size={28} className="group-hover:animate-bounce" />
        )}
      </button>
    </div>
  );
};

export default ThorChat;
