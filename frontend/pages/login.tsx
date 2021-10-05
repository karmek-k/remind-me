import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { LoginResponse } from '../interfaces/login';
import { getToken, saveToken } from '../utils/jwt';

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push('/');
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = (await res.json()) as LoginResponse;

    setLoading(false);

    const { token, error } = data;
    if (error || !token) {
      setError(error);
      return;
    }

    saveToken(token);
    router.push('/');
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
      {loading && <p className="italic">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </Layout>
  );
};

export default Home;
