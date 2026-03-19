import React from 'react';

export function ActionCard({ title, icon, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-card text-card-foreground shadow-sm rounded-xl p-6 border border-border cursor-pointer hover:border-primary hover:shadow-md transition-all flex flex-col items-center gap-3 text-center"
    >
      <div className="text-primary bg-primary/10 p-3 rounded-full">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
