---
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Generate Embeddings

The LLM Generate Embeddings task is used to convert input text into a sequence of vectors, also known as embeddings. These embeddings are processed versions of the input text and can be stored in a vector database for later retrieval. This task utilizes a [previously integrated language model (LLM)](https://orkes.io/content/category/integrations/ai-llm) to generate the embeddings.

The LLM Generate Embeddings task takes the input text and processes it through the selected language model (LLM) to produce embeddings. The task evaluates the specified parameters, such as the LLM provider and model, and generates a corresponding sequence of vectors for the provided text. The output is a JSON array containing these vectors, which can be used in subsequent tasks or stored for future use.

## Task parameters 

Configure these parameters for the LLM Generate Embeddings task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**llmProvider** | The LLM provider. You can choose providers for which you have access to at least one model.<br/><br/>**Note**: If you haven’t configured your AI/LLM provider on your Orkes Conductor cluster, go to the **Integrations** tab and set it up. Refer to the documentation for [integrating LLM providers with Orkes Conductor](https://orkes.io/content/category/integrations/ai-llm). | Required. | 
| inputParameters.**model** | The available language models provided by the selected LLM provider. You can only choose models for which you have access.<br/><br/>For example, If your LLM provider is Azure Open AI and you’ve configured text-davinci-003 as the language model, you can select it here. | Required. | 
| inputParameters.**text** | The text to be converted and stored as a vector. It can also be [passed as parameters](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. | 

## Task configuration

This is the task configuration for an LLM Generate Embeddings task.

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
```

## Task output

The LLM Generate Embeddings task will return the following parameters.

| Parameter | Description |
| --------- | ----------- | 
| result | A JSON array containing the vectors of the indexed data. | 

## Adding an LLM Generate Embeddings task in UI

**To add an LLM Generate Embeddings task:**

1. In your workflow, select the (**+**) icon and add an **LLM Generate Embeddings** task.
2. Choose the **LLM provider** and **Model**.
3. In **Text**, enter the text to be converted and stored as a vector.

<center><p><img src="/content/img/llm-generate-embeddings-ui-method.png" alt="LLM Generate Embeddings Task" width="100%" height="auto"/></p></center>