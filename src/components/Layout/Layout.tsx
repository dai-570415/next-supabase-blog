import { FC } from 'react';

type Props = {
    children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="container">
            { children }
        </div>
    );
}