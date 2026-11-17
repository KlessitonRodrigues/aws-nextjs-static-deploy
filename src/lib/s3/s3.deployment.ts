import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

import { appConfig } from '../../config/config.app';
import { resources } from '../../constants/constants.resources';

type createBucketDeploymentParams = {
  scope: Construct;
  websiteBucket: s3.IBucket;
  distribution: cloudfront.IDistribution;
};

const createBucketDeployment = (params: createBucketDeploymentParams): s3Deploy.BucketDeployment => {
  const { scope, websiteBucket, distribution } = params;

  return new s3Deploy.BucketDeployment(scope, resources.bucketDeployment, {
    sources: [s3Deploy.Source.asset(appConfig.appPath)],
    destinationBucket: websiteBucket,
    distribution: distribution,
    distributionPaths: ['/*'],
    memoryLimit: 512,
    prune: true,
  });
};

export { createBucketDeployment };
