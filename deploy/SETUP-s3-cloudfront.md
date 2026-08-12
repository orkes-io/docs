# Docs → S3 + CloudFront (marketing non-prod)

Serve the MkDocs docs at `https://<non-prod-cf-domain>/content/*` from an S3
bucket, wired into the **non-prod marketing** CloudFront distribution.

**This is additive and does NOT touch production:** it does not affect
`orkes.io`, the orkes-portal, or the docs repo's `main` (Docusaurus). Those keep
working exactly as today.

The workflow (`.github/workflows/deploy-docs-s3.yml`) builds with
`DOCS_BASE_URL=/content`, uploads to `s3://<bucket>/content/`, and invalidates
`/content/*`. Below is the one-time AWS + GitHub setup it depends on.

---

## 1. S3 bucket (marketing-non-prod account)
- Create a **private** bucket, e.g. `orkes-docs-nonprod` — Block all public
  access **on**. (It's served through CloudFront, never directly.)
- Nothing else; the workflow uploads under a `content/` prefix.

## 2. CloudFront (the non-prod marketing distribution)
1. **Origin:** add the bucket as a new origin using **Origin Access Control
   (OAC)**. Apply the bucket policy CloudFront generates (grants
   `cloudfront.amazonaws.com` `s3:GetObject` for this distribution). **Leave
   Origin path empty.**
2. **Behavior:** point `/content/*` at this S3 origin. Cache policy
   `CachingOptimized`.
3. **Function:** attach `deploy/cloudfront-content-clean-urls.js` as a
   **viewer-request** CloudFront Function on the `/content/*` behavior.
   *(If the distribution already has a clean-URL function that appends
   `index.html`, you can attach that same one instead.)*
4. Save → wait for **Deployed** → invalidate `/content/*` once.

## 3. GitHub OIDC role (marketing-non-prod account)
Create an IAM role the docs repo can assume via GitHub OIDC.

**Trust policy** (restrict to this repo):
```json
{ "Version": "2012-10-17", "Statement": [{
  "Effect": "Allow",
  "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
    "StringLike":  { "token.actions.githubusercontent.com:sub": "repo:orkes-io/docs:*" }
  }
}]}
```
*(If the GitHub OIDC provider doesn't exist in the account yet, add it: URL
`https://token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.)*

**Permissions policy:**
```json
{ "Version": "2012-10-17", "Statement": [
  { "Effect": "Allow",
    "Action": ["s3:PutObject","s3:DeleteObject","s3:ListBucket"],
    "Resource": ["arn:aws:s3:::orkes-docs-nonprod","arn:aws:s3:::orkes-docs-nonprod/*"] },
  { "Effect": "Allow",
    "Action": ["cloudfront:CreateInvalidation"],
    "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<NONPROD_DIST_ID>" }
]}
```

## 4. GitHub Environment (docs repo → Settings → Environments)
Create an environment named **`marketing-non-prod`** with these **Variables**:

| Variable | Value |
|---|---|
| `AWS_ROLE_ARN` | the role ARN from step 3 |
| `AWS_REGION` | e.g. `us-east-1` |
| `DOCS_BUCKET` | `orkes-docs-nonprod` |
| `MARKETING_CF_DIST_ID` | the non-prod distribution ID |
| `DOCS_SITE_URL` | `https://<non-prod-cf-domain>/content/` |

Do **not** set `DOCS_ENABLE_ANALYTICS` here. Google Tag Manager is off unless a
build opts in, which keeps non-prod traffic out of the production GA4 property.
To smoke-test tags against a throwaway container, set `DOCS_GTM_ID` to that
container instead of pointing non-prod at the real one.

## 5. Run it
- Push to `docs_site_revamp` (or run the workflow manually via **workflow_dispatch**).
- Test: `https://<non-prod-cf-domain>/content/quickstarts`.

---

## Later: promoting to prod (not now)
Mirror this in the **marketing-prod** account — its own bucket
(`orkes-docs-prod`), the `/content/*` behavior + function on the **prod**
distribution, and a `marketing-prod` GitHub Environment. Only at that point do
you repoint `orkes.io` `/content` off the portal-baked Docusaurus.

The workflow already exists: **`.github/workflows/deploy-docs-prod-s3.yml`**.
Same build and audit steps as non-prod, `environment: marketing-prod`, and for
now it pushes on `refactor/docs-oss-enterprise-merge` — the prod bucket is not
public yet, so this just replaces deploying to it by hand.

> **Before repointing CloudFront, change that trigger to `branches: [main]`.**
> Otherwise every merge into the integration branch publishes to the live site.

Populate the `marketing-prod` Environment with the same five
variables as the table above, with `DOCS_SITE_URL` set to
`https://orkes.io/content/` — if you leave it unset the build falls back to that
same value, so it is safe either way.

That workflow is also the only build that sets **`DOCS_ENABLE_ANALYTICS: "1"`**,
which injects Google Tag Manager (`GTM-M4Q6Z3R2`, overridable via `DOCS_GTM_ID`)
into `<head>`. Every other build — dev, non-prod, Pages preview — ships without
analytics by design. If you replace or rewrite this job, keep that variable or
prod goes live unmeasured. The container owns GA4 and Google Ads; the site
deliberately does not load `gtag.js` itself, since the Docusaurus build
configured `G-4400JPTLRF` both on-page and inside the container and
double-counted `page_view`.

One duplicate survives on the container side and can only be fixed in the GTM
console: a GA4 event tag named `page_view` on an All Pages trigger, on top of the
config tag's `send_page_view`. Clear that before or shortly after cutover.
