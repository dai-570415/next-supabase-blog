import { FC } from 'react';
import { SignOut } from '../Auth/SignOut';
import Link from 'next/link';
import Styles from './css/Layout.module.css';
import { useAuthUser } from '@/hooks/useAuthUser';

type Props = {
    children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
    const { user } = useAuthUser();

    return (
        <div className="container">
            <header className={Styles.header}>
                <Link href="/" className={Styles.logo}>TWiSpa</Link>
                {user ? (
                    <div className={Styles.right}>
                        {user && (<p>{user.email}</p>)}
                        <SignOut />
                    </div>
                ) : (
                    <Link href="/signin" className={Styles.btn}>サインイン</Link>
                )}
            </header>
            { children }
        </div>
    );
}