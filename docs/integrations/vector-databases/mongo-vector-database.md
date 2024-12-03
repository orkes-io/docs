---
slug: "/integrations/vector-databases/mongo-vector-database"
description: "Learn how to integrate Mongo Vector Database with your Orkes Conductor cluster."
---

# Integrating with Mongo Vector Database in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Orkes Conductor cluster with the necessary Vector Database models. 

Atlas Vector Search from MongoDB is a full-featured vector database known for building intelligent applications powered by semantic search and generative AI over any type of data. This integration empowers you to access, query, and manipulate vector data effectively, enhancing the capabilities of Orkes Conductor in various natural language processing and artificial intelligence applications. 

This guide will provide the steps for integrating MongoDB’s Atlas Vector Search as a Vector Database with Orkes Conductor.

## Steps to integrate with MongoDB Atlas Vector Search

Before integrating with Atlas Vector Search, you must get specific configuration parameters, such as [MongoDB Atlas connection string](https://www.mongodb.com/docs/manual/reference/connection-string/#find-your-mongodb-atlas-connection-string) and database name. 

Once you have the parameters, let’s integrate this with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+New integration** button from the top-right corner.
3. Under the **Vector Databases** section, choose **Mongo Vector Database**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-mongo-integration.png" alt="Create MongoDB Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | A name for the integration. |
| MongoDB Atlas connection string | The MongoDB Atlas connection string. Check out the official MongoDB documentation on [how to get the Atlas connection string](https://www.mongodb.com/docs/manual/reference/connection-string/#find-your-mongodb-atlas-connection-string). It will be of the format: **_mongodb+srv://username:password@cluster0.mongodb.net/_**. |
| Database name | The database name to store and query vector data. |
| Embedding dimensions | The number of dimensions in the embeddings. The embedding dimensions often depend on the AI model used to generate the embeddings. |
| Distance metric | Choose the distance metric, which is a metric to measure the similarity or distance between vectors. Supported values:<ul><li>Cosine Similarity</li><li>Euclidean Distance</li><li>Dot Product</li></ul> |
| Number of nearest neighbours | The number of nearest neighbours to be used during the search. |
| Description | A description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Indexes to MongoDB Atlas Vector Search Integration

Now that you have integrated your Orkes Conductor cluster with the MongoDB Atlas Vector Search provider, the next step is to integrate with the specific indexes. 

To add a new index to the integration:

1. Navigate to the integrations page and click the '+' button next to the integration you created.

<p align="center"><img src="/content/img/create-new-mongo-integration-index.png" alt="Create Indexes for MongoDB Integration" width="100%" height="auto"></img></p>

2. Click **+New Index**.
3. Provide the index name and an optional description.

<p align="center"><img src="/content/img/create-new-mongo-integration-index-model.png" alt="Create Indexes for MongoDB Integration Model" width="60%" height="auto"></img></p>

4. Toggle-on the **Active** button to enable immediately.
5. Click **Save**.

This ensures the integration model is saved for future use in LLM tasks within Orkes Conductor.

## RBAC - Governance on who can use Integrations

The integration with the required models is now ready. Next, we should determine the access control to these models. 

The permission can be granted to applications/groups within the Orkes Conductor cluster. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the required permissions. 

<p align="center"><img src="/content/img/add-integration-permission-for-mongo-db.png" alt="Add Permissions for Mongo Vector Database Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 