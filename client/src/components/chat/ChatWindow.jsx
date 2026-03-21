import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, TrendingUp, Scale, ShieldAlert } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ActionCard } from '../ui/ActionCard';

export function ChatWindow({
  messages,
  isLoading,
  errorMsg,
  onRetry,
  onSend,
  onExplainLike5,
  messagesEndRef,
}) {
  const emptySuggestions = [
    { title: 'Analyze TCS', prompt: 'Analyze TCS', icon: <TrendingUp className="w-5 h-5" /> },
    { title: 'Compare INFY vs TCS', prompt: 'Compare INFY vs TCS', icon: <Scale className="w-5 h-5" /> },
    { title: 'Risk Check', prompt: 'What are the top risk factors for NIFTY?', icon: <ShieldAlert className="w-5 h-5" /> },
  ];

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <div className="bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg p-6 text-center mb-6 transition-all duration-200 ease-in-out hover:border-emerald-500/30 hover:shadow-xl">
            <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-semibold mb-2">Analysis Workspace</h1>
            <p className="text-slate-600 dark:text-gray-300">Ask about stocks, sectors, and market sentiment to get structured insights.</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emptySuggestions.map((item) => (
              <ActionCard key={item.title} title={item.title} icon={item.icon} onClick={() => onSend(item.prompt)}>
                <p className="text-slate-500 dark:text-gray-400 text-sm">Click to start a focused stock analysis.</p>
              </ActionCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-1">
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <MessageBubble
              key={`${msg.role}-${index}`}
              message={msg}
              onExplainLike5={(text) => onExplainLike5?.(text)}
            />
          ))}
        </AnimatePresence>
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg p-4 mt-2 w-fit transition-all duration-200 ease-in-out hover:border-emerald-500/30 hover:shadow-xl">
          <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
          <span className="text-slate-700 dark:text-gray-300">Analyzing stock data...</span>
          <div className="flex gap-1 ml-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:240ms]" />
          </div>
        </div>
      )}

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-red-500/50 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all duration-200 ease-in-out"
        >
          <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={onRetry}
            className="bg-red-500 text-white rounded-xl px-4 py-2 hover:bg-red-600 active:scale-95 transition-all duration-200 ease-in-out"
          >
            Retry
          </button>
        </motion.div>
      )}

      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
}
