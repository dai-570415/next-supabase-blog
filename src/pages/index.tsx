import { FC } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { News } from '@/components/News/News';

const Home: FC  = () => {
  return (
    <Layout>
      <main>
        <News />
      </main>
    </Layout>
  );
}

export default Home;