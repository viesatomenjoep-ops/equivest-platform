import React, { useState, useMemo } from 'react';

const RoiCalculator = ({ lang = 'en' }) => {
  const [amount, setAmount] = useState(100000);

  const translations = {
    en: {
      title: 'Investment ROI Calculator',
      inputLabel: 'Amount to Invest',
      minLabel: 'Min: €15.000',
      maxLabel: 'Max: €1.000.000+',
      year1: 'Year 1',
      year2: 'Year 2',
      year3: 'Year 3',
      range: 'Projected Profit',
      totalReturn: 'Total Return (Incl. Inv.)',
      cta: 'Request Investment Plan',
      potential: 'Potential',
    },
    nl: {
      title: 'ROI Calculator',
      inputLabel: 'Investeringsbedrag',
      minLabel: 'Min: €15.000',
      maxLabel: 'Max: €1.000.000+',
      year1: 'Jaar 1',
      year2: 'Jaar 2',
      year3: 'Jaar 3',
      range: 'Verwachte Winst',
      totalReturn: 'Totale Opbrengst (Incl. Inleg)',
      cta: 'Plan Aanvragen',
      potential: 'Potentieel',
    },
    de: {
      title: 'ROI-Rechner',
      inputLabel: 'Investitionsbetrag',
      minLabel: 'Min: €15.000',
      maxLabel: 'Max: €1.000.000+',
      year1: 'Jahr 1',
      year2: 'Jahr 2',
      year3: 'Jahr 3',
      range: 'Erwarteter Gewinn',
      totalReturn: 'Gesamtertrag (Inkl. Investition)',
      cta: 'Investitionsplan Anfordern',
      potential: 'Potenzial',
    },
    es: {
      title: 'Calculadora de ROI',
      inputLabel: 'Monto de Inversión',
      minLabel: 'Min: €15.000',
      maxLabel: 'Max: €1.000.000+',
      year1: 'Año 1',
      year2: 'Año 2',
      year3: 'Año 3',
      range: 'Beneficio Proyectado',
      totalReturn: 'Retorno Total (Incl. Inv.)',
      cta: 'Solicitar Plan de Inversión',
      potential: 'Potencial',
    }
  };

  const t = translations[lang] || translations.en;

  const results = useMemo(() => [
    { year: t.year1, min: 0.3, max: 0.75 },
    { year: t.year2, min: 0.5, max: 1.5 },
    { year: t.year3, min: 0.75, max: 3.0 },
  ], [t]);

  const formatter = new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    const numVal = val === '' ? 0 : parseInt(val, 10);
    setAmount(Math.min(numVal, 10000000)); // Cap at 10M for realism
  };

  return (
    <div className="bg-primary-light p-8 md:p-12 shadow-2xl border-l-[12px] border-accent relative overflow-hidden rounded-r-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-serif text-white">{t.title}</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex flex-col items-end group focus-within:border-accent/40 transition-colors">
            <label className="text-accent/60 text-[15px] font-bold uppercase tracking-[0.2em] mb-1">{t.inputLabel}</label>
            <div className="flex items-center">
              <span className="text-white/40 text-2xl md:text-3xl font-serif mr-1">€</span>
              <input 
                type="text" 
                value={amount.toLocaleString(lang === 'nl' ? 'nl-NL' : 'en-US')}
                onChange={handleInputChange}
                className="bg-transparent border-none text-white text-2xl md:text-3xl font-serif tabular-nums outline-none w-32 md:w-48 text-right p-0 focus:ring-0"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16 px-2">
          <div className="relative h-1.5 bg-white/10 rounded-full group mb-4">
            <input 
              type="range" 
              min="15000" 
              max="1000000" 
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(((amount - 15000) / 985000) * 100, 100)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] rounded-full scale-100 group-hover:scale-125 transition-transform duration-200 pointer-events-none border-2 border-accent"></div>
            </div>
          </div>
          <div className="flex justify-between text-[15px] font-bold uppercase tracking-widest text-white/30">
            <span>{t.minLabel}</span>
            <span>{t.maxLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((res, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/[0.08] transition-all hover:-translate-y-1">
              <div className="flex justify-between items-center mb-6">
                <span className="text-accent text-[15px] font-bold uppercase tracking-[0.3em]">{res.year}</span>
                <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-bold uppercase tracking-wider">
                  +{(res.max * 100).toFixed(0)}% {t.potential}
                </span>
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="block text-white/40 text-sm font-bold uppercase tracking-widest">{t.range}</span>
                  <div className="text-xl md:text-2xl font-serif text-white">
                    {formatter.format(amount * res.min)}
                    <span className="mx-2 text-white/20 font-sans text-sm">—</span>
                    {formatter.format(amount * res.max)}
                  </div>
                </div>
                <div className="space-y-1 pt-4 border-t border-white/10">
                  <span className="block text-accent/80 text-sm font-bold uppercase tracking-widest">{t.totalReturn}</span>
                  <div className="text-lg md:text-xl font-serif text-accent">
                    {formatter.format(amount + (amount * res.min))}
                    <span className="mx-2 text-accent/40 font-sans text-sm">—</span>
                    {formatter.format(amount + (amount * res.max))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
          <p className="text-white/30 text-[15px] max-w-sm italic leading-relaxed">
            * Calculations are based on professional benchmarks for the trade and sport of 5-star Grand Prix jumpers. Actual results may vary.
          </p>
          <a href="#contact" className="w-full md:w-auto bg-accent text-white px-10 py-5 text-lg font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-xl text-center relative z-20">
            {t.cta}
          </a>
        </div>
      </div>

      {/* Interactive Subtle Scroll to Top Logo */}
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="absolute bottom-6 left-12 z-0 w-16 h-16 opacity-[0.04] hover:opacity-[0.15] transition-all duration-700 cursor-pointer focus:outline-none hidden md:block">
        <img src="/images/logo.png" alt="Scroll to top" className="w-full h-full object-contain brightness-0 invert drop-shadow-2xl" />
      </button>
    </div>
  );
};

export default RoiCalculator;
