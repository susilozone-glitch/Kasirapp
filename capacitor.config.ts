import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kasirapp.pos',
  appName: 'Kasir App',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
