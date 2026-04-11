import axios from 'axios';

import { attachInterceptors } from './interceptors';

export const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const v1 = axios.create({
  baseURL: `${BASE_URL}/v1`,
  timeout: 10000,
});

const v2 = axios.create({
  baseURL: `${BASE_URL}/v2`,
  timeout: 10000,
});

attachInterceptors(v1);
attachInterceptors(v2);

export const api = { v1, v2 };
