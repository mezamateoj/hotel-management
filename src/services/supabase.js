
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://hprixrcyydjxkclhmofo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwcml4cmN5eWRqeGtjbGhtb2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5OTE3MDEsImV4cCI6MjAxMzU2NzcwMX0.doI6HtO-fqG9elr2UDhWoM350L8ACHVpTugqfYmzHCw'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase