---
title: "Azure Storage Integration with Orkes Conductor"
description: "Learn how to integrate Azure Storage with Orkes Conductor to automate your workflows and manage your Azure storage directly from Conductor."
canonical_route: "integrations/azure-storage"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Azure Storage Integration with Orkes Conductor, Azure Storage Integration with Orkes Conductor integration, Azure Storage Integration with Orkes Conductor workflow automation"
---

# Azure Storage Integration with Orkes Conductor

!!! info "Available since"
    - v5.3.0 and later

Integrating Azure Storage with Orkes Conductor lets you build workflows that interact with your Azure Storage using the following operations:

- List Containers
- Create Container
- Delete Container
- List Blobs
- Upload Blob
- Upload Blob From URL
- Get Blob Properties
- Download Blob
- Delete Blob

This guide explains how to set up and use the integration. Here's an overview:

1. Get the required credentials from Azure portal.
2. Configure a new Azure Storage integration in Orkes Conductor.
3. Use Azure Storage integration in workflows.

## Step 1: Get the Azure Portal credentials

To integrate Azure Storage with Orkes Conductor, you need the Azure Storage connection string.

**To retrieve the connection string:**

1. Log in to [Azure portal](https://portal.azure.com).
2. From the left navigation pane, select **Storage accounts**.
3. Select a storage account or create a new one.
4. Open your storage account and navigate to **Security + networking** > **Access keys** from the left navigation menu.
5. Select **Show**, then copy the **Connection string** for *key1* or *key2*.

<p align="center"><img src="/content/img/connection-string-azure-portal.png" alt="Retrieving connection string from Azure portal." width="100%" height="auto"></img></p>

6. Store the connection string securely.

## Step 2: Add an integration for Azure Storage

After obtaining the credentials, add an Azure Storage integration to your Conductor cluster.

**To create an integration:**

1. Go to **Integrations** > **Connected Apps** from the left navigation menu on your Conductor cluster.
2. Select **+ New integration**.
3. In the **Cloud** section, choose **Azure Storage**.
4. Select **+ Add** and enter the following parameters:

| Parameter | Description | Required/Optional |
| --------- | ----------- | ----------------- |
| Integration name | A name for the integration. | Required. |
| Connection String | The connection string copied from the Azure portal in [Step 1](/content/integrations/azure-storage#step-1-get-the-azure-portal-credentials). | Required. |
| Description | A description of the integration. | Required. |

<p align="center"><img src="/content/img/azure-storage-integration.png" alt="Azure Storage Integration with Orkes Conductor" width="60%" height="auto"></img></p>

5. (Optional) Toggle the **Active** button off if you don't want to activate the integration instantly.
6. Select **Save**.

## Step 3: Use Azure Storage integration in workflows

Once the integration is ready, this can be used directly within the workflows.

**To use Azure Storage integration in a workflow:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In your workflow, select the (**+**) icon and select **Connected Apps**.

<p align="center"><img src="/content/img/connected-apps.png" alt="Adding Azure Storage Integration in Conductor workflow" width="100%" height="auto"></img></p>

4. In **Add Task** panel on the right, search for **Azure Storage**, and select the integration created in [Step 2](/content/integrations/azure-storage#step-2-add-an-integration-for-azure-storage).

The following operations are available for use with this integration.

| Operation | Description |
| --------- | ----------- |
| [List Containers](/content/integrations/azure-storage-operations#list-containers) | Lists all blob containers in the storage account. |
| [Create Container](/content/integrations/azure-storage-operations#create-container) | Creates a new blob container in the storage account. |
| [Delete Container](/content/integrations/azure-storage-operations#delete-container) | Deletes a blob container and all its contents from the storage account. |
| [List Blobs](/content/integrations/azure-storage-operations#list-blobs) | Lists blobs in a container with optional prefix filtering and pagination support. |
| [Upload Blob](/content/integrations/azure-storage-operations#upload-blob) | Uploads base64-encoded content as a blob to a container in the storage account. |
| [Upload Blob From URL](/content/integrations/azure-storage-operations#upload-blob-from-url) | Uploads a blob to a container by fetching content from a URL. |
| [Get Blob Properties](/content/integrations/azure-storage-operations#get-blob-properties) | Retrieves the properties of a specific blob in the storage account. |
| [Download Blob](/content/integrations/azure-storage-operations#download-blob) | Downloads a blob from the configured storage account as base64-encoded content. |
| [Delete Blob](/content/integrations/azure-storage-operations#delete-blob) | Deletes a blob from a container in the configured storage account. |

5. Select the required operation, configure the parameters, and select **Save** > **Confirm**.
6. Select **Execute** to run the workflow.

For the complete operations parameters and output reference, see [Azure Storage Operations Reference](/content/integrations/azure-storage-operations).
