---
slug: "/integrations/ai-llm/mistral"
description: "Learn how to integrate Mistral with your Orkes Conductor cluster."
---

# Integrating with Mistral in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Orkes Conductor cluster with the necessary AI and LLM models. 

Mistral AI offers a range of models that can be incorporated into the Orkes Conductor cluster. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the Mistral provider with Orkes Conductor.

## Steps to integrate with Mistral

Before beginning to integrate with Mistral, you need to generate the API key & get the API endpoint from the Mistral console.

To get the API key:

1. Log in to the [Mistral console](https://console.mistral.ai/).
2. Navigate to **_API keys_** and generate the API key.

## Integrating with Mistral as a model provider

Let’s integrate Mistral with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+New integration** button from the top-right corner.
3. Under the **AI/LLM** section, choose **Mistral**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-mistral-integration.png" alt="Create Mistral Integration" width="70%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | A name for the integration. |
| API Key | The API key to integrate Mistral with Orkes Conductor. Refer to the previous section on how to generate the API keys. |
| API Endpoint | The API endpoint from your Mistral console. It is of the format: https://api.mistral.ai/v1 for open-source Mistral setup. Check out the [official Mistral documentation](https://docs.mistral.ai/) for more details on getting endpoints for Mistral Cloud. |
| Description | A description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Mistral models to the integration

Now, you have integrated your Orkes Conductor cluster with the Mistral provider. The next step is integrating with the specific models. 

Mistral AI has different models, such as Mistral 7B, Mixtral 8x7B, Mixtral 8x22B, and more. Each model is intended for different use cases, such as text completion and generating embeddings.

Depending on your use case, you must configure the required model within your Mistral configuration.

To add a new model to the Mistral integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-mistral-integration-model-from-integrations-page.png" alt="Create Mistral Integration Model from Listed Integrations" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name and an optional description for the model. The complete [list of models in Mistral is available here](https://docs.mistral.ai/getting-started/models/). 

<p align="center"><img src="/content/img/create-new-mistral-integration-model.png" alt="Create Mistral Integration Model" width="70%" height="auto"></img></p>

4. Toggle-on the **Active** checkbox to enable the model immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in LLM tasks within Orkes Conductor.

## RBAC - Governance on who can use Integrations

The integration with the required models is now ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor cluster. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **_+Add Permission_**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/rbac-mistral-integration.png" alt="Add Permissions for Integrations" width="70%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready, [start creating workflows](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::