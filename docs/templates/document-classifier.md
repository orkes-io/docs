# Document Classification using LLM Tasks in Orkes Conductor

The process of manual document classification is a daunting task for organizations that costs them time and resources and often results in human errors. Manual document classification is not just time-consuming; it's a drain on resources that could be better utilized elsewhere. The cost of human hours dedicated to sifting through documents, identifying types, and categorizing them accurately is a significant burden. Not to mention the inherent risk of human error, which can lead to misclassifications, data discrepancies, and subsequent operational challenges.

With Orkes templates, you can execute the workflow, and the workflow classifies the document with the power of AI tasks in Orkes Conductor. Orkes Conductor revolutionizes this landscape by automating the document classification process. Imagine a seamless workflow where documents are intelligently identified as images and then categorized with precision into predefined classes like W2, Driver's License, Paystub, Employment Verification Letter, or Mortgage Application—all without the need for manual intervention.

This not only accelerates the classification process but also eliminates the associated costs of manual labor. Orkes Conductor becomes the digital workforce, tirelessly and accurately managing document classification tasks, freeing up human resources for more strategic and value-driven activities.

In document management, where time is money and accuracy is paramount, this template emerges as the cost-effective, efficient solution organizations have longed for.

## Conductor features used 

- [Workflows](https://orkes.io/content/core-concepts)
- [Switch Task](https://orkes.io/content/reference-docs/operators/switch)
- [Inline Task](https://orkes.io/content/reference-docs/system-tasks/inline)
- [Terminate Task](https://orkes.io/content/reference-docs/operators/terminate)
- [LLM Get Document Task](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document)
- [LLM Text Complete Task](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete)
- [AI Prompt Template](https://orkes.io/content/reference-docs/ai-tasks/prompt-template)

## How to use the template

When you click **Import** in the workflow template explorer, you will be navigated to the workflow definition page, where you can see the workflow name as **document_classifier**. This template is free for you to use as is, or you can modify it for your specific use case.

Let's look at what this workflow does and how to run it!

<p align="center"><img src="/content/img/document-classifier-workflow.png" alt="Document Classifier Workflow" width="50%" height="auto"></img></p>

### Workflow Logic

The input parameters to this workflow are:

- **document_url** - The URL of the document file, which is to be classified by the workflow.

Here is an example of the payload that goes in as inputs to this workflow. 

```json
{
"document_url": "https://example.pdf"
}
```

- The first step in the workflow is a [switch task](https://orkes.io/content/reference-docs/operators/switch) that evaluates whether the input URL is a PDF or not using an ECMAScript. The switch task has 2 switch cases: one for PDF, and the other is the default path that gets executed if the input file type does not match the PDF file type.

<p align="center"><img src="/content/img/document-classifier-switch-task.png" alt="Document Classifier Workflow with Switch Task explanation" width="70%" height="auto"></img></p>

- The “PDF” switch case gets executed if the input file is a PDF. The workflow then moves onto an [LLM Get Document task](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document) that retrieves the content of the PDF document. 
- If the input file type is not a PDF, the default branch **defaultCase** gets executed.
    - In the default case, it is passed on to an [Inline task](https://orkes.io/content/reference-docs/system-tasks/inline) that generates an error message on the unsupported file type. 
    - It is then passed on to a [Terminate task](https://orkes.io/content/reference-docs/operators/terminate) that terminates the workflow, displaying the error message mentioning the unsupported file type.
- The switch task is followed by an [LLM Text Complete task](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete), an AI task in Orkes Conductor that classifies the document into W2, Drivers License, Paystub, Employment Verification Letter, or Mortgage Application. The LLM Text complete task determines the file type with the help of a [prompt template](https://orkes.io/content/reference-docs/ai-tasks/prompt-template) that is created within Orkes Conductor itself.
- It is then followed by an [Inline task](https://orkes.io/content/reference-docs/system-tasks/inline) that extracts and formats the classification result based on the LLM text complete task’s output. It also generates a message on what the document is classified as. 

Of course, this is just a starting point. The power of the Conductor model is that you can customize this workflow (and any other ones!) to your needs. You can add additional steps to custom-tailor this workflow to best suit your business requirements. The possibilities are endless, and you can quickly build this workflow to do exactly what you want and, without any effort, scale it up as much as you want!

### Workflow Invocation 

You can invoke the workflow in many different ways. 

#### REST

As with any workflow in Conductor, you can invoke it by calling the REST endpoint of the Conductor server and specifying the workflow name, version, and input data.

You can use the following API to start a workflow execution:

```
POST /api/workflow/{name}
```

Refer to the [start workflow API doc](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution) for more info. 

#### Conductor UI

You can navigate to the **Run Workflow** button on the left side of your Conductor UI, and from there, select the workflow's name, the version to use, and the input parameters. Using the example variables to invoke through the UI is a great way to test this workflow.

<p align="center"><img src="/content/img/run-workflow-from-ui-doc-classifier.png" alt="Run Workflow from UI" width="70%" height="auto"></img></p>