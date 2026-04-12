import React, { useState, useMemo } from 'react';

const AdvancedRoiCalculator = ({ lang = 'en', currency = 'EUR', setCurrency }) => {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€';
  const [data, setData] = useState({
    purchasePrice: 250000,
    ownershipPercentage: 100,
    monthsHeld: 24,
    monthlyBoardingTraining: 2500,
    monthlyVetFarrier: 500,
    monthlyShowTransport: 1500,
    insuranceRateYearly: 3.5,
    expectedSalePrice: 400000,
  });

  const translations = {
    en: {
      title: 'Syndicate TCO & ROI Calculator',
      subtitle: 'Advanced Financial Modeling',
      purchase: 'Acquisition',
      syndicateShare: 'Syndicate Share',
      duration: 'Duration',
      expectedSale: 'Target Sale Value',
      monthlyOps: 'Monthly Operational Assets (Target)',
      training: 'Training & Boarding ($/',
      vet: 'Vet & Farrier ($/',
      shows: 'Shows & Logistics ($/',
      insurance: 'Annual Insurance (%)',
      yourFinancials: 'Your Investment Profile',
      yourPurchase: 'Your Capital Acquisition',
      yourTco: 'Your Operational TCO',
      totalInvestment: 'Gross Capital Required',
      netProfit: 'Net Profit Projection',
      expectedRoi: 'Target Yield (ROI)',
      mo: 'mo)',
      months: 'months',
      pct: '%'
    },
    nl: {
      title: 'Syndicaat TCO & ROI Calculator',
      subtitle: 'Geavanceerd Financieel Model',
      purchase: 'Aanschafwaarde',
      syndicateShare: 'Syndicaat Aandeel',
      duration: 'Looptijd (mnd)',
      expectedSale: 'Verwachte Verkoop',
      monthlyOps: 'Maandelijkse Operationele Kosten',
      training: 'Training & Stalling (€/',
      vet: 'Dierenarts & Smid (€/',
      shows: 'Shows & Transport (€/',
      insurance: 'Jaarlijkse Verzekering (%)',
      yourFinancials: 'Jouw Financiële Profiel',
      yourPurchase: 'Jouw Aanschafdeel',
      yourTco: 'Jouw Operationele Kosten (TCO)',
      totalInvestment: 'Totale Investering',
      netProfit: 'Netto Winst (Geprojecteerd)',
      expectedRoi: 'Verwachte Rendement (ROI)',
      mo: 'mnd)',
      months: 'maanden',
      pct: '%'
    },
    de: {
      title: 'Syndikat TCO & ROI-Rechner',
      subtitle: 'Erweitertes Finanzmodell',
      purchase: 'Anschaffungswert',
      syndicateShare: 'Syndikatsanteil',
      duration: 'Laufzeit',
      expectedSale: 'Erwarteter Verkauf',
      monthlyOps: 'Monatliche Betriebskosten',
      training: 'Training & Unterbringung (€/',
      vet: 'Tierarzt & Hufschmied (€/',
      shows: 'Turniere & Transport (€/',
      insurance: 'Jährliche Versicherung (%)',
      yourFinancials: 'Ihr Finanzprofil',
      yourPurchase: 'Ihr Kaufanteil',
      yourTco: 'Ihre Betriebskosten (TCO)',
      totalInvestment: 'Gesamtinvestition',
      netProfit: 'Nettogewinn (Projiziert)',
      expectedRoi: 'Erwartete Rendite (ROI)',
      mo: 'mon)',
      months: 'monate',
      pct: '%'
    },
    es: {
      title: 'Calculadora de TCO y ROI',
      subtitle: 'Modelo Financiero Avanzado',
      purchase: 'Adquisición',
      syndicateShare: 'Participación',
      duration: 'Duración',
      expectedSale: 'Venta Esperada',
      monthlyOps: 'Costos Operativos Mensuales',
      training: 'Entrenamiento y Alojamiento (€/',
      vet: 'Veterinario y Herrador (€/',
      shows: 'Shows y Transporte (€/',
      insurance: 'Seguro Anual (%)',
      yourFinancials: 'Su Perfil Financiero',
      yourPurchase: 'Su Parte de Compra',
      yourTco: 'Sus Costos Operativos (TCO)',
      totalInvestment: 'Inversión Total',
      netProfit: 'Beneficio Neto',
      expectedRoi: 'Rendimiento Esperado (ROI)',
      mo: 'mes)',
      months: 'meses',
      pct: '%'
    }
  };

  const t = translations[lang] || translations.en;
  
  const formatter = new Intl.NumberFormat(lang === 'nl' || lang === 'de' || lang === 'es' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  });

  const handleChange = (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 0;
    
    // Safety caps
    if (e.target.name === 'ownershipPercentage' && val > 100) val = 100;
    if (e.target.name === 'ownershipPercentage' && val < 0) val = 0;
    if (e.target.name === 'insuranceRateYearly' && val > 20) val = 20;

    setData({ ...data, [e.target.name]: val });
  };

  const calc = useMemo(() => {
    const fraction = data.ownershipPercentage / 100;
    const myPurchasePrice = data.purchasePrice * fraction;
    
    // TCO Formulas
    const yearlyInsurance = (data.purchasePrice * (data.insuranceRateYearly / 100));
    const totalInsurance = (yearlyInsurance / 12) * data.monthsHeld;
    const monthlyTotalCost = data.monthlyBoardingTraining + data.monthlyVetFarrier + data.monthlyShowTransport;
    const totalOperationalCosts = (monthlyTotalCost * data.monthsHeld) + totalInsurance;
    
    const myOperationalCosts = totalOperationalCosts * fraction;
    const myTotalInvestment = myPurchasePrice + myOperationalCosts;
    
    const myExpectedReturn = data.expectedSalePrice * fraction;
    const myNetProfit = myExpectedReturn - myTotalInvestment;
    const roiPercentage = myTotalInvestment > 0 ? (myNetProfit / myTotalInvestment) * 100 : 0;

    return { 
      myPurchasePrice, 
      myOperationalCosts, 
      myTotalInvestment, 
      myNetProfit, 
      roiPercentage 
    };
  }, [data]);

  return (
    <div className="bg-primary p-6 md:p-10 shadow-2xl relative overflow-hidden text-white w-full max-w-7xl mx-auto rounded-none border-y border-white/10">
      {/* Decorative BG Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8">
        
        {/* LEFT COLUMN: Input Modifiers */}
        <div className="xl:col-span-8 flex flex-col space-y-8">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2 block">{t.subtitle}</span>
            <h2 className="text-base md:text-lg lg:text-2xl font-serif text-white">{t.title}</h2>
          </div>

          {/* MAIN ASSET METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent transition-colors gap-2 md:gap-0">
              <label className="text-white/60 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-1/2">{t.purchase}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end">
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency && setCurrency(e.target.value)} 
                  className="bg-transparent border-none text-white/50 hover:text-white text-base md:text-lg font-serif mr-2 cursor-pointer focus:ring-0 outline-none appearance-none"
                >
                  <option value="EUR" className="text-black bg-white">€</option>
                  <option value="USD" className="text-black bg-white">$</option>
                  <option value="GBP" className="text-black bg-white">£</option>
                </select>
                <input type="number" name="purchasePrice" value={data.purchasePrice || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-white outline-none w-full tabular-nums" />
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent transition-colors gap-2 md:gap-0">
              <label className="text-white/60 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-1/2">{t.expectedSale}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end">
                <span className="text-accent/50 text-base md:text-lg mr-2">{currencySymbol}</span>
                <input type="number" name="expectedSalePrice" value={data.expectedSalePrice || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-accent outline-none w-full tabular-nums" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent transition-colors gap-2 md:gap-0">
              <label className="text-white/60 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-1/2">{t.duration}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end">
                <span className="text-white/50 text-base md:text-lg mr-2">#</span>
                <input type="number" name="monthsHeld" value={data.monthsHeld || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-white outline-none w-full tabular-nums" />
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent transition-colors relative overflow-hidden gap-2 md:gap-0">
              <div className="absolute left-0 top-0 w-1 h-full bg-accent"></div>
              <label className="text-accent text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] ml-0 md:ml-2 w-full md:w-1/2">{t.syndicateShare}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end">
                <span className="text-accent/50 text-base md:text-lg mr-2">%</span>
                <input type="number" name="ownershipPercentage" value={data.ownershipPercentage || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-white outline-none w-full tabular-nums" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-base font-serif mb-4 text-white/80">{t.monthlyOps}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.training.replace(/[€$£]/, currencySymbol)}{t.mo}</label>
                <input type="number" name="monthlyBoardingTraining" value={data.monthlyBoardingTraining === 0 ? '' : data.monthlyBoardingTraining} onChange={handleChange} className="bg-transparent text-left text-lg md:text-xl font-serif text-white outline-none w-full border-b border-white/20 pb-1 focus:border-accent transition-colors tabular-nums" />
              </div>
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.vet.replace(/[€$£]/, currencySymbol)}{t.mo}</label>
                <input type="number" name="monthlyVetFarrier" value={data.monthlyVetFarrier === 0 ? '' : data.monthlyVetFarrier} onChange={handleChange} className="bg-transparent text-left text-lg md:text-xl font-serif text-white outline-none w-full border-b border-white/20 pb-1 focus:border-accent transition-colors tabular-nums" />
              </div>
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.shows.replace(/[€$£]/, currencySymbol)}{t.mo}</label>
                <input type="number" name="monthlyShowTransport" value={data.monthlyShowTransport === 0 ? '' : data.monthlyShowTransport} onChange={handleChange} className="bg-transparent text-left text-lg md:text-xl font-serif text-white outline-none w-full border-b border-white/20 pb-1 focus:border-accent transition-colors tabular-nums" />
              </div>
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.insurance}</label>
                <input type="number" step="0.1" name="insuranceRateYearly" value={data.insuranceRateYearly === 0 ? '' : data.insuranceRateYearly} onChange={handleChange} className="bg-transparent text-left text-lg md:text-xl font-serif text-white outline-none w-full border-b border-white/20 pb-1 focus:border-accent transition-colors tabular-nums" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Result / P&L */}
        <div className="xl:col-span-4 mt-8 xl:mt-0 xl:pl-8 xl:border-l border-white/10 flex flex-col justify-center">
          <div className="bg-bg-subtle/40 p-6 md:p-8 border border-accent/20 shadow-[0_0_40px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20"></div>
            
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{t.yourFinancials}</h3>
            <p className="text-accent font-bold uppercase tracking-widest text-xs md:text-sm mb-6">@ {data.ownershipPercentage}% Ownership | {data.monthsHeld} {t.months}</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest">{t.yourPurchase}</span>
                <span className="text-lg md:text-xl lg:text-2xl font-serif text-white tabular-nums">{formatter.format(calc.myPurchasePrice)}</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest">{t.yourTco}</span>
                <span className="text-lg md:text-xl lg:text-2xl font-serif text-white tabular-nums">{formatter.format(calc.myOperationalCosts)}</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-white/30 pb-3 mt-4">
                <span className="text-white font-bold text-xs md:text-sm lg:text-base uppercase tracking-widest">{t.totalInvestment}</span>
                <span className="text-xl md:text-2xl lg:text-3xl font-serif text-white font-bold tabular-nums">{formatter.format(calc.myTotalInvestment)}</span>
              </div>
              
              <div className="flex flex-col pt-3">
                <span className="text-white/80 font-bold uppercase tracking-wider text-xs md:text-sm lg:text-base mb-1">{t.netProfit}</span>
                <span className={`text-4xl md:text-5xl font-serif font-bold tabular-nums ${calc.myNetProfit >= 0 ? 'text-accent' : 'text-red-400'}`}>
                  {calc.myNetProfit >= 0 ? '+' : ''}{formatter.format(calc.myNetProfit)}
                </span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-accent/20 text-center bg-white/5 rounded-lg border border-white/10 p-4">
                <span className="block text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{t.expectedRoi}</span>
                <div className={`text-5xl font-serif font-bold tracking-tighter ${calc.roiPercentage >= 0 ? 'text-white' : 'text-red-400'}`}>
                  {calc.roiPercentage.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdvancedRoiCalculator;
