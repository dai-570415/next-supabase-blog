import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/server";
import { PostTypes } from '@/types';

export const useSupabasePosts = () => {
    const [posts, setPosts] = useState<PostTypes[]>([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    // 初回データ取得
    useEffect(() => {
        fetchPosts();
    }, []);
    
    // データ取得(READ)
    const fetchPosts = async () => {
        const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

        if (!error) {
            setPosts(data || []);
        } else {
            console.error(error);
        }
    };

    // データ投稿(CREATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
        .from('posts')
        .insert([{ content }]);

        setLoading(false);

        if (!error) {
            setContent('');
            fetchPosts();
        } else {
            console.error(error);
            alert('投稿に失敗しました');
        }
    };

    return { posts, content, setContent, handleSubmit, loading, };
}