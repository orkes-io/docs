# Integrating with Weaviate in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary Vector Database models. 

Weaviate is a renowned vector database celebrated for its efficiency and adaptability in managing extensive vector data. This integration equips you to seamlessly access, query, and manipulate vector data, thereby bolstering the capabilities of Orkes Conductor in a wide array of natural language processing and artificial intelligence applications.

This guide will provide the steps for integrating Weaviate with Orkes Conductor.

## Steps to integrate with Weaviate Database

Before beginning to integrate with Weaviate, you need to generate the API key. The API Keys can be obtained from the Weaviate cluster created. Check out the [official Weaviate documentation on how to create clusters](https://weaviate.io/developers/wcs/quickstart#create-a-weaviate-cluster). 

### Get the Weaviate API key & Endpoint

Once the clusters are created, you can get the API keys from the cluster details.

1. Navigate to the [Weaviate console](https://console.weaviate.cloud/dashboard).
2. Choose your cluster, and click the **Details** tab to expand the cluster details.

<p align="center"><img src="/content/img/get-weaviate-api-key.png" alt="Get Weaviate API Key" width="100%" height="auto"></img></p>

3. Under **Enabled** option, click **API keys** and copy your keys.
4. Copy the Cluster URL, which is your **_Weaviate Endpoint_**, while configuring in Orkes Conductor.

## Integrating with Weaviate as a provider

Now, you have the API key. Let’s integrate this with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **Vector Databases** section, choose **Weaviate**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-weaviate-integration.png" alt="Create Weaviate Integration" width="60%" height="auto"></img></p>

|  Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| API Key | Provide the API key copied previously. |
| Endpoint | Provide the cluster URL copied previously. |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Classes to Weaviate Integration

Now, you have integrated your Conductor console with the Weaviate provider. The next step is integrating with the specific classes. 

To add a new class to the Weaviate integration:

1. Navigate to the integrations page and click the '+' button next to the integration you created.

<p align="center"><img src="/content/img/create-new-weaviate-integration-class.png" alt="Create Classes for Weaviate Integration" width="100%" height="auto"></img></p>

2. Click **+New Class.**
3. Provide the class name and an optional description.

<p align="center"><img src="/content/img/create-new-weaviate-integration-class-model.png" alt="Create New Class for Weaviate Integration Model" width="60%" height="auto"></img></p>

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

<p align="center"><img src="/content/img/add-integration-permission-for-weaviate-db.png" alt="Add Permissions for Weaviate Database Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 