import { supabase } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { FC, useEffect, useState } from 'react';
import { SignOut } from '../Auth/SignOut';
import Link from 'next/link';
import Styles from './css/Layout.module.css';

type Props = {
    children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };
    getUser();
    }, []);
    return (
        <div className="container">
            <header className={Styles.header}>
                <Link href="/" className={Styles.logo}>Supabase App</Link>
                {user ? (
                    <SignOut />
                ) : (
                    <Link href="/signin" className={Styles.btn}>サインイン</Link>
                )}
            </header>
            { children }
        </div>
    );
}