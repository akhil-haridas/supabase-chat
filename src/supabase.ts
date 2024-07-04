import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const SUPABASE_ADMIN_KEY = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ADMIN_KEY);