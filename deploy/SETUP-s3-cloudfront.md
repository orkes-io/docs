# Docs → S3 + CloudFront

Serve the MkDocs docs at `/content/*` from an S3 bucket wired into a marketing
CloudFront distribution. Two accounts, one setup, mirrored:

| | account | bucket | workflow | environment |
|---|---|---|---|---|
| non-prod | `marketing-non-prod` | `orkes-docs-test` | `deploy-docs-s3.yml` | `marketing-non-prod` |
| prod | `marketing-prod` | `orkes-docs-prod` | `deploy-docs-prod-s3.yml` | `marketing-prod` |

Both build with `DOCS_BASE_URL=/content`, upload to `s3://<bucket>/content/`, and
invalidate `/content/*`. Concrete account IDs, distribution IDs, and role ARNs
live in the GitHub Environments, not in this file.

**Neither touches the live site yet:** `orkes.io/content` is still served by the
portal-baked Docusaurus build off `main`. Sections 1–5 below describe the
non-prod setup; [prod](#prod) mirrors it and is already built.

---

## 1. S3 bucket (marketing-non-prod account)
- Create a **private** bucket, `orkes-docs-test` — Block all public
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

**Trust policy** — scope `sub` to the GitHub Environment, not just the repo, so
only jobs that declare `environment: marketing-non-prod` can assume the role:
```json
{ "Version": "2012-10-17", "Statement": [{
  "Effect": "Allow",
  "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
    "StringLike":  { "token.actions.githubusercontent.com:sub": "repo:orkes-io/docs:environment:marketing-non-prod" }
  }
}]}
```
*(If the GitHub OIDC provider doesn't exist in the account yet, add it: URL
`https://token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.)*

> **`sub` must be written exactly as above.** GitHub sends
> `repo:<owner>/<repo>:environment:<env>`. Numeric IDs belong to the separate
> `repository_id` / `repository_owner_id` claims — splicing them into `sub` (e.g.
> `repo:orkes-io@<owner_id>/docs@<repo_id>:*`) silently fails every assume with
> `Not authorized to perform sts:AssumeRoleWithWebIdentity`. This exact typo cost
> a debugging session on the prod role.

**Permissions policy** — pin CloudFront to the one distribution; `"Resource": "*"`
would let the docs deploy invalidate every distribution in the account:
```json
{ "Version": "2012-10-17", "Statement": [
  { "Effect": "Allow",
    "Action": ["s3:ListBucket"],
    "Resource": "arn:aws:s3:::orkes-docs-test" },
  { "Effect": "Allow",
    "Action": ["s3:GetObject","s3:PutObject","s3:DeleteObject"],
    "Resource": "arn:aws:s3:::orkes-docs-test/*" },
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
| `DOCS_BUCKET` | `orkes-docs-test` |
| `MARKETING_CF_DIST_ID` | the non-prod distribution ID |
| `DOCS_SITE_URL` | `https://<non-prod-cf-domain>/content/` |

Do **not** set `DOCS_ENABLE_ANALYTICS` here. Google Tag Manager is off unless a
build opts in, which keeps non-prod traffic out of the production GA4 property.
To smoke-test tags against a throwaway container, set `DOCS_GTM_ID` to that
container instead of pointing non-prod at the real one.

## 5. Run it
- Push to `refactor/docs-oss-enterprise-merge` — that is the branch
  `deploy-docs-s3.yml` triggers on.
- Test: `https://<non-prod-cf-domain>/content/quickstarts`.

> `workflow_dispatch` is declared but does not work yet: GitHub only offers the
> **Run workflow** button for workflows present on the default branch, and
> neither S3 workflow is on `main` until the MkDocs migration merges. Until then
> the push trigger is the only way to run either one.

---

<a id="prod"></a>
## Prod (built, deploying, not yet public)

The **marketing-prod** account mirrors sections 1–4 exactly: private bucket
`orkes-docs-prod`, the `/content/*` behavior + clean-URL function on the prod
marketing distribution, IAM role `orkes-docs-deploy-prod`, and a
`marketing-prod` GitHub Environment holding the same five variables. Its trust
policy scopes `sub` to `repo:orkes-io/docs:environment:marketing-prod` and its
permissions policy pins CloudFront to the prod distribution.

`.github/workflows/deploy-docs-prod-s3.yml` runs the same build and audit steps
and currently pushes on `refactor/docs-oss-enterprise-merge`. The bucket is not
public — `orkes.io/content` is still the portal-baked Docusaurus — so this simply
replaces deploying to it by hand.

### Cutover checklist
1. **Change the prod trigger to `branches: [main]`** *before* repointing
   CloudFront. Left as-is, every merge into the integration branch publishes
   straight to the live site.
2. Repoint the prod distribution's `/content/*` off the portal-baked Docusaurus,
   then invalidate `/content/*` once.
3. Clear the duplicate GA4 tag in GTM (see below).

### Analytics
The prod workflow is the **only** build that sets `DOCS_ENABLE_ANALYTICS: "1"`,
which injects Google Tag Manager (`GTM-M4Q6Z3R2`, overridable per-environment via
`DOCS_GTM_ID`) into `<head>`. Dev, non-prod, and the Pages preview ship without
analytics by design. If you rewrite this job, keep that variable or prod goes
live unmeasured.

The container owns GA4 (`G-4400JPTLRF`) and Google Ads. The site deliberately
does **not** load `gtag.js` itself: the Docusaurus build configured that property
both on-page and again inside the container, sending `page_view` from multiple
sources.

Two consequences worth knowing:

- Because the prod bucket already builds with analytics on, any traffic reaching
  it pre-launch — QA, internal links — lands in the production GA4 property.
  Filter it by IP in GA4, or point `DOCS_GTM_ID` at a throwaway container until
  cutover.
- One duplicate survives inside the container and is fixable only in the GTM
  console: a GA4 event tag named `page_view` on an All Pages trigger, on top of
  the config tag's `send_page_view`. Clear it before or shortly after cutover.
