/**
 * Supabase client for the Astro website (server-side)
 * Data is fetched at request time from Supabase instead of Markdown files
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tvdydhmbvuhpbcxsvxmf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHlkaG1idnVocGJjeHN2eG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDA4ODgsImV4cCI6MjA5MjI3Njg4OH0.d433eTXjtuFKp4YpJKwZuk3nR4SqV_QZKWTiU088dUs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Get all horses for a given language, sorted premium-first then newest
 */
export async function getHorses(lang = 'en') {
    const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('lang', lang)
        .order('upload_date', { ascending: false });

    if (error) {
        console.error('Supabase error loading horses:', error.message);
        return [];
    }

    // Sort: premium first, then by date
    return (data || []).sort((a, b) => {
        if (b.premium && !a.premium) return 1;
        if (!b.premium && a.premium) return -1;
        const dateA = new Date(a.upload_date || '2000-01-01');
        const dateB = new Date(b.upload_date || '2000-01-01');
        return dateB - dateA;
    });
}

/**
 * Get a single horse by slug and language
 */
export async function getHorse(slug, lang = 'en') {
    const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('slug', slug)
        .eq('lang', lang)
        .single();

    if (error) return null;
    return data;
}

/**
 * Get all horse slugs (for static path generation)
 */
export async function getAllHorseSlugs() {
    const { data, error } = await supabase
        .from('horses')
        .select('slug, lang');

    if (error) return [];
    return data || [];
}

/**
 * Get Instagram posts
 */
export async function getInstagramPosts() {
    const { data, error } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('upload_date', { ascending: false });

    if (error) return [];
    return data || [];
}
