import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This client bypasses Row Level Security (RLS). 
// NEVER expose this to the client-side/browser. Only use in secure server routes.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
