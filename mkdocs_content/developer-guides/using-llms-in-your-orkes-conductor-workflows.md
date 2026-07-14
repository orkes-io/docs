---
title: "Using AI Models or LLMs"
description: "Learn how to integrate AI models and use LLM system tasks in workflows, including configuring models, prompt templates, and access control in Orkes Conductor."
canonical_route: "developer-guides/using-llms-in-your-orkes-conductor-workflows"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Using AI Models or LLMs"
---

# Using AI Models or LLMs

In this guide, you will learn how to leverage the power of Orkes Conductor and AI models, such as large language models (LLMs) or embedding models, in your applications. Here is an overview of using AI models in Orkes Conductor to build an AI-powered application:

1. Choose an AI model for your use case.
2. Integrate your chosen AI model with your Orkes Conductor cluster.
3. (If required) Create an AI prompt if your workflow uses text or chat completion tasks.
4. (If required) Integrate a vector database if your workflow uses embedding or search tasks.
5. Set access limits to govern which applications or groups can use the model, prompt, or vector database.
6. Add an AI task to your workflow and configure it for the chosen model and prompt template.

!!! tip "5-minute path"
    Integrate an AI model provider, create a prompt if your task needs one, grant access to the model and prompt via RBAC, then add and configure an AI task in your workflow.

## Step 1: Choose an AI model

The AI models offered by different providers have a wide range of applications, such as:
* Text generation and completion
* Text summarization
* Language translation
* Sentiment analysis
* Text classification
* Embedding generation

Not all models are suitable for all these use cases, as some models are better at specific tasks due to their architecture and training. For example, OpenAI offers models such as "text-embedding-ada-002" designed specifically for generating embeddings.

### Available model providers

The following model providers are available for integration with Orkes Conductor:

* [Ollama](https://ollama.com/)
* [Azure + OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
* [OpenAI](https://platform.openai.com/docs/overview)
* [Perplexity](https://www.perplexity.ai/)
* [Grok](https://console.x.ai/home)
* [Cohere](https://docs.cohere.com/docs/the-cohere-platform)​​
* [Mistral](https://docs.mistral.ai/)
* [Anthropic Claude](https://docs.anthropic.com/en/home)
* [Google Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/overview)
* [Google Gemini AI](https://gemini.google/about/)
* [Hugging Face](https://huggingface.co/)
* [AWS Bedrock Anthropic](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
* [AWS Bedrock Cohere](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
* [AWS Bedrock Titan](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)

Review the model provider’s official documentation to determine which models suit your use case.

## Step 2: Integrate an AI model

Before using an AI model in a workflow, you must integrate it with your Orkes Conductor cluster.

**To integrate an LLM:**

1. Go to **Integrations** from the left menu on your Conductor cluster.
2. Select **+ New integration**.
3. In the **AI/LLM** section, select **+ Add** to integrate your preferred model provider.
   <p align="center"><img src="/content/img/quickstart-add-integrations.png" alt="Quickstart - Add Integrations" width="100%" height="auto"></img></p>

4. Enter the required parameters for the chosen provider.

    :::note
    The integration configuration differs with each model provider. For detailed steps on integrating with each provider, refer to [AI/LLM Integrations](/content/category/integrations/ai-llm).
    :::

5. (Optional) Toggle the **Active** button off if you don’t want to activate the integration instantly.
6. Select **Save**.


### Add the preferred models

Once the AI/LLM integration is added, you can begin adding models from the provider. Review the supported models for each provider before adding them to your cluster.

<details>
<summary>List of models</summary>

* [Ollama models](https://ollama.com/library)
* [Azure OpenAI models](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions)
* [OpenAI models](https://platform.openai.com/docs/models)
* [Perplexity models](https://docs.perplexity.ai/getting-started/models)
* [Grok models](https://docs.x.ai/docs/models)
* [Cohere models](https://docs.cohere.com/docs/models)
* [Mistral models](https://docs.mistral.ai/getting-started/models/models_overview/)
* [Anthropic Claude models](https://platform.claude.com/docs/en/about-claude/models/overview)
* [Google Vertex AI models](https://cloud.google.com/model-garden)
* [Google Gemini AI models](https://ai.google.dev/gemini-api/docs/models/gemini#model-variations)
* [Hugging Face models](https://huggingface.co/models)
* [AWS Bedrock Anthropic models](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
* [AWS Bedrock Cohere models](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
* [AWS Bedrock Titan models](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html)

</details>

**To add a model:**
1. In **Integrations**, select the **+** icon next to your newly-created integration.
2. Select **+ New model**.
3. Enter the model name and an optional description for the model. 
4. (Optional) Toggle the **Active** button off if you don’t want to activate the model instantly.
5. Select **Save**.


## Step 3: Create an AI prompt 

If you are using an [LLM Text Complete](/content/reference-docs/ai-tasks/llm-text-complete) task, an AI prompt is required. For [LLM Chat Complete](/content/reference-docs/ai-tasks/llm-chat-complete), a prompt is optional. You can create a prompt in the AI Prompt Studio to be used with AI tasks in a workflow. Refer to [Using AI Prompts](/content/developer-guides/creating-and-managing-gen-ai-prompt-templates) for more information.

## Step 4: Integrate a vector database

You must also integrate a vector database if you are using one of the following AI tasks:

* [LLM Get Embeddings](/content/reference-docs/ai-tasks/llm-get-embeddings)
* [LLM Store Embeddings](/content/reference-docs/ai-tasks/llm-store-embeddings)
* [LLM Search Index](/content/reference-docs/ai-tasks/llm-search-index)
* [LLM Index Document](/content/reference-docs/ai-tasks/llm-index-document)
* [LLM Index Text](/content/reference-docs/ai-tasks/llm-index-text)

Refer to [Using Vector Databases](/content/developer-guides/using-vector-databases-in-your-orkes-conductor-workflows) for more information.


## Step 5: Set access limits

As best practice, use Orkes’ [RBAC feature](/content/category/access-control-and-security) to govern which applications or user groups can access the AI models, prompts, and vector databases.

**To provide access to an application or group:**
1. Go to **Access Control** > **Applications** or **Groups** from the left menu on your Conductor cluster.
2. Create a new group/application or select an existing one.
3. In the **Permissions** section, select **+ Add permission**.
4. In the **Integration** tab, select the required AI models and/or vector databases and toggle the necessary permissions.

    <p align="center"><img src="/content/img/add-integration-permission.png" alt="Add Permissions for Integrations" width="70%" height="auto"></img></p>

5. In the **Prompt** tab, select the required prompt and toggle the necessary permissions.
6. Select **Add Permissions**.

The group or application can now access the AI resources according to the configured permissions.

## Step 6: Add an AI task to your workflow

With the AI/LLM integration and AI prompt ready, you can add an AI task to your workflow and configure the task for the chosen model and prompt.

**To add an AI task:**
1. Go to **Definitions** > **Workflow** from the left menu on your Conductor cluster.
2. Create a new workflow or select an existing workflow.
3. Add an AI task and select the desired model provider and model.
4. Configure the remaining task parameters. If you are using an LLM Text Complete or LLM Chat Complete task, you can select the prompt template from the dropdown based on the chosen model.
    
    :::note
    Refer to the [AI Task Reference](/content/category/reference-docs/ai-tasks) for more details on configuring the task parameters.
    :::

5. Save the workflow.

Once the workflow is saved, you can test the newly added AI task or run the workflow.

<p align="center"><img src="/content/img/using-llm-test-task.png" alt="Test AI task." width="70%" height="auto"></img></p>

## Production notes

- Pin model names and versions where the provider supports it, since provider model catalogs and default versions can change over time.
- Grant access to models, prompts, and vector databases only to the applications or groups that need them, and review permissions periodically.
- Monitor token usage and cost per integration, especially for text/chat completion and embedding tasks called at high volume.
- Configure timeouts and retries on AI tasks, since model provider calls can be slow or rate-limited.
- Version and test prompt template changes before rolling them out, since editing a shared prompt changes behavior for every workflow that references it.

## More resources
* [Using AI Prompts](/content/developer-guides/creating-and-managing-gen-ai-prompt-templates)
* [Using Vector Databases](/content/developer-guides/using-vector-databases-in-your-orkes-conductor-workflows)
* [AI/LLM Integration Guides](/content/category/integrations/ai-llm)
* [AI Task Reference](/content/category/reference-docs/ai-tasks)

## Related pages

- [Human Task Orchestration](/content/developer-guides/orchestrating-human-tasks)
- [Using Vector Databases](/content/developer-guides/using-vector-databases-in-your-orkes-conductor-workflows)
- [Using AI Prompts](/content/developer-guides/creating-and-managing-gen-ai-prompt-templates)
