// src/utils/auth.ts
import { msalService } from '../services/auth/msalService';

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await msalService.acquireToken();
    return token;
  } catch (error) {
    console.error('Error acquiring token:', error);
    return null;
  }
};

export const addAuthHeader = async (headers: Headers): Promise<Headers> => {
  const token = await getAccessToken();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};