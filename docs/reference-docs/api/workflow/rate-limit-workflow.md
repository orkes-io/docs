---
slug: "/reference-docs/api/workflow/rate-limit-workflow"
description: "This API is used to limit the number of workflow executions at any given time."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rate Limit Workflow

The workflow rate limit controls the number of workflow executions allowed concurrently. Workflows triggered beyond this limit are queued based on their trigger time.

## Input Parameters

| Parameter | Description | 
| --------- | ----------- |
| rateLimitConfig | The rate limit settings for workflows. This is part of the workflow definition. |
| rateLimitKey | A unique identifier used to group workflow executions for rate limiting. Accepts [variables from workflow input](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor#sample-expressions), e.g., `${workflow.input.correlationId}`. | 
| concurrentExecLimit | The number of workflow executions that can run concurrently for a given key. | 

**Sample JSON configuration**

```json
// Workflow definition

"rateLimitConfig": {
	"rateLimitKey": "someKey",
	"concurrentExecLimit": X
}
```
For example, if `concurrentExecLimit` is set to 3, a maximum of three workflows can be executed at any given time.

## Client SDK Method

<Tabs>
<TabItem value="Java" label="Java">

```shell
        RateLimitConfig rateLimitConfig = new RateLimitConfig();
        rateLimitConfig.setRateLimitKey("http");
        rateLimitConfig.setConcurrentExecLimit(3);
        workflowDef.setRateLimitConfig(rateLimitConfig);
```
</TabItem>
</Tabs>

## Examples

<details><summary>Using dynamic rate limits</summary>

For use cases requiring dynamic rate limits, consider the following example:

```shell
        RateLimitConfig rateLimitConfig = new RateLimitConfig();
        rateLimitConfig.setRateLimitKey("${workflow.correlationId}");
        rateLimitConfig.setConcurrentExecLimit(3);
        workflowDef.setRateLimitConfig(rateLimitConfig);
```

In this case, a separate rate limit is applied for each correlation ID. For example, workflows triggered with correlation IDs 1 and 2 will each have their own rate-limiting queues. This approach allows dynamic rate limits based on inputs such as `workflowType`,` correlationId`, or `version`.

</details>