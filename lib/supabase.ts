import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qgdgdwpvnxixypchwiyn.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZGdkd3B2bnhpeHlwY2h3aXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MzUzMDcsImV4cCI6MjA1NjMxMTMwN30.X8o_sfFCvzWQVl_L82EvtXAwP455x9H1t6Lw1389j4Y"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

