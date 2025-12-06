
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
    { role: 'model', text: 'Olá! Sou a inteligência da **Thor4Tech**. \n\nSua empresa está perdendo leads por demora no atendimento ou falta de estratégia?\n\nPosso te ajudar a resolver isso agora.' }
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
        Você é o 'Thor4Tech Brain', um consultor de elite focado em **VENDAS** e **ESCALA**.
        
        **SEUS SERVIÇOS (Use para contexto, mas NUNCA passe os valores):**
        1. **Tráfego Pago Turbo:** Gestão de anúncios, estratégia (8h), instalação de pixel, dashboards. Foco em ROI.
        2. **IA de Atendimento (SDR):** Atende 24/7, qualifica, agenda reuniões, CRM organizado. 
        3. **Gestão Criativa:** Design, VSLs, Landing Pages de alta conversão.
        4. **Social Media:** Identidade visual, roteiros, reels, posicionamento.
        5. **SDR Humano:** Prospecção, ligação de vendas e fechamento.

        **PERFIL DO CLIENTE (Mentalidade):**
        - Empresário cansado de agências que não entregam.
        - Tem medo de perder o "toque humano" na automação.
        - Odeia demora no atendimento.
        - Quer previsibilidade e lucro.

        **REGRAS DE RESPOSTA (RIGOROSAS):**
        1. **CURTA E PERSUASIVA:** Máximo 500 caracteres. Vá direto ao ponto.
        2. **SEM PREÇOS:** Se perguntarem valor, responda: "**Os valores variam conforme a complexidade do projeto.** Toque no botão do WhatsApp para um diagnóstico gratuito."
        3. **FORMATAÇÃO:** Use quebras de linha (Enter) para facilitar a leitura. Use **negrito** para destacar benefícios chaves (ex: **lucro**, **automação**).
        4. **CTA FINAL:** Toda resposta deve terminar incentivando a ação. Ex: "Vamos escalar?", "Toque no botão verde."
        5. **LINK:** Sempre que oportuno envie: https://wa.me/5511980470203
        
        Se o cliente apenas cumprimentar, devolva com uma pergunta de qualificação: "Olá! Você quer vender mais com **Tráfego** ou automatizar com **IA**?"
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
          temperature: 0.7, // Criatividade controlada
        }
      });

      // Corrida entre a API e o Timeout
      // Também aguarda o delay mínimo de UX
      const [response] = await Promise.all([
        Promise.race([apiCall, timeoutPromise]),
        minDelayPromise
      ]);

      // Type assertion safe check
      const result = response as any;
      const responseText = result?.text || "Poderia repetir? Tive um breve lapso na conexão.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chat Error:", error);
      // Fallback persuasivo em caso de erro
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
               href="https://wa.me/5511980470203" 
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
