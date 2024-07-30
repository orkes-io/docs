# Integrating with Google Vertex AI in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Orkes Conductor cluster with the necessary AI and LLM models. 

Google Vertex AI offers a range of models that can be incorporated into the Orkes Conductor cluster. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the Google Vertex AI provider with Orkes Conductor.

## Steps to integrate with Google Vertex AI

Before beginning the integration process in Orkes Conductor, you must obtain specific configuration credentials, such as project ID and Service Account JSON, from the GCP console.

To get the project ID:

1. Login to [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. If you have multiple projects, click the drop-down menu on the top left of the console to select your desired project. 
3. The Project ID will be displayed on the dashboard below the project name.

<p align="center"><img src="/content/img/get-project-id.png" alt="Get project ID from Google Cloud Console" width="100%" height="auto"/></p>

Refer to the [official documentation on creating and managing projects in GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects) for more details.

To get the Service Account JSON:

1. From the left menu, navigate to the [IAM & Admin](https://console.cloud.google.com/iam-admin) section.
2. Select **Service Accounts** from the left menu.
3. Click on an existing service account you want to use or create a new one.
4. Under the **Keys** sub-tab, click **_Add Key_**.

<p align="center"><img src="/content/img/get-service-account-json.png" alt="Get Service Account JSON from Google Cloud Console" width="100%" height="auto"/></p>

5. Choose the option **Create new key**.
6. Choose the key type as JSON and click **Create** to generate the JSON key.

<p align="center"><img src="/content/img/get-service-account-json-key.png" alt="Get Service Account JSON key from Google Cloud Console" width="100%" height="auto"/></p>

## Integrating with Google Vertex AI as a model provider

Let’s integrate Google Vertex AI with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+New integration** button from the top-right corner.
3. Under the **AI / LLM** section, choose **Google Vertex AI**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-vertex-ai-integration.png" alt="Create new Vertex AI Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | A name for the integration. |
| Project ID | The project ID in GCP. |
| Location | The Google Cloud region of your GCP account. |
| Publisher | The publisher name in GCP. |
| Service Account JSON | Upload the Service Account JSON file, which is a key file containing the credentials for authenticating the Orkes Conductor cluster with the GCP services. [Refer to the previous section on how to generate the service account JSON](/content/integrations/ai-llm/vertex-ai#steps-to-integrate-with-google-vertex-ai). | 
| Description | A description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Google Vertex AI models to the integration

Now, you have integrated your Orkes Conductor cluster with the Google Vertex AI provider. The next step is integrating with the specific Vertex AI models. 

Google Vertex AI has different models, such as Bison, Gecko, etc. Each model is to be used for different use cases, such as text completion, generating embeddings, etc.

Depending on your use case, you must configure different models within your Google Vertex AI configuration.

To add a new model to the Google Vertex AI integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-model-for-vertex-ai-integration.png" alt="Create new model for Vertex AI Integration" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name and an optional description for the model. The complete [list of models in Google Vertex AI is available here](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/models). 

<p align="center"><img src="/content/img/creating-new-model-for-vertex-ai-integration.png" alt="Creating new model for Vertex AI Integration" width="60%" height="auto"></img></p>

4. Toggle-on the **Active** button to enable the model immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in LLM tasks within Orkes Conductor.

## RBAC - Governance on who can use Integrations

Now, the integration with the required models is ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor cluster. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/add-integration-permission-for-vertex-ai.png" alt="Add Permissions for Vertex AI Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready, [start creating workflows](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::