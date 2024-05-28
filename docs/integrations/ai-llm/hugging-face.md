# Integrating with Hugging Face in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary AI and LLM models.

Hugging Face is a multimodal language provider that helps in facilitating various natural language processing tasks including, but not limited to translation, summarization, and text generation. This platform, characterized by its sophisticated algorithms, operates as a tool for addressing a spectrum of linguistic challenges with precision and accuracy.

This guide will provide the steps for integrating the Hugging Face provider with Orkes Conductor.

## Steps to integrate with Hugging Face

Before beginning to integrate with Hugging Face, you need to generate the API key from Hugging Face.

### Get the Hugging Face API key

1. Navigate to the [Hugging Face platform](https://huggingface.co/).
2. Create an account or sign up with your existing account.
3. Click on your account name from the top-right corner, and click **Settings**.
4. Navigate to **Access Tokens** and click **New token**.

<p align="center"><img src="/content/img/view-api-keys-hf.png" alt="Get API Keys in Hugging Face platform" width="90%" height="auto"></img></p>

5. Generate the token by providing a name for the token and choosing the read/write permissions.
6. Copy the generated token.

### Create Endpoints in Hugging Face

Check out the official documentation on [creating endpoints in Hugging Face](https://huggingface.co/docs/inference-endpoints/guides/create_endpoint).

## Integrating with Hugging Face as a model provider

Now, you have the API key. Let’s integrate this with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI / LLM** section, choose **Hugging Face**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-hugging-face-integration.png" alt="Create new Hugging Face Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| API Key | Provide the API key copied previously. |
| Namespace | Provide the namespace of your hugging face account. You can get the namespace from your account details by navigating to the top right corner of your account and copying the username, which is your namespace. | 
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Hugging Face models to the integration

Now, you have integrated your Conductor console with the Hugging Face provider. The next step is integrating with the specific models. 

Depending on your use case, you must configure different models within your Hugging Face configuration.

To add a new model to the Hugging Face integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-model-for-hugging-face-integration.png" alt="Create new model for Hugging Face Integration" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name, endpoint (the one you created in the previous step), and an optional description for the model. You can get the [complete list of models in Hugging Face here](https://huggingface.co/models).

<p align="center"><img src="/content/img/creating-new-model-for-hugging-face-integration.png" alt="Creating new model for Hugging Face Integration" width="60%" height="auto"></img></p>

4. Click the **Active** checkbox to enable the model immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in LLM tasks within Orkes Conductor.

## RBAC - Governance on who can use Integrations

Now, the integration with the required models is ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor console. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor console.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission.**
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/add-integration-permission-for-hugging-face.png" alt="Add Permissions for Hugging Face Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready, [start creating workflows](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::