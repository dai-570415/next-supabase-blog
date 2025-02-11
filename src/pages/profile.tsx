import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { SignOut } from '@/components/Auth/SignOut';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    // サインアウト処理を追加
    // const handleSighOut = async () => {
    //     const { error } = await supabase.auth.signOut();
    //     if (error) {
    //         setMessage(`Error: ${error.message}`);
    //     } else {
    //         setUser(null);
    //         setMessage('Logged out successfully!');
    //     }
    // };

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <SignOut />
                    {/* <button onClick={handleSighOut}>Log Out</button> */}
                </div>
            ) : (
                <p>No user logged in</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
