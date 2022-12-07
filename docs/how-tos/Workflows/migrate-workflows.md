---
sidebar_position: 1
---

# How to migrate Workflows/Tasks between different Environments in Conductor?

Certain situations may demand recreating the same workflows over and over in various environments. The process of workflow recreation is a time-consuming task. To tackle such scenarios, you can leverage Conductor's Meta Data Migration.

Meta Data Migration allows you to seamlessly migrate tasks/workflows between different environments, thereby facilitating the smooth running of your business operations. It comes into use in situations such as when a feature is to be tested before deploying it into production. So, once the feature is built, it can be moved from the development to the testing environment and later into the production environment.

This document deals with the steps involved in migrating tasks/workflows between different environments.

## Create Secrets & Environments

Let’s consider that you are migrating a workflow/task from **Environment A** to **Environment B**. Environments are nothing but different Conductor servers.

Initially, you need to include the environment details to which the workflow is being migrated in your current environment. Here, your current environment is A, and the workflow is being migrated to B. 

Before beginning with the environment creation, you need to add the token of environment B as a [Secret](https://orkes.io/content/docs/how-tos/Workflows/create-secrets) in environment A. 

### Adding Secrets

In your Environment A,
1. Navigate to **MORE > Secrets** and click **Add Secret**.
2. You may fill in the following fields:
    * **Secret Name** - Provide a name to identify your secret from your console.
    * **Secret Value** - Copy and paste your token from Environment B.
        * To copy the token, click on the drop-down option near your profile icon in Environment B.
        * Copy the token. This token is to be given under the field **Secret Value**. 

<center><img src="/content/img/copying-the-token.jpg" alt="Copying the token from the second environment" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

> **Info**:
>Note that the secret key is copied from Environment B and pasted as a secret in Environment A.


### Creating Environment

In your current environment, i.e., Environment A,
1. From the left menu, navigate to **METADATA MIGRATION > Environments**.
2. Click **New Environment**.

<center><img src="/content/img/creating-a-new-environment.jpg" alt="Creating a new enviornment" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

3. You may fill in the following fields:
    * **Environment Id** - Provide a name to identify the environment.
    * **Token (secret)** - Choose the previously added secret here. (The token of the Environment B).
    * **URI** - Provide the conductor server URI of Environment B. 
4. Click **Add**.

## Configuring Migration Request

The next step is configuring the migration request process.

1. Navigate to **METADATA MIGRATION > Migration Request**.
2. Under **Target Environment**, choose the environment you’ve created previously. 
3. Select the workflows and tasks to be migrated.
4. Click **Create Migration**.

<center><img src="/content/img/creating-migration-request.jpg" alt="Creating a migration request" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

5. The Workflow gets created. Click on the Workflow ID to view the Workflow status.
6. The outgoing migration request is successfully completed.

## Verifying Migration Request

Once your migration request is successfully completed in Environment A, you can verify the same from Environment B.

1. In Environment B, navigate to **WORKFLOWS > Executions**. You can view your incoming migration request workflow on the executions page. Click on the workflow ID to view the workflow. 
2.  Once the incoming migration request is successfull, go to **WORKFLOWS > Definitions** in Environment B and verify that your migrated workflow has been listed here. 

<center><img src="/content/img/migrated-workflow-in-new-environment.jpg" alt="Migrated Workflow in new environment" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

3. Similarly, you can also verify the task migration from the **Task Definitions** page.
