import Head from 'next/head';
import { useEffect, useState } from 'react';
import DurationInBed from '../components/DurationInBed';
import DurationAsleep from '../components/DurationAsleep';
import { calculateScore } from '../helpers/calculateScore';


export default function Index() {
  // store user values
  const [durationInBed, setDurationInBed] = useState<number>(0);
  const [durationAsleep, setDurationAsleep] = useState<number>(0);
  const [didCalculate, setDidCalculate] = useState<boolean>(false);

  // calculated score
  const [score, setScore] = useState([]);

  // fetch response
  const [response, setResponse] = useState<string | null>(null);

  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // calculate score and set in state
    const score = calculateScore(durationInBed, durationAsleep);

    setScore(score);
    setDidCalculate(true);
  };

  // Make POST request when score has been stored
  useEffect(() => {
    // Do not run on initial render
    if (didCalculate) {
      fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      })
        .then((res) => res.json())
        .then((json) => setResponse(JSON.stringify(json)))
        .catch((error) => {
          console.error('There was an error:', error);
        });
    }
  }, [score]);

  return (
    <div data-testid="container">
      <Head>
        <title>Sleep Behavior App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main data-testid="main">
        <h1 data-testid="header" className="text-2xl">
          Sleep Behavior App
        </h1>

        <form data-testid="form" onSubmit={handleSubmit}>
          <DurationInBed
            label="Duration in bed"
            durationInBed={durationInBed}
            setStateFunction={setDurationInBed}
            isDisabled={false}
          />
          
          <DurationAsleep
            label="Duration asleep"
            durationInBed={durationInBed}
            durationAsleep={durationAsleep}
            setStateFunction={setDurationAsleep}
            isDisabled={!durationInBed}
          />

          <button
            data-testid="submit-button"
            disabled={!durationInBed}
            type="submit"
            className="disabled:bg-gray-400 px-5 py-2 bg-gray-800 text-white mt-3"
          >
            {!(durationInBed) ? 'Select values' : 'Calculate'}
          </button>
        </form>

        {/* render response when loaded */}
        <h2 data-testid="output-text" className="my-10 text-gray-600">
          Output:
          {response ? (
            <span className="text-green-600"> {response}</span>
          ) : (
            <span data-testid='loading' className="text-amber-500"> Loading...</span>
          )}
        </h2>
      </main>
    </div>
  );
}
