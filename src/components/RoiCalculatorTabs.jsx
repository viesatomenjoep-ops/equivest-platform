import React, { useState } from 'react';
import SimpleRoiCalculator from './SimpleRoiCalculator';
import AdvancedRoiCalculator from './AdvancedRoiCalculator';

export default function RoiCalculatorTabs({ lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('advanced');

  const translations = {
    en: { simpleTab: 'Quick Profit Estimator', advancedTab: 'Advanced Syndicate TCO' },
    nl: { simpleTab: 'Snelle Winstschatter', advancedTab: 'Geavanceerde TCO Simulator' },
    de: { simpleTab: 'Schneller Gewinnschätzer', advancedTab: 'Erweiterter TCO-Simulator' },
    es: { simpleTab: 'Estimador de Ganancias', advancedTab: 'Simulador TCO Avanzado' },
  };
  
  const t = translations[lang] || translations.en;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex bg-white border border-primary/10 rounded-full p-2 mb-10 w-full max-w-3xl relative z-20 shadow-2xl overflow-hidden drop-shadow-xl">
         <button 
           onClick={() => setActiveTab('advanced')}
           className={`flex-1 py-4 px-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${activeTab === 'advanced' ? 'bg-accent text-white shadow-lg scale-105' : 'text-primary/50 hover:text-primary hover:bg-black/5'}`}
         >
           {t.advancedTab}
         </button>
         <button 
           onClick={() => setActiveTab('simple')}
           className={`flex-1 py-4 px-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${activeTab === 'simple' ? 'bg-primary text-white shadow-lg scale-105' : 'text-primary/50 hover:text-primary hover:bg-black/5'}`}
         >
           {t.simpleTab}
         </button>
      </div>

      <div className="w-full animate-fade-in transition-all duration-500">
        {activeTab === 'simple' && <SimpleRoiCalculator lang={lang} />}
        {activeTab === 'advanced' && <AdvancedRoiCalculator lang={lang} />}
      </div>
    </div>
  );
}
