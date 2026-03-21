import React from 'react';
import { Send, UploadCloud } from 'lucide-react';

export function InputBox({ input, setInput, onSend, isLoading, onUploadClick }) {
  return (
    <div className="sticky bottom-0 z-20 bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 px-4 py-4 transition-colors duration-200 ease-in-out">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
     

        <div className="bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg p-2 flex items-center gap-2 transition-all duration-200 ease-in-out hover:border-emerald-500/30 hover:shadow-xl">
          <button
            onClick={onUploadClick}
            className="p-2 text-slate-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-in-out rounded-xl"
            title="Upload CSV"
          >
            <UploadCloud className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
            placeholder="Ask about a stock, sector, or trend"
            className="flex-1 bg-transparent px-2 py-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:outline-none"
          />

          <button
            onClick={() => onSend()}
            disabled={!input.trim() || isLoading}
            className="bg-emerald-500 text-white rounded-xl px-4 py-2 disabled:opacity-50 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-in-out"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
