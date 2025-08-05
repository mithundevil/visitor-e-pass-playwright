import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: 'https://www.gateease.in/',
    headless: false,
    viewport: { width: 1280, height: 800 },
  },
});
