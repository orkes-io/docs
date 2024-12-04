---
slug: "../quickstarts/debug-and-monitor-workflows"
description: "In this quickstart, learn the basics of debugging and monitoring your workflows."
---

# Quickstart 4: Debug and Monitor Workflows
Orkes Platform provides a dashboard for introspecting each workflow execution, enabling you to debug and monitor while in development or production.

The introspection dashboard can be found in **Executions** > **Workflow**, where each workflow execution is identified by a workflow ID.

## Try it out

Check out the execution of myFirstWorkflow.

If successful, the workflow should have a Completed status, with each task highlighted in green. Otherwise, the workflow diagram will highlight the failed task in red.

<p align="center"><img src="/content/img/getting-started/getting_started-failed_task_introspection.png" alt="Screenshot of the workflow execution screen showing the failed task in red." width="100%" height="auto"></img></p>

However, a workflow can still run until completion even with the wrong logic. You can check if the data have been correctly passed between tasks by selecting a task and selecting its **Input** or **Output** tab.

For example, the workflow execution below completed successfully. However, the workflow should have flowed through the United States path instead of the defaultCase path, because the user’s location was the United States. Inspecting the Switch task input, we can deduce that the input have not been correctly passed from the get-user task to the Switch task.

<p align="center"><img src="/content/img/getting-started/getting_started-input_introspection.png" alt="Screenshot of Task Input tab in the workflow execution screen." width="100%" height="auto"></img></p>

You might also be interested in how long each task took to complete, or to find the bottlenecks in your execution performance. To inspect this, go to **Timeline** in the top navigation bar.

<p align="center"><img src="/content/img/getting-started/getting_started-timeline_introspection.png" alt="Screenshot of Timeline tab in the workflow execution screen." width="100%" height="auto"></img></p>

## What’s next?
Congratulations! You have successfully created, executed, and debugged a workflow in Conductor. Gain deeper mastery by exploring each topic in detail:
* Code with Conductor: [SDK Guides](../category/sdks)
* Build more complex workflows, with LLM chaining, human-in-workflows, eventing, dynamic task inputs, secrets, and more: [Build Workflows](../developer-guides/building-workflows)
* Execute and deploy production-grade workflows, with CI/CD best practices, version control, testing, and scheduling. [Run Workflows](../developer-guides/running-workflows)
* Debug and monitor workflows, by exploring both the introspection dashboard and metrics dashboard in detail. [Deploy and Monitor Workflows](../developer-guides/deploying-workflows)
