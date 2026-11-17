import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';

import { appConfig } from '../../config/config.app';
import { resources } from '../../constants/constants.resources';

const createOriginAccessIdentity = (scope: Construct): cloudfront.OriginAccessIdentity =>
  new cloudfront.OriginAccessIdentity(scope, resources.originAccessIdentity, {
    comment: `OAI for ${appConfig.appName} static site`,
  });

export { createOriginAccessIdentity };
