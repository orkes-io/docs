---
sidebar_position: 1
---

# Searching Workflow Executions

In this article we will learn how to search through workflow executions via the UI.

### Prerequisites

1. Conductor app and UI installed and running with a database backend. This is most easily done via Docker compose, or by using the Orkes Playground:
   1. [Orkes Playground](https://play.orkes.io)
   2. [Running via Docker Compose](/content/docs/getting-started/install/running-locally-docker)

## UI Workflows View

Open the home page of the UI installation. It will take you to the `Workflow Executions` view. This is where we can look
at available workflow executions.

### Basic Search

The following fields are available for searching for workflows.

| Search Field Name | Description                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Workflow Name     | Use this field to filter workflows by the configured name.                                                |
| Workflow ID       | Use this field to filter to a specific workflow by its id.                                                |
| Status            | Use this field to filter by status - available options are presented as a multi-select option.            |
| Start Time - From | Use this field to filter workflows that started on or after the time specified.                           |
| Start Time - To   | Use this field to filter workflows that started on or before the time specified.                          |
| Lookback (days)   | Use this field to filter workflows that ran in the last given number of days.                             |
| Free Text Query   | If you have indexing enabled, you can query by values that were part of your workflow inputs and outputs. |

The table listing has options to

1. Select columns for display
2. Sort by column value

At the bottom of the table, there are options to

1. Select the number of rows per page
2. Navigating through pages

### Find by Tasks

In addition to the options listed in the **Basic Search** view, we have the following options in the **Find by Tasks** view.

| Search Field Name  | Description                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Include Task ID    | Use this field to filter workflows that contain a task with this id.                                           |
| Include Task Name  | Use this field to filter workflows that contain a task with a name.                                            |
| Free Text in Tasks | If you have indexing enabled, you can query by values that were part of your workflow task inputs and outputs. |
