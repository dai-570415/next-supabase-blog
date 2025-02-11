'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase/server';
import Link from 'next/link';
import Styles from './css/SignInUp.module.css';

export const SignInComponent = () =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Signin successful!');
            router.push('/');
        }
    };
    
    return (
        <div className={Styles.SignInUp}>
            <h1>Sign In</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>サインインする</button>
            <p className={Styles.alert}>{message}</p>

            <p>アカウントをお持ちでない場合は<Link href="/signup">登録</Link></p>
        </div>
    );
}