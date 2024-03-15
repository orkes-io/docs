# Integrating with Pinecone in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary Vector Database models. 

Pinecone is a popular vector database known for its efficiency and versatility in handling large-scale vector data. This integration empowers you to access, query, and manipulate vector data effectively, enhancing the capabilities of Orkes Conductor in various natural language processing and artificial intelligence applications.

This guide will provide the steps for integrating Pinecone with Orkes Conductor.

## Steps to integrate with Pinecone Database

Before beginning to integrate with Pinecone, you need to get specific configuration parameters from the Pinecone console.

### Get Configuration Credentials from Pinecone

1. Navigate to the [Pinecone console](https://app.pinecone.io/).
2. Create a project and note the project ID generated. 

<p align="center"><img src="/content/img/project-name.png" alt="Getting Project ID from Pinecone console" width="50%" height="auto"></img></p>

3. Navigate to **API Keys** and click **+ Create API Key**. 

<p align="center"><img src="/content/img/create-api-key-from-pinecone-db.png" alt="API Key creation from Pinecone Console" width="100%" height="auto"></img></p>

4. Provide a name for the key and click **Create Key**. Copy the API key generated.
5. Next, from **Indexes** on the left menu, create a new index and note the environment.

<p align="center"><img src="/content/img/get-environment-name.png" alt="Get environment name from Pinecone console" width="100%" height="auto"></img></p>

Check out Pinecone's [official documentation](https://docs.pinecone.io/docs/overview) for more details.

## Integrating with Pinecone as a provider

Now, you have the API key. Let’s integrate this with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **Vector Databases** section, choose **Pinecone**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-pinecone-integration.png" alt="Create Pinecone Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| API Key | Provide the [API key copied previously](/content/integrations/vector-databases/pinecone#get-configuration-credentials-from-pinecone). |
| Project Name | Provide the [project ID copied previously](/content/integrations/vector-databases/pinecone#get-configuration-credentials-from-pinecone). |
| Environment | Provide the environment name. Refer to the previous section on [how to get the environment name](/content/integrations/vector-databases/pinecone#get-configuration-credentials-from-pinecone). |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Indexes to Pinecone Integration

Now, you have integrated your Conductor console with the Pinecone provider. The next step is integrating with the specific indexes. 

To add a new index to the Pinecone integration:

1. Navigate to the integrations page and click the '+' button next to the integration you created.

<p align="center"><img src="/content/img/create-new-pinecone-integration-index.png" alt="Create Indexes for Pinecone Integration" width="100%" height="auto"></img></p>

2. Click **+New Index**.
3. Provide the index name and an optional description. In case your account hasn’t configured any indexes yet, check out the Pinecone documentation on [how to configure indexes within your Pinecone console](https://docs.pinecone.io/docs/manage-indexes#creating-an-index).

<p align="center"><img src="/content/img/create-new-pinecone-integration-index-model.png" alt="Create Indexes for Pinecone Integration Model" width="60%" height="auto"></img></p>

4. Turn on the **Active** button to enable the model immediately.
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

<p align="center"><img src="/content/img/add-integration-permission-for-vector-db.png" alt="Add Permissions for Vector Database Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 