---
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Generate Embeddings

A system task to generate embeddings from the input data provided. Embeddings are the processed input text converted into a sequence of vectors, which can then be stored in a vector database for retrieval later. You can use [a model that was previously integrated](http://localhost:3000/content/category/integrations/ai-llm) to generate these embeddings.

## Definitions

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
}
],
"inputParameters": [
"text"
]
```

## Input Parameters

| Attribute | Description |
| --------- | ----------- |
| llmProvider | Choose the required LLM provider. You can only choose providers to which you have access for at least one model from that provider.<br/><br/>**Note**:If you haven’t configured your AI / LLM provider on your Orkes console, navigate to the **Integrations** tab and configure your required provider. Refer to this doc on [how to integrate the LLM providers with Orkes console and provide access to required groups](/content/category/integrations/ai-llm).| 
| model | Choose from the available language model for the chosen LLM provider. You can only choose models for which you have access.<br/><br/>For example, If your LLM provider is Azure Open AI & you’ve configured *text-davinci-003* as the language model, you can choose it under this field. |
| text | Provide the text to be converted and stored as a vector. The text can also be [passed as parameters to the workflow](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).|
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling you can provide the following parameters:<ul><li>**TTL (in seconds)** - Provide the time to live in seconds.You can also pass this parameter as variables.</li><li>**Cache Key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this parameter as variables.</li></ul>|

## Output Parameters

The task output is a JSON array containing the vectors of the indexed data.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Generate Embeddings**.
2. Choose the LLM provider and language model.
3. Provide the text to be embedded.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-generate-embeddings-ui-method.png" alt="LLM Generate Embeddings Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

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
}
],
"inputParameters": [
"text"
]
```
</TabItem>
</Tabs>