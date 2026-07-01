---
title: "PostgreSQL Integration with Orkes Conductor"
description: "Learn how to integrate PostgreSQL with Orkes Conductor to automate your workflows and manage your PostgreSQL directly from Conductor."
canonical_route: "integrations/postgresql"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# PostgreSQL Integration with Orkes Conductor

!!! info "Available since"
    - v5.3.0 and later

Integrating PostgreSQL with Orkes Conductor lets you build workflows that interact with the PostgreSQL database using the following operations:

- Create Table
- Delete Table
- Insert Rows
- Update Rows
- Upsert Rows
- Select Rows
- Delete Rows
- Execute SQL

This guide explains how to set up and use the integration. Here's an overview:

1. Get the required credentials from PostgreSQL.
2. Configure a new PostgreSQL integration in Orkes Conductor.
3. Use PostgreSQL integration in workflows.

## Step 1: Get the PostgreSQL credentials

!!! note
    You can use this integration in either of the following scenarios:
    - [Conductor is running locally](/content/get-orkes-conductor#local-setup-with-docker), and PostgreSQL server is running locally.
    - Conductor is running in the cloud, and the PostgreSQL server is exposed via a secure tunnel or hosted on a cloud database service.

To integrate PostgreSQL with Orkes Conductor, get the following credentials from your PostgreSQL server:

- Host
- Port
- Database name
- User
- Password

## Step 2: Add an integration for PostgreSQL

After obtaining the credentials, add a PostgreSQL integration to your Conductor cluster.

**To create an integration:**

1. Go to **Integrations** > **Connected Apps** from the left navigation menu on your Conductor cluster.
2. Select **+ New integration**.
3. In the **Database** section, choose **PostgreSQL**.
4. Select **+ Add** and enter the following parameters:

| Parameter | Description | Required/Optional |
| --------- | ----------- | ----------------- |
| Integration name | A name for the integration. | Required. |
| Host | The PostgreSQL server hostname or IP address. | Required. |
| Port | The PostgreSQL server port. Default is 5432. | Required. |
| Database | The name of the database to connect to. | Required. |
| User | The PostgreSQL username. | Required. |
| Password | The password for the PostgreSQL user. | Required. |
| SSL Enabled | Whether to enable SSL/TLS for the connection. Set to `true` or `false`. Default is `false`. | Required. |
| Description | A description of the integration. | Required. |

<p align="center"><img src="/content/img/postgresql-integration.png" alt="PostgreSQL Integration with Orkes Conductor" width="60%" height="auto"></img></p>

5. (Optional) Toggle the **Active** button off if you don't want to activate the integration instantly.
6. Select **Save**.

## Step 3: Use PostgreSQL integration in workflows

Once the integration is ready, this can be used directly within the workflows.

**To use PostgreSQL integration in a workflow:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In your workflow, select the (**+**) icon and select **Connected Apps**.

<p align="center"><img src="/content/img/connected-apps.png" alt="Adding PostgreSQL Integration in Conductor workflow" width="100%" height="auto"></img></p>

4. In **Add Task** panel on the right, search for **PostgreSQL**, and select the integration created in [Step 2](/content/integrations/postgresql#step-2-add-an-integration-for-postgresql).

The following operations are available for use with this integration.

| Operation | Description |
| --------- | ----------- |
| [Create Table](/content/integrations/postgresql-operations#create-table) | Creates a new table in the database. |
| [Delete Table](/content/integrations/postgresql-operations#delete-table) | Deletes an existing table from the database. |
| [Insert Rows](/content/integrations/postgresql-operations#insert-rows) | Inserts one or more rows into a table. |
| [Update Rows](/content/integrations/postgresql-operations#update-rows) | Updates existing rows in a table. |
| [Upsert Rows](/content/integrations/postgresql-operations#upsert-rows) | Inserts rows or updates them if they already exist. |
| [Select Rows](/content/integrations/postgresql-operations#select-rows) | Retrieves rows from a table based on specified conditions. |
| [Delete Rows](/content/integrations/postgresql-operations#delete-rows) | Deletes rows from a table based on specified conditions. |
| [Execute SQL](/content/integrations/postgresql-operations#execute-sql) | Executes a raw SQL query against the database. |

5. Select the required operation, configure the parameters, and select **Save** > **Confirm**.
6. Select **Execute** to run the workflow.

For the complete operations parameters and output reference, see [PostgreSQL Operations Reference](/content/integrations/postgresql-operations).
