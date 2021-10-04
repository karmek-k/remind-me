import type { NextPage } from 'next';

import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Log in">
      <form method="POST" className="flex-col">
        <label htmlFor="username">Username</label>
        <input
          className="mx-2 border-2 rounded border-green-600"
          id="username"
          name="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className="mx-2 border-2 rounded border-green-600"
          id="password"
          type="password"
          name="password"
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
