---
title: "Caching Task Outputs"
description: "Learn how task output caching stores task results based on input parameters so workflows can reuse previous results instead of re-executing the task."
canonical_route: "faqs/task-cache-output"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Caching Task Outputs, workflow tasks, task queues"
---

# Caching Task Outputs

You can cache task outputs to reuse them in subsequent workflow executions. When you enable caching, the system stores the task output for a specified duration and reuses it when the same task runs again with matching input parameters. This feature can be configured in the **task configuration**.

!!! tip "5-minute path"
    Add `cacheConfig.key` and `cacheConfig.ttlInSecond` to the task configuration. Build the key only from task input values that determine the output.

## When to use caching

Good fits:

- Read-only HTTP calls
- Document fetches
- Embedding lookups
- Database reads
- Expensive deterministic transforms
- Provider calls where repeated identical requests should reuse the same result

Avoid caching:

- Non-deterministic outputs
- Mutating operations
- User-specific data without a user-specific cache key
- Sensitive values that should not be reused across contexts
- Calls where freshness matters more than cost

## Supported tasks

Caching is available for the following task types:

- [Worker (Simple)](/content/reference-docs/worker-task)
- [HTTP](/content/reference-docs/system-tasks/http)
- [HTTP Poll](/content/reference-docs/system-tasks/http-poll)
- [Business Rule](/content/reference-docs/system-tasks/business-rule)
- [SendGrid](/content/reference-docs/system-tasks/sendgrid)
- [JDBC](/content/reference-docs/system-tasks/jdbc)
- [Get Signed JWT](/content/reference-docs/system-tasks/get-signed-jwt)
- [gRPC](/content/reference-docs/system-tasks/grpc)
- [Opsgenie](/content/reference-docs/system-tasks/opsgenie)
- [Yield](/content/reference-docs/operators/yield)
- [LLM Text Complete](/content/reference-docs/ai-tasks/llm-text-complete)
- [LLM Generate Embeddings](/content/reference-docs/ai-tasks/llm-generate-embeddings)
- [LLM Store Embeddings](/content/reference-docs/ai-tasks/llm-store-embeddings)
- [LLM Get Embeddings](/content/reference-docs/ai-tasks/llm-get-embeddings)
- [LLM Index Document](/content/reference-docs/ai-tasks/llm-index-document)
- [Get Document](/content/reference-docs/ai-tasks/llm-get-document)
- [LLM Index Text](/content/reference-docs/ai-tasks/llm-index-text)
- [LLM Search Index](/content/reference-docs/ai-tasks/llm-search-index)
- [LLM Chat Complete](/content/reference-docs/ai-tasks/llm-chat-complete)
- [Chunk Text](/content/reference-docs/ai-tasks/chunk-text)

## Parameters

Configure the following parameters to enable task caching in your task configuration.

| Parameter            | Description                                                                                                                                                                                                                                                            | Required/ Optional |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| cacheConfig.**key**        | The cache key is a unique identifier for the cached output and must be constructed exclusively from the task’s input parameters. <br/><br/> It can be a string concatenation that contains the task’s input keys, such as `${uri}-${method}` or `re_${uri}_${method}`. | Required.          |
| cacheConfig.**ttlInSecond**| The time to live in seconds, which is the duration for the output to be cached.                                                                                                                                                                                        | Required.          |

## Configuration

To configure caching, add the `cacheConfig` object to your task configuration:

```json
// task configuration    
"cacheConfig": {
       "key": "someKey",
       "ttlInSecond": 2500
     }
```

## Cache key design

When designing `cacheConfig.key`, include every task input value that can affect the task's output. Omitting a relevant input value can cause the task to return an incorrect cached result when that value changes between executions.

| Key design | Example | Outcome |
| ---------- | ------- | ------- |
| Good — includes all inputs that affect the output | `"key": "${url}-${mediaType}-${workflow.input.tenantId}"` | Distinguishes cached results correctly across `url`, `mediaType`, and `tenantId` |
| Risky — omits inputs that affect the output | `"key": "${url}"` | Ignores `mediaType` and `tenantId`, so it can return the wrong cached result if those values differ between executions |

## Using workflow input in a cache key

To reference a workflow input in `cacheConfig.key`, first map it to a task input parameter, then reference that task input parameter in the key. The key itself can only reference the task's input parameters, not `workflow.input` directly.

For example, the following task maps `workflow.input.url` and `workflow.input.userId` to task input parameters, then uses those task input parameters (`url`, `mediaType`, `userId`) to build the cache key:

```json
{
  "name": "get_document",
  "taskReferenceName": "get_document_ref",
  "type": "GET_DOCUMENT",
  "inputParameters": {
    "url": "${workflow.input.url}",
    "mediaType": "application/pdf",
    "userId": "${workflow.input.userId}"
  },
  "cacheConfig": {
    "key": "${url}-${mediaType}-${userId}",
    "ttlInSecond": 300
  }
}
```

## Task behavior with caching

Before a task is scheduled, the server checks if there is cached output for the given task definition name by matching the cache key. If a match is found, the task is not scheduled, and the cached output is used to complete it.

If no cached output is found, the task is scheduled as usual. When the task completes successfully, the output is cached under the specified cache key for the specified duration.

## Example

<details markdown="1">
<summary>Cache hit</summary>

Run the following workflow twice with the same input. The second run returns the cached result.

**To create and run workflow from Conductor UI:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor UI.
2. Select **+ Define workflow** and paste the following code in the **Code** tab:

```json
{
  "name": "cache_basic_example",
  "description": "Basic task output caching example",
  "version": 1,
  "tasks": [
    {
      "name": "http_poll",
      "taskReferenceName": "http_poll_ref",
      "type": "HTTP_POLL",
      "inputParameters": {
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "terminationCondition": "true",
        "env": "${workflow.input.env}"
      },
      "cacheConfig": {
        "key": "${env}",
        "ttlInSecond": 120
      }
    }
  ],
  "inputParameters": ["env"],
  "outputParameters": {},
  "schemaVersion": 2
}
```

3. Go to the **Run** tab and run the workflow using the following input:

```json
{
  "env": "prod"
}
```

- **For the first execution (cache miss)**: The task executes the API call, and the `pollCount` is 1. The result is stored in cache under key `prod` for 120 seconds.
- **For the second execution with the same input (cache hit)**: The cached result is returned immediately without executing the task. The task output includes `_cachedResponse: true` and `pollCount` is 0.

<p align="center"><img src="/content/img/cache-hit.png" alt="Example for cache hit" width="100%" height="auto"></img></p>

</details>

<details markdown="1">
<summary>Cache miss</summary>

Run the workflow with a different input. A different cache key is computed, so no cached result is found and the task executes fresh.

Use the same workflow definition as **Cache hit example**. First run with input as `“env”:”prod”` and then run using a different input:

```json
{
  "env": "staging"
}
```

The cache key now resolves to `staging`, which has no cached entry. The task executes the API call. `pollCount` is 1 and there is no `_cachedResponse` in the output.

<p align="center"><img src="/content/img/cache-miss.png" alt="Example for cache miss" width="100%" height="auto"></img></p>

Each unique cache key has its own independent cache entry. Running with `env: "prod"` and `env: "staging"` are treated as separate executions.

</details>

<details markdown="1">
<summary>Cache expiry (TTL)</summary>

When the TTL expires, the cached result is discarded and the next run executes the task fresh.

**To create and run workflow from Conductor UI:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor UI.
2. Select **+ Define workflow** and paste the following code in the **Code** tab:

```json
{
  "name": "cache_ttl_example",
  "description": "Demonstrates cache expiry using a short TTL",
  "version": 1,
  "tasks": [
    {
      "name": "http_poll",
      "taskReferenceName": "http_poll_ref",
      "type": "HTTP_POLL",
      "inputParameters": {
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "terminationCondition": "true"
      },
      "cacheConfig": {
        "key": "ttl_test_key",
        "ttlInSecond": 30
      }
    }
  ],
  "inputParameters": [],
  "outputParameters": {},
  "schemaVersion": 2
}
```

3. Run the workflow once and then a second time immediately.
4. Wait for 30 seconds and run for a third time.

**For the first execution**: Task executes the API call. The result is cached for 30 seconds, and the `pollCount` is 1.

<p align="center"><img src="/content/img/cache-ttl-execution1.png" alt="Example for cache TTL expiry" width="100%" height="auto"></img></p>

**For the second execution within 30 seconds (cache hit)**: Cached result is returned. `_cachedResponse: true` and the `pollCount` is 0.

<p align="center"><img src="/content/img/cache-ttl-execution2.png" alt="Example for cache TTL expiry" width="100%" height="auto"></img></p>

**For the third execution after 30 seconds (cache miss)**: The cache entry has expired. The task executes the API call again. `pollCount` is 1 and there is no `_cachedResponse`.

<p align="center"><img src="/content/img/cache-ttl-execution3.png" alt="Example for cache TTL expiry" width="100%" height="auto"></img></p>

</details>

<details markdown="1">
<summary>Cache output using task input parameters</summary>

Cache the task output based on a value passed directly in the task's `inputParameters`. Here, the `method` field is used as part of the cache key, so GET and POST requests are cached separately.

**To create and run workflow from Conductor UI:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor UI.
2. Select **+ Define workflow** and paste the following code in the **Code** tab:

```json
{
  "name": "cache_task_input_example",
  "description": "Demonstrates caching task output using task input parameters",
  "version": 1,
  "tasks": [
    {
      "name": "http_poll",
      "taskReferenceName": "http_poll_ref",
      "type": "HTTP_POLL",
      "inputParameters": {
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "method": "${workflow.input.method}",
        "accept": "application/json",
        "contentType": "application/json",
        "terminationCondition": "true"
      },
      "cacheConfig": {
        "key": "api_${method}",
        "ttlInSecond": 120
      }
    }
  ],
  "inputParameters": ["method"],
  "outputParameters": {},
  "schemaVersion": 2
}
```

3. Go to the **Run** tab and run the workflow once and then a second time immediately using the following input:

```json
{
  "method": "GET"
}
```

**For the first execution (cache miss)**: The cache key resolves to `api_GET`. No cached entry exists. The task executes the API call. `pollCount` is 1.

<p align="center"><img src="/content/img/cache-task-input-execution1.png" alt="Example for cache task input" width="100%" height="auto"></img></p>

**For the second execution with the same input (cache hit)**: The cache key resolves to `api_GET` again. The cached result is returned immediately.

<p align="center"><img src="/content/img/cache-task-input-execution2.png" alt="Example for cache task input" width="100%" height="auto"></img></p>

Running with `"method": "POST"` computes the key `api_POST` — a cache miss. GET and POST results are cached independently.

</details>

<details markdown="1">
<summary>Cache output using workflow inputs</summary>

Cache the task output based on a workflow-level input. Each unique input value gets its own cache entry.

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor UI.
2. Select **+ Define workflow** and paste the following code in the **Code** tab:

```json
{
  "name": "cache_workflow_input_example",
  "description": "Demonstrates caching task output using workflow input parameters",
  "version": 1,
  "tasks": [
    {
      "name": "http_poll",
      "taskReferenceName": "http_poll_ref",
      "type": "HTTP_POLL",
      "inputParameters": {
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "terminationCondition": "true",
        "userId": "${workflow.input.userId}"
      },
      "cacheConfig": {
        "key": "user_${userId}",
        "ttlInSecond": 120
      }
    }
  ],
  "inputParameters": ["userId"],
  "outputParameters": {},
  "schemaVersion": 2
}
```

3. Go to the **Run** tab and run the workflow once and then a second time immediately using the following input:

```json
{
  "userId": "user-123"
}
```

**For the first execution (cache miss)**: The cache key resolves to `user_user-123`. No cached entry exists. The task executes the API call, and the `pollCount` is 1.

<p align="center"><img src="/content/img/cache-workflow-input-execution1.png" alt="Example for cache workflow input" width="100%" height="auto"></img></p>

**For the second execution with the same userId (cache hit)**: The cache key resolves to `user_user-123` again. The cached result is returned immediately.

<p align="center"><img src="/content/img/cache-workflow-input-execution2.png" alt="Example for cache workflow input" width="100%" height="auto"></img></p>

Running with another workflow input is a cache miss. Each user ID has its own independent cache entry.

</details>

<details markdown="1">
<summary>Cache output using variables from previous tasks</summary>

Cache the task output based on a value set by an earlier task in the workflow. The [Set Variable](/content/reference-docs/operators/set-variable) task captures the input and stores it as a workflow variable, which is then referenced in the cache key.

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor UI.
2. Select **+ Define workflow** and paste the following code in the **Code** tab:

```json
{
  "name": "cache_variable_example",
  "description": "Demonstrates caching task output using variables from a previous task",
  "version": 1,
  "tasks": [
    {
      "name": "set_variable",
      "taskReferenceName": "set_variable_ref",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "region": "${workflow.input.location}"
      }
    },
    {
      "name": "http_poll",
      "taskReferenceName": "http_poll_ref",
      "type": "HTTP_POLL",
      "inputParameters": {
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "terminationCondition": "true",
        "cacheKey": "${workflow.variables.region}"
      },
      "cacheConfig": {
        "key": "re_${cacheKey}",
        "ttlInSecond": 120
      }
    }
  ],
  "inputParameters": ["location"],
  "outputParameters": {},
  "schemaVersion": 2
}
```

3. Go to the **Run** tab and run the workflow once and then a second time immediately using the following input:

```json
{
  "location": "us-east-1"
}
```

**For the first execution (cache miss)**: The Set Variable task runs first and stores `us-east-1` as the workflow variable `region`. The HTTP Poll task resolves `${workflow.variables.region}` to `us-east-1` and computes the cache key `re_us-east-1`. No cached entry exists. The task executes the API call. `pollCount` is 1.

<p align="center"><img src="/content/img/cache-variable-execution1.png" alt="Example for cache variable" width="100%" height="auto"></img></p>

**For the second execution with the same location (cache hit)**: The cache key resolves to `re_us-east-1` again. The cached result is returned immediately.

<p align="center"><img src="/content/img/cache-variable-execution2.png" alt="Example for cache variable" width="100%" height="auto"></img></p>

Running with another workflow input is a cache miss. Each region has its own independent cache entry.

</details>

## Production notes

- Keep TTL short until you know the data freshness requirements.
- Include tenant, user, region, language, model, and version fields when they affect output.
- Do not cache mutating requests.
- Monitor cache hit rate and stale-data incidents.
- Treat cache key changes as behavior changes and test them with representative input.

## Related pages

- [Tasks in Workflows](/content/developer-guides/tasks)
- [Wiring Parameters](/content/developer-guides/passing-inputs-to-task-in-conductor)
- [Masking Parameters](/content/developer-guides/masking-parameters)
- [Using Task Input Templates](/content/developer-guides/task-input-templates)
- [Rate Limits](/content/rate-limits)
- [Writing Workers for Conductor Workflows](/content/developer-guides/using-workers)
