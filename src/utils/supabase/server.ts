// /utils/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

// 環境変数を使用してURLとキーを管理
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUrl = 'https://uglqyxwvqhygrwqgexhy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnbHF5eHd2cWh5Z3J3cWdleGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2MTE4OTAsImV4cCI6MjA1MTE4Nzg5MH0.nwj5e2NszxHC5c3XTqkaDaWG8Ej0h1u3rOOj9Q5tG6U';

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseKey);
