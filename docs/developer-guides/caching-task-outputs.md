---
slug: "../faqs/task-cache-output"
---
# Caching Task Outputs

Some task types support caching, which saves task outputs for reuse in subsequent tasks. This feature can be configured in the task configuration.

**To cache task output:**
1. In your Orkes Conductor cluster, go to **Definitions** > **Workflow** and select a workflow.
2. In the visual workflow editor, select a task.
3. Turn on the **Cache output** toggle and enter the **ttlInSecond** and **key**. Refer to [Configuration](#configuration) for more information on the parameters.

<p align="center"><img src="/content/img/dev-guides/caching_task_outputs-UI_screen.png" alt="Configuring cache output in UI." width="100%" height="auto"></img></p>


## Configuration

Configure the following parameters to enable task caching.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ------------------ |
| cacheConfig. **ttlInSecond** | The time to live in seconds, which is the duration for the output to be cached. | Required. | 
| cacheConfig. **key** | The cache key, which is a unique identifier for the cached output. <br/><br/> The key should be constructed as a string of dynamic task inputs, such as `${uri}-${method}`. | Required. | 

**Example**

``` json
//task configuration

  "cacheConfig": {
    "ttlInSecond": 36000,
    "key": "${uri}-${method}"
  }
```

## Task behavior with caching

Before a task is scheduled, the server checks if there is cached output for the given task definition name by matching the cache key. If a match is found, the task does not get scheduled, and the cached output is used to complete the task.

If no cached output is found, the task is scheduled as usual. When the task is completed successfully, the output is cached against the cache key for the duration specified.


## Supported tasks

Caching is currently supported for the following task types:
* [Worker (Simple)](../reference-docs/worker-task)
* [HTTP](../reference-docs/system-tasks/http)
* [HTTP Poll](../reference-docs/system-tasks/http-poll)
* [Business Rule](../reference-docs/system-tasks/business-rule)
* [JDBC](../reference-docs/system-tasks/jdbc)
* [Get Signed JWT](../reference-docs/system-tasks/get-signed-jwt)
* [Opsgenie](../reference-docs/system-tasks/opsgenie)
* [Text Complete](../reference-docs/ai-tasks/llm-text-complete)
* [Generate Embeddings](../reference-docs/ai-tasks/llm-generate-embeddings)
* [Get Embeddings](../reference-docs/ai-tasks/llm-get-embeddings)
* [Store Embeddings](../reference-docs/ai-tasks/llm-store-embeddings.md)
* [Search Index](../reference-docs/ai-tasks/llm-search-index)
* [Index Document](../reference-docs/ai-tasks/llm-index-document)
* [Get Document](../reference-docs/ai-tasks/llm-get-document)
* [Index Text](../reference-docs/ai-tasks/llm-index-text)
* [Chat Complete](../reference-docs/ai-tasks/llm-chat-complete.md)