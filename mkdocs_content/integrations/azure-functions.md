---
title: "Azure Functions Integration with Orkes Conductor"
description: "Learn how to integrate Azure Functions with Orkes Conductor to automate your workflows and manage your Azure functions directly from Conductor."
canonical_route: "integrations/azure-functions"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Azure Functions Integration with Orkes Conductor

!!! info "Available since"
    - v5.3.0 and later

Integrating Azure Functions with Orkes Conductor lets you build workflows that interact with your Azure Functions using the following operations:

- List Function Apps
- Get Function App Details
- List Functions In App
- Get Function Details
- Invoke HTTP Function

This guide explains how to set up and use the integration. Here's an overview:

1. Get the required credentials from Azure portal.
2. Configure a new Azure Functions integration in Orkes Conductor.
3. Use Azure Functions integration in workflows.

## Step 1: Get the Azure Portal credentials

To integrate Azure Functions with Orkes Conductor, you need a Subscription ID, Tenant ID, Client ID, and Client Secret from the Azure portal.

**Prerequisites:**
- Azure subscription with Function Apps

**To create a Service Principal and collect credentials:**

1. Log in to the [Azure portal](https://portal.azure.com) and navigate to **Microsoft Entra ID**.
2. Go to **Manage** > **App registrations** > **+ New registration**.
3. Give your application a name and select **Register**.
4. Copy the **_Application (client) ID_**, which is your **Client ID**.
5. Copy the **_Directory (tenant) ID_**, which is your **Tenant ID**.
6. Within the application, go to **Certificates & secrets** > **+ New client secret**.
7. Add a description, set an expiration, select **Add**, and copy the secret value immediately, as it won't be shown again. This is your **Client Secret**.
8. Go to your **Subscription** > select your subscription > **Access control (IAM)** > **+ Add** > **Add role assignment**.
9. Assign the **Reader** role (minimum) or **Contributor** role (recommended) to the application you just registered. This grants the application, referred to as a Service Principal in Azure, permission to access your Azure resources.
10. Go to **Subscriptions** and copy your **Subscription ID**.

## Step 2: Add an integration for Azure Functions

After obtaining the credentials, add an Azure Functions integration to your Conductor cluster.

**To create an integration:**

1. Go to **Integrations** > **Connected Apps** from the left navigation menu on your Conductor cluster.
2. Select **+ New integration**.
3. In the **Cloud** section, choose **Azure Functions**.
4. Select **+ Add** and enter the following parameters:

| Parameter | Description | Required/Optional |
| --------- | ----------- | ----------------- |
| Integration name | A name for the integration. | Required. |
| Subscription ID | The subscription ID retrieved from the Azure portal in [Step 1](/content/integrations/azure-functions#step-1-get-the-azure-portal-credentials). | Required. |
| Tenant ID | The tenant ID retrieved from the Azure portal in [Step 1](/content/integrations/azure-functions#step-1-get-the-azure-portal-credentials). | Required. |
| Client ID | The client ID retrieved from the Azure portal in [Step 1](/content/integrations/azure-functions#step-1-get-the-azure-portal-credentials). | Required. |
| Client Secret | The client secret retrieved from the Azure portal in [Step 1](/content/integrations/azure-functions#step-1-get-the-azure-portal-credentials). | Required. |
| Default Resource Group | The default resource group to use. | Optional. |
| Description | A description of the integration. | Required. |

<p align="center"><img src="/content/img/azure-functions-integration.png" alt="Azure Functions Integration with Orkes Conductor" width="60%" height="auto"></img></p>

5. (Optional) Toggle the **Active** button off if you don't want to activate the integration instantly.
6. Select **Save**.

## Step 3: Use Azure Functions integration in workflows

Once the integration is ready, this can be used directly within the workflows.

**To use Azure Functions integration in a workflow:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In your workflow, select the (**+**) icon and select **Connected Apps**.

<p align="center"><img src="/content/img/connected-apps.png" alt="Adding Azure Functions Integration in Conductor workflow" width="100%" height="auto"></img></p>

4. In **Add Task** panel on the right, search for **Azure Functions**, and select the integration created in [Step 2](/content/integrations/azure-functions#step-2-add-an-integration-for-azure-functions).

The following operations are available for use with this integration.

| Operation | Description |
| --------- | ----------- |
| [List Function Apps](/content/integrations/azure-functions-operations#list-function-apps) | Lists all Function Apps in the subscription or a specific resource group. |
| [Get Function App Details](/content/integrations/azure-functions-operations#get-function-app-details) | Retrieves detailed information about a specific Function App. |
| [List Functions In App](/content/integrations/azure-functions-operations#list-functions-in-app) | Lists all functions within a specific Function App. |
| [Get Function Details](/content/integrations/azure-functions-operations#get-function-details) | Retrieves configuration and metadata for a specific function within a Function App. |
| [Invoke HTTP Function](/content/integrations/azure-functions-operations#invoke-http-function) | Invokes an HTTP-triggered Azure Function with a custom request. |

5. Select the required operation, configure the parameters, and select **Save** > **Confirm**.
6. Select **Execute** to run the workflow.

For the complete operations parameters and output reference, see [Azure Functions Operations Reference](/content/integrations/azure-functions-operations).
