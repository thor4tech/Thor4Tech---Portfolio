
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Image, Zap, Loader2, Lock, Wand2 } from 'lucide-react';

// Define local interface to avoid global conflict
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

const AIDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  // Image Gen State
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgSize, setImgSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  // Text Gen State
  const [textPrompt, setTextPrompt] = useState('');
  const [textResponse, setTextResponse] = useState('');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const aiStudio = (window as any).aistudio as AIStudio | undefined;
    if (aiStudio) {
      const selected = await aiStudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio as AIStudio | undefined;
    if (aiStudio) {
      await aiStudio.openSelectKey();
      // Assume success immediately to reduce friction, but check handles state
      setHasKey(true);
    }
  };

  const generateImage = async () => {
    if (!imgPrompt) return;
    setLoading(true);
    setGeneratedImg(null); // Reset previous image
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: imgPrompt }] },
        config: {
          imageConfig: {
            imageSize: imgSize,
            aspectRatio: "1:1"
          }
        }
      });

      // Find image part
      let imgSrc = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imgSrc = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }
      setGeneratedImg(imgSrc);
    } catch (e) {
      console.error(e);
      // Reset key if invalid
      if (JSON.stringify(e).includes("Requested entity was not found") || JSON.stringify(e).includes("403") || JSON.stringify(e).includes("401")) {
          setHasKey(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const generateText = async () => {
    if (!textPrompt) return;
    setLoading(true);
    setTextResponse(''); // Reset previous response
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: textPrompt,
      });
      setTextResponse(response.text || "No response generated.");
    } catch (e) {
      console.error(e);
      if (JSON.stringify(e).includes("Requested entity was not found") || JSON.stringify(e).includes("403") || JSON.stringify(e).includes("401")) {
        setHasKey(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-deep-navy relative overflow-hidden" id="ai-demo">
       {/* Background effects */}
       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
       <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[100px] pointer-events-none"></div>

       <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Live Technology Demo</span>
            <h2 className="text-4xl lg:text-5xl text-white font-extrabold">
               Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-neon-green">Thor4Tech AI</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Test drive the engines that power our automation and creative services. Real-time generation using the latest Gemini models.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-glass-heavy border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px]">
             {/* Key Check Overlay */}
             {!hasKey && (
               <div className="absolute inset-0 z-50 bg-deep-navy/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
                  <div className="bg-white/5 p-4 rounded-full mb-6 border border-white/10 shadow-glow-orange">
                    <Lock className="w-10 h-10 text-accent-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Developer Access Required</h3>
                  <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                    To access the Neural Core demos (Gemini 3 Pro & Flash Lite), please connect your API Key. This allows for high-resolution generation and ultra-fast responses.
                  </p>
                  <button onClick={handleSelectKey} className="group relative bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-glow-orange hover:-translate-y-1">
                    <span className="relative z-10 flex items-center">
                      Connect API Key <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-gray-600 mt-6 hover:text-white underline transition-colors">
                    Learn about Gemini API Billing
                  </a>
               </div>
             )}

             {/* Tabs */}
             <div className="flex border-b border-white/10 bg-dark-blue/50">
                <button onClick={() => setActiveTab('image')} className={`flex-1 py-6 text-center font-bold uppercase tracking-wider text-sm transition-all duration-300 relative overflow-hidden group ${activeTab === 'image' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                   <span className={`absolute inset-0 bg-accent-blue/10 transform origin-bottom transition-transform duration-300 ${activeTab === 'image' ? 'scale-y-100' : 'scale-y-0'}`}></span>
                   <span className="relative z-10 flex items-center justify-center">
                     <Image className={`mr-2 w-5 h-5 ${activeTab === 'image' ? 'text-accent-blue' : ''}`} /> 
                     Nano Banana Pro
                   </span>
                   {activeTab === 'image' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-blue shadow-glow-blue"></div>}
                </button>
                <button onClick={() => setActiveTab('text')} className={`flex-1 py-6 text-center font-bold uppercase tracking-wider text-sm transition-all duration-300 relative overflow-hidden group ${activeTab === 'text' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                   <span className={`absolute inset-0 bg-neon-green/10 transform origin-bottom transition-transform duration-300 ${activeTab === 'text' ? 'scale-y-100' : 'scale-y-0'}`}></span>
                   <span className="relative z-10 flex items-center justify-center">
                     <Zap className={`mr-2 w-5 h-5 ${activeTab === 'text' ? 'text-neon-green' : ''}`} /> 
                     Flash Lite
                   </span>
                   {activeTab === 'text' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green shadow-neon"></div>}
                </button>
             </div>

             {/* Content */}
             <div className="p-8 lg:p-12">
                {activeTab === 'image' && (
                   <div className="space-y-8 animate-fade-in-up">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                           <label className="block text-accent-blue text-xs font-bold uppercase tracking-widest mb-3">Prompt Visualization</label>
                           <input 
                             type="text" 
                             value={imgPrompt}
                             onChange={(e) => setImgPrompt(e.target.value)}
                             className="w-full bg-dark-blue/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-all shadow-inner"
                             placeholder="E.g., A futuristic neon city with flying cars..."
                           />
                        </div>
                        <div className="w-full md:w-auto">
                           <label className="block text-accent-blue text-xs font-bold uppercase tracking-widest mb-3">Size</label>
                           <div className="flex bg-dark-blue/50 p-1 rounded-xl border border-white/10">
                              {['1K', '2K', '4K'].map(size => (
                                 <button 
                                   key={size}
                                   onClick={() => setImgSize(size as any)}
                                   className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${imgSize === size ? 'bg-accent-blue text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                 >
                                   {size}
                                 </button>
                              ))}
                           </div>
                        </div>
                      </div>

                      <button 
                        onClick={generateImage}
                        disabled={loading || !imgPrompt}
                        className="w-full bg-gradient-to-r from-accent-blue to-royal-blue hover:from-blue-500 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-glow-blue transform hover:-translate-y-1 flex items-center justify-center group"
                      >
                        {loading ? (
                          <><Loader2 className="animate-spin mr-3" /> Processing Neural Request...</>
                        ) : (
                          <><Wand2 className="mr-3 group-hover:rotate-12 transition-transform" /> Generate Image with Gemini 3 Pro</>
                        )}
                      </button>

                      {/* Result Area */}
                      <div className="min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center bg-dark-blue/30 relative overflow-hidden group">
                         {loading ? (
                           <div className="text-center">
                             <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                             <p className="text-accent-blue animate-pulse">Rendering pixels...</p>
                           </div>
                         ) : generatedImg ? (
                           <div className="relative w-full h-full p-2">
                             <img src={generatedImg} alt="Generated" className="w-full h-auto rounded-xl shadow-2xl animate-fade-in-up" />
                             <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white border border-white/10">
                               {imgSize} • Generated
                             </div>
                           </div>
                         ) : (
                           <div className="text-center text-gray-600">
                             <Image className="w-12 h-12 mx-auto mb-3 opacity-20" />
                             <p>Enter a prompt to generate visuals</p>
                           </div>
                         )}
                      </div>
                   </div>
                )}

                {activeTab === 'text' && (
                   <div className="space-y-8 animate-fade-in-up">
                      <div>
                         <label className="block text-neon-green text-xs font-bold uppercase tracking-widest mb-3">Ask Thor4Tech AI</label>
                         <div className="relative">
                           <textarea 
                             value={textPrompt}
                             onChange={(e) => setTextPrompt(e.target.value)}
                             className="w-full bg-dark-blue/50 border border-white/10 rounded-xl p-5 text-white placeholder-gray-600 focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all h-32 resize-none shadow-inner font-roboto"
                             placeholder="E.g., Explain how marketing automation increases ROI..."
                           />
                           <div className="absolute bottom-3 right-3">
                             <span className="text-[10px] text-gray-500 bg-black/40 px-2 py-1 rounded">Gemini 2.5 Flash Lite</span>
                           </div>
                         </div>
                      </div>
                      
                      <button 
                        onClick={generateText}
                        disabled={loading || !textPrompt}
                        className="w-full bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-400 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-dark-blue font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-neon transform hover:-translate-y-1 flex items-center justify-center"
                      >
                        {loading ? (
                          <><Loader2 className="animate-spin mr-3" /> Processing...</>
                        ) : (
                          <><Zap className="mr-3 fill-current" /> Get Instant Answer</>
                        )}
                      </button>

                      {/* Result */}
                      <div className={`min-h-[200px] bg-dark-blue/50 border border-white/10 rounded-2xl p-6 transition-all duration-500 ${textResponse ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}>
                         {loading ? (
                           <div className="flex items-center space-x-2 text-neon-green">
                             <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce delay-100"></div>
                             <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce delay-200"></div>
                           </div>
                         ) : textResponse ? (
                           <div className="prose prose-invert max-w-none">
                             <p className="text-gray-300 whitespace-pre-wrap leading-relaxed font-roboto">{textResponse}</p>
                           </div>
                         ) : (
                           <p className="text-gray-600 text-center italic mt-12">AI response will appear here...</p>
                         )}
                      </div>
                   </div>
                )}
             </div>
          </div>
       </div>
    </section>
  );
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default AIDemo;
