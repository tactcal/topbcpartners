import { createClient } from '@supabase/supabase-js';

// We are hardcoding this to bypass the Vercel error permanently
const supabaseUrl = 'https://tmdnomwzgfsweyevqspi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZG5vbXd6Z2Zzd2V5ZXZxc3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODIwNDcsImV4cCI6MjA4NjY1ODA0N30.rka52UsWHa1SekdZS4txA3AitNoEJ2QOGhR9wStgEf8';

export const supabase = createClient(supabaseUrl, supabaseKey);
