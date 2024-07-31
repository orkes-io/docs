---
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Get Embeddings

The LLM Get Embeddings task retrieves numerical vector representations of words, phrases, sentences, or documents that have been previously generated or learned by the model. Unlike the [LLM Generate Embeddings](https://orkes.io/content/reference-docs/ai-tasks/llm-generate-embeddings) task, which creates vector representations from input data, this task focuses on efficiently accessing pre-existing embeddings. This is useful for utilizing embeddings that have already been computed and stored without regenerating them.

The LLM Get Embeddings task accesses pre-computed embeddings stored in a vector database. It retrieves vectors based on specified parameters, such as vector database, namespace, index, and embedding source. This task enables efficient querying of stored embeddings to fetch relevant data quickly.

## Task configuration

Configure these parameters for the LLM Get Embeddings task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**vectorDB** | The vector database from which data is to be retrieved.<br/><br/>**Note**: If you haven’t configured the vector database on your Orkes Conductor cluster, navigate to the **Integrations** tab and configure your required provider. Refer to the documentation on [how to integrate Vector Databases with Orkes console](https://orkes.io/content/category/integrations/vector-databases). | Required. |
| inputParameters.**namespace** | Namespaces are separate isolated environments within the database to manage and organize vector data effectively. Choose from the available namespace configured within the chosen vector database.<br/><br/>The usage and terminology of the namespace field vary depending on the integration:<ul><li>For Pinecone, the namespace field is applicable.</li><li>For Weaviate, the namespace field is not applicable.</li><li>For MongoDB, the namespace field is referred to as “Collection” in MongoDB.</li><li>For Postgres, the namespace field is referred to as “Table” in Postgres.</li></ul> | Required. |
| inputParameters.**index** | The index in your vector database where the indexed text or data was stored.<br/><br/>The terminology of the index field varies depending on the integration:<ul><li>For Weaviate, the index field indicates the class name.</li><li>For other integrations, it denotes the index name.</li></ul> | Required. |
| inputParameters.**embeddings** | The embeddings from which the stored data will be retrieved. This should be from the same embedding model used to create the embeddings stored in the specified index. | Required. |

## Task definition

This is the JSON schema for an LLM Store Embeddings task definition.

```json
{
  "name": "llm_get_embeddings_task",
  "taskReferenceName": "llm_get_embeddings_task_ref",
  "inputParameters": {
    "vectorDB": "pineconedb",
    "namespace": "myNewModel",
    "index": "test",
    "embeddings": "${llm_generate_embeddings_task_ref.output}" // Can be passed as variable from preceding task
  },
  "type": "LLM_GET_EMBEDDINGS"
}
```

## Task output

The LLM Get Embeddings task will return the following parameters.

| Parameter | Description | 
| --------- | ----------- | 
| result | A JSON array containing the results of the query. |
| score | Represents a value quantifying the degree of likeness between a specific item and a query vector, facilitating ranking and ordering of results. Higher scores denote stronger relevance to the query vector. |
| metadata | An object containing additional metadata related to the retrieved document. |
| docId | The unique identifier of the queried document. |
| parentDocId | An identifier that denotes a parent document in hierarchical or relational data structures. | 
| text | The actual content retrieved. | 

## Adding an LLM Get Embeddings task in UI

**To add an LLM Get Embeddings task:**

1. In your workflow, select the (**+**) icon and add an **LLM Get Embeddings** task.
2. Choose the **Vector database**, **Namespace**, and **Index** to store the embeddings.
3. Choose the **Embedding** from which the stored data is to be retrieved.

<center><p><img src="/content/img/llm-get-embeddings-ui-method.png " alt="LLM Get Embeddings Task - UI" width="80%" height="auto"/></p></center>