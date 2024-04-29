# Integrating with Cohere in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary AI and LLM models. 

Cohere offers a range of models that can be incorporated into the Orkes Conductor console. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the Cohere provider with Orkes Conductor.

## Steps to integrate with Cohere


Before beginning to integrate with Cohere, you need to generate the API key & get the API endpoint from the Cohere console.

To generate the API key:

1. Log in to the [Cohere console](https://dashboard.cohere.com/api-keys).
2. Navigate to **_API keys_** and generate the API key.

The base URL for Cohere is https://api.cohere.ai/v1, which serves as the API Endpoint for integrating with Cohere.

## Integrating with Cohere as a model provider

Let’s integrate Cohere with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration button** from the top-right of your window.
3. Under the **AI/LLM** section, choose **Cohere**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-cohere-integration.png" alt="Create Cohere Integration" width="60%" height="auto"></img></p>

| Parameter | Description |
| --------- | ----------- |
| Integration name | Provide a name for the integration. |
| API Key | Provide the API key to integrate Cohere with Orkes Conductor. [Refer to the previous section on how to generate the API keys](#steps-to-integrate-with-cohere). | 
| API Endpoint | Provide the API endpoint from your Cohere console. The base URL of the API endpoint is of the format: https://api.cohere.ai/v1. |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Cohere models to integration

You have now integrated your Conductor console with the Cohere provider. The next step is to integrate with the specific models. 
Cohere AI has different models: command, command-r, embed, and more. Each model is intended for different use cases, such as text completion and generating embeddings.

Depending on your use case, you must configure the required model within your Cohere configuration.

To add a new model to the Cohere integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-cohere-integration-model-from-integrations-page.png" alt="Create Cohere Integration Model from Listed Integrations" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name and an optional description for the model. [You can get the complete list of models in Cohere here](https://docs.cohere.com/docs/command-beta). 

<p align="center"><img src="/content/img/create-new-cohere-integration-model.png" alt="Create Cohere Integration Model" width="60%" height="auto"></img></p>

4. Toggle-on the **Active** button to enable the model immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in LLM tasks within Orkes Conductor.

## RBAC - Governance on who can use Integrations

The integration with the required models is now ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor console. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor console.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/rbac-cohere-integration.png" alt="Add Permissions for Integrations" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready to use, [start creating workflows](https://orkes.io/content/getting-started/first-workflow-application) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::