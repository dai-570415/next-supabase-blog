import { Layout } from '@/components/Layout/Layout';
import { SignUpComponent } from '@/components/Auth/SignUpComponent';

const Signup = () => {
    return (
        <Layout>
            <main>
                <SignUpComponent />
            </main>
        </Layout>
    );
};

export default Signup;
