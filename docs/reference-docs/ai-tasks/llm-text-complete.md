---
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Text Complete

A system task to predict or generate the next phrase or words in a given text based on the context provided.

## Definitions

```json
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
"temperature": 1,
"stopWords": [
"a",
"and",
"the"
],
"topP": 0.8,
"maxTokens": "150"
},
"type": "LLM_TEXT_COMPLETE",
}
```

## Input Parameters

| Attribute | Description |
| --------- | ----------- |
| llmProvider | Choose the required LLM provider. You can only choose providers to which you have access for at least one model from that provider.<br/><br/>**Note**:If you haven’t configured your AI / LLM provider on your Orkes console, navigate to the **Integrations** tab and configure your required provider. Refer to this doc on [how to integrate the LLM providers with Orkes console and provide access to required groups](/content/category/integrations/ai-llm).| 
| model | Choose from the available language model for the chosen LLM provider. You can only choose models for which you have access.<br/><br/>For example, If your LLM provider is Azure Open AI & you’ve configured *text-davinci-003* as the language model, you can choose it under this field. |
| promptName | Choose the AI prompt created in Orkes Conductor. You can only use the prompts for which you have access. <br/><br/>**Note**:If you haven’t created an AI prompt for your language model, refer to this documentation on [how to create AI Prompts in Orkes Conductor and provide access to required groups](/content/reference-docs/ai-tasks/prompt-template).|
| promptVariables | For prompts that involve variables, provide the input to these variables within this field. <br/><br/>Refer to the doc on [different ways to pass parameters](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) in Conductor.|
| temperature | A parameter to control the randomness of the model’s output. Higher temperatures, such as 1.0, make the output more random and creative. Whereas a lower value makes the output more deterministic and focused.<br/><br/>Example: If you're using a text blurb as input and want to categorize it based on its content type, opt for a lower temperature setting. Conversely, if you're providing text inputs and intend to generate content like emails or blogs, it's advisable to use a higher temperature setting.|
| stopWords | Provide the stop words to be omitted during the text generation process.<br/><br/>In LLM, stop words may be filtered out or given less importance during the text generation process to ensure that the generated text is coherent and contextually relevant. 
| topP | Another parameter to control the randomness of the model’s output. This parameter defines a probability threshold and then chooses tokens whose cumulative probability exceeds this threshold.<br/><br/>For example: Imagine you want to complete the sentence: “She walked into the room and saw a ______.” Now, the top 4 words the LLM model would consider based on the highest probabilities would be:<ul><li>Cat - 35%</li><li>Dog - 25%</li><li>Book - 15%</li><li>Chair - 10%</li></ul>If you set the top-p parameter to 0.70, the AI will consider tokens until their cumulative probability reaches or exceeds 70%. Here's how it works:<ul><li>Adding "Cat" (35%) to the cumulative probability.</li><li>Adding "Dog" (25%) to the cumulative probability, totaling 60%.</li><li>Adding "Book" (15%) to the cumulative probability, now at 75%.</li></ul>At this point, the cumulative probability is 75%, exceeding the set top-p value of 70%. Therefore, the AI will randomly select one of the tokens from the list of "Cat," "Dog," and "Book" to complete the sentence because these tokens collectively account for approximately 75% of the likelihood.|
| maxTokens | The maximum number of tokens to be generated by the LLM and returned as part of the result. A token should be approximately 4 characters. |

## Output Parameters

The task output displays the completed text by the LLM.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Text Complete**.
2. Choose the LLM provider, model & prompt template.
3. Provide the input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-text-complete-ui-method.png" alt="LLM Text Complete Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
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
"temperature": 1,
"stopWords": [
"a",
"and",
"the"
],
"topP": 0.8,
"maxTokens": "150"
},
"type": "LLM_TEXT_COMPLETE",
}
```
</TabItem>
</Tabs>