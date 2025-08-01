import jwt from 'jsonwebtoken';

export default function getDataFromToken(token: string): { id: string; email: string } | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; email: string };

    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
