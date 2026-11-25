import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
  demoURL: process.env.DEMO_URL || 'https://shadcn-admin.netlify.app',
  isCI: process.env.CI === 'true',
  headless: process.env.HEADLESS !== 'false',
};
