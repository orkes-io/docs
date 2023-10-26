---
sidebar_position: 1
---

# AI Prompt Templates

Orkes Conductor enables you to create, refine, and securely share the prompts your organization is developing as part of the business logic for which you are employing LLMs for. This essential component of an AI application is managed with precise access controls, allowing you to determine which models they can be associated with and which teams can incorporate them into their workflows.

The AI prompts can be created in the Orkes Conductor cluster and can be used in LLM tasks within your workflows.

## Parameters

| Attribute | Description |
| --------- | ----------- |
| Prompt Name | A name for the prompt. |
| Description | A description for the prompt. |
| Prompt Template | Input the prompt template. A prompt can be input text/context, instructions, questions, and more. The prompt is to be generated and fine-tuned depending on the context.<br/><br/>One key feature of prompt templates is the variables you can put inside a prompt. Those are considered variables and have the effect of using the prompt similar to an API interface. While defining a workflow, when configuring the system task where this prompt template will be used, these placeholders will be associated with specific variables available in a workflow. At runtime, the placeholders will be replaced with the actual values before the prompt is sent to the LLM.<br/><br/>E.g., if your prompt is **What is the current population of ${country}? What was the population in ${year}?** Here, we have given two placeholders, **_country_** and **_year_**, which can be associated with any variable in the workflow where this prompt is used.|
| Select model to test | From the chosen LLM models, you can choose any model for testing the prompt. |
| Temperature | Set the required temperature for testing the prompt. |
| Stop Words | Provide the stop words to be filtered out. |
| TopP | Set the required TopP value for testing the prompt. |

:::note
For a detailed explanation of each parameter and how to provide access control for prompts to user groups, refer to the developer guide on [creating and managing AI prompt templates](/content/developer-guides/creating-and-managing-gen-ai-prompt-templates )
:::