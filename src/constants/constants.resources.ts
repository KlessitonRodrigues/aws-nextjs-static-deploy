import { appConfig } from '../config/config.app';

type resourcesType = typeof resources;

const resources = {
  websiteBucket: `${appConfig.stackName}-website-bucket`,
  originAccessIdentity: `${appConfig.stackName}-origin-access-identity`,
  urlRewriteFunction: `${appConfig.stackName}-url-rewrite-function`,
  distribution: `${appConfig.stackName}-distribution`,
  bucketDeployment: `${appConfig.stackName}-bucket-deployment`,
  domainNameOutput: `${appConfig.stackName}-domain-name-output`,
  bucketNameOutput: `${appConfig.stackName}-bucket-name-output`,
  domainNameExport: `${appConfig.stackName}-domain-name`,
  bucketNameExport: `${appConfig.stackName}-bucket-name`,
};

export { resources };
export type { resourcesType };
