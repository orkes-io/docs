---
slug: using-chatgpt-to-create-conductor-workflows
title: Using ChatGPT to create Conductor Workflows
authors: riza
tags: [Netflix Conductor, orchestration, chatgpt]
---

ChatGPT from OpenAI has been an internet sensation for the past few months. ChatGPT is an AI-based chatbot that can generate human-like outputs based on its trained data.

<p align="center"><img src="/content/img/chatgpt-trial.jpg" alt="ChatGPT for creating Conductor Workflows" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

By now, most of you might have already tried ChatGPT for your personal or business needs or just to get acquainted with the tool. Our team at [Orkes](https://orkes.io/), too, gave a hands-on approach to demonstrate how effectively ChatGPT can be utilized for creating Conductor workflows.

Let’s take a look at how our trial progressed!

## Conductor Workflows using ChatGPT

We gave an initial shot at creating a Conductor Workflow to calculate the sum of two numbers and return the value. Here’s our first attempt result:

<p align="center"><img src="/content/img/chatgpt-generated-workflow-in-yaml.jpg" alt="ChatGPT generated workflow to find the sum of 2 numbers in YAML" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Initially, the workflow was generated in YAML format, but we required it in JSON format.

<p align="center"><img src="/content/img/chatgpt-generated-workflow-in-json.jpg" alt="ChatGPT generated workflow to find the sum of 2 numbers in JSON" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

As you can see, it’s not perfect, with certain parameters being missed. So, we just copied the code to [Conductor Playground](https://play.orkes.io/): a free tool from Orkes, to visualize the accuracy. And here are the problems found.

<p align="center"><img src="/content/img/chatgpt-generated-workflow-issues.jpg" alt="Issues for the ChatGPT-generated Conductor Workflow" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

So I input these errors into ChatGPT’s interface itself.

<p align="center"><img src="/content/img/resolving-issues.jpg" alt="Resolving the encountered issues" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

It looks like those two errors were fixed, and one of the existing parameters, “version”, was removed. So I continued the conversation with the error message I received on this.

<p align="center"><img src="/content/img/resolving-issues-with-workflow-version.jpg" alt="Resolving the encountered issue with the workflow version" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

So now the workflow was almost accurate with the input parameters to the workflow, **num1**, and **num2** not defined in the workflow input. However, this is an optional thing to be added to the workflow definition, but you do need to pass it while running the workflow.

So, I stopped my trial workflow at this point and manually added the missing input parameters to the workflow.

| [sum_workflow - View in Playground](https://play.orkes.io/workflowDef/sum_workflow_chatgpt/1) |
| --------------------------------------------------------------------------------------------- |

Ta-da🥳! The workflow is ready now!

The next step is to set up the worker for this. Let’s take Java worker as an example and see what ChatGPT offers for the worker setup.

<p align="center"><img src="/content/img/chatgpt-generated-java-worker-for-netflix-conductor.jpg" alt="ChatGPT generated Java worker for Netflix Conductor" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Not so perfect because a few things are missing. A complete working sample of the worker would look like this.

```java
package io.orkes.samples;
import com.netflix.conductor.client.worker.Worker;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;
import com.netflix.conductor.common.metadata.tasks.TaskResult.Status;
import org.springframework.stereotype.Component;


@Component
public class SumWorker implements Worker {


   private static final String TASK_DEF_NAME = "sum_task";

   @Override
   public String getTaskDefName() {
       return TASK_DEF_NAME;
   }


   @Override
   public TaskResult execute(Task task) {


       int num1 = Integer.parseInt(task.getInputData().get("num1").toString());
       int num2 = Integer.parseInt(task.getInputData().get("num2").toString());
       int result = num1 + num2;

       TaskResult taskResult = new TaskResult(task);
       taskResult.setStatus(Status.COMPLETED);
       taskResult.getOutputData().put("result", result);

       return taskResult;
   }
}
```

## Things ChatGPT missed in Conductor Workflows

Now that we have the ChatGPT-generated Workers and Workflow ready (Although our manual intervention is there😉). There are a few things that ChatGPT didn’t mention throughout the trial, such as the workflow missing a few parameters, such as the task name and schema version. On repeated attempts, even some of the task type was also misinterpreted.

## Additional ChatGPT generated Workflow Examples

We conducted a few more trials on several use cases, and here are the workflow definitions that ChatGPT has defined.

- [Shipping an order](https://play.orkes.io/workflowDef/ship-order-workflow-chatgpt/1)
- [Telecom subscription and billing management](https://play.orkes.io/workflowDef/telecom-subscriber-billing-workflow-chatgpt/1)

:::note
We have not tested the above ChatGPT-generated workflows.
:::

## ChatGPT: Capabilities & Limitations

Taking our Conductor example using ChatGPT, it is clear that you cannot rely on an AI tool alone. ChatGPT being an AI model, has its own limitations too.

**Code delivered in Seconds**

It’s truly impressive that it helps in generating codes in a few seconds, which a developer may take hours to do. But it’s not a cent percent deliverable code. As in our case, you’ve witnessed that a manual interpretation of the code is required.

**Outdated Model**

The current version of ChatGPT is based on the 2021 data. We are in the first quarter of 2023 now, which makes certain discrepancies in the results it provides. Let’s wait and see what future updates can bring in.

**Output Quality**

The quality of the answers is not always the same. Throughout our trial process, we witnessed some ups and downs in the quality of the solutions provided. However, ChatGPT itself claims to learn and evolve with time.

## Summing Up

As an AI-based model, ChatGPT has its own set of capabilities and limitations. Based on our trial, we have observed that while AI chatbots can be helpful in generating code samples, they may not always deliver complete solutions. However, you can leverage similar AI tools and make your work 10x faster, similar to how [Conductor helps in building distributed applications 10x faster](https://orkes.io/what-is-conductor/). 🚀

So have you tried ChatGPT yet? If not, try creating a few Conductor workflows and let us know your results.
