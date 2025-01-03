import { useSupabasePosts } from '@/hooks/useSupabasePosts';
import { useState } from 'react';
import Styles from './css/News.module.css';

export const News = () => {
    const { posts, content, setContent, handleSubmit, handleUpdate, handleDelete, loading, } = useSupabasePosts();
    const [editId, setEditId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState<string>('');

    return (
        <div className={Styles.news}>
            <form onSubmit={handleSubmit}>
                <div className={Styles.input}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="内容を入力"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '投稿中...' : '投稿する'}
                </button>
            </form>

            <div className={Styles.newsList}>
                {posts.length === 0 && <p>No Posted</p>}
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            {editId === post.id ? (
                                // 編集モード
                                <>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        placeholder="内容を入力"
                                    />
                                    <div>
                                        <button
                                            onClick={() => {
                                                setEditId(null);
                                                setEditContent('');
                                            }}
                                            className={Styles.borderBtn}
                                        >
                                            キャンセル
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleUpdate(post.id, editContent);
                                                setEditId(null);
                                                setEditContent('');
                                            }}
                                        >
                                            更新
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // 通常モード
                                <>
                                    <p>{post.content}</p>
                                    <small>{new Date(post.created_at).toLocaleString()}</small>
                                    <button
                                        onClick={() => {
                                            setEditId(post.id);
                                            setEditContent(post.content);
                                        }}
                                        className={Styles.borderBtn}
                                    >
                                        編集
                                    </button>
                                    <button onClick={() => handleDelete(post.id)}>削除</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
