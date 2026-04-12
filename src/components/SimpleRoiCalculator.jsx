import React, { useState, useMemo } from 'react';

const SimpleRoiCalculator = ({ lang = 'en', currency = 'EUR', setCurrency }) => {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€';
  const [amount, setAmount] = useState(100000);
  const [activeYear, setActiveYear] = useState(0);

  const translations = {
    en: {
      title: 'Investment ROI Calculator',
      inputLabel: 'Amount to Invest',
      minLabel: 'Min: €15.000',
      maxLabel: 'Max: €1.000.000+',
      year1: '3-6 Months',
      year2: '6-12 Months',
      year3: '12-36 Months',
      shortTerm: 'Short Term Investment',
      mediumTerm: 'Medium Term Project',
      longTerm: 'Long Term Investment',
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
      year1: '3-6 Maanden',
      year2: '6-12 Maanden',
      year3: '12-36 Maanden',
      shortTerm: 'Korte Termijn Investering',
      mediumTerm: 'Middellange Termijn Project',
      longTerm: 'Lange Termijn Investering',
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
      year1: '3-6 Monate',
      year2: '6-12 Monate',
      year3: '12-36 Monate',
      shortTerm: 'Kurzfristige Investition',
      mediumTerm: 'Mittelfristiges Projekt',
      longTerm: 'Langfristige Investition',
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
      year1: '3-6 Meses',
      year2: '6-12 Meses',
      year3: '12-36 Meses',
      shortTerm: 'Inversión a Corto Plazo',
      mediumTerm: 'Proyecto a Medio Plazo',
      longTerm: 'Inversión a Largo Plazo',
      range: 'Beneficio Proyectado',
      totalReturn: 'Retorno Total (Incl. Inv.)',
      cta: 'Solicitar Plan de Inversión',
      potential: 'Potencial',
    }
  };

  const t = translations[lang] || translations.en;

  const results = useMemo(() => [
    { year: t.year1, label: t.shortTerm, min: 0.3, max: 0.75 },
    { year: t.year2, label: t.mediumTerm, min: 0.5, max: 1.5 },
    { year: t.year3, label: t.longTerm, min: 0.75, max: 3.0 },
  ], [t]);

  const formatter = new Intl.NumberFormat(lang === 'nl' || lang === 'de' || lang === 'es' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  });

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    const numVal = val === '' ? 0 : parseInt(val, 10);
    setAmount(Math.min(numVal, 10000000)); // Cap at 10M for realism
  };

  return (
    <div className="bg-primary-light p-4 md:p-6 lg:p-8 shadow-2xl border-l-[12px] border-accent relative overflow-hidden rounded-r-2xl mx-auto w-full max-w-4xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light/5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 lg:gap-4 lg:mb-8">
          <h3 className="text-base md:text-lg lg:text-2xl font-serif text-white">{t.title}</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-2 py-2 lg:px-4 flex flex-col items-start md:items-end group focus-within:border-accent/40 transition-colors w-full md:w-auto">
            <label className="text-accent/90 text-[10px] md:text-xs lg:text-base font-bold uppercase tracking-[0.2em] mb-1 md:mb-2">{t.inputLabel}</label>
            <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
              <select 
                value={currency} 
                onChange={(e) => setCurrency && setCurrency(e.target.value)} 
                className="bg-transparent border-none text-white/70 hover:text-white text-lg md:text-xl lg:text-2xl font-serif mr-2 cursor-pointer focus:ring-0 outline-none appearance-none"
              >
                <option value="EUR" className="text-black bg-white">€</option>
                <option value="USD" className="text-black bg-white">$</option>
                <option value="GBP" className="text-black bg-white">£</option>
              </select>
              <input 
                type="text" 
                value={amount.toLocaleString(lang === 'nl' ? 'nl-NL' : 'en-US')}
                onChange={handleInputChange}
                className="bg-transparent border-none text-white text-lg md:text-xl lg:text-2xl font-serif tabular-nums outline-none w-32 md:w-48 text-right p-0 focus:ring-0"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-3 md:mb-5 px-2 max-w-4xl mx-auto">
          <div className="relative h-1 bg-white/10 rounded-full group mb-4">
            <input 
              type="range" 
              min="15000" 
              max="1000000" 
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 touch-none"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full"
              style={{ width: `${Math.min(((amount - 15000) / 985000) * 100, 100)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-full scale-100 group-hover:scale-125 pointer-events-none border-2 border-accent"></div>
            </div>
          </div>
          <div className="flex justify-between text-base md:text-lg lg:text-2xl font-serif text-white/80 tabular-nums">
            <span>{t.minLabel.replace('€', currencySymbol)}</span>
            <span>{t.maxLabel.replace('€', currencySymbol)}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-3 md:p-5 lg:p-8 rounded-xl lg:rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
          
          {(() => {
            const res = results[activeYear];
            return (
              <div className="flex flex-col space-y-8">
                
                {/* 1. TOTAL RETURN HERO */}
                <div className="text-center space-y-2 pb-8 border-b border-white/10">
                  <span className="block text-accent/80 text-sm md:text-base font-bold uppercase tracking-[0.3em]">{t.totalReturn}</span>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-white flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 drop-shadow-lg tabular-nums leading-tight">
                    <span>{formatter.format(amount + (amount * res.min))}</span>
                    <span className="text-white/30 hidden md:block">—</span>
                    <span className="text-white/30 block md:hidden text-lg italic">{lang === 'nl' ? 'tot' : lang === 'de' ? 'bis' : lang === 'es' ? 'a' : 'to'}</span>
                    <span>{formatter.format(amount + (amount * res.max))}</span>
                  </div>
                </div>

                {/* 2. TIMELINE SELECTORS */}
                <div className="flex flex-col sm:flex-row bg-black/20 rounded-2xl p-2 gap-2 max-w-2xl mx-auto w-full">
                  {results.map((r, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveYear(idx)}
                      className={`flex-1 py-1.5 px-3 md:py-2.5 md:px-5 lg:px-6 rounded-lg lg:rounded-xl text-xs md:text-sm lg:text-lg font-bold uppercase tracking-widest transition-all ${activeYear === idx ? 'bg-accent text-white shadow-lg' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
                    >
                      {r.year}
                    </button>
                  ))}
                </div>

                {/* 3. NET PROFIT FOOTER */}
                <div className="flex flex-col lg:flex-row justify-between items-center bg-accent/10 border border-accent/20 rounded-2xl p-4 lg:p-6 gap-4">
                  <div className="text-center lg:text-left w-full">
                    <span className="block text-accent text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-2">{t.range} (Net Profit)</span>
                    <div className="text-xl md:text-2xl lg:text-3xl font-serif text-accent flex flex-col md:flex-row items-center justify-center lg:justify-start gap-2 tabular-nums">
                      <span>+{formatter.format(amount * res.min)}</span>
                      <span className="text-accent/40 hidden md:block">—</span>
                      <span className="text-accent/40 block md:hidden text-sm italic">{lang === 'nl' ? 'tot' : lang === 'de' ? 'bis' : lang === 'es' ? 'a' : 'to'}</span>
                      <span>+{formatter.format(amount * res.max)}</span>
                    </div>
                  </div>
                  <div className="bg-accent text-white px-2 py-1.5 rounded lg:rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider text-center shadow-lg">
                    +{(res.max * 100).toFixed(0)}% {t.potential}
                  </div>
                </div>

              </div>
            );
          })()}
        </div>

        <div className="mt-5 lg:mt-8 flex flex-col md:flex-row items-center justify-between gap-8 pt-3 lg:pt-5 border-t border-white/10">
          <p className="text-white/60 text-lg max-w-sm italic leading-relaxed">
            * Calculations are based on professional benchmarks for the trade and sport of 5-star Grand Prix jumpers. Actual results may vary.
          </p>
          <a href="#contact" className="w-full md:w-auto bg-accent text-white px-4 py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-xl text-center relative z-20">
            {t.cta}
          </a>
        </div>
      </div>

      {/* Interactive Subtle Scroll to Top Logo */}
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="absolute bottom-6 left-12 z-0 w-16 h-16 opacity-[0.04] hover:opacity-[0.15] transition-all duration-700 cursor-pointer focus:outline-none hidden md:block">
        <img src="/images/logo.webp" alt="Scroll to top" loading="lazy" width="64" height="64" className="w-full h-full object-contain brightness-0 invert animate-slow-spin" style={{willChange: 'transform'}} />
      </button>
    </div>
  );
};

export default SimpleRoiCalculator;
