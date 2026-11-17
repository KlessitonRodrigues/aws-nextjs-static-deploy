import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';

import { resources } from '../../constants/constants.resources';

const urlRewriteHandler = `
  function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (!uri.includes('.')) {
      if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
      } else {
        request.uri = uri + '.html';
      }
    }

    return request;
  }
`;

const createUrlRewriteFunction = (scope: Construct): cloudfront.Function =>
  new cloudfront.Function(scope, resources.urlRewriteFunction, {
    code: cloudfront.FunctionCode.fromInline(urlRewriteHandler),
    comment: 'URL rewrite for Next.js static export',
  });

export { createUrlRewriteFunction };
