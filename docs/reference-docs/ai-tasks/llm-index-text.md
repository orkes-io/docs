---
sidebar_position: 8
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Index Text

A system task designed to index the provided text into a vector space for efficient search, retrieval, and processing at a later stage.

## Definitions

```json
{
"name": "llm_index_text_task",
"taskReferenceName": "llm_index_text_task_ref",
"inputParameters": {
"vectorDB": "pineconedb",
"namespace": "myNewModel",
"index": "test",
"embeddingModelProvider": "azure_openai",
"embeddingModel": "text-davinci-003",
"text": "${workflow.input.text}",
"docId": "XXXX"
},
"type": "LLM_INDEX_TEXT"
}
```

## Input Parameters

| Parameter | Description |
| --------- | ----------- |
| vectorDB | Choose the required vector database.<br/><br/>**Note**:If you haven’t configured the vector database on your Orkes console, navigate to the __Integrations__ tab and configure your required provider. Refer to the documentation on [how to integrate Vector Databases with Orkes console.](/content/category/integrations/vector-databases). |
| namespace | Choose from the available namespace configured within the chosen vector database.<br/><br/>Namespaces are separate isolated environments within the database to manage and organize vector data effectively.<br/><br/>**Note**: The **_namespace_** field has different names and applicability based on the integration:<ul><li>For Pinecone integration, the namespace field is applicable.</li><li>For Weaviate integration, the namespace field is not applicable.</li><li>For MongoDB integration, the namespace field is referred to as “Collection” in MongoDB.</li><li>For Postgres integration, the namespace field is referred to as “Table” in Postgres.</li></ul>|
| index | Choose the index in your vector database where indexed text or data was stored.<br/><br/> **Note:** For Weaviate integration, this field refers to the class name, while for other integrations, it denotes the index name.|
| embeddingModelProvider | Choose the required LLM provider for embedding.<br/><br/>If you haven’t configured your AI / LLM provider on your Orkes console, navigate to the **Integrations** tab and configure your required provider. Refer to the documentation on [how to integrate the LLM providers with Orkes console](/content/category/integrations/ai-llm).|
| embeddingModel | Choose from the available language models provided by the selected LLM provider. |
| text | Provide the text to be indexed. |
| docId | Assign a unique ID to identify the document where the indexed text will be stored. |

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Index Text**.
2. Choose the vector database, & LLM provider for embedding the text.
3. Provide the input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-index-text-ui-method.png" alt="LLM Index Text Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
{
"name": "llm_index_text_task",
"taskReferenceName": "llm_index_text_task_ref",
"inputParameters": {
"vectorDB": "pineconedb",
"namespace": "myNewModel",
"index": "test",
"embeddingModelProvider": "azure_openai",
"embeddingModel": "text-davinci-003",
"text": "${workflow.input.text}",
"docId": "XXXX"
},
"type": "LLM_INDEX_TEXT"
}
```
</TabItem>
</Tabs>