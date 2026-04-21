import uiData from './ui.json';

export const languages = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  es: 'Español',
};

export const defaultLang = 'en';

import { getWebsiteTexts } from '../lib/supabase';

// Helper to deep merge the remote database texts over the local static UI json
async function buildDynamicUI() {
  const baseUi = JSON.parse(JSON.stringify(uiData)); // deep copy local
  
  try {
    const supabaseTexts = await getWebsiteTexts();
    
    // Rows look like: { id, lang: 'nl', key: 'home.title', value: 'Welkom' }
    for (const record of supabaseTexts) {
      if (!baseUi[record.lang]) baseUi[record.lang] = {};
      baseUi[record.lang][record.key] = record.value;
    }
  } catch (e) {
    console.error("Failed to merge supabase texts:", e);
  }
  
  return baseUi;
}

export const ui = await buildDynamicUI() as any;
