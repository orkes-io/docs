---
title: "LLM Index Text"
description: "Learn how the LLM Index Text task indexes text content into a vector database for semantic search in Orkes Conductor."
canonical_route: "reference-docs/ai-tasks/llm-index-text"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, LLM Index Text, LLM Index Text AI task, AI orchestration, LLM orchestration, agent workflows"
---

# LLM Index Text

The LLM Index Text task is designed to index the provided text into a vector space for efficient search, retrieval, and processing at a later stage.

It takes text input, processes it using a specified language model to generate embeddings, and stores these embeddings in a chosen vector database. 

!!! info "Prerequisites"
    
    - [Integrate the required AI model](/content/category/integrations/ai-llm) with Orkes Conductor.
    - [Integrate the required vector database](/content/category/integrations/vector-databases) with Orkes Conductor.


## Task parameters

Configure these parameters for the LLM Index Text task.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**vectorDB** | The vector database to store the data.<br/><br/>**Note**: If you haven’t configured the vector database on your Orkes Conductor cluster, navigate to the **Integrations** tab and [configure your required provider](/content/category/integrations/vector-databases). | Required. |
| inputParameters.**namespace** | Namespaces are separate isolated environments within the database to manage and organize vector data effectively. Enter the namespace the task will utilize. <br/><br/>The usage and terminology of the namespace field vary depending on the integration:<ul><li>For Pinecone, the namespace field is applicable.</li><li>For Weaviate, the namespace field is not applicable.</li><li>For MongoDB, the namespace field is referred to as “Collection” in MongoDB.</li><li>For Postgres, the namespace field is referred to as “Table” in Postgres.</li></ul> | Required. |
| inputParameters.**index** | The index in your vector database where the text or data will be stored.<br/><br/>The terminology of the index field varies depending on the integration:<ul><li>For Weaviate, the index field indicates the collection name.</li><li>For other integrations, it denotes the index name.</li></ul> | Required. | 
| inputParameters.**embeddingModelProvider** | The LLM provider for generating the embeddings.<br/><br/>**Note**: If you haven’t configured your AI/LLM provider on your Orkes Conductor cluster, navigate to the **Integrations** tab and [configure your required provider](/content/category/integrations/ai-llm). | Required. |
| inputParameters.**embeddingModel** | The embedding model provided by the selected LLM provider to generate the embeddings. | Required. |
| inputParameters.**dimensions** | The size of the vector, which is the number of elements in the vector. | Optional. | 
| inputParameters.**text** | The text to be indexed. | Required. |
| inputParameters.**docId** | A unique ID to identify the document where the indexed text will be stored. | Required. |

The following are generic configuration parameters that can be applied to the task and are not specific to the LLM Index Text task.

<details>
<summary>Caching parameters</summary>

You can cache the task outputs using the following parameters. Refer to [Caching Task Outputs](/content/faqs/task-cache-output) for a full guide.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| cacheConfig.**ttlInSecond** | The time to live in seconds, which is the duration for the output to be cached. | Required if using *cacheConfig*. |
| cacheConfig.**key** | The cache key is a unique identifier for the cached output and must be constructed exclusively from the task’s input parameters.<br/>It can be a string concatenation that contains the task’s input keys, such as `${uri}-${method}` or `re_${uri}_${method}`. | Required if using *cacheConfig*. |

</details>

<details>
<summary>Other generic parameters</summary>

Here are other parameters for configuring the task behavior.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| optional | Whether the task is optional. <br/><br/>If set to`true`, any task failure is ignored, and the workflow continues with the task status updated to `COMPLETED_WITH_ERRORS`. However, the task must reach a terminal state. If the task remains incomplete, the workflow waits until it reaches a terminal state before proceeding. | Optional. | 

</details>

## Task configuration

This is the task configuration for an LLM Index Text task.

```json
{
     "name": "llm_index_text",
     "taskReferenceName": "llm_index_text_ref",
     "inputParameters": {
       "vectorDB": "Pinecone",
       "index": "doc",
       "namespace": "docs",
       "embeddingModelProvider": "openAI",
       "embeddingModel": "text-embedding-3-large",
       "dimensions": 3072,
       "text": "${workflow.input.text}",
       "docId": "doc123"
     },
     "type": "LLM_INDEX_TEXT"
}
```

## Task output

There is no output. The LLM Index Text task will store the indexed data in the specified vector database. 

## Examples

Here are some examples for using the LLM Index Text task.

<details>
<summary>Using an LLM Index Text task in a workflow</summary>

See an example of [building a text indexing and search workflow](https://orkes.io/content/tutorials/text-indexing-search-workflow).

</details>

## Related pages

- [AI Tasks](/content/category/reference-docs/ai-tasks)
- [LLM Text Complete](/content/reference-docs/ai-tasks/llm-text-complete)
- [LLM Generate Embeddings](/content/reference-docs/ai-tasks/llm-generate-embeddings)
- [LLM Store Embeddings](/content/reference-docs/ai-tasks/llm-store-embeddings)
- [LLM Get Embeddings](/content/reference-docs/ai-tasks/llm-get-embeddings)
- [LLM Index Document](/content/reference-docs/ai-tasks/llm-index-document)
