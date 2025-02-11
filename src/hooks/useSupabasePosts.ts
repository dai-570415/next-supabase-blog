import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/server";
import { PostTypes } from '@/types';

export const useSupabasePosts = () => {
    const [posts, setPosts] = useState<PostTypes[]>([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    // 表示
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

    // 追加
    const handleSubmit = async (e: React.FormEvent, userId: string) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from('posts').insert([{ content, user_id: userId }]);

        setLoading(false);

        if (!error) {
            setContent('');
            fetchPosts();
        } else {
            console.error(error);
            alert('投稿に失敗しました');
        }
    };

    // 編集
    const handleUpdate = async (id: string, newContent: string) => {
        const { error } = await supabase
            .from('posts')
            .update({ content: newContent })
            .eq('id', id);

        if (!error) {
            setPosts(posts.map(post =>
                post.id === id ? { ...post, content: newContent } : post
            ));
        } else {
            console.error(error);
            alert('更新に失敗しました');
        }
    };

    // 削除
    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (!error) {
            setPosts(posts.filter(post => post.id !== id));
        } else {
            console.error(error);
            alert('削除に失敗しました');
        }
    };

    return { posts, content, setContent, handleSubmit, handleUpdate, handleDelete, loading };
};
