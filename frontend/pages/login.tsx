import type { NextPage } from 'next';
import React, { FormEvent, useState } from 'react';

import Layout from '../components/Layout';

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout title="Log in">
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="mx-2 border-2 rounded border-green-600"
          id="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className="mx-2 border-2 rounded border-green-600"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          className="py-2 px-4 rounded bg-green-600 text-white cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>
    </Layout>
  );
};

export default Home;
