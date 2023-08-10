---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Step 1: First Workflow Application

Let’s build a workflow for the sample banking use case - deposit funds into a customer account and notify them via email and SMS about the status. 
This workflow has three steps: __record the deposit__, __send an email__, and __send sms__. For this example, let's assume there are REST 
(HTTP) endpoints you can invoke to run these functions.

:::tip
Conductor supports many ways to implement the steps, such as HTTP endpoints, workers, inline code, and serverless functions. We can mix and match these too!
:::

## Create Workflow

We can create workflows using multiple methods, such as UI, Code, etc. We will start with the UI.

<Tabs>
<TabItem value="UI" label="UI" className="ui-instructions">
<div className="row">
<div className="col col--4 ui-instructions-padding">

Watch this video and follow the steps below: 

1. Login and Navigate to **Workflows > Definitions**.
2. Click the **Define Workflow** button at the top right corner.
3. Create a workflow by adding 3 [HTTP](/content/reference-docs/system-tasks/http) tasks.
4. Click the **Run Workflow** [[Guide]](../how-to-videos/run-workflow) option from the left menu, and choose your workflow.

</div>
<div className="col ui-instructions-padding">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="300px"
  allow="fullscreen;"
  src={"https://player.vimeo.com/video/813938430?h=547c5edf56"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>
You can run this workflow to see how it executes. If there are failures, Conductor will retry them automatically and ensure that the workflow is completed.

#### Let’s send SMS and Email in parallel instead of sequentially

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">


1. In your current workflow, add a [Fork Join](/content/reference-docs/operators/fork-join) task after the deposit task.
2. Add the SMS and email tasks as fork tasks.
3. Join the two fork tasks using the join operation.
4. Run workflow.

</div>
<div className="col">
<div className="embed-loom-video">
<div style={{ "padding": "63.53% 0 0 0", "position" : "relative" }}>
<iframe src="https://player.vimeo.com/video/813938430?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
frameborder="0" allow="autoplay; fullscreen; picture-in-picture" 
style={{ "position" : "absolute", "top": 0, "left" :0, "width" : "100%", "height" : "100%"}} title="Getting started on Orkes Conductor: Define and run your first workflow"></iframe>
</div>
</div>
</div>
</div>
</TabItem>
</Tabs>

## Related Topics

- Passing [inputs into workflow for tasks](/content/developer-guides/passing-inputs-to-task-in-conductor).
- Passing the [output of one task to the input of another](/content/developer-guides/passing-inputs-to-task-in-conductor).
- Running [custom worker code](/content/getting-started/adding-custom-code-worker) (instead of HTTP endpoints)
- [Conditional task executions](/content/reference-docs/operators/switch)
- Running a [dynamic set of tasks in parallel](/content/reference-docs/operators/dynamic-fork)
- Configuring [retries for your task](/content/error-handling)
