---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Step 1: First Workflow Application

Let’s build a workflow for the sample banking use case - deposit funds into a customer account and notify them via email and SMS about the status.

This workflow has three steps: record the deposit, send an email, and send sms. For this example, we will assume there are REST (HTTP) endpoints you can invoke to run these functions.

:::note
Conductor supports many ways to implement the steps, such as HTTP endpoints, workers, inline code, and serverless functions. You can mix and match these too!
:::

## Create Your Workflow

<Tabs>
<TabItem value="UI" label="UI" className="ui-instructions">
<div className="row">
<div className="col col--4">

1. Navigate to **Workflows > Definitions**.
2. Click the **Define Workflow** button at the top right corner.
3. Create a workflow by adding 3 [HTTP](https://orkes.cloud/content/reference-docs/system-tasks/http) tasks.
4. Click the **Run Workflow** option from the left menu, and choose your workflow.

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="300px"
  allow="fullscreen;"
  src={"https://www.youtube.com/embed/0BaiLdGu7Lo"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>
You can run this workflow to see how it executes. If there are failures, Conductor will retry them automatically and ensure that the workflow is completed.

#### Let’s send SMS and Email in parallel instead of sequentially

<Tabs>
<TabItem value="UI" label="UI">

1. In your current workflow, add a [fork-join](https://orkes.cloud/content/reference-docs/operators/forkjoin) task after the deposit task.
2. Add the SMS and email tasks as fork tasks.
3. Join the two fork tasks using the join operation.
4. Run workflow.

</TabItem>
</Tabs>

## Looking Ahead / Explore Further / What's Next?

- Passing [inputs into workflow for tasks](https://orkes.cloud/content/guides/passing-data-task-to-task).
- Passing the [output of one task to the input](https://orkes.cloud/content/guides/passing-data-task-to-task) of another
- Running custom worker code (instead of HTTP endpoints)
- Conditional task executions
- Running a dynamic set of tasks in parallel
