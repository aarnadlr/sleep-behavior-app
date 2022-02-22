import Head from 'next/head';
// import Image from 'next/image';
import Select from '../components/Select';
import styles from '@/pages/index.module.css';

export default function Home() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sleep Behavior App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl">Sleep Behavior</h1>

        <form onSubmit={handleSubmit} >
          <Select label="Duration in bed" />
          <Select label="Duration asleep" />

          <button type="submit"></button>
        </form>

      </main>
    </div>
  );
}
