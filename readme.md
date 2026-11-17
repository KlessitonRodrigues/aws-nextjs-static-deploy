# aws-nextjs-static-deploy

AWS CDK stack that deploys a Next.js static export to a private S3 bucket served through Amazon CloudFront.

![Architecture](diagram.svg)

## Stack

- **Server Side Rendering** — pages are rendered server-side before the Next.js static export build
- **S3** — private website bucket (`blockPublicAccess: BLOCK_ALL`, auto-delete objects, `DESTROY` removal policy)
- **CloudFront** — distribution with:
  - Origin Access Identity (bucket read access only through CloudFront)
  - Viewer-request function that rewrites URLs (Next.js routing: `/path` → `/path.html`, `/` → `/index.html`)
  - 403/404 error responses → `/index.html`
  - Cache invalidation on every deploy
- **BucketDeployment** — uploads the Next.js build output to the bucket

## Project structure

```
.
├── cdk.json                          # CDK app entry config
├── diagram.svg                       # Architecture diagram
└── src/
    ├── src.awsStack.ts               # CDK app entry point
    ├── src.translationApp.ts         # TranslationAppPage stack
    ├── config/
    │   └── config.app.ts             # App config (appName, region, appPath)
    ├── constants/
    │   └── constants.resources.ts    # Stack name and AWS resource names
    └── lib/
        ├── s3/                       # S3 resources
        └── cloudfront/               # CloudFront resources
```

## Prerequisites

- Node.js + Yarn
- AWS credentials configured via exported env vars

## Setup

Export the AWS credentials and region in your shell:

```bash
export AWS_ACCESS_KEY_ID=***
export AWS_SECRET_ACCESS_KEY=***
export AWS_REGION=us-east-1
```

The stack name is defined in `src/constants/constants.resources.ts` (`stackName`) and names all resources (`${stackName}-website-bucket`, `${stackName}-distribution`, ...).

The Next.js static export must exist at `appPath` (`src/config/config.app.ts`).

## Commands

```bash
yarn cdk-synt    # synthesize the stack
yarn cdk-deploy  # deploy all stacks
```

Destroy: `npx cdk destroy --all`

See `AGENTS.md` for project conventions.
