# Integrating with OpenAI in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary AI and LLM models. 

OpenAI offers a range of models that can be incorporated into the Orkes Conductor cluster. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the widely-used OpenAI provider with Orkes Conductor.

## Steps to integrate with OpenAI

Before beginning to integrate with OpenAI, you need to generate the API key from OpenAI.

### Get the OpenAI API key

1. Navigate to the [OpenAI platform](https://platform.openai.com/).
2. Create an account or sign up with your existing account.
3. Click on your account name from the top-right corner, and click **View API keys**.

<p align="center"><img src="/content/img/view-api-keys.png" alt="View API Keys in OpenAI API platform" width="100%" height="auto"></img></p>

4. Click **+Create new secret key**.

<p align="center"><img src="/content/img/create-new-api-key.png" alt="Create new API Keys in OpenAI API platform" width="100%" height="auto"></img></p>

5. Provide a name for your secret and click **Create secret key**.
6. Copy and keep your generated key safely, as they would be shown only once.

## Integrating with OpenAI as a model provider

Now, you have the API key. Let’s integrate this with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI / LLM** section, choose OpenAI. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-open-ai-integration.png" alt="Create new OpenAI Integration" width="100%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| API Key | Provide the API key copied previously. |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding OpenAI models to the integration

Now, you have integrated your Conductor console with the OpenAI provider. The next step is integrating with the specific OpenAI models. 

OpenAI has different models, such as text-davinci-003, text-embedding-ada-002, gpt-35-turbo and more. Each model is to be used for different use cases, such as text completion, generating embeddings, etc.

Depending on your use case, you must configure different models within your OpenAI configuration.

To add a new model to the OpenAI integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-model-for-open-ai-integration.png" alt="Create new model for OpenAI Integration" width="100%" height="auto"></img></p>

2. Click **+New model.**
3. Provide the model name and an optional description for the model. You can get the [complete list of models in OpenAI here](https://platform.openai.com/docs/models/overview). 

<p align="center"><img src="/content/img/creating-new-model-for-open-ai-integration.png" alt="Creating new model for OpenAI Integration" width="70%" height="auto"></img></p>

4. Click the Enable checkbox to enable the model immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in [LLM tasks](/content/category/reference-docs/ai-tasks) within Orkes Conductor.

## RBAC - Governance on who can use Integrations

Now, the integration with the required models is ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor console. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor console.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/add-integration-permission-for-azure-open-ai.png" alt="Add Permissions for Azure OpenAI Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 
