---
sidebar_position: 1
---

# AI Prompt Templates

Orkes Conductor enables you to create, refine, and securely share the prompts and utilize while building LLM based applications. This essential component of an AI application is managed with precise access controls, allowing you to determine which models they can be associated with and which teams can incorporate them into their workflows.

The AI prompts can be created in the Orkes Conductor cluster and used in LLM tasks within your workflows.

## Configuration Parameters

| Parameter | Description |
| --------- | ----------- |
| Prompt Name | A name for the prompt. |
| Model | Choose the LLM models you want this prompt to be used from the already integrated list. If a model is not added here, it cannot be used as the model for generating responses based on this template. |
| Description | A description for the prompt. |
| Prompt Template | Input the prompt template. A prompt can be input text/context, instructions, questions, and more. The prompt is to be generated and fine-tuned depending on the context.<br/><br/>A key feature of prompt templates is the use of variables, which operate similarly to an API interface. These variables enable the prompt to be customized and adapted for various inputs. When defining a workflow that includes the AI task using this prompt template, the placeholders will be linked to specific variables within the workflow. At runtime, these placeholders will be replaced with actual values before the prompt is sent to the LLM.<br/><br/>If your prompt is "__*What is the current population of ${country}? What was the population in ${year}*__?", the placeholder's **_country_** and **_year_** can be associated with any variable in the workflow where this prompt is used. |
| Select model to test | From the chosen LLM models, you can choose any model for testing the prompt. |
| Temperature | Set the required temperature for testing the prompt. |
| Stop Words | Provide the stop words to be filtered out. |
| TopP | Set the required TopP value for testing the prompt. |
| Variable substitute for __${variable-name}__ | The value to be substituted for the variable used in the prompt. |

Use the **Test** button to test the prompt in real-time before integrating with the workflow.

This is the JSON schema for creating an AI prompt.

```json
{
 "createdBy": "john.doe@acme.com",
 "updatedBy": "john.doe@acme.com",
 "name": "classification",
 "template": "We have a document that was scanned using OCR. You need to classify the document based on the provided OCR content. The document could be one of these: W2, Drivers License, Paystub, Employment Verification Letter, Mortgage Application. If the provided content does not match with any of those documents, you must reply NO_MATCH. Here is the content of a document that was scanned using OCR: \\n\\n ${text} \\n\\n Your response:",
 "description": "Classify a document according to its content",
 "variables": [
   "text"
 ],
 "integrations": [
   "open-ai:gpt-3.5-turbo"
 ]
}
```

:::note
For a detailed explanation of each parameter and how to provide access control for prompts to user groups/applications, refer to the developer guide on [creating and managing AI prompt templates](/content/developer-guides/creating-and-managing-gen-ai-prompt-templates )
:::