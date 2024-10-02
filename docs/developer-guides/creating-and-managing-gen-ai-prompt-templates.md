# Using GenAI Prompt Templates

In this guide, we’ll provide a quick overview of Generative AI Prompt Templates and how Orkes makes it easy to leverage the power of Large Language Models (LLMs) natively in their applications.

Generative Artificial Intelligence, or GenAI, harnesses the capabilities of pre-trained models with extensive knowledge to generate content that closely resembles human-like content. This enhances productivity and opens up new possibilities.  In order to work with the AI / LLM tasks in Orkes Conductor, you need to provide the required instructions to the LLM models, which are generally called prompts.

This form of AI, which is currently text-based, relies on Large Language Models (LLMs) such as OpenAI, Azure Open AI, Vertex AI, etc. These are deep learning algorithms capable of performing various natural language processing tasks. LLMs have been trained on vast amounts of text data and can be fine-tuned to enhance their problem-solving abilities.

With Orkes Conductor, you can effortlessly integrate LLMs into your applications, making them accessible to developers and engineers throughout your organization in a secure and controlled manner. Adding a step to call a model and process its output is as simple as dragging and dropping various tasks provided by Orkes Conductor into your new or existing workflows.

Additionally, Orkes Conductor enables you to create, refine, and securely share the prompts that your organization is developing as part of the business logic you are employing LLMs for. This essential component of an AI application is managed with precise access controls, allowing you to determine which models they can be associated with and which teams can incorporate them into their workflows.

The AI prompts can be created in the Orkes Conductor cluster and can be used in LLM tasks within your workflows.

## Creating AI Prompts in Orkes Conductor

:::note
Before creating AI prompts, ensure you have integrated your Orkes Conductor cluster with the required AI / LLM models. 

If you haven’t configured your AI / LLM provider on your Orkes Conductor cluster, navigate to the **Integrations** tab and configure your required provider. Refer to this doc on [how to integrate the LLM providers with Orkes Conductor](/content/category/integrations/ai-llm).
:::

To create AI prompts,

1. From your Orkes Conductor cluster, navigate to **Definitions > AI Prompts**.
2. Click **+Add AI Prompt**.
3. Create the prompt by providing the following details:

<p align="center"><img src="/content/img/create-ai-prompts.png" alt="Creating AI Prompts" width="100%" height="auto"></img></p>

| Parameter | Description | 
| --------- | ----------- | 
| Prompt Name | A name for the prompt. |
| Model | Choose the LLM models you want this prompt to be used from the already integrated list. If a model is not added here, it cannot be used as the model for generating responses based on this template. |
| Description | A description for the prompt. |
| Prompt Template | A prompt can be input text/context, instructions, questions, and more. The prompt is to be generated and fine-tuned depending on the context. <br/><br/>One key feature of prompt templates is the variables you can put inside a prompt. Those are considered variables and have the effect of using the prompt similar to an API interface. During the definition time of a workflow, when configuring the system task where this prompt template will be used, these placeholders will be associated with specific variables available in a workflow. At runtime, the placeholders will be replaced with the actual values before the prompt is sent to the LLM.<br/><br/> E.g., if your prompt is **What is the current population of ${country}? What was the population in ${year}?** Here, we have given two placeholders, **_country_** and **_year_**, which can be associated with any variable in the workflow where this prompt is used. |

4. Now, let’s test the prompt right away by filling in the following parameters:

| Parameter | Description | 
| --------- | ----------- | 
| Select model to test | From the chosen LLM models, you can choose any model for testing the prompt.<br/><br/> This makes your AI prompt diverse to be used among any language models, provided they have been integrated with your cluster. |
| Temperature | Set the required temperature based on your requirements. Temperature is a parameter to indicate the randomness of the model’s output.<br/><br/>Higher temperatures, such as 1.0, make the output more random and creative. It can be used for generating creative content like creating social media posts, drafting emails, etc.<br/><br/>Whereas a lower value makes the output more stable and focused. It can be used in cases like text classification, where you provide a text and classify it into appropriate categories. |
| Stop words | In LLM, stop words may be filtered out or given less importance during the text generation process to ensure that the generated text is coherent and contextually relevant. The stop words are the words that are used in the sentences like “and”, “a”, and “the”, etc., but do not potentially provide any specific meaning but are required in completing the sentences. Provide the stop words to be filtered out. |
| TopP | Another parameter to control the randomness of the model’s output. This parameter defines a probability threshold and then chooses tokens whose cumulative probability exceeds this threshold.<br/><br/>For example:<br/><br/>Imagine you want to complete the sentence: “She walked into the room and saw a ______.” Now, the top 4 words the LLM model would consider based on the highest probabilities would be:<ul><li>Cat - 35%</li><li>Dog - 25%</li><li>Book - 15%</li><li>Chair - 10%</li></ul>If you set the topP parameter to 0.70, the AI will consider tokens until their cumulative probability reaches or exceeds 70%. Here's how it works:<ul><li>Adding "Cat" (35%) to the cumulative probability.</li><li>Adding "Dog" (25%) to the cumulative probability, totaling 60%.</li><li>Adding "Book" (15%) to the cumulative probability, now at 75%.</li></ul>At this point, the cumulative probability is 75%, exceeding the set top-p value of 70%. Therefore, the AI will randomly select one of the tokens from the list of "Cat," "Dog," and "Book" to complete the sentence because these tokens collectively account for approximately 75% of the likelihood.|

5. Now, you can test it right there by clicking the **Test** button. 

<p align="center"><img src="/content/img/prompt-test.png" alt="Testing AI Prompts" width="100%" height="auto"></img></p>

Based on the test results displayed, the prompt can be fine-tuned until the results are aligned with the prompt. Once the prompt test results are accurate with the context provided, you can save the prompt. 

Now, the AI prompts are ready to be used in workflows. Next, you must provide access to the prompt to the required groups/applications.

#### RBAC - Governance on who can use Prompts

Your Orkes Conductor cluster will have different applications/groups to which specific permissions can be granted to various resources. One of the resources is the prompt template, which allows you to specify which teams or applications can use this prompt in their workflows. It is also important to keep in mind that a user or an application needs to have the required access to both the prompt and one of the associated models with the prompt to use it inside a workflow.

To provide permissions to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Create a new group or choose an existing one with the members needing access to prompts.
3. Under **Permissions** section, click +Add Permission.
4. Under the **Prompt** tab, choose the required prompts with the required permissions. 

<p align="center"><img src="/content/img/rbac-for-prompts.png" alt="RBAC for prompts" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members will have access to these prompts to be used in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

## Using AI Prompts in LLM Tasks in Orkes Conductor

The AI Prompts and models integrated earlier are now ready to be used in your workflows in Orkes Conductor. To do that, you need to add a system task [LLM Text Complete](/content/reference-docs/ai-tasks/llm-search-index) while creating workflows in Orkes Conductor. 

### Creating Workflow with LLM Text Complete Task

If you are creating the workflow via the UI method,

1. Navigate to **Definitions > Workflow** from the left menu on your Orkes Conductor cluster. 
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

<p align="center"><img src="/content/img/run-workflow-translation-workflow.png" alt="Running Translation Workflow from UI" width="70%" height="auto"></img></p>

5. Click on the Workflow ID generated (The workflow created link) to view the execution.
6. From the **Workflow Input/Output** tab, you can get the translated content as the output.

<p align="center"><img src="/content/img/workflow-output-of-translation.png" alt="Workflow Output of Translation" width="100%" height="auto"></img></p>