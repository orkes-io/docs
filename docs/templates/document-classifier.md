# Document Classification using LLM Tasks in Orkes Conductor

The process of manual document classification is a daunting task for organizations that costs them time and resources and often results in human errors. Manual document classification is not just time-consuming; it's a drain on resources that could be better utilized elsewhere. The cost of human hours dedicated to sifting through documents, identifying types, and categorizing them accurately is a significant burden. Not to mention the inherent risk of human error, which can lead to misclassifications, data discrepancies, and subsequent operational challenges.

With Orkes templates, you can execute the workflow, and the workflow classifies the document with the power of AI tasks in Orkes Conductor. Orkes Conductor revolutionizes this landscape by automating the document classification process. Imagine a seamless workflow where documents are intelligently identified as images or PDFs and then categorized with precision into predefined classes like W2, Driver's License, Paystub, Employment Verification Letter, or Mortgage Application—all without the need for manual intervention.

This not only accelerates the classification process but also eliminates the associated costs of manual labor. Orkes Conductor becomes the digital workforce, tirelessly and accurately managing document classification tasks, freeing up human resources for more strategic and value-driven activities.

In document management, where time is money and accuracy is paramount, this template emerges as the cost-effective, efficient solution organizations have longed for.

## Conductor features used 

- [Workflows](https://orkes.io/content/core-concepts)
- [Switch Task](https://orkes.io/content/reference-docs/operators/switch)
- [Simple Task](https://orkes.io/content/reference-docs/worker-task)
- [LLM Get Document Task](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document)
- [Set Variable Task](https://orkes.io/content/reference-docs/operators/set-variable)
- [LLM Text Complete Task](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete)
- [AI Prompt Template](https://orkes.io/content/reference-docs/ai-tasks/prompt-template)
- [Human Task](https://orkes.io/content/developer-guides/orchestrating-human-tasks)
- [Inline Task](https://orkes.io/content/reference-docs/system-tasks/inline)
- [HTTP Task](https://orkes.io/content/reference-docs/system-tasks/http)

## How to use the template

When you click on **Import** in the workflow template explorer, you will be navigated to the workflow definition page, where you can see the name of the workflow as **document-classifier**. This template is free for you to use as is, or you can modify it for your specific use case.

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

- The first step in the workflow is a [switch task](https://orkes.io/content/reference-docs/operators/switch) that evaluates whether the input URL is a PDF or an image using an ECMA Script. The switch task has 3 switch cases: one for image, one for PDF, and one is the default path that gets executed if the input file type does not match the PDF or image file type.

<p align="center"><img src="/content/img/document-classifier-switch-task.png" alt="Document Classifier Workflow with Switch Task explanation" width="70%" height="auto"></img></p>

- If the input file is an image, the “IMAGE” switch case gets executed. The workflow moves onto a [simple task](https://orkes.io/content/reference-docs/worker-task) that performs OCR (Optical Character Recognition) on the image. The output of the simple task is passed onto a [set variable task](https://orkes.io/content/reference-docs/operators/set-variable) that sets a variable with the output of the simple task. A simple task needs a worker to be set up, and for this example, we have set the worker in the Playground for the ease of testing the template. 
- On the other hand, if the input file is a PDF, the “PDF” switch case gets executed. The workflow moves onto an [LLM get document task](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document) that retrieves the content of the PDF document. The output of this task is passed onto a [set variable task](https://orkes.io/content/reference-docs/operators/set-variable) that sets a variable with the output of the simple task.  
- If the input file type is other than the PDF or an image file, the default branch **defaultCase** gets executed.
- It is followed by an [LLM text complete task](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete), an AI task in Orkes Conductor that classifies the document into W2, Drivers License, Paystub, Employment Verification Letter, or Mortgage Application. If the input file isn’t any of these, then the output of this task displays NO_MATCH. The LLM Text complete task determines the file type with the help of a [prompt template](https://orkes.io/content/reference-docs/ai-tasks/prompt-template) that is created within Orkes Conductor itself.
- It is then followed by another [switch task](https://orkes.io/content/reference-docs/operators/switch) that evaluates the switch task input (basically the output of the previous LLM text complete task). It has 2 switch cases, one that gets executed if the previous task result was “NO_MATCH”. Another one is the **defaultCase**, if the document was classified into any of the mentioned document types by the LLM task. 

<p align="center"><img src="/content/img/document-classifier-switch-task-2.png" alt="Document Classifier Workflow with Switch Task explanation" width="50%" height="auto"></img></p>

- If the switch case “NO_MATCH” is getting executed, then it’s assigned to a [human task](https://orkes.io/content/developer-guides/orchestrating-human-tasks) that requires a manual completion process.
- Once the human task is manually completed, the workflow moves onto an [inline task](https://orkes.io/content/reference-docs/system-tasks/inline) that evaluates the output of the switch task using an ECMA script.
- The output is then passed on to an [HTTP task](https://orkes.io/content/reference-docs/system-tasks/http) that’s added as a placeholder task to indicate that the workflow then proceeds as per your use case requirements. 

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