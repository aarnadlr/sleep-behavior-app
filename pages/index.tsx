import Head from 'next/head';
import { useEffect, useState } from 'react';
import DurationInBed from '../components/DurationInBed';
import DurationAsleep from '../components/DurationAsleep';
import { calculateScore } from '../helpers/calculateScore';
import { dataObj } from '../helpers/dataObj';

export default function Index() {
  // store user values
  const [durationInBed, setDurationInBed] = useState<number>(0);
  const [durationAsleep, setDurationAsleep] = useState<number>(0);
  const [didCalculate, setDidCalculate] = useState<boolean>(false);

  // calculated score
  const [score, setScore] = useState<number>();

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

  const handleChange = (e:any) => {
    setDurationAsleep(Number(e.target.value));
    // setDurationInBedContent(e.target.name);
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
  }, [score, didCalculate]);

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

          <div className="flex flex-col my-3">
            <label className="text-gray-500 text-sm" htmlFor={'Duration asleep'}>
              {'Duration asleep'}
            </label>

            <div className="flex">
              <select
                data-testid={'Duration asleep'}
                className="max-w-fit bg-gray-200 p-1.5 mr-1.5"
                name={'Duration asleep'}
                id={'Duration asleep'}
                value={
                  durationAsleep
                }
                onChange={handleChange}
                disabled={!durationInBed}
              >
                {!durationInBed ? (
                  <option value={0}>0 mins</option>
                ) : (
                  // Object.entries(dataObj)
                  //   .filter((item) => {
                  //     return Number(item[0]) <= durationInBed;
                  //   })
                  //   .map((item, index) => {
                  //     return (
                  //       <option key={index} value={item[0]}>
                  //         {item[1]}
                  //       </option>
                  //     );
                  //   })
                  Object.entries(dataObj)
                    .reduce((acc, curr) => {
                      if (Number(curr[0]) <= durationInBed) {
                        acc.push(curr)
                      }
                      return acc
                    }, [])
                    .map((item, index) => {
                    return (
                      <option key={index} value={item[0]}>
                        {item[1]}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>

          <button
            data-testid="submit-button"
            disabled={!durationInBed}
            type="submit"
            className="disabled:bg-gray-400 px-5 py-2 bg-gray-800 text-white mt-3"
          >
            {!durationInBed ? 'Select values' : 'Calculate'}
          </button>
        </form>

        {/* render response when loaded */}
        <h2 data-testid="output-text" className="my-10 text-gray-600">
          Output:
          {response ? (
            <span className="text-green-600"> {response}</span>
          ) : (
            <span data-testid="loading" className="text-amber-500">
              {' '}
              Loading...
            </span>
          )}
        </h2>
      </main>
    </div>
  );
}
