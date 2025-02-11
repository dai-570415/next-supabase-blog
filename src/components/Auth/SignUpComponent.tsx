'use client';

import { supabase } from '@/utils/supabase/server';
import Link from 'next/link';
import { useState } from 'react';
import Styles from './css/SignInUp.module.css';

export const SignUpComponent = () =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Signup successful! Check your email for verification.');
        }
    };

    return (
        <div className={Styles.SignInUp}>
            <h1>Sign Up</h1>
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
            <button onClick={handleSignup}>登録する</button>
            <p className={Styles.alert}>{message}</p>

            <p>アカウントをお持ち場合は<Link href="/signin">サインイン</Link></p>
        </div>
    );
}