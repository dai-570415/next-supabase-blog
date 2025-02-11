import { Layout } from '@/components/Layout/Layout';
import { SignInComponent } from '@/components/Auth/SignInComponent';

const Signin = () => {
    return (
        <Layout>
            <main>
                <SignInComponent />
            </main>
        </Layout>
    );
};

export default Signin;
