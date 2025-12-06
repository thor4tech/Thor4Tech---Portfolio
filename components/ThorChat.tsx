
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, Loader2, Phone } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ThorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou a Inteligência Thor4Tech.\n\nQual é o seu maior desafio hoje?\n\n1. Vender mais\n2. Atendimento lento\n3. Falta de processos\n\nMe conte aqui 👇' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Formatador de texto inteligente (transforma links e quebras de linha)
  const formatMessage = (text: string) => {
    // Regex para identificar o link do WhatsApp específico
    const waLinkRegex = /(https:\/\/wa\.me\/5511980470203[^\s]*)/g;

    return text.split('\n').map((line, i) => (
      <div key={i} className={`mb-1 last:mb-0 ${line.trim() === '' ? 'h-2' : ''}`}>
        {line.split(' ').map((word, k) => {
           if (word.match(waLinkRegex)) {
              return (
                <a 
                  key={k} 
                  href={word} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-3 w-full bg-neon-green hover:bg-green-400 text-dark-blue font-black text-center py-3 rounded-lg shadow-neon transition-all transform hover:-translate-y-1 uppercase tracking-wider text-xs"
                >
                  FALAR AGORA NO WHATSAPP 🚀
                </a>
              );
           }
           return <span key={k}>{word} </span>;
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

    // Timeout de segurança (12s)
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 12000)
    );

    // Delay mínimo para parecer humano (1.5s)
    const minDelayPromise = new Promise<void>(resolve => setTimeout(resolve, 1500));

    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        **ROLE & PERSONA**
        Você é a "Inteligência Thor4Tech", uma IA de elite (Nano Banana Style): Impecável, direta, confiante e focada em resultados (ROI, Escala).
        
        **OBJETIVO ÚNICO**
        Convencer o lead a clicar no link do WhatsApp. Venda a "Reunião de Diagnóstico", nunca o preço.

        **CONHECIMENTO (SERVIÇOS)**:
        1. Tráfego Pago: Gestão de alta performance (Meta/Google/TikTok), Pixel, Dashboards. Argumento: "Transformamos cliques em lucro".
        2. IA de Atendimento (SDR): CRM automático, atendimento 24/7. Argumento: "Nunca mais perca um lead".
        3. Criatividade/Social: Branding que converte, VSL, Landing Pages.
        4. SDR Humano: Fechamento de contratos complexos.

        **REGRAS DE OURO (MANDATÓRIAS)**:
        1. **NÃO FALE PREÇO**: Se perguntarem, diga: "O investimento é modular. Para um valor exato, o Rafael precisa fazer um diagnóstico rápido do seu cenário no WhatsApp."
        2. **SEM MARKDOWN**: Não use negrito (**), itálico ou cabeçalhos. Texto puro.
        3. **FORMATO**: Use listas numeradas (1. 2. 3.) e quebras de linha para facilitar a leitura.
        4. **CURTO**: Respostas com no máximo 500 caracteres. Seja "Sniper".
        
        **LINK OBRIGATÓRIO**:
        Em TODA resposta, finalize (ou inclua no meio se fizer sentido) EXATAMENTE este link:
        https://wa.me/5511980470203
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
          maxOutputTokens: 400,
          temperature: 0.6, 
        }
      });

      const [response] = await Promise.all([
        Promise.race([apiCall, timeoutPromise]),
        minDelayPromise
      ]);

      const result = response as any;
      const responseText = result?.text || "Para te dar a melhor estratégia, me chame no WhatsApp agora:\nhttps://wa.me/5511980470203";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Minha conexão oscilou, mas sua estratégia não pode parar. Fale direto com o especialista:\n\nhttps://wa.me/5511980470203" }]);
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
    <div className="fixed bottom-6 right-4 lg:bottom-10 lg:right-10 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-32px)] md:w-[360px] h-[500px] bg-deep-navy/95 backdrop-blur-xl border border-accent-blue/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up ring-1 ring-white/10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-dark-blue to-blue-900 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-gradient-to-tr from-accent-blue to-cyan-400 p-2 rounded-full shadow-lg">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-blue animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm tracking-wide">Thor4Tech <span className="text-accent-blue">AI</span></h3>
                <span className="text-[10px] text-gray-300">Consultor Inteligente</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-accent-blue text-white rounded-br-none' 
                    : 'bg-[#1e293b] text-gray-100 rounded-bl-none border border-white/5'}
                `}>
                  {formatMessage(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1e293b] p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center space-x-2">
                  <Loader2 size={14} className="text-accent-blue animate-spin" />
                  <span className="text-xs text-gray-400">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp CTA Fixo */}
          <div className="px-4 pb-2 bg-deep-navy pt-2">
             <a 
               href="https://wa.me/5511980470203?text=Ol%C3%A1!%20Estava%20falando%20com%20a%20IA%20e%20quero%20falar%20com%20um%20especialista." 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-neon transform hover:-translate-y-0.5 group text-xs uppercase tracking-wide"
             >
               <Phone size={16} className="mr-2 fill-current" />
               Falar com Humano
             </a>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/10 bg-dark-blue">
            <div className="relative flex items-center bg-[#0f172a] border border-white/10 rounded-full px-2 py-1 focus-within:border-accent-blue/50 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua dúvida..."
                className="flex-1 bg-transparent py-3 pl-3 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-accent-blue p-2 rounded-full text-white hover:bg-accent-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send size={14} className={loading ? 'opacity-0' : 'opacity-100'} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-gradient-to-br from-accent-blue to-royal-blue hover:from-accent-orange hover:to-orange-600 text-white p-4 rounded-full shadow-glow-blue hover:shadow-glow-orange transition-all duration-500 transform hover:scale-110 z-50 border-2 border-white/20"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-neon-green border-2 border-dark-blue"></span>
          </span>
        )}
        
        {isOpen ? (
          <X size={24} className="animate-spin-slow" style={{ animationDuration: '0.5s' }} />
        ) : (
          <MessageSquare size={24} className="group-hover:animate-bounce" />
        )}
      </button>
    </div>
  );
};

export default ThorChat;
