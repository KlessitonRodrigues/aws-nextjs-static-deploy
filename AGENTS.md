## General Instructons

- File convention: <parent_folder>.<file_name>.ts
- Keep agents.md and readme.md to update on change project structure
- Commit small changes using "feat/update/fix/refactor/remove: <short_description>"
- Push commits is always manual

### NodeJS

- Use src/config for configuration
- Use src/constants for variables
- Use src/utils for utilitare code
- Declare type on top of file
- Only use typed return when needed
- Function with more than 2 parameters use an object: sum = (params: sumParams) => {}

### AWS

- Use src/lib/<service> for aws resources: src/lib/s3, src/lib/cloudfront
- AWS resources names is on src/constants/constants.resources.ts: { stackName, websiteBucket: "${stackName}-website-bucket" }
- stackName is set on src/constants/constants.resources.ts; AWS credentials and AWS_REGION come from exported env vars

## Files

<!-- Update with current file paths -->

```
.
├── readme.md                         # Project README
├── AGENTS.md                         # This file
├── cdk.json                          # CDK app entry config
├── diagram.svg                       # Architecture diagram
├── package.json                      # Root package manifest
├── tsconfig.json                     # TypeScript configuration
├── .prettierrc                       # Prettier configuration
├── .gitignore                        # Git ignore rules
├── yarn.lock                         # Lockfile
└── src/
    ├── src.awsStack.ts               # CDK app entry point (cdk.json app)
    ├── src.translationApp.ts         # TranslationAppPage stack
    ├── config/
    │   └── config.app.ts             # App config (appName, region, appPath)
    ├── constants/
    │   └── constants.resources.ts    # Stack name and AWS resource names
    └── lib/
        ├── s3/
        │   ├── s3.bucket.ts          # Private website bucket
        │   └── s3.deployment.ts      # BucketDeployment (upload + invalidate)
        └── cloudfront/
            ├── cloudfront.oai.ts             # Origin Access Identity
            ├── cloudfront.function.ts        # URL rewrite function
            └── cloudfront.distribution.ts    # CloudFront distribution
```

## Project Intructions

- Static export of the Next.js app is deployed from `appPath` (src/config/config.app.ts)
