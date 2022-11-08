---
sidebar_position: 1
---
# Conductor Playground

Get started with Orkes Playground by creating a free account at [https://play.orkes.io](https://play.orkes.io).

## What is Conductor Playground?
[Conductor Playground](https://play.orkes.io) is a free environment for developers to try out and explore more about Conductor. It is fully hosted by Orkes and is run as a multi-tenant cluster. Developers can use Playground to get familiarized with what Conductor offers and it is NOT intended for running production workflows. For running Conductor orchestration & workflows in production, we recommend the following:

* [Orkes Cloud](https://orkes.io/cloud/) - A fully managed and hosted Conductor cluster deployed to your cloud. It comes with free and paid plans!
* The [open-source](https://github.com/Netflix/conductor) version of Conductor.

## Logging in to Conductor Playground

1. Navigate to [Orkes Playground](https://play.orkes.io/) and click **Login to Continue**. 
2. Click on **Signup** and follow the on-screen instructions to set up your account. Alternatively, you can click **Continue with Google** to authenticate using your Google account.
3. The landing page is a list of workflow executions on the playground. If this is your first login, this table will be empty.

<p align="center"><img src="/content/img/playground-landing-page.png" alt="Landing page on Playground" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Conductor Playground Components

Let’s look in detail at what each section of the playground defines. 

<p align="center"><img src="/content/img/left-menu-of-playground.png" alt="Left menu of Playground" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The left navigation gives an insight into the major components of the Conductor.

| Component      | Sub-category | Description |
| ----------- | ----------- | ----------- |
| Workflows | Executions | Lists all the executed workflows in your Playground. <br/><br/> **Note**: The executions of all the [pre-installed workflows](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground#preinstalled-workflows) appear here for all users. So ensure to refrain from adding private/sensitive data. |
|     | Definitions | List all the workflows available to your account. There are some pre-installed workflows for testing purposes. <br/> <br/> Use the *Define Workflow* button to create new workflow definitions. |
| Tasks | Queue Monitor | You can view the worker queue for the tasks. For already polled workers, you can view the details such as worker ID, last polled time, etc. Use the *Queue Depth* button to view the queue task list and size. The list is updated automatically every 30 seconds. You also have the provision to update the list manually. |
|   | Definitions | List all tasks available to your account. Use the *Define Task* button to create new task definitions. | 
| Scheduler | Executions | List the executions of all the scheduled workflows. | 
|   | Definitions | List all the scheduled workflows with their scheduled date and time, next run time, etc. Use the *Define Schedule* button to schedule a workflow to run at regular intervals. |
| Run Workflow | Run Workflow | Use this option to run a workflow to see the results. | 
| Access Control | Applications | Create applications that you can run from the Orkes Playground. Check our detailed documentation on [app creation](https://orkes.io/content/docs/getting-started/concepts/access-control-applications) and our tutorial on [creating Playground applications](https://orkes.io/content/docs/getting-started/playground/first-playground-application#application). |
| More | Webhooks | Webhook is used to connect other third-party systems with Conductor. |
|   | Secrets | List all the secrets stored by the user. Use the *Add Secret* button to keep a new token/key securely. |
|   | Event Handlers | Lists all events available to your account. Use the *Define Event* button to create new events. Test your events using the *Test Event* button. |

## Preinstalled Workflows

The Playground comes pre-installed with many workflows to get to the action right away with Conductor. These can be executed from within the UI.

> **Note:** Please note that the executions of these pre-installed workflows are shared across all Playground users, and as such, it is not recommended to use any input data or correlation id strings that you want to keep private.

### Sample Workflow Execution in Playground ​

In the **Workflow Definitions** section, you can see a **PopulationMaxMin** workflow. Clicking on the workflow name will show the JSON definition and the visualization of the workflow.

<p align="center"><img src="/content/img/PopMinMax.png" alt="PopulationMaxMin Workflow" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>


This workflow requires no input from the user. On execution, it will:

* Make an HTTP request to retrieve US state populations.
* Split into two parallel tasks:
  * Find the state with the highest population.
  * Find the state with the lowest population.
* Rejoin, combine the results and exit.

Test this workflow in real-time:
1. Click the **Run Workflow** button in the left navigation. Select **PopulationMaxMin** from the dropdown *Workflow Name*, and click **Run Workflow**. 
<p align="center"><img src="/content/img/run-workflow-popminmax.png" alt="Running the PopMaxMin workflow" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>
2. Click on the Workflow ID generated, and you'll see that the workflow has probably been completed. 
<p align="center"><img src="/content/img/popminmax-workflow-completed.png" alt="PopMaxMin workflow completed" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>
3. Explore with the UI to investigate each task in the diagram, or hit Workflow Input/Output to see the result of the workflow.
<p align="center"><img src="/content/img/popminmax-json-io.png" alt="PopMaxMin JSON I/O" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Create New Workflow​
You can use Playground to create new workflows and execute them. These will be private and visible only to you. Follow our tutorial on how to [create your first workflow in the Playground](https://orkes.io/content/docs/getting-started/playground/first-playground-application).

# Give Us Feedback!
We would love to hear from you on how we can improve the Playground, this document and our products in general. Please use [this form](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g) to let us know.