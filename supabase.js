// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
// Ganti dengan URL dan anon key dari project Supabase kamu
const supabaseUrl = 'https://xpivckakqrbhnahjtbas.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaXZja2FrcXJiaG5haGp0YmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDAwMzcsImV4cCI6MjA2ODgxNjAzN30.xlMvRJjfZAgIHVLzmfrOVMfe8QO02XBtmkj2Ta0ltFU';

// Inisialisasi Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

