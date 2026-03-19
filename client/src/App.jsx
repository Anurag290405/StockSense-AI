import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChatArea } from './components/chat/ChatArea';

function App() {
  const [promptFromSidebar, setPromptFromSidebar] = useState('');

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <Sidebar onSelectPrompt={setPromptFromSidebar} />
      <ChatArea promptFromSidebar={promptFromSidebar} />
    </div>
  );
}

export default App;
