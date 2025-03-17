import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mx.com.arsa.consulting.dices.app',
  appName: 'Dices',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
