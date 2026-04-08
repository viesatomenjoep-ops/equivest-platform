import React, { useState, useMemo } from 'react';

const RoiCalculator = ({ lang = 'en' }) => {
  const [amount, setAmount] = useState(100000);

  const translations = {
    en: {
      title: 'Investment ROI Calculator',
      inputLabel: 'Amount to Invest',
      minLabel: 'Min: €25.000',
      maxLabel: 'Max: €500.000+',
      year1: 'Year 1',
      year2: 'Year 2',
      year3: 'Year 3',
      range: 'Projected Profit Range',
      cta: 'Request Investment Plan',
    },
    nl: {
      title: 'ROI Calculator',
      inputLabel: 'Investeringsbedrag',
      minLabel: 'Min: €25.000',
      maxLabel: 'Max: €500.000+',
      year1: 'Jaar 1',
      year2: 'Jaar 2',
      year3: 'Jaar 3',
      range: 'Verwachte Winstmarge',
      cta: 'Plan Aanvragen',
    },
    de: {
      title: 'ROI-Rechner',
      inputLabel: 'Investitionsbetrag',
      minLabel: 'Min: €25.000',
      maxLabel: 'Max: €500.000+',
      year1: 'Jahr 1',
      year2: 'Jahr 2',
      year3: 'Jahr 3',
      range: 'Erwartete Gewinnspanne',
      cta: 'Investitionsplan Anfordern',
    },
    es: {
      title: 'Calculadora de ROI',
      inputLabel: 'Monto de Inversión',
      minLabel: 'Min: €25.000',
      maxLabel: 'Max: €500.000+',
      year1: 'Año 1',
      year2: 'Año 2',
      year3: 'Año 3',
      range: 'Margen de Beneficio Proyectado',
      cta: 'Solicitar Plan de Inversión',
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

  return (
    <div className="bg-primary p-8 md:p-16 shadow-premium border-l-[12px] border-accent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-serif text-white mb-12">{t.title}</h3>
        
        <div className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-1">
              <label className="text-accent text-xs font-bold uppercase tracking-[0.2em]">{t.inputLabel}</label>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{t.minLabel} — {t.maxLabel}</p>
            </div>
            <div className="text-4xl md:text-5xl font-serif text-white tabular-nums border-b border-white/20 pb-2">
              {formatter.format(amount)}
            </div>
          </div>
          
          <div className="relative h-2 bg-white/10 rounded-full group">
            <input 
              type="range" 
              min="25000" 
              max="1000000" 
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-150"
              style={{ width: `${Math.min(((amount - 25000) / 975000) * 100, 100)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white shadow-xl rounded-full scale-100 group-hover:scale-125 transition-transform duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((res, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 transform transition-transform hover:-translate-y-2 group">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block opacity-80">{res.year}</span>
              <div className="space-y-2">
                <span className="block text-white/50 text-[10px] font-bold uppercase tracking-widest">{t.range}</span>
                <div className="text-2xl font-serif text-white leading-none">
                  {formatter.format(amount * res.min)}
                </div>
                <div className="text-lg text-accent/80 font-serif translate-x-2">
                   to {formatter.format(amount * res.max)}
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-accent font-serif text-xl">+{(res.max * 100).toFixed(0)}%</span>
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-tighter">Potential</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
          <p className="text-white/40 text-[11px] max-w-md italic tracking-wide leading-relaxed">
            * Calculations are based on professional benchmarks for the trade and sport of 5-star Grand Prix jumpers. Actual results may vary per project.
          </p>
          <a href="#contact" className="bg-accent text-primary px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-xl">
            {t.cta}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
