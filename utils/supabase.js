import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nnjshyryiossqugvgyzj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uanNoeXJ5aW9zc3F1Z3ZneXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4MTQsImV4cCI6MjA3ODAxMzgxNH0.2SzmIrJXKT3gHOOpX8B-iD_UoXR1D4jMB33fvTl1kIw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});