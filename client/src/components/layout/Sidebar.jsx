import React from 'react';
import { History, Bookmark, TrendingUp, Settings, Plus, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';

export function Sidebar({ onSelectPrompt, isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-card border-r border-border h-full flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-extrabold text-xl tracking-tight">StockSense<span className="text-primary">AI</span></h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-muted rounded-md text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <button 
            onClick={() => { onSelectPrompt(""); onClose?.(); }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/30 active:scale-95"
          >
            <Plus className="w-5 h-5" /> New Analysis
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <History className="w-4 h-4" /> Suggested Queries
            </h2>
            <ul className="space-y-1">
              <li onClick={() => { onSelectPrompt("Analyze TCS"); onClose(); }} className="text-sm p-3 hover:bg-muted font-medium rounded-xl cursor-pointer text-foreground/80 hover:text-foreground transition-all truncate border border-transparent hover:border-border">Analyze TCS</li>
              <li onClick={() => { onSelectPrompt("Compare INFY vs Wipro"); onClose(); }} className="text-sm p-3 hover:bg-muted font-medium rounded-xl cursor-pointer text-foreground/80 hover:text-foreground transition-all truncate border border-transparent hover:border-border">Compare INFY vs Wipro</li>
              <li onClick={() => { onSelectPrompt("Why is NIFTY going up?"); onClose(); }} className="text-sm p-3 hover:bg-muted font-medium rounded-xl cursor-pointer text-foreground/80 hover:text-foreground transition-all truncate border border-transparent hover:border-border">Why is NIFTY going up?</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Example Insights
            </h2>
            <ul className="space-y-1">
              <li className="text-sm p-3 hover:bg-muted font-medium rounded-xl cursor-pointer text-foreground/80 hover:text-foreground transition-all truncate border border-transparent hover:border-border">Tech Stocks Portfolio</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
            <Settings className="w-5 h-5" /> Settings
          </div>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
