import React, { useState, useMemo } from 'react';

const AdvancedRoiCalculator = ({ lang = 'en' }) => {
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
    currency: lang === 'en' ? 'USD' : 'EUR',
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
    <div className="bg-primary-light p-4 md:p-6 lg:p-8 shadow-2xl border-l-[12px] border-accent relative overflow-hidden text-white w-full max-w-6xl mx-auto rounded-r-2xl">
      {/* Decorative BG Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light/5 -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8">
        
        {/* LEFT COLUMN: Input Modifiers */}
        <div className="xl:col-span-8 flex flex-col space-y-8">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2 block">{t.subtitle}</span>
            <h2 className="text-base md:text-lg lg:text-2xl font-serif text-white">{t.title}</h2>
          </div>

          {/* MAIN ASSET METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent/40 transition-colors gap-2 md:gap-0">
              <label className="text-accent/90 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-1/2">{t.purchase}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end mt-1 md:mt-0">
                <span className="text-white/70 text-base md:text-lg mr-2 font-serif">{lang === 'en' ? '$' : '€'}</span>
                <input type="number" name="purchasePrice" value={data.purchasePrice || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-white outline-none w-full tabular-nums" />
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent/40 transition-colors gap-2 md:gap-0">
              <label className="text-accent/90 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-1/2">{t.expectedSale}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end mt-1 md:mt-0">
                <span className="text-accent text-base md:text-lg mr-2 font-serif">{lang === 'en' ? '$' : '€'}</span>
                <input type="number" name="expectedSalePrice" value={data.expectedSalePrice || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-accent outline-none w-full tabular-nums border-none focus:ring-0" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent/40 transition-colors gap-2 md:gap-0">
              <label className="text-accent/90 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] w-full md:w-1/2">{t.duration}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end mt-1 md:mt-0">
                <span className="text-white/70 text-base md:text-lg mr-2 font-serif">#</span>
                <input type="number" name="monthsHeld" value={data.monthsHeld || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-white outline-none w-full tabular-nums border-none focus:ring-0" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between group focus-within:border-accent/40 transition-colors relative overflow-hidden gap-2 md:gap-0">
              <div className="absolute left-0 top-0 w-1.5 h-full bg-accent"></div>
              <label className="text-accent text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] ml-0 md:ml-2 w-full md:w-1/2">{t.syndicateShare}</label>
              <div className="flex items-center w-full md:w-1/2 justify-start md:justify-end mt-1 md:mt-0">
                <span className="text-accent text-base md:text-lg mr-2 font-serif">%</span>
                <input type="number" name="ownershipPercentage" value={data.ownershipPercentage || ''} onChange={handleChange} className="bg-transparent text-left md:text-right text-lg md:text-xl lg:text-2xl font-serif text-white outline-none w-full tabular-nums border-none focus:ring-0" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-base font-serif mb-4 text-white/80">{t.monthlyOps}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.training}{t.mo}</label>
                <input type="number" name="monthlyBoardingTraining" value={data.monthlyBoardingTraining === 0 ? '' : data.monthlyBoardingTraining} onChange={handleChange} className="bg-transparent text-left text-lg md:text-xl font-serif text-white outline-none w-full border-b border-white/20 pb-1 focus:border-accent transition-colors tabular-nums" />
              </div>
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.vet}{t.mo}</label>
                <input type="number" name="monthlyVetFarrier" value={data.monthlyVetFarrier === 0 ? '' : data.monthlyVetFarrier} onChange={handleChange} className="bg-transparent text-left text-lg md:text-xl font-serif text-white outline-none w-full border-b border-white/20 pb-1 focus:border-accent transition-colors tabular-nums" />
              </div>
              <div className="bg-white/5 border border-white/5 p-4 flex flex-col justify-between focus-within:border-accent/50 transition-colors">
                <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 leading-relaxed">{t.shows}{t.mo}</label>
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
        <div className="xl:col-span-4 mt-4 xl:mt-0 flex flex-col justify-center">
          <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-xl lg:rounded-2xl relative overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light/5 -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
            
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
              
              <div className="flex flex-col md:flex-row justify-between items-center bg-accent/10 border border-accent/20 rounded-2xl p-3 lg:p-5 gap-2 lg:gap-3 mt-4">
                <div className="text-center md:text-left">
                  <span className="block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-1">{t.netProfit}</span>
                  <div className={`text-xl md:text-2xl lg:text-3xl font-serif tabular-nums flex items-center justify-center md:justify-start ${calc.myNetProfit >= 0 ? 'text-accent' : 'text-red-400'}`}>
                    <span>{calc.myNetProfit >= 0 ? '+' : ''}{formatter.format(calc.myNetProfit)}</span>
                  </div>
                </div>
                <div className={`${calc.roiPercentage >= 0 ? 'bg-accent' : 'bg-red-500'} text-white px-2 py-1.5 rounded lg:rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider text-center shadow-lg w-auto whitespace-nowrap`}>
                   {calc.myNetProfit >= 0 ? '+' : ''}{calc.roiPercentage.toFixed(1)}% {t.expectedRoi.split(' ')[0] || "ROI"}
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
