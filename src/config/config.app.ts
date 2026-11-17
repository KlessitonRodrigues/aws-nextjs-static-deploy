type appConfigType = {
  appName: string;
  region: string;
  appPath: string;
};

const appConfig: appConfigType = {
  appName: 'nextjs-website',
  region: process.env.AWS_REGION ?? 'us-east-1',
  appPath: '../../applications/translation-app/out',
};

export { appConfig };
export type { appConfigType };
