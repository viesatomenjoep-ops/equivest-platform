import { getHorses } from './src/lib/supabase.js';

async function list() {
  const nl = await getHorses('nl');
  console.log("NL Horses:", nl.map(h => ({slug: h.slug, title: h.title, sold: h.sold})));
}

list();
