const stackName = 'translation-api';

const resources = {
  stackName,
  websiteBucket: `${stackName}-website-bucket`,
  originAccessIdentity: `${stackName}-origin-access-identity`,
  urlRewriteFunction: `${stackName}-url-rewrite-function`,
  distribution: `${stackName}-distribution`,
  bucketDeployment: `${stackName}-bucket-deployment`,
  domainNameOutput: `${stackName}-domain-name-output`,
  bucketNameOutput: `${stackName}-bucket-name-output`,
  domainNameExport: `${stackName}-domain-name`,
  bucketNameExport: `${stackName}-bucket-name`,
};

export { resources };
