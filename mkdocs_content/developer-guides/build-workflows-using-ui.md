---
title: "Build Workflows Using Conductor UI"
description: "Learn how to build workflows in Orkes Conductor using the visual workflow builder or Assistant to add tasks, configure parameters, and run workflows."
canonical_route: "developer-guides/build-workflows-using-ui"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Build Workflows Using Conductor UI

Orkes Conductor workflows can be built using various methods, including [SDKs](/content/category/sdks), [APIs](/content/reference-docs/api/metadata/creating-workflow-definition), [BPMN imports](/content/developer-guides/convert-bpmn-to-workflows), and the Conductor UI. In Conductor UI, you can build workflows using two approaches:

1. Visual workflow builder 
2. Assistant

## Using visual workflow builder

The visual workflow builder lets you design workflows directly in the Conductor UI by adding and configuring tasks on a canvas.

You can use the visual workflow builder to:

- Drag and drop tasks to define workflow execution order.
- Configure task and workflow inputs/outputs and other parameters.
- Version workflows.
- Run workflows visually.

This approach is well-suited for users who prefer a low-code, visual experience.

### Create workflows using visual workflow builder

**To create workflows visually using Conductor UI:**

1. Go to **Definitions** > **Workflows** from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In the visual section on the left side, select the **+** icon next to **Start** to browse available tasks.
4. Select a task to add it to the workflow.

<p align="center"><img src="/content/img/build-workflow-using-conductor-ui.png" alt="Build workflows using Visual Workflow Builder" width="100%" height="auto"/></p>

5. Add additional tasks in the required sequence to complete the workflow.
6. Once done, select each task to configure its parameters. When you select a task, the task configuration form opens on the right side of the screen.

<p align="center"><img src="/content/img/task-configuration-form-ui.png" alt="Configuring task parameters using Conductor UI" width="100%" height="auto"/></p>

7. After configuring tasks, switch to the **Workflow** tab, and configure the workflow level parameters.

<p align="center"><img src="/content/img/workflow-configuration-form-ui.png" alt="Configuring workflow parameters using Conductor UI" width="100%" height="auto"/></p>

8. Select **Save**.

After saving the workflow, you can use the UI tools to zoom in or out, fit the workflow to the screen, enable drag mode, export the workflow as an image, show descriptions, and search for tasks.

<p align="center"><img src="/content/img/workflow-ui-options.gif" alt="UI workflow configuration features" width="100%" height="auto"/></p>

Once saved, [run workflows using Conductor UI](/content/how-to-videos/run-workflow).

## Using assistant

Orkes Conductor's Assistant is an AI-powered chat interface for building, debugging, and exploring workflows in Conductor. It offers different tools depending on which page you open it from, making it context-aware across workflow building, execution analysis, and search.

!!! info
    The Assistant is available on request only and is powered by Claude and OpenAI models. To enable it for your cluster, contact your Orkes representative. To try it out for free, sign up for our free [Developer Edition](https://developer.orkescloud.com/).

### Accessing the Assistant

You can open the Assistant from:

- **Launchpad**: The home screen after logging in. Enter a prompt directly to get started.

<p align="center"><img src="/content/img/create-workflows-using-assistant.gif" alt="Create workflows using Assistant" width="100%" height="auto"/></p>

- **Workflow Definitions page**: Go to **Definitions** > **Workflow**, select **+ Define workflow** or open an existing workflow, then select the **Assistant** tab.

<p align="center"><img src="/content/img/assistant-in-workflow-definition-tab.png" alt="Create workflows using Assistant from Workflow Definitions tab" width="100%" height="auto"/></p>

- **Executions list page**: Go to **Executions** > **Workflow** to search and filter past runs using natural language.

<p align="center"><img src="/content/img/assistant-in-workflow-executions.png" alt="Debug workflows using Assistant from Workflow Executions tab" width="100%" height="auto"/></p>

- **Execution details page**: Open a specific execution for AI-assisted debugging and failure analysis.

<p align="center"><img src="/content/img/debugging-using-assistant.png" alt="Debug workflows using Assistant from Workflow Executions tab" width="100%" height="auto"/></p>

### Capabilities by context

The Assistant activates different tools depending on where you open it.

#### Workflow Builder

When accessed from the workflow building (Go to **Definitions** > **Workflow**, select **+ Define workflow**) page, the Assistant has full access to workflow building tools.

**Build and modify workflows**

- Create a new workflow from a natural language description
- Add tasks
- Update or remove existing tasks
- Configure task parameters and workflow-level settings
- Validate and save workflows

**Test and run**

- Run a workflow with test input data
- Save and test in a single step

**Generate workers**

- Generate custom worker code in Java, Python, JavaScript, or Go
- Deploy Python workers to Kubernetes directly from the chat

**Configure integrations**

- Discover configured integrations, including AI models, vector databases, message brokers, and external APIs
- Configure a new integration mid-conversation where credentials are stored securely and never sent to the AI model
- Add integration tasks for AI model completions, vector database operations, message broker events, and more

**Clone workflows**

- Clone an existing workflow to create a test variant

#### Execution details

When accessed from a particular workflow execution (Go to **Executions** > **Workflow**, select **a particular execution**), the Assistant helps you understand what happened:

- Analyze why a task or workflow failed
- Explain errors in plain language and suggest fixes
- Compare the current execution against other runs
- Inspect task inputs and outputs

### Execution search

When accessed from the Workflow Executions (Go to **Executions** > **Workflow**) page, the Assistant lets you query past runs in natural language; for example:

- "Show me all failed executions from the last 24 hours."
- "Find executions for order-processing-workflow that failed with a timeout."

You can filter by workflow name, status, time range, or correlation ID.

#### Workflow search

When accessed from the Workflow Definitions (Go to **Definitions** > **Workflow**) page, the Assistant helps you explore your workflow catalog:

- List and search workflows by name or pattern
- View execution history for a specific workflow
- Get a summary of a workflow's structure and purpose

#### General help

When opened from any other area of the UI, the Assistant answers questions about Conductor concepts, explains features, and points you to documentation. 

!!! info "Tips"
    - Conversations are preserved within a session; you can iterate on a workflow across multiple messages.
    - When the Assistant needs an integration that isn't configured yet, it will pause and prompt you to provide credentials before continuing.
