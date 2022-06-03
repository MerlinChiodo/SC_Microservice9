import { NextApiResponse } from 'next';

export const badRequest = (res: NextApiResponse) =>
  res.status(400).json({ message: 'Bad request' });

export const notAuthenticated = (res: NextApiResponse) =>
  res.status(403).json({ message: 'Not authenticated' });

export const notFound = (res: NextApiResponse) => res.status(404).json({ message: 'Not found' });

export const methodNotAllowed = (res: NextApiResponse) =>
  res.status(405).json({ message: 'Method not allowed' });

export const serverError = (res: NextApiResponse) =>
  res.status(500).json({ message: 'Internal server error' });

export const customError = (res: NextApiResponse, code: number, error: string) =>
  res.status(code).json({ message: error });

export const success = (res: NextApiResponse) => res.status(200).json({ message: 'success' });

export const isEmpty = (value: string | undefined | null): value is undefined =>
  value === undefined || value === null || value === '';

export const isNotEmpty = (value: string | undefined | null): value is string =>
  value !== undefined && value !== null && value !== '';
