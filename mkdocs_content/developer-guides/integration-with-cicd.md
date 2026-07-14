---
title: "CI/CD Best Practices"
description: "Learn best practices for integrating workflows into CI/CD pipelines, including testing workflow definitions and deploying updates through automated pipelines."
canonical_route: "developer-guides/integration-with-cicd"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# CI/CD Best Practices

Treat Conductor metadata like application code. Workflow definitions, task definitions, user forms, event handlers, webhooks, schemas, prompts, schedules, and worker code should be versioned, reviewed, tested, and promoted through controlled environments.

!!! tip "5-minute path"
    Store workflow and metadata JSON in Git, run workflow tests in CI, deploy through API or SDK with scoped credentials, and promote changes by version instead of editing production manually.

## CI/CD for Conductor workflows and resources

A production pipeline usually manages three artifact types:

| Artifact | Stored as | Tested how | Deployed how |
| -------- | --------- | ---------- | ------------ |
| Workflow definitions | JSON or workflow-as-code | Workflow unit/regression tests | Metadata API or SDK |
| Metadata resources | JSON | Schema/lint checks and targeted integration tests | Resource-specific API or SDK |
| Workers | Application code | Normal service unit/integration tests | Your container/app deployment pipeline |

Similar to any CI/CD pipeline, this is the general process for managing Conductor resources across releases:

1. Download the resource JSONs to a version control system.
2. Run tests on the changes.
3. Deploy the resource JSONs to the target environment using a pipeline or script.

The exact steps depend on your own CI/CD implementation, but this guide showcases some general procedures to accomplish this.

### Step 1: Download resource JSONs

Use the Conductor UI to download each JSON individually, or the API/SDK to download JSONs in bulk for repeatable export. The UI is useful for one-off inspection, but CI should use scripted export so the same resources are captured every time.

=== "Using API"

    You must generate an access token to authenticate your API requests — see [Authentication](/content/sdks/authentication) for more information.

    Common APIs:

    | Resource | API |
    | -------- | --- |
    | Workflow definitions | [Get All Workflow Definitions](/content/reference-docs/api/metadata/get-all-workflow-definitions) |
    | Task definitions | [Get All Task Definitions](/content/reference-docs/api/metadata/get-all-task-definitions) |
    | User forms | [Get User Forms](/content/reference-docs/api/human-tasks/list-task-ui-templates) |
    | Workflow update | [Update Workflow Definitions](/content/reference-docs/api/metadata/update-workflow-definitions) |
    | Task update | [Update Task Definitions](/content/reference-docs/api/metadata/update-task-definitions) |

    The Get All Workflow Definitions and Get All Task Definitions APIs also let you filter by [tags](/content/access-control-and-security/tags).

    !!! tip
        Refer to the API Docs on your Conductor UI for more details on the available API endpoints.

=== "Using Conductor UI"

    1. Go to **Definitions > Workflows** (or **Task**, **User Forms**, **Event Handler**, **Webhook**, **AI Prompts**, **Schemas**) in the left navigation menu.
    2. Select the desired resource.
    3. Retrieve the JSON in one of the following ways:
       - Select **Download** to download the `.json` file, or
       - Go to the **Code** tab and copy the JSON into a file.
    4. Save the files to your version control system.


Keep exported files organized by resource type and environment-neutral names.

```text
conductor/
  workflows/
    order_fulfillment.json
  tasks/
    charge_card.json
  schemas/
    order_input_v1.json
  forms/
    approval_form_v1.json
```

### Step 2: Test workflow definitions

As part of the CI pipeline, workflow definitions should be maintained as independent units that can be unit and integration-tested before being released to the production environment.

At minimum, test:

- One happy path.
- Every switch branch that changes behavior.
- Retryable and terminal failure paths.
- Schema validation for external inputs.
- Output compatibility for downstream callers.

For worker code, use the normal test stack for that language and include idempotency tests for side-effecting operations.

For a guide on testing Conductor workflows, refer to [Unit and Regression Tests](/content/developer-guides/unit-and-regression-tests).

### Step 3: Deploy changes to the target environment

Before deploying, assess what resources are being modified and the deployment scope — for example, the deployment might only target resources grouped under a specific tag or file name prefix. Once you know the scope, map the resources to the endpoints you need to call to deploy the changes (for example, the [Update Workflow Definition](/content/reference-docs/api/metadata/update-workflow-definitions) API for workflow JSONs).

!!! tip
    Refer to the API Docs on your Conductor UI for the full list of available API endpoints for updating the different resources.

Use a scoped application identity for deployment. It should have only the metadata permissions needed by the pipeline.

The following script cycles through all the workflow definitions in a folder and uploads them to the Conductor server. To use it, inject `CONDUCTOR_SERVER_URL`, `CONDUCTOR_AUTH_KEY`, and `CONDUCTOR_AUTH_SECRET` with the appropriate values in your deployment pipeline. Refer to [Authentication](/content/sdks/authentication) for a guide on retrieving your Orkes access tokens.

Example deployment script for workflow definitions ([full source](https://github.com/orkes-io/workflow-cicd/blob/main/src/deploy_workflows.sh#L8-L32)):

```bash
set -euo pipefail

TOKEN_RESPONSE=$(curl -sS -X POST "$CONDUCTOR_SERVER_URL/token" \
  -H "Content-Type: application/json" \
  -d "{\"keyId\":\"$CONDUCTOR_AUTH_KEY\",\"keySecret\":\"$CONDUCTOR_AUTH_SECRET\"}")

TOKEN=$(printf "%s" "$TOKEN_RESPONSE" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "Unable to generate an auth token"
  exit 1
fi

for FILE in conductor/workflows/*.json; do
  echo "Deploying $FILE"
  curl -sS -X PUT "$CONDUCTOR_SERVER_URL/metadata/workflow" \
    -H "X-Authorization: $TOKEN" \
    -H "Content-Type: application/json" \
    -d @"$FILE"
done
```

## CI/CD for workers

Workers are application services. Build, test, deploy, and roll them back using the same production discipline as other services.

Worker deployment checklist:

- Unit-test business logic.
- Integration-test Conductor polling and task completion.
- Verify idempotency for side effects.
- Configure timeouts, retries, and response timeouts in task definitions.
- Use application credentials with only required task/domain permissions.
- Expose metrics and logs with task type, task ID, workflow ID, and worker ID.
- Scale based on queue depth, queue wait time, and downstream capacity.

## Production notes

- Do not print tokens, keys, or secrets in CI logs.
- Prefer versioned workflow changes over in-place edits when behavior changes.
- Deploy metadata before worker code only when old workers can still handle the new definition.
- Deploy worker code before metadata only when new workers can handle old definitions.
- Tag resources by team, application, and environment so deployments can target the intended scope.
- Keep rollback plans explicit: previous workflow version, previous metadata JSON, and worker image tag.
