import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tvdydhmbvuhpbcxsvxmf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHlkaG1idnVocGJjeHN2eG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDA4ODgsImV4cCI6MjA5MjI3Njg4OH0.d433eTXjtuFKp4YpJKwZuk3nR4SqV_QZKWTiU088dUs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Get Instagram posts
 */
export async function getInstagramPosts() {
    const { data, error } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('upload_date', { ascending: false });

    if (error) {
        console.error('Supabase error loading IG:', error.message);
        return [];
    }
    return data || [];
}

/**
 * Get website texts/translations
 */
export async function getWebsiteTexts() {
    const { data, error } = await supabase
        .from('website_texts')
        .select('*');

    if (error) {
        console.error('Supabase error loading texts:', error.message);
        return [];
    }
    return data || [];
}

/**
 * Get portfolio horses
 */
export async function getHorses(lang = 'en') {
    const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('lang', lang);

    if (error) {
        console.error('Supabase error loading horses:', error.message);
        return [];
    }
    
    return (data || []).map(horse => {
        if (horse.image && horse.image.startsWith('/images/horses/')) {
            horse.image = horse.image.replace('/images/horses/', '/images/');
        }
        return horse;
    });
}
