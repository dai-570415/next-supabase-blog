'use client';

import { supabase } from '@/utils/supabase/server';
import { useRouter } from 'next/navigation';
import Styles from './css/SignInUp.module.css';

export const SignOut = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            alert('Logged out successfully!');
            router.push('/signin');
        }
    };

    return (
        <button 
            onClick={handleSignOut}
            className={Styles.signout}
        >
            サインアウト
        </button>
    );
};
