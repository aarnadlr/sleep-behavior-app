import Head from 'next/head';
import { useEffect, useState } from 'react';
import Select from '../components/Select';
import { calculateScore } from '../helpers/calculateScore';

export default function Index() {
  // store user values
  const [durationInBed, setDurationInBed] = useState(0);
  const [durationAsleep, setDurationAsleep] = useState(0);

  // calculated score
  const [score, setScore] = useState(0);

  // fetch response
  const [response, setResponse] = useState<string | null>(null);

  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // calculate score and set in state
    const score = calculateScore(durationInBed, durationAsleep);

    setScore(score);
  };

  // Make POST request when score has been stored
  useEffect(() => {
    // Do not run on initial render
    if (score) {
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
          <Select
            label="Duration in bed"
            stateValue={durationInBed}
            setStateFunction={setDurationInBed}
          />
          <Select
            label="Duration asleep"
            stateValue={durationAsleep}
            setStateFunction={setDurationAsleep}
          />

          <button
            data-testid="submit-button"
            disabled={!(durationInBed && durationAsleep)}
            type="submit"
            className="disabled:bg-gray-400 px-5 py-2 bg-gray-800 text-white mt-3"
          >
            {!(durationInBed && durationAsleep) ? 'Select values' : 'Calculate'}
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
