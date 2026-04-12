import React, { useState } from 'react';
import SimpleRoiCalculator from './SimpleRoiCalculator';
import AdvancedRoiCalculator from './AdvancedRoiCalculator';

export default function RoiCalculatorTabs({ lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('advanced');
  const [currency, setCurrency] = useState('EUR');

  const translations = {
    en: { simpleTab: 'Investment Profit Estimator', advancedTab: 'Advanced Syndicate TCO' },
    nl: { simpleTab: 'Investerings Winstschatter', advancedTab: 'Geavanceerde TCO Simulator' },
    de: { simpleTab: 'Investitionsgewinnschätzer', advancedTab: 'Erweiterter TCO-Simulator' },
    es: { simpleTab: 'Estimador de Inversión', advancedTab: 'Simulador TCO Avanzado' },
  };
  
  const t = translations[lang] || translations.en;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex bg-white border border-primary/10 rounded-full p-2 mb-10 w-full max-w-3xl relative z-20 shadow-2xl overflow-hidden drop-shadow-xl">
         <button 
           onClick={() => setActiveTab('advanced')}
           className={`w-1/2 py-3 px-2 sm:py-4 sm:px-4 rounded-full transition-all duration-300 font-bold uppercase tracking-widest sm:tracking-[0.2em] leading-tight flex items-center justify-center text-[clamp(10px,2vw,14px)] ${activeTab === 'advanced' ? 'bg-accent text-white shadow-lg scale-[1.02] sm:scale-105' : 'text-primary/60 hover:text-primary hover:bg-black/5'}`}
         >
           <span className="text-center">{t.advancedTab}</span>
         </button>
         <button 
           onClick={() => setActiveTab('simple')}
           className={`w-1/2 py-3 px-2 sm:py-4 sm:px-4 rounded-full transition-all duration-300 font-bold uppercase tracking-widest sm:tracking-[0.2em] leading-tight flex items-center justify-center text-[clamp(10px,2vw,14px)] ${activeTab === 'simple' ? 'bg-primary text-white shadow-lg scale-[1.02] sm:scale-105' : 'text-primary/60 hover:text-primary hover:bg-black/5'}`}
         >
           <span className="text-center">{t.simpleTab}</span>
         </button>
      </div>
      
      {/* Currency Selector */}
      <div className="flex bg-white/10 border border-primary/20 rounded-full p-1 mb-8 max-w-[240px] relative z-20">
         {['EUR', 'USD', 'GBP'].map((code) => (
           <button 
             key={code}
             onClick={() => setCurrency(code)}
             className={`flex-1 py-2 text-xs font-bold transition-all duration-300 rounded-full ${currency === code ? 'bg-primary text-white shadow-md' : 'text-primary/60 hover:text-primary hover:bg-black/5'}`}
           >
             {code === 'EUR' ? '€' : code === 'USD' ? '$' : '£'} {code}
           </button>
         ))}
      </div>

      <div className="w-full animate-fade-in transition-all duration-500">
        {activeTab === 'simple' && <SimpleRoiCalculator lang={lang} currency={currency} />}
        {activeTab === 'advanced' && <AdvancedRoiCalculator lang={lang} currency={currency} />}
      </div>
    </div>
  );
}
