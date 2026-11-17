import { loadEnv } from '../utils/utils.env';

type appConfigType = {
  appName: string;
  stackName: string;
  region: string;
  appPath: string;
};

const env = loadEnv();

const appConfig: appConfigType = {
  appName: 'TranslationAppPage',
  stackName: env.STACK_NAME ?? 'translation-app',
  region: env.AWS_REGION ?? 'us-east-1',
  appPath: '../../applications/translation-app/out',
};

export { appConfig };
export type { appConfigType };
