import { createClient } from '@supabase/supabase-js';

// 1. We use the Environment Variable first.
// 2. If Vercel can't find it, we fall back to the hardcoded string.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tmdnomwzgfsweyevqspi.supabase.co';

// ⚠️ REPLACE THE TEXT BELOW WITH YOUR LONG "ANON" KEY from .env.local
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZG5vbXd6Z2Zzd2V5ZXZxc3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODIwNDcsImV4cCI6MjA4NjY1ODA0N30.rka52UsWHa1SekdZS4txA3AitNoEJ2QOGhR9wStgEf8EY_HERE';

export const supabase = createClient(supabaseUrl, supabaseKey);