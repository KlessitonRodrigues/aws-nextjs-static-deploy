import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { resources } from '../../constants/constants.resources';

const createWebsiteBucket = (scope: Construct): s3.IBucket =>
  new s3.Bucket(scope, resources.websiteBucket, {
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
  });

export { createWebsiteBucket };
