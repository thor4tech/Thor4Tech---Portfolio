import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, Loader2, User } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ThorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou a IA da Thor4Tech ⚡. Como posso ajudar você a escalar seu negócio hoje?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Use GEMINI_API_KEY as requested
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // System prompt defining Thor4Tech context
      const systemInstruction = `
        Você é o assistente virtual oficial da Thor4Tech, empresa de Rafael Torquato.
        Sua missão é tirar dúvidas de leads interessados em Mentoria de Tráfego Pago e Automação com IA.
        
        Informações Chave sobre a Thor4Tech:
        - Fundador: Rafael Torquato (+5 anos de experiência, +150 empresas atendidas).
        - Resultados: Mais de R$ 15 Milhões gerados em vendas para clientes.
        - Diferencial: Combina Tráfego Pago Estratégico ("Turbo") + Automação com IA (CRIA™).
        - Metodologia: C1 (Atração), C2 (Engajamento), C3 (Conversão).
        - Benefícios: Escala previsível, atendimento 24/7 via IA, qualificação automática de leads.
        - Cases de Sucesso: Pedro Stivalli (ROAS 20x), Pizzaria Floratta (LTV alto), Rally Centro Automotivo (10% conversão real).
        
        Personalidade:
        - Profissional, autoridade, mas acessível.
        - Use emojis moderadamente (🚀, ⚡, 💰).
        - Seja direto e focado em resultado (ROI, ROAS, Faturamento).
        - Se o cliente perguntar preço, diga que depende do diagnóstico e sugira agendar uma reunião ou clicar no botão de inscrição.
        - SEMPRE tente levar para a ação: "Quer saber como aplicamos isso no seu negócio?" ou "Clique em 'Quero me Inscrever'".
      `;

      const response = await ai.models.generateContent({
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
        }
      });

      const responseText = response.text || "Desculpe, tive um problema técnico. Pode tentar novamente?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Ocorreu um erro ao conectar com a IA. Por favor, verifique se a chave de API está configurada corretamente." }]);
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
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-dark-blue/95 backdrop-blur-xl border border-accent-blue/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent-blue to-royal-blue p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Thor4Tech AI</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/80">Online agora</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-accent-blue text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex space-x-1 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-deep-navy/50">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua dúvida..."
                className="w-full bg-dark-blue border border-white/20 rounded-full py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-blue p-2 rounded-full text-white hover:bg-accent-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <div className="text-center mt-2">
               <span className="text-[10px] text-gray-500">Powered by Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-tr from-accent-blue to-cyan-500 hover:from-accent-orange hover:to-orange-500 text-white p-4 rounded-full shadow-glow-blue hover:shadow-glow-orange transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:animate-pulse" />}
      </button>
    </div>
  );
};

export default ThorChat;