import { render, screen } from '@testing-library/react';
import Index from '@/pages/index';
import { calculateScore } from '../helpers/calculateScore';

describe('Index', () => {
  it('renders the heading', () => {
    render(<Index />);

    const heading = screen.getByRole('heading', {
      name: /sleep behavior app/i,
    });

    expect(heading).toBeInTheDocument();
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
