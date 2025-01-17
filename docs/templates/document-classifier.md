---
slug: "/templates/document-classifier"
description: "Use this template to build an AI-enabled document classification workflow."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Document Classification

Manual document classification is a daunting and resource-draining task for organizations. It is time-consuming and prone to human error, which can result in misclassifications, data discrepancies, and operational challenges. 

With this template, you can streamline document classification by automating the process with the power of AI tasks in Orkes Conductor. This workflow identifies text-based PDF documents and classifies them into predefined categories such as W2, driver’s license, paystub, employment verification letter, or mortgage application–all without manual intervention. 

This template serves as a digital workforce, efficiently handling document classification processes with accuracy and consistency.

## Conductor features used

This template utilizes the following Conductor features:

* [Switch task](https://orkes.io/content/reference-docs/operators/switch)
* [Inline task](https://orkes.io/content/reference-docs/system-tasks/inline)
* [Terminate task](https://orkes.io/content/reference-docs/operators/terminate)
* [LLM Get Document task](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document)
* [LLM Text Complete task](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete)
* [AI Prompt Template](https://orkes.io/content/developer-guides/creating-and-managing-gen-ai-prompt-templates)

## How to use the template

1. Import the template
2. Understand the workflow logic
3. Set up AL/LLM integration
4. Create AI prompt
5. Modify the workflow template
6. Run workflow

### Import the template

**To import the template:**

1. Go to **Template Explorer** from the left navigation menu on your Conductor cluster.
2. In **Document Classifier**, select **Import**.
3. Rename the workflow and task names. For example, rename the workflow as *document_classifier_your_name*.
4. Select **Save**.

The workflow is now imported and ready for use.

<p align="center"><img src="/content/img/document-classifier-workflow.png" alt="Document Classifier Workflow" width="50%" height="auto"></img></p>

### Understand the workflow logic

This section explains the workflow logic and how to execute it.

**Workflow inputs:**
- **document_url**–The URL of the document file to be classified using the workflow.

**Workflow logic:**

* The workflow begins with a [Switch task](https://orkes.io/content/reference-docs/operators/switch) that evaluates whether the input URL is a PDF using ECMAScript. The Switch task has two switch cases based on the input file type. 
    * **PDF**–The switch case to execute if the input file is PDF.
    * **defaultCase**–The switch case to execute if the input is not a PDF.
* If the input file is not a PDF, the workflow moves to an [Inline task](https://orkes.io/content/reference-docs/system-tasks/inline), which generates an error message about the unsupported file type. The workflow is then terminated using a [Terminate task](https://orkes.io/content/reference-docs/operators/terminate), which returns an error message about the unsupported file type.
* If the input file is a PDF, the workflow moves to an [LLM Get Document task](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document), which retrieves the content of the PDF document.
* Next, the [LLM Text Complete task](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete) classifies the document as a W2, driver's license, paystub, employment verification letter, or mortgage application. This task determines the file type using a [prompt template](https://orkes.io/content/developer-guides/creating-and-managing-gen-ai-prompt-templates) in Conductor.
* The final task is an [Inline task](https://orkes.io/content/reference-docs/system-tasks/inline) that extracts and formats the classification result based on the previous LLM Text Complete task’s output. It also returns a message indicating the category to which the document type has been classified.

### Set up AI/LLM integration 

The LLM Text Complete task in the workflow classifies the document with the help of an LLM. This can be done by adding your preferred LLM integration in Conductor.

**To add an AI/LLM integration:**

1. Go to **Integrations** from the left navigation menu on your Conductor cluster.
2. Select **+ New integration**.
3. In **AI/LLM** section, choose your preferred LLM provider and select **+ Add**.
:::note
The configuration parameters vary depending on the AI/LLM platform being integrated. Refer to the [LLM integration guides](https://orkes.io/content/category/integrations/ai-llm) for more information.
:::
<p align="center"><img src="/content/img/document-classifier-switch-task.png" alt="Document Classifier Workflow with Switch Task explanation" width="70%" height="auto"></img></p>

4. Enter the API keys and other parameters based on the chosen LLM provider.
5. Select **Save**.

The LLM integration is added. The next step is to add a specific model.

**To add a model to your integration:**

1. In the **Integrations** page, select the + button next to your newly-added integration.
2. Select **+ New model**.
3. Enter the **Model name** and **Description**. 
4. Ensure that the **Active** toggle is switched on and select **Save**.

The integration is now ready to use. The next step is creating an AI prompt template that classifies the documents using this integration.

### Create AI prompt 

**To create an AI prompt:**

1. Go to **Definitions** > **AI Prompts** from the left navigation menu on your Conductor cluster.
2. Select **+ Add AI prompt**.
3. In **Prompt Name**, enter a unique name for your prompt, such as _doc_classifier_prompt_yourname_.
4. In **Model(s)**, select the integration you added in the previous step. The UI drop-down lists the integration along with the model names. Make sure to choose the right one.
5. Enter a **Description** of what the prompt does.

<p align="center"><img src="/content/img/doc-classifier-prompt-template.png" alt="Creating a prompt template in Orkes Conductor" width="100%" height="auto"></img></p>

6. In **Prompt Template**, enter your prompt, which will classify the document into appropriate categories. For example:


_We have a document that was scanned using OCR. The content is ${text}. You need to classify the document based on the provided OCR content. The document could be one of these: W2, Drivers License, Pay stub, Employment Verification Letter, or Mortgage Application. Suppose the provided content does not match with any of those documents. In that case, you must reply NO_MATCH, and in the following line, you must give a human-understandable message about the result and why that determination was made in under three sentences. If the provided content matches, return the values found, including the document type. If the social security number is part of the values, obfuscate the first five digits._

Here, we have defined _${text}_ as a variable derived from the previous tasks' output. This will become clearer once we incorporate this prompt into the workflow.

7. Select **Save** > **Confirm save**.

This saves your prompt template. Let’s modify the imported workflow with the newly added integration and AI prompt.

### Modify the workflow template

Before using this template, make the following updates to the imported workflow:

1. Go back to your workflow definition, and in the **classify_using_llm** task, replace the following parameters:

<p align="center"><img src="/content/img/modifying-document-classification-template.png" alt="Modifying the workflow template with configured parameters" width="80%" height="auto"></img></p>

- In **LLM provider**, replace *dl-test-3* with your integrated LLM provider.
- In **Model**, replace *gpt-3.5-turbo* with your integrated model.
- In **Prompt template**, replace *doc_classifier_prompt* with your prompt.
- Add the **promptVariable** text parameter as _${get_document_task_ref.output.result}_. This is the output of **get_document_task** that retrieves the content of the PDF document. 

2. Select **Save** > **Confirm**.

### Run the workflow

You can run the workflow in different ways.

<Tabs>
<TabItem name="Using Conductor UI" value="Using Conductor UI">

**To run the workflow using Conductor UI:**

1. From your workflow definition, go to the **Run** tab.
2. Enter the **Input Params**.

```json
// example input params
{
 "document_url": "https://image-processing-orkes.s3.amazonaws.com/test-w2-form-full-text.pdf"
}
```

3. Select **Run Workflow**.

<p align="center"><img src="/content/img/running-workflow-doc-classification-template.png" alt="Running workflow from Conductor UI" width="80%" height="auto"></img></p>

</TabItem>
<TabItem name="Using API" value="Using API">

Use the following endpoint to start the workflow:\

```
POST /api/workflow/{name}
```

Refer to the [Start Workflow Execution API reference](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution) for more information.
</TabItem>
</Tabs>

## Workflow output

The workflow output will provide the category to which the document is classified. Here is an example output based on a W2 document passed as the input:

<p align="center"><img src="/content/img/doc-classifier-workflow-output.png" alt="Example workflow output" width="100%" height="auto"></img></p>

<p align="center"><img src="/content/img/doc-classifier-workflow-input-output.png" alt="Example for doc classification using Orkes Conductor" width="100%" height="auto"></img></p>

This template provides a starting point for customizing the workflow to your needs. While it is only designed to work with text-based PDFs, you can easily add steps and modify it to support image-based PDFs, additional file types, and so on, to suit your business requirements.