---
sidebar_position: 6
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Search Index

A system task to search the vector database or repository of vector embeddings of already processed and indexed documents to get the closest match. You can input a query that typically refers to a question, statement, or request made in natural language that is used to search, retrieve, or manipulate data stored in a database.

For example, in a recommendation system, a user might issue a query to find products similar to one they've recently purchased. The query vector would represent the purchased product, and the database would return a list of products with similar vectors, which are likely to be related or recommended to the user.

## Definitions

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

## Input Parameters

| Attribute | Description |
| --------- | ----------- |
| vectorDB | Choose the required vector database.<br/><br/>**Note**:If you haven’t configured the vector database on your Orkes console, navigate to the Integrations tab and configure your required provider. Refer to this doc on [how to integrate Vector Databases with Orkes console](/content/category/integrations/vector-databases). |
| namespace | Choose from the available namespace configured within the chosen vector database.<br/><br/>Namespaces are separate isolated environments within the database to manage and organize vector data effectively.<br/><br/>**Note**:Namespace field is applicable only for Pinecone integration and is not applicable to Weaviate integration.|
| index | Choose the index in your vector database where indexed text or data was stored.<br/><br/> **Note:**For Weaviate integration, this field refers to the class name, while in Pinecone integration, it denotes the index name itself.|
| llmProvider | Choose the required LLM provider configured.<br/><br/>**Note:**If you haven’t configured your AI / LLM provider on your Orkes console, navigate to the Integrations tab and configure your required provider. Refer to this doc on [how to integrate the LLM providers with Orkes console](/content/category/integrations/ai-llm).|
| model | Choose from the available language model configured for the chosen LLM provider.<br/><br/>For example, If your LLM provider is Azure Open AI & you’ve configured _text-davinci-003_ as the language model, you can choose it under this field. | 
| query | Provide your search query. A query typically refers to a question, statement, or request made in natural language that is used to search, retrieve, or manipulate data stored in a database. | 

## Output Parameters

| Attribute | Description |
| --------- | ----------- |
| score | Represents a value that quantifies the degree of likeness between a specific item and a query vector, facilitating the ranking and ordering of results. Higher scores denote a stronger resemblance or relevance of a data point to the query vector. |
| docId | Displays the docId from where the text is queried. |

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Search Index**.
2. Choose the vector database, & LLM provider.
3. Provide the search query.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-search-index-ui-method.png" alt="LLM Search Index Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

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
</TabItem>
</Tabs>