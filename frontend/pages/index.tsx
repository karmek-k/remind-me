import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Remind Me</title>
        <meta name="description" content="Reminding you by all means!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Remind Me</h1>
    </>
  );
};

export default Home;
