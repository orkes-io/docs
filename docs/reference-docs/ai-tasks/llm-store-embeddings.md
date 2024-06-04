---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Store Embeddings

A system task responsible for storing the generated embeddings produced by the [LLM Generate Embeddings](https://orkes.io/content/reference-docs/ai-tasks/llm-generate-embeddings) task, into a vector database. The stored embeddings serve as a repository of information that can be later accessed by the [LLM Get Embeddings](https://orkes.io/content/reference-docs/ai-tasks/llm-get-embeddings) task for efficient and quick retrieval of related data.

## Definitions

```json
{
     "name": "llm_store_embeddings",
     "taskReferenceName": "llm_store_embeddings_ref",
     "inputParameters": {
       "vectorDB": "pineconedb",
       "index": "test",
       "namespace": "myNewModel",
       "embeddingModelProvider": "azure_openai",
       "embeddingModel": "text-davinci-003",
       "id": "xxxxxx"
     },
     "type": "LLM_STORE_EMBEDDINGS"
   }
```

## Input Parameters

| Attribute | Description |
| ---------- | ----------- |
| vectorDB | Choose the vector database to which the data is to be stored. <br/><br/>**Note**: If you haven’t configured the vector database on your Orkes console, navigate to the **_Integrations_** tab and configure your required provider. Refer to this doc on [how to integrate Vector Databases with Orkes console](https://orkes.io/content/category/integrations/vector-databases). |
| index | Choose the index in your vector database where the text or data is to be stored.<br/><br/>**Note**: For Weaviate integration, this field refers to the class name, while in Pinecone integration, it denotes the index name itself. | 
| namespace | Choose from the available namespace configured within the chosen vector database.<br/><br/>Namespaces are separate isolated environments within the database to manage and organize vector data effectively.<br/><br/>**Note**: Namespace field is applicable only for Pinecone integration and is not applicable to Weaviate integration. |
| embeddingModelProvider | Choose the required LLM provider for embedding.<br/><br/>**Note**:If you haven’t configured your AI / LLM provider on your Orkes console, navigate to the **_Integrations_** tab and configure your required provider. Refer to this doc on [how to integrate the LLM providers with Orkes console](https://orkes.io/content/category/integrations/ai-llm). |
| embeddingModel | Choose from the available language model for the chosen LLM provider. |
| Id | Optional field to provide the vector ID. |

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Store Embeddings**.
2. Choose the vector database for storing the embeddings.
3. Provide the input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-store-embeddings-ui.png" alt="LLM Store Embeddings Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
{
     "name": "llm_store_embeddings",
     "taskReferenceName": "llm_store_embeddings_ref",
     "inputParameters": {
       "vectorDB": "pineconedb",
       "index": "test",
       "namespace": "myNewModel",
       "embeddingModelProvider": "azure_openai",
       "embeddingModel": "text-davinci-003",
       "id": "xxxxxx"
     },
     "type": "LLM_STORE_EMBEDDINGS"
   }
```
</TabItem>
</Tabs>