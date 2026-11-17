import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { appConfig } from './config/config.app';
import { resources } from './constants/constants.resources';
import { createDistribution } from './lib/cloudfront/cloudfront.distribution';
import { createOriginAccessIdentity } from './lib/cloudfront/cloudfront.oai';
import { createUrlRewriteFunction } from './lib/cloudfront/cloudfront.function';
import { createBucketDeployment } from './lib/s3/s3.deployment';
import { createWebsiteBucket } from './lib/s3/s3.bucket';

type TranslationAppPageProps = cdk.StackProps;

export class TranslationAppPage extends cdk.Stack {
  constructor(scope: Construct, props?: TranslationAppPageProps) {
    super(scope, `${appConfig.appName}Stack`, props);

    const websiteBucket = createWebsiteBucket(this);

    const originAccessIdentity = createOriginAccessIdentity(this);

    websiteBucket.grantRead(originAccessIdentity);

    const urlRewriteFunction = createUrlRewriteFunction(this);

    const distribution = createDistribution({
      scope: this,
      websiteBucket,
      originAccessIdentity,
      urlRewriteFunction,
    });

    createBucketDeployment({
      scope: this,
      websiteBucket,
      distribution,
    });

    new cdk.CfnOutput(this, resources.domainNameOutput, {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
      exportName: resources.domainNameExport,
    });

    new cdk.CfnOutput(this, resources.bucketNameOutput, {
      value: websiteBucket.bucketName,
      description: 'S3 Bucket Name',
      exportName: resources.bucketNameExport,
    });
  }
}
