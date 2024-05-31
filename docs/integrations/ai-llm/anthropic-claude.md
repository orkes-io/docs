# Integrating with Anthropic Claude in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary AI and LLM models. 

Anthropic Claude offers a range of models that can be incorporated into the Orkes Conductor console. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the Anthropic Claude provider with Orkes Conductor.

## Steps to integrate with Anthropic Claude

Before beginning to integrate with Anthropic Claude, you need to generate the API key from the Anthropic Claude console.

To generate the API key:

1. Log in to the [Anthropic console](https://console.anthropic.com/).
2. Navigate to **API keys** and click **Create Key**.

<p align="center"><img src="/content/img/api-key-anthropic-claude.png" alt="API key from Anthropic Claude" width="100%" height="auto"></img></p>

3. Provide a secret name and generate the API key.

## Integrating with Anthropic Claude as a model provider

Let’s integrate the Anthropic Claude with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI/LLM** section, choose **Anthropic Claude**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-anthropic-claude-integration.png" alt="Create Anthropic Claude Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| API Key | Provide the API key to integrate Anthropic Claude with Orkes Conductor. [Refer to the previous section on how to generate the API keys](/content/integrations/ai-llm/anthropic-claude#steps-to-integrate-with-anthropic-claude). | 
| API Endpoint | Provide the API endpoint from the Cohere console. The base URL of the API endpoint is https://api.anthropic.com/v1. |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Anthropic Claude models to integration

You have now integrated your Conductor console with the Anthropic Claude provider. The next step is to integrate with the specific models. 

Anthropic Claude has different models: Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku, and more. Each model is intended for different use cases, such as text completion and generating embeddings.

Depending on your use case, you must configure the required model within your Anthropic Claude configuration.

To add a new model to the Anthropic Claude integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-anthropic-claude-integration-model-from-integrations-page.png" alt="Create Anthropic Claude Integration Model from Listed Integrations" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name and an optional description. The [complete list of models in Anthropic Claude is available here](https://docs.anthropic.com/en/docs/models-overview). 

<p align="center"><img src="/content/img/create-new-anthropic-claude-integration-model.png" alt="Create Anthropic Claude Integration Model" width="70%" height="auto"></img></p>

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

<p align="center"><img src="/content/img/rbac-anthropic-claude-integration.png" alt="Add Permissions for Integrations" width="70%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready, [start creating workflows](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::