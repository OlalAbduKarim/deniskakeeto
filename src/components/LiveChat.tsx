import { useState, useEffect, useRef, FormEvent } from 'react';
import { MessageSquare, X, Send, Phone, Scale, Shield, Check } from 'lucide-react';
import { Lead } from '../types';

interface LiveChatProps {
  onLeadCapture: (lead: Lead) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export default function LiveChat({ onLeadCapture }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hi, I'm the AI Assistant for Denis Kakeeto Advocates. Do you have a question about divorce, a vehicle/boda boda accident, or a criminal charge?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<'options' | 'chatting' | 'collecting_phone' | 'completed'>('options');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userIntent, setUserIntent] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text,
        timestamp: new Date()
      }
    ]);
  };

  const selectOption = (option: string, text: string, botReply: string) => {
    setStep('chatting');
    setUserIntent(option);
    
    // Add user choice
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: new Date()
      }
    ]);

    // Simulate typing delay
    setTimeout(() => {
      addBotMessage(botReply);
      setTimeout(() => {
        addBotMessage("To have Advocate Denis Kakeeto review your case details personally, what is your name and reachable phone number?");
        setStep('collecting_phone');
      }, 1000);
    }, 600);
  };

  const handleCustomSend = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    setMessages(prev => [
      ...prev,
      {
        id: `user-custom-${Date.now()}`,
        sender: 'user',
        text: query,
        timestamp: new Date()
      }
    ]);
    setInputValue('');

    // Answer with context based matching
    setTimeout(() => {
      let response = "That sounds critical. Denis Kakeeto Advocates has representation teams experienced resolving exactly this issue in Kampala courts.";
      const lower = query.toLowerCase();

      if (lower.includes('divorce') || lower.includes('custody') || lower.includes('child') || lower.includes('wife') || lower.includes('husband')) {
        response = "Family disputes require delicate handling. We handle custody, property division, and uncontested divorces starting at UGX 1.5M.";
      } else if (lower.includes('accident') || lower.includes('injury') || lower.includes('boda') || lower.includes('car') || lower.includes('hospital')) {
        response = "We represent accident casualties on a strict No-Win, No-Fee basis. You pay nothing unless we collect damages.";
      } else if (lower.includes('arrest') || lower.includes('police') || lower.includes('bail') || lower.includes('theft') || lower.includes('jail')) {
        response = "Our 24/7 hotline is active. We can secure police bond or magistrate court bail applications rapidly.";
      }

      addBotMessage(response);

      setTimeout(() => {
        addBotMessage("May I get your Name and reachable mobile Phone number so Denis Kakeeto can call you back directly within the hour?");
        setStep('collecting_phone');
      }, 1000);
    }, 600);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    // Trigger Lead Submission to dashboard
    const hours = new Date().getHours();
    const isAfterHours = hours >= 18 || hours < 8;

    const chatbotLead: Lead = {
      id: `chat-lead-${Date.now()}`,
      name: userName,
      phone: userPhone,
      description: `[Live Chat Lead - Category: ${userIntent || 'General Inquiry'}] User stated need.`,
      submittedAt: new Date().toLocaleString(),
      isAfterHours,
      status: 'New'
    };

    // Store in LocalStorage
    try {
      const existingLeads: Lead[] = JSON.parse(localStorage.getItem('denis_leads') || '[]');
      existingLeads.unshift(chatbotLead);
      localStorage.setItem('denis_leads', JSON.stringify(existingLeads));
    } catch (e) {
      console.error(e);
    }

    onLeadCapture(chatbotLead);
    setStep('completed');

    setMessages(prev => [
      ...prev,
      {
        id: `user-contact-${Date.now()}`,
        sender: 'user',
        text: `Name: ${userName}, Phone: ${userPhone}`,
        timestamp: new Date()
      }
    ]);

    setTimeout(() => {
      addBotMessage("Excellent setup! Your contact details are sent to Advocate Denis Kakeeto's desk securely. A legal advisor will call you shortly.");
    }, 500);
  };

  return (
    <>
      {/* 1. Closed State Circular Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-6 bg-navy text-gold p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 flex items-center justify-center border-2 border-gold cursor-pointer"
          id="chat-toggle-button"
          aria-label="Open Live Chat"
        >
          <div className="relative">
            <MessageSquare className="h-7 w-7" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-navy animate-pulse"></span>
          </div>
        </button>
      )}

      {/* 2. Expanded Chat Panel */}
      {isOpen && (
        <div 
          id="chat-expanded-panel" 
          className="fixed bottom-20 lg:bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white text-navy rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-slideIn"
        >
          {/* Header */}
          <div className="bg-navy p-4 flex justify-between items-center text-white border-b-2 border-gold">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-gold p-1.5 rounded-lg text-navy">
                  <Scale className="h-4.5 w-4.5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border border-navy"></span>
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white leading-tight">Denis Kakeeto Advocates</h4>
                <span className="text-[10px] text-gray-300 flex items-center gap-1">
                  <span className="font-semibold text-emerald-400">●</span> Live Law Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close Chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 text-[10px] text-gray-500 flex justify-between font-medium">
            <span>🛡️ Privilege Guaranteed</span>
            <span>⏱️ Call Back: 1 Hour</span>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`text-xs p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-navy text-white rounded-tr-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Action Steps (Lead Funnel Options) */}
          <div className="p-3 bg-white border-t border-gray-100">
            {step === 'options' && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => selectOption(
                    'Family',
                    'I have a question about divorce or child custody ⚖️',
                    'Family matters are delicate. We successfully mediate properties and child arrangements or file aggressive court partitions. Flat fees start simple at UGX 1.5M.'
                  )}
                  className="w-full py-2 px-3 text-left bg-gray-50 hover:bg-gold/10 hover:text-navy border border-gray-200 hover:border-gold/40 rounded-xl text-xs font-semibold text-gray-700 transition-colors block shrink-0"
                >
                  ⚖️ Child Custody & Divorce Support
                </button>
                <button
                  type="button"
                  onClick={() => selectOption(
                    'Injury',
                    'I had a vehicle/boda boda accident injury 🚗',
                    'Physical injuries deserve maximum support damages. Under our No-Fee promise, you do not pay any legal billing unless we win Uganda Shillings payments.'
                  )}
                  className="w-full py-2 px-3 text-left bg-gray-50 hover:bg-gold/10 hover:text-navy border border-gray-200 hover:border-gold/40 rounded-xl text-xs font-semibold text-gray-700 transition-colors block shrink-0"
                >
                  🚗 Car or Boda Boda Accident Claim
                </button>
                <button
                  type="button"
                  onClick={() => selectOption(
                    'Criminal',
                    'Someone is arrested / face police charges 🛡️',
                    'Act immediately. The initial 48 hours is critical to prevent unlawful detention nodes. We arrange quick police bail and formal magistrate bonds.'
                  )}
                  className="w-full py-2 px-3 text-left bg-gray-50 hover:bg-gold/10 hover:text-navy border border-gray-200 hover:border-gold/40 rounded-xl text-xs font-semibold text-gray-700 transition-colors block shrink-0"
                >
                  🛡️ Arrest, Police Bond & Criminal Trial
                </button>
              </div>
            )}

            {step === 'chatting' && (
              <form onSubmit={handleCustomSend} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask any legal question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                  disabled
                />
                <button
                  type="button"
                  className="bg-gray-200 text-gray-400 p-2 rounded-lg"
                  disabled
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            )}

            {step === 'collecting_phone' && (
              <form onSubmit={handleContactSubmit} className="space-y-2 bg-gray-50 p-2.5 rounded-xl border border-gold/20">
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-1/2 text-xs px-2 py-1.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-gold"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-1/2 text-xs px-2 py-1.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-gold"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-gold hover:bg-gold-dark text-navy text-[11px] font-bold rounded uppercase tracking-wide"
                >
                  Connect Me to Advocate Denis
                </button>
              </form>
            )}

            {step === 'completed' && (
              <div className="flex items-center gap-2 justify-center py-2 text-emerald-600 text-[11px] font-bold">
                <Check className="h-3.5 w-3.5 p-0.5 bg-emerald-100 rounded-full" />
                <span>Our legal team has been notified. Calling you soon!</span>
              </div>
            )}

            {/* Support telephone shortcut */}
            <div className="mt-2 text-center text-[10px] text-gray-400">
              Need to talk now? Call priority hotline:<br />
              <a href="tel:+256772968262" className="text-navy font-bold hover:underline">
                +256 772 968 262
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
