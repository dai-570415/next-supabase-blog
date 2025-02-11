import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { Layout } from '@/components/Layout/Layout';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    return (
        <Layout>
            <main>
                <div>
                    {user && (<p>{user.email}</p>)}
                </div>
            </main>
        </Layout>
    );
};

export default Profile;
