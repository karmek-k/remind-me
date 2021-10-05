import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home page">
      <ul>
        <li>
          <Link href="/login">Log in</Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Home;
