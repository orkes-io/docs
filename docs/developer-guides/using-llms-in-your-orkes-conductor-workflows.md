# Using LLMs in your Orkes Conductor Workflows

In this guide, we’ll provide an overview of Generative AI, Large Language Models (LLMs), and how Orkes makes it easy to leverage the power of LLMs natively in their applications. Whether you’re a developer, product manager, or anyone interested in Gen-AI powering your business logic, this guide will help you understand the concepts and get started with AI-powered tasks in Orkes Conductor.

## Generative AI or Gen AI

Gen AI is a type of Artificial Intelligence (AI) capable of creating new human-like content from pre-trained models that have had exposure to vast swaths of similar content. It is extremely helpful as it increases productivity and unlocks new scenarios that were impossible before without compromising and amplifying human capabilities. However, it also requires humans to direct models on what needs to be generated - the more specific you are, the better the output you will get from the models. The way you instruct a Gen AI model is by sending prompts. Prompts are nothing but text instructions provided to the language models. The response from a Gen-AI model will also be text-based (at least for now), and such models are called Large Language Models (LLMs).

LLMs, at its core, are deep learning algorithms trained on massive amounts of text data. They can perform various NLP (Natural Language Processing) tasks such as text generation, translation, chatbots, AI assistants, etc. LLMs must be pre-trained and fine-tuned to increase their problem-solving capabilities. Some popular LLMs are Open AI, Azure Open AI & Vertex AI.

## How does Orkes add value for engineers in using LLM models?

LLMs are powerful building blocks when developing a new application or when updating existing ones. The difficulty that teams encounter lies in embedding these building blocks within the core logic and execution of the application.

With Orkes Conductor, you can seamlessly integrate LLMs into your applications, making them accessible to developers and engineers across the organization in a secure and governed manner. Adding a step to call a model and processing its output is as easy as dragging and dropping the various system tasks that Orkes Conductor provides into your new or existing workflows. You can then run them many or many million times and leverage the high levels of access controls and observability that come with using Orkes Conductor. 

Furthermore, with Orkes Conductor, you can build, tune, and securely share the prompts that your organization is developing as part of a business logic you are leveraging LLMs for. This fundamental building block of an AI application is maintained with granular access controls so that you can choose which models they can be associated with and which teams can use them in their workflows.

Below are the high-level steps in using an LLM model with your applications:

- Integrate Orkes Conductor with AI/LLM models from a model provider (e.g., Open AI) and specify which teams in your organization have access to specific models.
- Create AI Prompts using the native AI Prompt builder, where you can test it against models, see the results, and then make it available for the right set of teams to use. A key aspect of prompts in Orkes Conductor is that, when you create these prompts, you can put placeholders for variables that can then be defined in a workflow to replace the placeholder during runtime.
- Create new workflows or new versions of existing workflows with built-in system tasks that Orkes provides to add a step to call the models with the prompts you select and make the resulting output accessible for use in subsequent workflow stages.

## Integrating with AI/LLM models

The first step is integrating the required LLM model providers with your Orkes Conductor cluster. The below list of model providers is currently supported:

- Azure + Open AI
- OpenAI
- Vertex AI

For example, if you are using Open AI as the model provider, it has four models: Ada, Babbage, Curic, and Davinci. These models vary in capabilities, such as memory, trained data, and more. You can configure the required model to be used within your organization based on your requirements. 

### Steps to Integrate AI / LLM Models with Orkes Conductor

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI / LLM** section, choose from the required provider. 

<p align="center"><img src="/content/img/add-integrations.png" alt="Add New Integrations" width="100%" height="auto"></img></p>

4. Click +**Add** and provide the required parameters for the chosen provider.
5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

:::note
Note: The integration parameters to be configured differ with these models. Refer to the [AI / LLM Integrations](/content/category/integrations/ai-llm) document for detailed information on each model. 
:::

### Different Use Cases of Various Integration Models

The various language models offered by different providers have a wide range of applications beyond text completion. These models are designed to cater to diverse use cases, such as:

- Text generation and completion 
- Text summarization
- Language Translation
- Sentiment Analysis
- Text Classification
- Generating Embeddings

Not all language models are suitable for all these use cases. Some models are better at specific tasks due to their architecture and training data. For example, OpenAI offers models like "text-embedding-ada-002" designed specifically for generating embeddings. 

To find out which models suit your specific use case, it's essential to review the LLM model's official documentation.

### RBAC - Governance on who can use Integrations

Now, the integration with the required models is ready. Next, we should determine the access control to these models. 

Orkes Conductor has built-in access controls that specify which users or applications in an organization can use various resources available in the cluster. One of the supported resource types is an integrated language model like the one above. Having this level of granularity in access control for models ensures that its usage is done in a well-governed manner in an organization.

The permission can be granted to applications/groups within the Orkes Conductor console. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor console.
2. Create a new group or choose an existing group.
3. Under the **Workflows and tasks permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/add-integration-permission.png" alt="Add Permissions for Integrations" width="70%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

### Creating AI Prompts

The next step in the process is to create AI prompts. But before that, let’s get acquainted with prompt engineering.

#### What is Prompt Engineering?

Prompt Engineering is an emerging engineering practice for developing and optimizing instructions given to LLMs. The instructions provided to the LLM models are generally called prompts, and the person who creates/optimizes the prompt is known as the prompt engineer. Since prompts are fundamental to how AI is leveraged for business flows inside an organization, it can also be considered an important intellectual property of that organization. 

With Orkes, the prompt engineers can design the prompts, which can be used by the developers while building their applications. It ensures the prompt is accessible to developers, making it easy for them to integrate.

#### Creating Prompts using AI Integration

After integrating models with your Orkes Conductor cluster, the next step is to create the prompts that will interact with them. These are then associated with the new LLM system tasks in Orkes Conductor, which are then incorporated into a workflow (more on that in the next section). This is done separately from the workflow definition so you can manage these prompt templates independently and reuse them across different workflows.

To create prompt templates,

1. From your Orkes Conductor console, navigate to **Definitions > AI Prompts**.
2. Click **+Add AI Prompt**.
3. Create and save the prompt by providing the following details:

<p align="center"><img src="/content/img/create-ai-prompts.png" alt="Creating AI Prompts" width="100%" height="auto"></img></p>

| Parameter | Decsription | 
| --------- | ----------- | 
| Prompt Name | A name for the prompt.|
| Model | Choose the LLM models you want this prompt to be used from the already integrated list. If a model is not added here, it cannot be used as the model for generating responses based on this template. |
| Description | A description for the prompt. |
| Prompt Template | A prompt can be input text/context, instructions, questions, and more. The prompt is to be generated and fine-tuned depending on the context. <br/><br/>One key feature of prompt templates is the variables you can put inside a prompt. Those are considered variables and have the effect of using the prompt similar to an API interface. During the definition time of a workflow, when configuring the system task where this prompt template will be used, these placeholders will be associated with specific variables available in a workflow. At runtime, the placeholders will be replaced with the actual values before the prompt is sent to the LLM.<br/><br/> E.g., if your prompt is **What is the current population of ${country}? What was the population in ${year}?** Here, we have given two placeholders, **_country_** and **_year_**, which can be associated with any variable in the workflow where this prompt is used. |

#### Testing Prompt Templates 

Now, let’s test the prompt right away by filling in the following parameters:

| Parameter | Decsription | 
| --------- | ----------- | 
| Select model to test | From the chosen LLM models, you can choose any model for testing the prompt.<br/><br/> This makes your AI prompt diverse to be used among any language models, provided they have been integrated with your cluster. |
| Temperature | Set the required temperature based on your requirements. Temperature is a parameter to indicate the randomness of the model’s output.<br/><br/>Higher temperatures, such as 1.0, make the output more random and creative. It can be used for generating creative content like creating social media posts, drafting emails, etc.<br/><br/>Whereas a lower value makes the output more stable and focused. It can be used in cases like text classification, where you provide a text and classify it into appropriate categories. |
| Stop words | In LLM, stop words may be filtered out or given less importance during the text generation process to ensure that the generated text is coherent and contextually relevant. The stop words are the words that are used in the sentences like “and”, “a”, and “the”, etc., but do not potentially provide any specific meaning but are required in completing the sentences. Provide the stop words to be filtered out. |
| TopP | Another parameter to control the randomness of the model’s output. This parameter defines a probability threshold and then chooses tokens whose cumulative probability exceeds this threshold.<br/><br/>For example:<br/><br/>Imagine you want to complete the sentence: “She walked into the room and saw a ______.” Now, the top 4 words the LLM model would consider based on the highest probabilities would be:<ul><li>Cat - 35%</li><li>Dog - 25%</li><li>Book - 15%</li><li>Chair - 10%</li></ul>If you set the top-p parameter to 0.70, the AI will consider tokens until their cumulative probability reaches or exceeds 70%. Here's how it works:<ul><li>Adding "Cat" (35%) to the cumulative probability.</li><li>Adding "Dog" (25%) to the cumulative probability, totaling 60%.</li><li>Adding "Book" (15%) to the cumulative probability, now at 75%.</li></ul><br/><br/>At this point, the cumulative probability is 75%, exceeding the set top-p value of 70%. Therefore, the AI will randomly select one of the tokens from the list of "Cat," "Dog," and "Book" to complete the sentence because these tokens collectively account for approximately 75% of the likelihood.|

Now, you can test it right there by clicking the **Test** button. 

<p align="center"><img src="/content/img/prompt-test.png" alt="Testing AI Prompts" width="100%" height="auto"></img></p>

Based on the test results displayed, the prompt can be fine-tuned until the results are aligned with the prompt. Once the prompt test results are accurate with the context provided, you can save the prompt. 

Now, the AI prompts are ready to be used in workflows. Next, you must provide access to the prompt to the required groups/applications.

#### RBAC - Governance on who can use Prompts

Your Orkes Conductor console will have different applications/groups to which specific permissions can be granted to various resources. One of the resources is the prompt template, which allows you to specify which teams or applications can use this prompt in their workflows. It is also important to keep in mind that a user or an application needs to have the required access to both the prompt and one of the associated models with the prompt to use it inside a workflow.

To provide permissions to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor console.
2. Create a new group or choose an existing one with the members needing access to prompts.
3. Under **Workflows and tasks permissions** section, click +Add Permission.
4. Under the **Prompt** tab, choose the required prompts with the required permissions. 

<p align="center"><img src="/content/img/rbac-for-prompts.png" alt="RBAC for prompts" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members will have access to these prompts to be used in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

## Using AI Prompts in LLM Tasks in Orkes Conductor

The AI Prompts and models integrated earlier are now ready to be used in your workflows in Orkes Conductor. To do that, you need to add a system task [LLM Text Complete](/content/reference-docs/ai-tasks/llm-search-index) while creating workflows in Orkes Conductor. 

### Creating Workflow with LLM Text Complete Task

If you are creating the workflow via the UI method,

1. Navigate to **Definitions > Workflow** from the left menu on your Orkes Conductor console. 
2. Click **Define Workflow** from the top-right corner. 
3. Click **Start** on the diagram and add the **LLM Text Complete** task.
4. Choose the required LLM provider and model.
5. Choose the created AI prompt under the **Prompt Template** field as shown below:

<p align="center"><img src="/content/img/workflow-with-llm-text-complete-task.png" alt="Workflow with LLM Text Complete task" width="100%" height="auto"></img></p>

In the JSON code, the prompt template name is displayed as below, where the name of the prompt is “translation”.

```json
"promptName": "translation",
```

If your prompt contains any variables, you can provide them as **_promptVariables_** and can be passed to the workflows. Check out this doc on [different ways to pass input parameters](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). 

```json
"inputParameters": {
"llmProvider": "azure_openai",
"model": "text-davinci-003",
"promptName": "translation",
"promptVariables": {
"input": "${workflow.input.input}",
"language": "${workflow.input.language}"
}
},
```

6. Set the required temperature, topP, stop words, and token limit.
7. Save the workflow.

### Running Workflow

1. From the left menu, click **Run Workflow**.
2. Choose your workflow name and the version.
3. Provide the required input parameters.
4. Click **Run Workflow**.

Here, the developers only need to add the prompts to their workflows and build the application, provided the prompt engineers have already created the prompts. 

### Example

<details><summary>Sample Workflow</summary>
<p>

Let’s now see an example where you need to translate a text into different languages. 

Let’s assume that **Azure Open AI** with **text-davinci-003** model is to be integrated with your Orkes Conductor console.

#### Step 1 - Integrate Azure OpenAI Provider

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI / LLM** section, choose **Azure + OpenAI**. 
4. Click **+Add** and provide a name, description, endpoint, and the Azure OpenAI API key.

<p align="center"><img src="/content/img/add-azure-open-ai-integration.png" alt="Adding Azure OpenAI Integration" width="60%" height="auto"></img></p>

5. Click **Save**.

:::note
Check out the [Azure Open AI integration](/content/integrations/ai-llm/azure-open-ai) doc for more information.
:::

#### Step 2 - Adding Azure OpenAI models to the Integration

Now, let's add the **text-davinci-003** model to the integration.

1. Navigate to the integrations page and click the '+' button next to the integration you created.

<p align="center"><img src="/content/img/add-azure-open-ai-integration-model.png" alt="Adding Azure OpenAI Integration Models" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name as **text-davinci-003** and an optional description for the model. 

<p align="center"><img src="/content/img/add-azure-open-ai-integration-model-azure-open-ai.png" alt="Adding Azure OpenAI Integration Model Azure Open AI" width="50%" height="auto"></img></p>

4. Click the Enable checkbox to enable the model immediately.
5. Click **Save**.

#### Step 3 - Create AI Prompts

1. From the left menu, navigate to **Definitions > AI Prompts**.
2. Click **+Add AI Prompt**.
3. Create a new prompt as shown below:

<p align="center"><img src="/content/img/translation-prompt.png" alt="Sample prompt" width="100%" height="auto"></img></p>

4. Let’s test the prompt quickly by substituting some input and the language to be translated.
5. Here is the result.

<p align="center"><img src="/content/img/translation-prompt-test.png" alt="Sample prompt test" width="100%" height="auto"></img></p>

6. The prompt works fine. Let’s save the prompt now.
7. Ensure to provide prompt access to required user groups as mentioned in the above section “RBAC - Governance on who can use Prompts”.

#### Step 4 - Create Workflow Definitions

1. Navigate to **Definitions > Workflow** from the left menu on your Orkes Conductor console. 
2. Click **Define Workflow** from the top-right corner. 
3. Click **Start** on the diagram and add the **LLM Text Complete** task.
4. Choose the **LLM provider** as __azure_openai__ and the **model** as __text-davinci-003__.
5. Choose the created AI prompt under the **Prompt Template** field as shown below:

<p align="center"><img src="/content/img/workflow-with-translation-prompt.png" alt="Workflow with translation prompt" width="100%" height="auto"></img></p>

8. Let’s also wire the variable **input & language** to workflow inputs.

You can get the complete workflow JSON here:

```json
{
"name": "translation",
"description": "translation",
"version": 1,
"tasks": [
{
"name": "llm_text_complete_task",
"taskReferenceName": "llm_text_complete_task_ref",
"inputParameters": {
"llmProvider": "azure_openai",
"model": "text-davinci-003",
"promptName": "translation",
"promptVariables": {
"input": "${workflow.input.input}",
"language": "${workflow.input.language}"
},
"temperature": 0
},
"type": "LLM_TEXT_COMPLETE"
}
],
"inputParameters": [
"input",
"language"
],
"schemaVersion": 2,
"ownerEmail": "riza.farheen@orkes.io"
}
```

7. Save the workflow definition.

#### Step 5 - Run Workflow

1. From the left menu, click **Run Workflow**.
2. Choose your workflow name and the version.
3. Provide the required input parameters.
4. Click **Run Workflow**.

<p align="center"><img src="/content/img/run-translation-workflow.png" alt="Running sample translation workflow" width="60%" height="auto"></img></p>

5. Click on the workflow ID to view the execution.

<p align="center"><img src="/content/img/execution-translation-workflow.png" alt="Execution of the translation workflow" width="60%" height="auto"></img></p>

6. You can get the output from the **Workflow Input/Output** tab.

<p align="center"><img src="/content/img/translation-workflow-output.png" alt="Input / Output view of Translation Workflow" width="60%" height="auto"></img></p>

The translation is successful. You can leverage this workflow for converting text into any language.

</p>
</details>