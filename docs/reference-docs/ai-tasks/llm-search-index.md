---
sidebar_position: 9
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Search Index

The LLM Search Index task is used to search a vector database or repository of vector embeddings of already processed and indexed documents to get the closest match. This task is typically used in scenarios where you need to retrieve or manipulate data stored in a database using a natural language query.

The LLM Search Index task takes a query, which can be a question, statement, or request made in natural language. This query is processed to generate a vector representation, which is then used to search the vector database. The task returns a list of documents with vectors similar to the query vector, providing the closest matches based on the degree of similarity.

## Task parameters 

Configure these parameters for the LLM Search Index task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**vectorDB** | The vector database to retrieve the data.<br/><br/>**Note**: If you haven’t configured the vector database on your Orkes Conductor cluster, navigate to the **Integrations** tab and configure your required provider. Refer to the documentation on [how to integrate Vector Databases with Orkes console](https://orkes.io/content/category/integrations/vector-databases). | Required. | 
| inputParameters.**namespace** | Namespaces are separate isolated environments within the database to manage and organize vector data effectively. Choose from the available namespace configured within the chosen vector database.<br/><br/>The usage and terminology of the namespace field vary depending on the integration:<ul><li>For Pinecone, the namespace field is applicable.</li><li>For Weaviate, the namespace field is not applicable.</li><li>For MongoDB, the namespace field is referred to as “Collection” in MongoDB.</li><li>For Postgres, the namespace field is referred to as “Table” in Postgres.</li></ul> | Required. | 
| inputParameters.**index** | The index in your vector database where the text or data will be stored.<br/><br/>The terminology of the index field varies depending on the integration:<ul><li>For Weaviate, the index field indicates the class name.</li><li>For other integrations, it denotes the index name.</li></ul> | Required. |
| inputParameters.**embeddingModelProvider** | The LLM provider for the embeddings.<br/><br/>**Note**: If you haven’t configured your AI/LLM provider on your Orkes console, navigate to the **Integrations** tab and configure your required provider. Refer to the documentation on [how to integrate the LLM providers with Orkes Conductor](https://orkes.io/content/category/integrations/ai-llm). | Required. |
| inputParameters.**embeddingModel** | The embedding model provided by the selected LLM provider. | Required. |
| inputParameters.**query** | The search query. A query typically refers to a question, statement, or request made in natural language that is used to search, retrieve, or manipulate data stored in a database. | Required. |

## Task configuration

This is the task configuration for an LLM Search Index task.

```json
{
  "name": "llm_search_index_task",
  "taskReferenceName": "llm_search_index_task_ref",
  "inputParameters": {
    "vectorDB": "pineconedb",
    "namespace": "myNewModel",
    "index": "test",
    "llmProvider": "azure_openai",
    "embeddingModel": "text-davinci-003",
    "query": "What is an LLM model?"
  },
  "type": "LLM_SEARCH_INDEX"
}
```

## Task output

The LLM Search Index task will return the following parameters.

| Parameter | Description |
| --------- | ----------- | 
| result | A JSON array containing the results of the query. | 
| score | Represents a value quantifying the degree of likeness between a specific item and a query vector, facilitating ranking and ordering of results. Higher scores denote stronger relevance to the query vector. |
| metadata | An object containing additional metadata related to the retrieved document. |
| docId | The unique identifier of the queried document. |
| parentDocId | An identifier that denotes a parent document in hierarchical or relational data structures. | 
| text | The actual content retrieved. |

## Adding an LLM Search Index task in UI

**To add an LLM Search Index task:**

1. In your workflow, select the (**+**) icon and add an **LLM Search Index** task.
2. Choose the **Vector database**, **Index**, **Namespace**, **Embedding model provider**, and **Embedding model**.
3. In **Query**, enter the text to be queried.

<center><p><img src="/content/img/llm-search-index-ui-method.png" alt="LLM Search Index Task - UI" width="80%" height="auto"/></p></center>