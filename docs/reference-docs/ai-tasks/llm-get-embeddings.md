---
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Get Embeddings

A system task to retrieve numerical vector representations of words, phrases, sentences, or documents that have been previously generated or learned by the model. Unlike the process of generating embeddings ([LLM Generate Embeddings task](https://orkes.io/content/reference-docs/ai-tasks/llm-generate-embeddings)), which involves creating vector representations from input data, this task focuses on efficiently accessing pre-existing embeddings. This is particularly useful when you have already computed and stored embeddings and want to utilize them without regeneration.


## Definitions

```json
{
"name": "llm_get_embeddings_task",
"taskReferenceName": "llm_get_embeddings_task_ref",
"inputParameters": {
"vectorDB": "pineconedb",
"namespace": "myNewModel",
"index": "test",
"embeddings": "${llm_generate_embeddings_task_ref.output}"
},
"type": "LLM_GET_EMBEDDINGS"
}
```

## Input Parameters

| Parameter | Description |
| --------- | ----------- | 
| vectorDB | Choose the vector database from which data is to be retrieved.<br/><br/>**Note**:If you haven’t configured the vector database on your Orkes console, navigate to the Integrations tab and configure your required provider. Refer to the documentation on [how to integrate Vector Databases with Orkes console](/content/category/integrations/vector-databases). |
| namespace | Choose from the available namespace configured within the chosen vector database.<br/><br/>Namespaces are separate isolated environments within the database to manage and organize vector data effectively.<br/><br/>**Note**: The **_namespace_** field has different names and applicability based on the integration:<ul><li>For Pinecone integration, the namespace field is applicable.</li><li>For Weaviate integration, the namespace field is not applicable.</li><li>For MongoDB integration, the namespace field is referred to as “Collection” in MongoDB.</li><li>For Postgres integration, the namespace field is referred to as “Table” in Postgres.</li></ul>|
| index | Choose the index in your vector database where indexed text or data was stored.<br/><br/> **Note:**For Weaviate integration, this field refers to the class name, while for other integrations, it denotes the index name.|
| embeddings | Select the embeddings from which the stored data is to be retrieved. This should be from the same embedding model used to create the embeddings stored in the specified index. |

## Output Parameters

| Parameter | Description | 
| --------- | ----------- | 
| result | A JSON array containing the results of the query.|
| score | Represents a value that quantifies the degree of likeness between a specific item and a query vector, facilitating the ranking and ordering of results. Higher scores denote a stronger resemblance or relevance to the query vector. |
| metadata | An object containing additional metadata related to the retrieved document.|
| docId | Displays the unique identifier of the document queried.|
| parentDocId | Another identifier that might denote a parent document in hierarchical or relational data structures. |
| text | Actual content of the document retrieved. | 

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Get Embeddings**.
2. Choose the vector database & namespace.
3. Provide the input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-get-embeddings-ui-method.png" alt="LLM Get Embeddings Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
{
"name": "llm_generate_embeddings_task",
"taskReferenceName": "llm_generate_embeddings_task_ref",
"inputParameters": {
"llmProvider": "azure_openai",
"model": "text-davinci-003",
"text": "${workflow.input.text}"
},
"type": "LLM_GENERATE_EMBEDDINGS"
},
{
"name": "llm_get_embeddings_task",
"taskReferenceName": "llm_get_embeddings_task_ref",
"inputParameters": {
"vectorDB": "pineconedb",
"namespace": "myNewModel",
"index": "test",
"embeddings": "${llm_generate_embeddings_task_ref.output}"
},
"type": "LLM_GET_EMBEDDINGS"
}
],
"inputParameters": [
"text"
]
```
</TabItem>
</Tabs>