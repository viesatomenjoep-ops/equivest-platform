import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "https://tvdydhmbvuhpbcxsvxmf.supabase.co";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHlkaG1idnVocGJjeHN2eG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDA4ODgsImV4cCI6MjA5MjI3Njg4OH0.d433eTXjtuFKp4YpJKwZuk3nR4SqV_QZKWTiU088dUs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
