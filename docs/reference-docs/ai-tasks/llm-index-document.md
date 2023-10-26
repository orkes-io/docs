---
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Index Document

A system task to index the provided document into a vector database that can be efficiently searched, retrieved, and processed later.

## Definitions

```json
{
"name": "llm_index_document_task",
"taskReferenceName": "llm_index_document_task_ref",
"inputParameters": {
"vectorDB": "pineconedb",
"namespace": "myNewModel",
"index": "test",
"embeddingModelProvider": "azure_openai",
"embeddingModel": "text-davinci-003",
"url": "${workflow.input.url}",
"mediaType": "application/xhtml+xml",
"chunkSize": 500,
"chunkOverlap": 100
},
"type": "LLM_INDEX_DOCUMENT"
}
```

## Input Parameters

| Attribute | Description |
| --------- | ----------- |
| vectorDB | Choose the required vector database.<br/><br/>**Note**:If you haven’t configured the vector database on your Orkes console, navigate to the Integrations tab and configure your required provider. Refer to this doc on [how to integrate Vector Databases with Orkes console](/content/category/integrations/vector-databases). |
| namespace | Choose from the available namespace configured within the chosen vector database.<br/><br/>Namespaces are separate isolated environments within the database to manage and organize vector data effectively.<br/><br/>**Note**:Namespace field is applicable only for Pinecone integration and is not applicable to Weaviate integration.|
| index | Choose the index in your vector database where indexed text or data was stored.<br/><br/> **Note:**For Weaviate integration, this field refers to the class name, while in Pinecone integration, it denotes the index name itself.|
| embeddingModelProvider | Choose the required LLM provider for embedding.<br/><br/>If you haven’t configured your AI / LLM provider on your Orkes console, navigate to the Integrations tab and configure your required provider. Refer to this doc on [how to integrate the LLM providers with Orkes console](/content/category/integrations/ai-llm).|
| embeddingModel | Choose from the available language model for the chosen LLM provider. |
| url | Provide the URL of the file to be indexed. |
| mediaType | Select the media type of the file to be indexed. Currently, supported media types include:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-splash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul> | 
| chunkSize | Specifies how long each segment of the input text should be when it’s divided for processing by the LLM.<br/><br/>For example, if your article contains 2000 words and you specify the chunk size of 500, then the document would be divided into four chunks for processing. |
| chunkOverlap | Specifies the overlap quantity between the adjacent chunks.<br/><br/>For example, if the chunk overlap is specified as 100, then the first 100 words of each chunk would overlap with the last 100 words of the previous chunk. | 

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Index Document**.
2. Choose the vector database, & LLM provider for embedding the document.
3. Provide the document URL to be indexed and other input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-index-document-ui-method.png" alt="LLM Index Document Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
{
"name": "llm_index_document_task",
"taskReferenceName": "llm_index_document_task_ref",
"inputParameters": {
"vectorDB": "pineconedb",
"namespace": "myNewModel",
"index": "test",
"embeddingModelProvider": "azure_openai",
"embeddingModel": "text-davinci-003",
"url": "${workflow.input.url}",
"mediaType": "application/xhtml+xml",
"chunkSize": 500,
"chunkOverlap": 100
},
"type": "LLM_INDEX_DOCUMENT"
}
```
</TabItem>
</Tabs>