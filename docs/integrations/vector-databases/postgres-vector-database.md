---
slug: "/integrations/vector-databases/postgres-vector-database"
description: "Learn how to integrate Postgres Vector Database with your Orkes Conductor cluster."
---

# Integrating with Postgres Vector Database in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Orkes Conductor cluster with the necessary Vector Database models. 

PGvector is a popular open-source extension for PostgreSQL known for its efficiency and versatility in handling large-scale vector data. This integration empowers you to access, query, and manipulate vector data effectively, enhancing the capabilities of Orkes Conductor in various natural language processing and artificial intelligence applications. 

This guide will provide the steps for integrating Postgres as a Vector Database with Orkes Conductor.

## Steps to integrate with Postgres Database

Before beginning to integrate with Postgres, you need to get specific configuration parameters from Postgres, such as database username, password, and URL. Now, let’s integrate this with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+New integration** button from the top-right corner.
3. Under the **Vector Databases** section, choose **Postgres Vector Database**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-postgres-integration.png" alt="Create Postgres Integration" width="40%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | A name for the integration. |
| Postgres Database User | The database username. |
| Postgres Database Password | The password associated with the database username. |
| Postgres Database URL |The database URL. |
| Embedding dimensions | The number of dimensions in the embeddings. The embedding dimensions often depend on the AI model used to generate the embeddings. |
| Distance metric | Choose the distance metric, which is a metric to measure the similarity or distance between vectors. Supported values:<ul><li>Cosine Similarity</li><li>Euclidean Distance</li><li>Inner Product</li></ul> |
| Indexing method | Choose the indexing method. Supported methods:<ul><li>hnsv - Hierarchical Navigable Small World graphs</li><li>ivfflat - Inverted File Flat</li></ul> |
| Number of inverted lists to create for ivfflat index | The number of inverted lists to create when using the **_ivfflat_** indexing method. This parameter is only relevant if **_ivfflat_** is chosen as the indexing method. |
| Description | A description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding Indexes to Postgres Integration

Now that you have integrated your Orkes Conductor cluster with the Postgres provider, the next step is to integrate with the specific indexes. 

To add a new index to the Postgres integration:

1. Navigate to the integrations page and click the '+' button next to the integration you created.

<p align="center"><img src="/content/img/create-new-pgvector-integration-index.png" alt="Create Indexes for Postgres Integration" width="100%" height="auto"></img></p>

2. Click **+New Index**.
3. Provide the index name and an optional description.

<p align="center"><img src="/content/img/create-new-postgres-integration-index-model.png" alt="Create Indexes for Postgres Integration Model" width="60%" height="auto"></img></p>

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

<p align="center"><img src="/content/img/add-integration-permission-for-postgresvector-db.png" alt="Add Permissions for Postgres Vector Database Integration" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 