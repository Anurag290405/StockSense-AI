import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChatArea } from './components/chat/ChatArea';
import { Menu } from 'lucide-react';

function App() {
  const [promptFromSidebar, setPromptFromSidebar] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/20">
      
      <Sidebar 
        onSelectPrompt={setPromptFromSidebar} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden absolute top-0 left-0 p-3 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 bg-card/80 backdrop-blur-md border border-border rounded-xl shadow-sm text-foreground hover:bg-muted transition-colors active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <ChatArea promptFromSidebar={promptFromSidebar} onClearPrompt={() => setPromptFromSidebar('')} />
      </div>

    </div>
  );
}

export default App;
