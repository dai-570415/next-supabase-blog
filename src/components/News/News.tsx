import { FC, useState, useEffect } from 'react';
import Styles from './css/News.module.css';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useSupabasePosts } from '@/hooks/useSupabasePosts';
import { useStorage } from '@/hooks/useStorage';

export const News: FC = () => {
    const { user } = useAuthUser();
    const { path, handleUploadStorage } = useStorage();
    const { posts, content, setContent, handleSubmit, handleUpdate, handleDelete, loading, } = useSupabasePosts();
    const [editId, setEditId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState<string>('');
    const [image01, setImage01] = useState<string | undefined>(undefined);

    useEffect(() => {
        setImage01(path);
    }, [path]);

    return (
        <div className={Styles.news}>
            {user && (
                <form onSubmit={(e) => handleSubmit(e, user.id, image01)}>
                    <div className={Styles.input}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="内容を入力"
                            required
                        />
                    </div>
                    
                    <div className={Styles.interaction}>
                        <div className={Styles.icon}>
                            <label htmlFor="file-upload">
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                        const fileList = e.target?.files;
                                        handleUploadStorage(fileList);
                                    }}
                                />
                            </label>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? '投稿中...' : '投稿する'}
                        </button>
                    </div>

                    <img src={path} className={Styles.preview} alt="" />
                </form>
            )}

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
                                    {/* 投稿者の場合は表示、投稿者じゃない場合は非表示 */}
                                    {user?.id == post.user_id && (
                                        <>
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
                                    {post.image01 && (
                                        <img src={post.image01} className={Styles.eyecatch} alt="" />
                                    )}                       
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
