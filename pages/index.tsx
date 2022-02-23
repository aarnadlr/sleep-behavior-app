import Head from 'next/head';
// import Image from 'next/image';
import Select from '../components/Select';
import styles from '@/pages/index.module.css';
import {useState} from 'react'
export default function Home() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  const [durationInBed, setDurationInBed] = useState(0);
  const [durationAsleep, setDurationAsleep] = useState(0);

  // const [disabled, setDisabled] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Sleep Behavior App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl">Sleep Behavior</h1>

        <form onSubmit={handleSubmit} >
          <Select label="Duration in bed" stateValue={durationInBed} setStateFunction={setDurationInBed} />
          <Select label="Duration asleep" stateValue={durationAsleep} setStateFunction={setDurationAsleep}/>

          <button disabled={!(durationInBed && durationAsleep)} type="submit" className='disabled:opacity-50 px-5 py-2 bg-gray-700 text-white'>Submit</button>
        </form>

      </main>
    </div>
  );
}
