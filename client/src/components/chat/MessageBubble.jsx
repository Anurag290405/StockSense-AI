import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, BarChart3, Layers } from 'lucide-react';
import { InsightCard } from '../ui/InsightCard';

export function MessageBubble({ message, onExplainLike5 }) {
  const [copied, setCopied] = useState(false);
  const isAI = message.role === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parseFinancialBriefing = (text) => {
    const isBullish = text.includes('[BULLISH]') || /bullish|uptrend|buy/i.test(text);
    const isBearish = text.includes('[BEARISH]') || /bearish|downtrend|sell|risk/i.test(text);
    const cleanText = text.replace(/\[BULLISH\]|\[BEARISH\]/g, '').trim();
    const plainText = cleanText.replace(/\*\*/g, '');
    const chunks = plainText
      .split(/\n|\.|;/)
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      isBullish,
      isBearish,
      cleanText: plainText,
      keyInsights: chunks.slice(0, 3),
      riskFactors: chunks.slice(3, 6),
    };
  };

  const { isBullish, isBearish, cleanText, keyInsights, riskFactors } = parseFinancialBriefing(message.text);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex flex-col gap-3 max-w-[92%] md:max-w-[78%] ${isAI ? 'items-start' : 'items-end'}`}>

        {!isAI ? (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl px-4 py-2 shadow-md text-slate-900 dark:text-white transition-all duration-200 ease-in-out hover:shadow-xl">
            {message.text}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 shadow-md w-full transition-all duration-200 ease-in-out hover:shadow-xl hover:border-emerald-500/30">
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-3">{cleanText}</p>

            <div className="w-full border-t border-slate-300 dark:border-slate-700 my-3" />

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {isBullish && <span className="text-emerald-400 text-xs font-semibold">🟢 Bullish</span>}
              {isBearish && <span className="text-red-400 text-xs font-semibold">🔴 Bearish</span>}
              {!isBullish && !isBearish && <span className="text-slate-500 dark:text-gray-400 text-xs">Neutral</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard title="Key Insights" variant="emerald">
                <ul className="list-disc list-inside space-y-1">
                  {(keyInsights.length ? keyInsights : ['No key insights detected']).map((item, idx) => (
                    <li key={`${item}-${idx}`}>{item}</li>
                  ))}
                </ul>
              </InsightCard>

              <InsightCard title="Risk Factors" variant="red">
                <ul className="list-disc list-inside space-y-1">
                  {(riskFactors.length ? riskFactors : ['No major risk factors detected']).map((item, idx) => (
                    <li key={`${item}-${idx}`}>{item}</li>
                  ))}
                </ul>
              </InsightCard>
            </div>

          </div>
        )}

        <div className="flex items-center gap-4 mt-1 px-1">
          {isAI && (
            <button onClick={handleCopy} className="text-xs font-semibold text-slate-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg px-2 py-1 flex items-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-95">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Layers className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
          {isAI && (
            <button onClick={() => onExplainLike5(message.text)} className="text-xs font-semibold text-slate-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg px-2 py-1 flex items-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-95">
              <BarChart3 className="w-3.5 h-3.5" />
              Explain Simple
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
