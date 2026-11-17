import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { appConfig } from '../../config/config.app';
import { resources } from '../../constants/constants.resources';

type createDistributionParams = {
  scope: Construct;
  websiteBucket: s3.IBucket;
  originAccessIdentity: cloudfront.IOriginAccessIdentity;
  urlRewriteFunction: cloudfront.IFunction;
};

const createDistribution = (params: createDistributionParams): cloudfront.IDistribution => {
  const { scope, websiteBucket, originAccessIdentity, urlRewriteFunction } = params;

  return new cloudfront.Distribution(scope, resources.distribution, {
    defaultBehavior: {
      origin: new origins.S3Origin(websiteBucket, {
        originAccessIdentity: originAccessIdentity,
      }),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
      cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
      compress: true,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      functionAssociations: [
        {
          function: urlRewriteFunction,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        },
      ],
    },
    defaultRootObject: 'index.html',
    errorResponses: [
      {
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
        ttl: cdk.Duration.minutes(5),
      },
      {
        httpStatus: 403,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
        ttl: cdk.Duration.minutes(5),
      },
    ],
    priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    comment: `${appConfig.appName} Next.js Application`,
  });
};

export { createDistribution };
