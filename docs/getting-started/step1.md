---
sidebar_position: 0
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 1: Your first Workflow Application

Let’s build a workflow for the sample banking use case - deposit funds into a customer account and notify them via email and SMS about the status.
<br/>
This workflow has three steps: record the deposit, send an email, and send sms. For this example, we will assume there are REST (HTTP) endpoints you can invoke to run these functions. 
<br/>

:::note
Conductor supports many ways to implement the steps, such as HTTP endpoints, workers, inline code, and serverless functions. You can mix and match these too!
:::

## Create Your Workflow

1. Navigate to **Workflows > Definitions**.
2. Click the **Define Workflow** button at the top right corner. 
3. Create a workflow by adding 3 [HTTP](https://orkes.cloud/content/reference-docs/system-tasks/http) tasks. 
4. Click the **Run Workflow **option from the left menu, and choose your workflow.

You can run this workflow to see how it executes. If there are failures, Conductor will retry them automatically and ensure that the workflow is completed. 
<br/>

**Let’s send SMS and Email in parallel instead of sequentially.**
<br/>

1. In your current workflow, add a [fork-join](https://orkes.cloud/content/reference-docs/operators/forkjoin) task after the deposit task.
2. Add the SMS and email tasks as fork tasks.
3. Join the two fork tasks using the join operation.
4. Run the workflow.
<br/>

**What if we want to send the SMS only after 10 mins?**
<br/>

1. In your current workflow, add a [wait](https://orkes.cloud/content/reference-docs/operators/wait) task before the SMS task.
2. You can configure the wait task parameters to wait for 10 mins.
3. Run the workflow directly from the UI using the Run Workflow button.

## Looking Ahead /  Explore Further / What's Next?

* Passing [inputs into workflow for tasks](https://orkes.cloud/content/guides/passing-data-task-to-task).
* Passing the [output of one task to the input](https://orkes.cloud/content/guides/passing-data-task-to-task) of another
* Running custom worker code (instead of HTTP endpoints)
* Conditional task executions
* Running a dynamic set of tasks in parallel
