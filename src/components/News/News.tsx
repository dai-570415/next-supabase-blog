import { useSupabasePosts } from '@/hooks/useSupabasePosts';
import Styles from './css/News.module.css';

export const News = () => {
    const { posts, content, setContent, handleSubmit, loading } = useSupabasePosts();

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
                {posts.length === 0 && <p>投稿がありません。</p>}
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <p>{post.content}</p>
                            <small>{new Date(post.created_at).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}