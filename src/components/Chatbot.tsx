import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CHATBOT_WEBHOOK_URL = 'https://primary-production-4dfbc.up.railway.app/webhook/45734fb9-54b6-4989-976e-58f41977b931/chat';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    if (isOpen && !isMinimized) {
      setIsMinimized(true);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            'bg-card border rounded-lg shadow-2xl transition-all duration-300 ease-in-out',
            isMinimized
              ? 'w-80 h-12 overflow-hidden'
              : 'w-96 h-[600px] flex flex-col'
          )}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-career-blue to-career-purple text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Career Assistant</h3>
                <p className="text-xs opacity-90">We're here to help!</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={toggleChat}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={closeChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Iframe */}
          {!isMinimized && (
            <div className="flex-1 relative">
              <iframe
                src={CHATBOT_WEBHOOK_URL}
                className="w-full h-full border-0 rounded-b-lg"
                title="Career Assistant Chatbot"
                allow="microphone; camera"
              />
            </div>
          )}
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-all duration-200 bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90 relative group"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}

      {/* Minimized Chat Button */}
      {isOpen && isMinimized && (
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-transform duration-200 bg-gradient-to-r from-career-blue to-career-purple hover:opacity-90"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Restore chat</span>
        </Button>
      )}
    </div>
  );
};

export default Chatbot;

