import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const mockChartData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 700 },
];

export function MessageBubble({ message, onExplainLike5 }) {
  const [copied, setCopied] = useState(false);
  const isAI = message.role === 'ai';

  const formatText = (text) => {
    // Replace [BULLISH] and [BEARISH] tags with styled versions
    let formatted = text.replace(/\[BULLISH\]/g, '<span class="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">BULLISH</span>');
    formatted = formatted.replace(/\[BEARISH\]/g, '<span class="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900 dark:text-red-200">BEARISH</span>');
    // Replace **bold**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formatted;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex w-full mb-6", isAI ? "justify-start" : "justify-end")}
    >
      <div className={cn("flex max-w-[80%] gap-4", isAI ? "flex-row" : "flex-row-reverse")}>
        
        {/* Avatar */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
          isAI ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>

        {/* Bubble */}
        <div className={cn(
          "flex flex-col gap-2 relative",
          isAI ? "items-start" : "items-end"
        )}>
          <div className={cn(
            "p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap",
            isAI ? "bg-card border border-border text-card-foreground rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"
          )}
          dangerouslySetInnerHTML={isAI ? { __html: formatText(message.text) } : undefined}
          >
            {!isAI && message.text}
          </div>
          
          {/* Chart placeholder */}
          {isAI && message.text.includes("[BULLISH]") && (
             <div className="w-full max-w-sm mt-2 p-3 bg-card border border-border rounded-xl shadow-sm">
               <div className="text-xs text-muted-foreground mb-2">Trend Overview (Mock)</div>
               <div className="h-24 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={mockChartData}>
                     <XAxis dataKey="name" hide />
                     <YAxis hide />
                     <Tooltip />
                     <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
             </div>
          )}

          {/* Action Footer for AI */}
          {isAI && (
            <div className="flex items-center gap-2 mt-1">
              <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors">
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={() => onExplainLike5(message.text)} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors ml-2">
                <Info className="w-3 h-3" />
                Explain Like I'm 5
              </button>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
