import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // pluck user score from request
  const { score } = req.body;

  try {
    const response = { status: 'success' };
    // send success response
    res.status(200).json({ ...response, score });
  } catch (err) {
    // send error response
    res.status(500).json({ error: 'failed to send' });
  }
}
