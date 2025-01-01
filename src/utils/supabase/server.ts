// /utils/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

// 環境変数を使用してURLとキーを管理
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseKey);
