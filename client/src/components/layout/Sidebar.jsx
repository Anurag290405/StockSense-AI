import React, { useState } from 'react';
import { BarChart3, Settings, Plus, X, Bookmark } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';

export function Sidebar({ onSelectPrompt, onNewChat, isOpen, onClose }) {
  const [activeQuery, setActiveQuery] = useState(0);

  const suggestedQueries = [
    { label: "Analyze TCS", value: "Analyze TCS" },
    { label: "Compare INFY vs TCS", value: "Compare INFY vs TCS" },
    { label: "Market Trends", value: "Why is NIFTY rising?" },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-[70] w-72 bg-slate-100 dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700 h-full flex flex-col transition-all duration-200 ease-in-out lg:translate-x-0',
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <h1 className="font-semibold text-lg text-slate-900 dark:text-white">StockSense AI</h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 ease-in-out">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-5 mt-6 mb-6">
          <button 
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-in-out font-semibold py-3 px-4 rounded-2xl shadow-lg"
          >
            <Plus className="w-5 h-5" /> New Analysis
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 flex flex-col gap-8">
          <div>
            <h2 className="px-2 text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-3">Suggested Queries</h2>
            <div className="space-y-2">
              {suggestedQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveQuery(i); onSelectPrompt(query.value); onClose(); }}
                  className={cn(
                    'w-full text-left text-sm p-3 bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 hover:scale-[1.02] transition-all duration-200 ease-in-out flex items-center gap-3',
                    activeQuery === i && 'bg-slate-200 dark:bg-slate-800 border-l-2 border-l-emerald-500 border-emerald-500/30'
                  )}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {query.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="px-2 text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-3">Saved Insights</h2>
            <div className="px-4 py-4 bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl text-left flex items-start gap-3 transition-all duration-200 ease-in-out hover:border-emerald-500/30 hover:shadow-xl">
              <Bookmark className="w-4 h-4 text-slate-500 dark:text-gray-400 mt-0.5" />
              <p className="text-xs text-slate-500 dark:text-gray-400">Your starred analysis snippets will appear here for quick access.</p>
            </div>
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-300 dark:border-slate-700 flex items-center justify-between bg-slate-100 dark:bg-slate-900">
            <div className="flex items-center gap-3 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 ease-in-out cursor-pointer group">
              <Settings className="w-4 h-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-all duration-200 ease-in-out" />
              <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white">Settings</span>
           </div>
           <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
