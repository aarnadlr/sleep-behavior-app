import Index from '@/pages/index';
import { calculateScore } from '../helpers/calculateScore';
import { render, screen, cleanup } from '@testing-library/react';

describe('Index', () => {
  render(<Index />)

  afterEach(() => {
    cleanup()
  });

  const container = screen.getByTestId('container');
  const main = screen.getByTestId('main');
  const header = screen.getByTestId('header');
	const form = screen.getByTestId('form');
	const submitButton = screen.getByTestId('submit-button');
	const outputText = screen.getByTestId('output-text');
	const loading = screen.getByTestId('loading');
	const durationInBed = screen.getByTestId('Duration in bed');
	const durationAsleep = screen.getByTestId('Duration asleep');
  
  test('initial UI is rendered as expected', () => {
    expect(container).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Sleep Behavior App");

    expect(form).toBeInTheDocument();
    expect(outputText).toHaveTextContent("Output:");

    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent("Loading...");

    expect(durationInBed).toBeInTheDocument();
    expect(durationAsleep).toBeInTheDocument();
  });

  test('select menus behave as expected', () => {
    expect(durationInBed).toBeEnabled();
    expect(durationAsleep).toBeEnabled();
  });

  test('submit button behaves as expected', () => {
    expect(submitButton).toHaveTextContent("Select values");
    expect(submitButton).toBeDisabled();
  });

});

describe('calculateScore', () => {
  it('calculates score 1 correctly', () => {
    const score = calculateScore(4, 4);
    expect(score).toBe(100);
  });
  it('calculates score 2 correctly', () => {
    const score = calculateScore(16, 8);
    expect(score).toBe(50);
  });
  it('calculates score 3 correctly', () => {
    const score = calculateScore(24, 8);
    const roundedScore = Number(score.toFixed(2));
    expect(roundedScore).toBe(33.33);
  });
});
