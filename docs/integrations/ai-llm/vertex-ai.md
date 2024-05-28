# Integrating with Google Vertex AI in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary AI and LLM models. 

Google Vertex AI offers a range of models that can be incorporated into the Orkes Conductor cluster. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the Google Vertex AI provider with Orkes Conductor.

## Steps to integrate with Google Vertex AI

:::note
Google Vertex AI integration is compatible with GCP clusters only.
:::

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI / LLM** section, choose **Google Vertex AI**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-vertex-ai-integration.png" alt="Create new Vertex AI Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| Location | Provide the Google Cloud region of your GCP account. |
| Project ID | Provide the project ID in GCP. |
| Publisher | Provide the publisher name in GCP. |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Google Vertex AI models to the integration

Now, you have integrated your Conductor console with the Google Vertex AI provider. The next step is integrating with the specific Vertex AI models. 

Google Vertex AI has different models, such as Bison, Gecko, etc. Each model is to be used for different use cases, such as text completion, generating embeddings, etc.

Depending on your use case, you must configure different models within your Google Vertex AI configuration.

To add a new model to the Google Vertex AI integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-model-for-vertex-ai-integration.png" alt="Create new model for Vertex AI Integration" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name and an optional description for the model. The complete [list of models in Google Vertex AI is available here](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/models). 

<p align="center"><img src="/content/img/creating-new-model-for-vertex-ai-integration.png" alt="Creating new model for Vertex AI Integration" width="60%" height="auto"></img></p>

4. Click the **Enable** checkbox to enable the model immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in LLM tasks within Orkes Conductor.

## RBAC - Governance on who can use Integrations

Now, the integration with the required models is ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor console. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor console.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/add-integration-permission-for-vertex-ai.png" alt="Add Permissions for Vertex AI Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready, [start creating workflows](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::