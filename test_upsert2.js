import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://tvdydhmbvuhpbcxsvxmf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHlkaG1idnVocGJjeHN2eG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDA4ODgsImV4cCI6MjA5MjI3Njg4OH0.d433eTXjtuFKp4YpJKwZuk3nR4SqV_QZKWTiU088dUs';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
    const { data, error } = await supabase.from('horses').upsert({
        slug: 'patrick-junior',
        lang: 'nl',
        title: 'Patrick Junior PROOF'
    }, { onConflict: 'lang,slug' });
    console.log("Error:", error);
    console.log("Data:", data);
}
run();
