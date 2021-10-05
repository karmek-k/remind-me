import Head from 'next/head';
import React from 'react';

interface Props {
  title: string;
  header?: string;
  children?: any;
}

const Layout: React.FC<Props> = ({ title, children, header }) => {
  return (
    <>
      <Head>
        <title>{title} - Remind Me</title>
        <meta name="description" content="Reminding you by all means!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center h-screen flex-col">
        <header>
          <h1 className="text-4xl">{header ?? title}</h1>
        </header>
        <div className="my-2">{children}</div>
      </main>
    </>
  );
};

export default Layout;
