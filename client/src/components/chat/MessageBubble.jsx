import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check, Info, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const mockChartData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 700 },
];

export function MessageBubble({ message, onExplainLike5, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const isAI = message.role === 'ai';

  const formatText = (text) => {
    let formatted = text.replace(/\[BULLISH\]/g, '<span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">🚀 BULLISH</span>');
    formatted = formatted.replace(/\[BEARISH\]/g, '<span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800 shadow-sm">📉 BEARISH</span>');
    
    // Bold specific fintech phrases automatically if they match
    formatted = formatted.replace(/(Key Takeaways:|Risk Factors:|Company Overview:|Key Indicators:)/gi, '<strong class="text-primary block mt-5 mb-2 text-[15px] border-b border-border/50 pb-1.5 uppercase tracking-wide text-xs">$1</strong>');
    
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
    return formatted;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("flex w-full mb-8", isAI ? "justify-start pr-8 md:pr-12 lg:pr-24" : "justify-end pl-8 md:pl-12 lg:pl-24")}
    >
      <div className={cn("flex gap-4 max-w-full", isAI ? "flex-row" : "flex-row-reverse")}>
        
        {/* Avatar */}
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-sm",
          isAI ? "bg-primary text-primary-foreground shadow-primary/20" : "bg-muted border border-border text-foreground"
        )}>
          {isAI ? <Bot className="w-6 h-6" /> : <User className="w-5 h-5" />}
        </div>

        {/* Bubble Content */}
        <div className={cn(
          "flex flex-col gap-2 relative min-w-0 w-full",
          isAI ? "items-start" : "items-end"
        )}>
          {isAI ? (
            <div 
              className="p-5 shadow-sm text-[15px] leading-relaxed whitespace-pre-wrap break-words bg-card border border-border text-card-foreground rounded-2xl rounded-tl-sm w-full"
              dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
            />
          ) : (
            <div className="p-5 shadow-sm text-[15px] font-medium leading-relaxed whitespace-pre-wrap break-words bg-primary text-primary-foreground rounded-2xl rounded-tr-sm">
              {message.text}
            </div>
          )}
          
          {/* Chart placeholder */}
          {isAI && message.text.includes("[BULLISH]") && (
             <div className="w-full mt-2 p-5 bg-card border border-border rounded-2xl shadow-sm">
               <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Trend Overview (Mocked)</div>
               <div className="h-32 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={mockChartData}>
                     <XAxis dataKey="name" hide />
                     <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
                        itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                     />
                     <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, fill: 'hsl(var(--primary))' }} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
             </div>
          )}

          {/* Action Footer for AI */}
          {isAI && (
            <div className="flex items-center gap-3 mt-2 ml-1">
              <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <div className="w-1 h-1 rounded-full bg-border" />
              <button onClick={() => onExplainLike5(message.text)} className="text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors group">
                <Info className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                Explain Like I'm 5
              </button>
              {onRegenerate && (
                <>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <button onClick={onRegenerate} className="text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors group">
                    <RefreshCw className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                    Regenerate
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
