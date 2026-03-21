import React, { useState, useRef, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import axios from 'axios';
import { ChatWindow } from './ChatWindow';
import { InputBox } from './InputBox';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function ChatArea({ promptFromSidebar, onClearPrompt, resetChatTrigger }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastUserPrompt, setLastUserPrompt] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (resetChatTrigger > 0) {
      setMessages([]);
      setErrorMsg('');
      setIsLoading(false);
    }
  }, [resetChatTrigger]);

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
    setLastUserPrompt(messageText);
    if (!isRetry) setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.post(`${API_URL}/chat`, { message: messageText });
      setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setErrorMsg('Financial data link interrupted. Please reconnect.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessages(prev => [...prev, { role: 'user', text: `Analyzing dataset: ${file.name}` }]);
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
      setErrorMsg('CSV indexing failed. Verify file parameters.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100 dark:bg-slate-900 min-h-0 transition-colors duration-200 ease-in-out">
      <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileUpload} />

      <header className="h-16 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700 flex items-center px-4 sm:px-6 shrink-0 justify-between transition-colors duration-200 ease-in-out">
        <div className="flex items-center gap-3 ml-12 lg:ml-0 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <h2 className="font-semibold text-slate-900 dark:text-white text-sm truncate">Analysis Workspace</h2>
        </div>
        <div className="hidden md:flex items-center gap-4 shrink-0">
         
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 md:px-6 min-h-0">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          errorMsg={errorMsg}
          onRetry={() => handleSend(lastUserPrompt, true)}
          onSend={handleSend}
          onExplainLike5={(text) => handleSend(`Explain this for a beginner investor: ${text.substring(0, 160)}...`)}
          messagesEndRef={messagesEndRef}
        />
      </main>

      <InputBox
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
        onUploadClick={() => fileInputRef.current?.click()}
      />
    </div>
  );
}
