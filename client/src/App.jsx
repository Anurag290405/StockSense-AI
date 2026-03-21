import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChatArea } from './components/chat/ChatArea';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [promptFromSidebar, setPromptFromSidebar] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [resetChatTrigger, setResetChatTrigger] = useState(0);

  const handleNewChat = () => {
    setPromptFromSidebar('');
    setResetChatTrigger(prev => prev + 1);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 dark:bg-slate-900 overflow-hidden text-slate-700 dark:text-gray-300 selection:bg-emerald-500/30">
      
      {/* Premium Sidebar Navigation */}
      <Sidebar 
        onSelectPrompt={setPromptFromSidebar} 
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col relative min-w-0 bg-transparent">
        
        {/* Responsive Mobile Trigger */}
        <div className="lg:hidden absolute top-3.5 left-4 z-[40]">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg text-slate-700 dark:text-gray-300 hover:text-emerald-500 transition-all duration-200 ease-in-out flex items-center justify-center"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
        
        <ChatArea 
          promptFromSidebar={promptFromSidebar} 
          onClearPrompt={() => setPromptFromSidebar('')} 
          resetChatTrigger={resetChatTrigger}
        />
      </div>

    </div>
  );
}

export default App;
