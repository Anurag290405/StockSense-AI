import React from 'react';
import { History, Bookmark, TrendingUp, Settings } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Sidebar({ onSelectPrompt }) {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h1 className="font-bold text-xl tracking-tight">StockSense<span className="text-primary">AI</span></h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <History className="w-4 h-4" /> Recent
          </h2>
          <ul className="space-y-1">
            <li onClick={() => onSelectPrompt("Analyze TCS")} className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer text-muted-foreground hover:text-foreground transition-colors truncate">Analyze TCS</li>
            <li onClick={() => onSelectPrompt("Compare INFY vs Wipro")} className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer text-muted-foreground hover:text-foreground transition-colors truncate">Compare INFY vs Wipro</li>
            <li onClick={() => onSelectPrompt("Why is NIFTY going up?")} className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer text-muted-foreground hover:text-foreground transition-colors truncate">Why is NIFTY going up?</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <Bookmark className="w-4 h-4" /> Saved Insights
          </h2>
          <ul className="space-y-1">
            <li className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer text-muted-foreground hover:text-foreground transition-colors truncate">Tech Stocks Portfolio</li>
          </ul>
        </div>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
          <Settings className="w-4 h-4" /> Settings
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
