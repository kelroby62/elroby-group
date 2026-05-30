import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ookftxfjdxdjaxnsiseq.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9va2Z0eGZqZHhkamF4bnNpc2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjQyMjQsImV4cCI6MjA5NTE0MDIyNH0.EbXPH785ObpS8v1ufLTKU-F6fxOzlE5V9f0tAJtdmwE";

export const supabase = createClient(supabaseUrl, supabaseKey);