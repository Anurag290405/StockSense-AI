import React, { useState, useRef, useEffect } from 'react';
import { Send, LineChart, TrendingUp, UploadCloud, RefreshCcw, AlertCircle } from 'lucide-react';
import { ActionCard } from '../ui/ActionCard';
import { MessageBubble } from './MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { cn } from '../../lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const TypingIndicator = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex w-full mb-8 justify-start">
    <div className="flex gap-4 max-w-[80%]">
      <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-primary/20">
        <LineChart className="w-5 h-5 animate-pulse" />
      </div>
      <div className="flex items-center p-4 bg-card border border-border rounded-2xl rounded-tl-sm shadow-sm gap-2">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="ml-3 text-[15px] font-semibold text-muted-foreground tracking-wide">Analyzing market trends...</span>
      </div>
    </div>
  </motion.div>
);

export function ChatArea({ promptFromSidebar, onClearPrompt }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (promptFromSidebar) {
      handleSend(promptFromSidebar);
      onClearPrompt?.();
    }
  }, [promptFromSidebar, onClearPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, errorMsg]);

  const handleSend = async (text, isRetry = false) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    if (!isRetry) {
      setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    }
    
    setInput('');
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(`${API_URL}/chat`, { message: messageText });
      setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setErrorMsg('Network error. Unable to reach StockSense AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessages(prev => [...prev, { role: 'user', text: `Uploaded dataset: ${file.name}` }]);
    setIsLoading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setErrorMsg('Failed to process the CSV file. Please ensure it is correctly formatted.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const explainLike5 = (originalText) => {
    handleSend(`Explain this like I'm 5 years old: ${originalText.substring(0, 100)}...`);
  };

  const regenerateLast = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setMessages(prev => prev.slice(0, prev.length - 1)); // Remove the last AI message
      handleSend(lastUserMessage.text, true);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Hidden Global File Input */}
      <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileUpload} />

      {/* Header */}
      <div className="h-16 border-b border-border flex items-center px-6 lg:justify-between justify-center shrink-0 bg-background/80 backdrop-blur-xl z-20 w-full shadow-sm">
        <h2 className="font-bold text-lg flex items-center gap-2 tracking-tight lg:ml-0 ml-10">
           Analysis Workspace
        </h2>
      </div>

      {/* Main Chat Scroll */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-12 pt-8 pb-40 scrollbar-thin scrollbar-thumb-border">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto py-10"
          >
            <div className="bg-primary/10 p-5 rounded-[2rem] mb-8 ring-8 ring-primary/5">
              <TrendingUp className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">StockSense AI</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl">Analyze Indian equities, understand complex market trends, and make smarter, data-driven decisions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <ActionCard 
                title="Analyze a Stock" 
                icon={<LineChart className="w-7 h-7" />}
                onClick={() => handleSend("Analyze TCS infrastructure growth.")} 
              />
              <ActionCard 
                title="Explain Market Trend" 
                icon={<TrendingUp className="w-7 h-7" />}
                onClick={() => handleSend("Explain why NIFTY is rising today.")}
              />
              <ActionCard 
                title="Upload Dataset" 
                icon={<UploadCloud className="w-7 h-7" />}
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto w-full pt-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <MessageBubble 
                  key={idx} 
                  message={msg} 
                  onExplainLike5={explainLike5} 
                  onRegenerate={idx === messages.length - 1 && msg.role === 'ai' ? regenerateLast : undefined}
                />
              ))}
            </AnimatePresence>
            
            {isLoading && <TypingIndicator />}

            {errorMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full mb-8 pr-12">
                 <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl rounded-tl-sm w-full shadow-sm max-w-[80%]">
                   <AlertCircle className="w-5 h-5 shrink-0" />
                   <span className="text-[15px] font-semibold">{errorMsg}</span>
                   <button onClick={regenerateLast} className="ml-auto text-xs font-bold bg-destructive text-destructive-foreground px-4 py-2 rounded-xl hover:bg-destructive/90 transition-colors flex items-center gap-1.5 shadow-sm active:scale-95">
                     <RefreshCcw className="w-3.5 h-3.5" /> Retry
                   </button>
                 </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute w-full bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-6 px-4 md:px-8 z-30 pointer-events-none">
        <div className="max-w-4xl mx-auto relative flex items-center shadow-2xl shadow-primary/5 rounded-2xl border border-border bg-card/90 backdrop-blur-xl pointer-events-auto group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <button onClick={() => fileInputRef.current?.click()} className="p-3.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors rounded-xl absolute left-2" title="Upload CSV">
             <UploadCloud className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about Indian stocks..."
            className="w-full bg-transparent border-none py-5 pl-16 pr-16 focus:outline-none text-[16px] font-medium text-foreground placeholder:text-muted-foreground"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-3 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 transition-all hover:bg-primary/90 shadow-md active:scale-95 disabled:active:scale-100"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        <div className="text-center text-[12px] font-semibold text-muted-foreground mt-4 pointer-events-auto opacity-70">
          StockSense AI is for educational purposes. Verify critical findings before investing.
        </div>
      </div>
    </div>
  );
}
