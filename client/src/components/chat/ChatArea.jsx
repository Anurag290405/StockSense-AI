import React, { useState, useRef, useEffect } from 'react';
import { Send, LineChart, TrendingUp, UploadCloud, Loader2 } from 'lucide-react';
import { ActionCard } from '../ui/ActionCard';
import { MessageBubble } from './MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function ChatArea({ promptFromSidebar }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (promptFromSidebar) {
      handleSend(promptFromSidebar);
    }
  }, [promptFromSidebar]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newMessages = [...messages, { role: 'user', text: messageText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, { message: messageText });
      setMessages([...newMessages, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', text: 'Sorry, an error occurred while analyzing the data. Please ensure the backend is running or check API keys.', error: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newMessages = [...messages, { role: 'user', text: `Uploaded dataset: ${file.name}` }];
    setMessages(newMessages);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessages([...newMessages, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', text: 'Sorry, I failed to process that CSV file. Please try again.', error: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const explainLike5 = async (originalText) => {
    handleSend(`Explain this like I'm 5 years old: ${originalText.substring(0, 100)}...`);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center px-6 justify-between shrink-0 bg-background/80 backdrop-blur-md z-10 absolute top-0 w-full">
        <h2 className="font-semibold text-lg flex items-center gap-2 tracking-tight">
           Stock Analysis
        </h2>
      </div>

      {/* Main Chat Scroll */}
      <div className="flex-1 overflow-y-auto px-6 pt-24 pb-32">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">StockSense AI</h1>
            <p className="text-xl text-muted-foreground mb-12">Analyze stocks. Understand trends. Make smarter decisions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <ActionCard 
                title="Analyze a Stock" 
                icon={<LineChart className="w-8 h-8" />}
                onClick={() => handleSend("Analyze TCS")} 
              />
              <ActionCard 
                title="Explain Market Trend" 
                icon={<TrendingUp className="w-8 h-8" />}
                onClick={() => handleSend("Explain the current market trend")}
              />
              <ActionCard 
                title="Upload Dataset" 
                icon={<UploadCloud className="w-8 h-8" />}
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileUpload} />
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto w-full">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} onExplainLike5={explainLike5} />
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full mb-6 justify-start">
                <div className="flex max-w-[80%] gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground p-3">
                    Analyzing market data...
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-background via-background/90 to-transparent pt-10 pb-6 px-6">
        <div className="max-w-3xl mx-auto relative flex items-center shadow-lg rounded-2xl border border-input bg-card shadow-black/5 dark:shadow-white/5">
          <button onClick={() => fileInputRef.current?.click()} className="p-3 text-muted-foreground hover:text-foreground transition-colors absolute left-1" title="Upload CSV">
             <UploadCloud className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about stocks or upload a dataset..."
            className="w-full bg-transparent border-none py-4 pl-12 pr-14 focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 transition-all hover:bg-primary/90 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-3">
          StockSense AI can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}
