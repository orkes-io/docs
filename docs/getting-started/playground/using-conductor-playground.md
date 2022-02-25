---
sidebar_position: 1
---
# Conductor Playground


## What is Conductor Playground?
[Conductor Playground](https://play.orkes.io) is a free sandbox environment for developers to try out and learn more about Conductor. It is fully hosted by Orkes and is run as a multi-tenant cluster. Developers should use playground for getting familiarized with what Conductor offers.  For running Conductor orchestration & workflows in production one can:

* Use [Orkes Cloud](https://orkes.io/cloud/) for a fully managed and hosted Conductor cluster deployed to your cloud. It comes with free and paid plans!
* Install and use the open source [Conductor](../install/running-locally).

The workflows that you create and execute will generally be persisted in the Playground so that when you come back next time, you can continue where you left off. Having said that, Playground doesn't offer any SLA on availability of the service or the data contained in it, and is not suited for production use.


## Logging in to Conductor Playground

When you navigate to https://play.orkes.io you will be prompted to sign-up for the Playground using a Google account (alternatively you can use an email and password). 

The next time you come to the playground, if your login session hasn't expired, you will be directed directly to the Playground UI. Otherwise you will have to re-enter your credentials.

Once you are logged in, you will be directed to the Playground.  The Playground is similar to the Conductor, with the difference that it is running as a multi-tenant cluster with security perimeters between users so that your workflow definitions and its executions are visible only to you.

## Conductor Playground Components

Inside the playground, the left Navigation provides you with insight as you what you can do in the playground:

![left navigation](/img/playground-left-nav.png)

* **Workflow Executions**:  Here you will see every workflow execution for your workflows.
  * **Note** that all executions (for all users) of the [preinstalled workflows](using-conductor-playground#preinstalled-workflows)  also appear here - so do not enter any data you wish to remain private.
* **Workflow Definitions**: A list all the workflows available to your account. Define (and change) workflows through the ```Define Workflow``` button.
* **Task Definitions**: A list of all tasks available to your account.  Define (and change) tasks through the ```Define Task``` button.
* **Event Handlers**  A list of all events available to your account.  Define (and change) events through the ```Define Event``` button.  Test your Events with the ```Test Event``` button.
* **Task Queues** See the worker queue for your tasks.
* **Applications** Create applications that you can run from the Orkes Playground. [Follow our tutorial](first-playground-application#application) to create Playground applications.
* **Feedback** We want to hear what you think!
* **Run Workflow** Run a workflow, and then see the results!
* **Implement Workers** details on how to create a Java worker for your Conductor task.

To learn more about the various components of Conductor, please start with the [Conductor Overview](../concepts/concepts-overview.md)


## Preinstalled Workflows

In order for yout to get to the action right away with Conductor, the Playground comes pre-installed with a workflow. These can be executed from within the UI. 

> **Note:** Please note that the executions of these pre-installed workflows are shared across all Playground users, and as such, it is not recommended to use any input data or correlation id strings that you want to keep private.

### Population Max/Min

In the ```Workflow Definitions``` section, you should see a PopulationMaxMin workflow.  Clicking on the workflow name will show the JSON definition and the visualization of the workflow:

![workflow screenshot](/img/popmaxmin-workflow.png)

This workflow requires no inputs from the user.  On execution it will:

* Make an HTTP request to retrive US State populations
* Split into 2 parallel tasks:
  * Find the state with the highest population
  * Find the state with the lowest population
* Rejoin, combine the results and exit.

Test it out by clicking ```Run Workflow``` in the left navigation.  Select ```PopulationMaxMin``` from the Workflow name dropdown, and click ```Run Workflow```.  A workflowId will appear below the form:

![run workflow screenshot](/img/popmaxmin-runworkflow.png)

Click this link, and you'll see that the task has probably already completed.  Explore with the UI to investigate each task in the diagram, or hit ```Workflow Input/Output``` to see the JSON result of the workflow.

![completed workflow](/img/playground-popmaxmin-completed.png)
![completed workflow results](/img/playground-popmaxmin-results.png)


## Create a New Workflow
You can use the Playground to create new workflows and execute them. These will be private and visible only to you. Follow our tutorial on how to [create your first workflow in the Playground](first-playground-application).

# Give Us Feedback!
We would love to hear from you on how we can improve the Playground, this document and our products in general. Please use [this form](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g) to let us know.