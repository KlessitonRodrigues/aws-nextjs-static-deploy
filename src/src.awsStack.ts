import * as cdk from 'aws-cdk-lib';

import { appConfig } from './config/config.app';
import { TranslationAppPage } from './src.translationApp';

const app = new cdk.App();

new TranslationAppPage(app, {
  env: { region: appConfig.region },
});
