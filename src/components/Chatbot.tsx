import React, { useState, useEffect, useRef } from 'react';

type Language = 'en' | 'nl' | 'de' | 'es';

interface ChatbotProps {
  lang: Language;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: ActionOption[];
  inputRequired?: 'email' | 'date' | 'none';
}

interface ActionOption {
  label: string;
  action: string;
}

const translations = {
  en: {
    toggle: 'Chat Support',
    welcome: 'Welcome to Equivest. How can we assist you today?',
    btnFaq: 'Learn about investments',
    btnSchedule: 'Schedule a meeting',
    faqIntro: 'We offer syndicate investments in elite 5-star showjumpers. Our investments typically start with a minimum of €25,000.',
    faqQuestion: 'Would you like to schedule a call with our experts?',
    schedule1: 'Great. Which day would you like to speak?',
    dateOption1: 'Tomorrow',
    dateOption2: 'Next Week',
    schedule2: 'Please provide your email address so we can send an invitation:',
    scheduleDone: 'Thank you. We will contact you at {email} to finalize the exact time. Have a wonderful day!',
    placeholder: 'Type your message...',
    send: 'Send',
    close: 'Close chat',
  },
  nl: {
    toggle: 'Chat Ondersteuning',
    welcome: 'Welkom bij Equivest. Hoe kunnen we u vandaag helpen?',
    btnFaq: 'Meer over investeren',
    btnSchedule: 'Een afspraak plannen',
    faqIntro: 'Wij bieden investeringen in elite springpaarden via exclusieve syndicaten. De minimale inleg is vanaf €25.000.',
    faqQuestion: 'Wilt u een afspraak maken met een van onze experts?',
    schedule1: 'Uitstekend. Op welke dag wilt u spreken?',
    dateOption1: 'Morgen',
    dateOption2: 'Volgende week',
    schedule2: 'Vul uw e-mailadres in zodat we een uitnodiging kunnen sturen:',
    scheduleDone: 'Dank u. We nemen contact op via {email} om de tijd definitief in te plannen. Een fijne dag verder!',
    placeholder: 'Typ uw bericht...',
    send: 'Verzenden',
    close: 'Chat sluiten',
  },
  de: {
    toggle: 'Chat-Support',
    welcome: 'Willkommen bei Equivest. Wie können wir Ihnen heute helfen?',
    btnFaq: 'Über Investitionen',
    btnSchedule: 'Einen Termin vereinbaren',
    faqIntro: 'Wir bieten Syndikatsinvestitionen in Elite-Springpferde an. Die Mindestinvestition beginnt bei 25.000 €.',
    faqQuestion: 'Möchten Sie einen Anruf mit unseren Experten vereinbaren?',
    schedule1: 'Großartig. An welchem Tag möchten Sie sprechen?',
    dateOption1: 'Morgen',
    dateOption2: 'Nächste Woche',
    schedule2: 'Bitte geben Sie Ihre E-Mail-Adresse ein, damit wir eine Einladung senden können:',
    scheduleDone: 'Vielen Dank. Wir kontaktieren Sie unter {email}, um die Zeit zu bestätigen. Einen schönen Tag!',
    placeholder: 'Schreiben Sie Ihre Nachricht...',
    send: 'Senden',
    close: 'Chat schließen',
  },
  es: {
    toggle: 'Asistencia por Chat',
    welcome: 'Bienvenido a Equivest. ¿Cómo podemos ayudarle hoy?',
    btnFaq: 'Sobre las inversiones',
    btnSchedule: 'Programar una reunión',
    faqIntro: 'Ofrecemos inversiones sindicadas en saltadores de élite. La inversión mínima inicia en 25.000€.',
    faqQuestion: '¿Desea programar una llamada con nuestros expertos?',
    schedule1: 'Excelente. ¿Qué día le gustaría hablar?',
    dateOption1: 'Mañana',
    dateOption2: 'La próxima semana',
    schedule2: 'Por favor, introduzca su correo electrónico para enviarle una invitación:',
    scheduleDone: 'Gracias. Le contactaremos en {email} para confirmar la hora exacta. ¡Que tenga un buen día!',
    placeholder: 'Escriba un mensaje...',
    send: 'Enviar',
    close: 'Cerrar chat',
  }
};

export default function Chatbot({ lang = 'en' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputMode, setInputMode] = useState<'email' | 'none'>('none');
  const t = translations[lang] || translations['en'];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isBrave, setIsBrave] = useState(false);

  useEffect(() => {
    // Detect Brave Browser asynchronously
    if (navigator && (navigator as any).brave && (navigator as any).brave.isBrave) {
      (navigator as any).brave.isBrave().then((res: boolean) => {
        if (res) setIsBrave(true);
      });
    }
  }, []);

  // Initialize the first message when chat is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'bot-1',
          sender: 'bot',
          text: t.welcome,
          options: [
            { label: t.btnFaq, action: 'faq' },
            { label: t.btnSchedule, action: 'schedule' }
          ]
        }
      ]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOptionClick = (action: string, label: string) => {
    // Add user message
    const newMessages = [...messages, { id: `user-${Date.now()}`, sender: 'user' as const, text: label }];
    setMessages(newMessages);

    // Bot response logic
    setTimeout(() => {
      if (action === 'faq') {
        setMessages(prev => [
          ...prev, 
          { id: `bot-${Date.now()}-1`, sender: 'bot', text: t.faqIntro },
          { 
            id: `bot-${Date.now()}-2`, 
            sender: 'bot', 
            text: t.faqQuestion,
            options: [
              { label: t.btnSchedule, action: 'schedule' },
              { label: 'No thanks', action: 'none' } // simplistic fallback
            ]
          }
        ]);
      } else if (action === 'schedule' || action === 'date_tomorrow' || action === 'date_next_week') {
        if (action === 'schedule') {
          setMessages(prev => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: t.schedule1,
              options: [
                { label: t.dateOption1, action: 'date_tomorrow' },
                { label: t.dateOption2, action: 'date_next_week' }
              ]
            }
          ]);
        } else {
          // Date selected, ask for email
          setMessages(prev => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: t.schedule2
            }
          ]);
          setInputMode('email');
        }
      } else if (action === 'none') {
        setMessages(prev => [
          ...prev,
          { id: `bot-${Date.now()}`, sender: 'bot', text: 'If you have any other questions, feel free to ask.' }
        ]);
      }
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const val = inputValue.trim();
    setMessages(prev => [...prev, { id: `user-${Date.now()}`, sender: 'user', text: val }]);
    setInputValue('');

    if (inputMode === 'email') {
      setInputMode('none');

      // Trigger user's mail client to send the invitation request to equivestbv@gmail.com
      const subject = encodeURIComponent("Investment Meeting Request - Equivest");
      const body = encodeURIComponent(`Hello,\n\nI would like to schedule an investment meeting.\nMy contact email is: ${val}\n\nPlease reach out to me.\n\nThank you.`);
      window.location.href = `mailto:equivestbv@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: `bot-${Date.now()}`, sender: 'bot', text: t.scheduleDone.replace('{email}', val) }
        ]);
      }, 600);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: `bot-${Date.now()}`, sender: 'bot', text: 'I am a virtual assistant. Our team will read this message shortly.' }
        ]);
      }, 600);
    }
  };

  // Disable entirely for Brave Browser
  if (isBrave) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label={t.toggle}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] max-h-[calc(100vh-120px)] w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-primary/10 sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-lg font-bold">
                E
              </div>
              <span className="font-semibold tracking-wide">Equivest Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label={t.close} className="text-white hover:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-accent text-white rounded-br-sm'
                      : 'bg-gray-100 text-primary rounded-bl-sm border border-gray-200'
                  }`}
                >
                  <p className="text-lg leading-relaxed">{msg.text}</p>
                </div>
                
                {/* Options if provided by bot */}
                {msg.options && msg.options.length > 0 && (
                  <div className="mt-2 flex flex-col items-start space-y-2 pl-2">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt.action, opt.label)}
                        className="rounded-full border border-accent/30 bg-white px-4 py-1.5 text-lg text-accent transition-colors hover:bg-accent hover:text-white"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex relative">
              <input
                type={inputMode === 'email' ? 'email' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.placeholder}
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-4 pr-12 text-lg text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white transition-opacity disabled:opacity-80"
                aria-label={t.send}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
