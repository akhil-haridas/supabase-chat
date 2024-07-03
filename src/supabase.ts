import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccsmjjmnwgfyrljpvqrc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc21qam1ud2dmeXJsanB2cXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5ODE0ODgsImV4cCI6MjAzNTU1NzQ4OH0.1qVb_yNNCD7fP1dAYebZVEH7fV46AW3YMumJ5FKFJ2s';

export const supabase = createClient(supabaseUrl, supabaseKey);
