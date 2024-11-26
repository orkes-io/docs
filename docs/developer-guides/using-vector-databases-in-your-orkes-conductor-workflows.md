# Using Vector Databases

In this guide, we’ll provide an overview of Vector Databases and how Orkes makes it easy for developers to use Vector DBs for AI tasks in your applications. We will go through the concepts, where and how vector DBs add capabilities for your AI-powered applications, and how to get started.

## Vector Databases and Embeddings

A Vector Database is a type of database specifically designed to store and query vectors or multi-dimensional data. Vectors are mathematical entities with an ordered set of numerical values, often representing points or data in a multi-dimensional space. 

Embeddings are a core primitive that you will be using when working with vector databases. An embedding is a representation of input data (e.g., a blob of text) that is converted into an array of numbers known as vectors. This combination of numbers represented as a vector acts as a multi-dimensional map that can then be used to find its similarity in relation to other embeddings. 

Creating embeddings for a particular input is typically a service provided by a language model. E.g., Azure Open AI has an API that takes in input text and returns the associated embedding. Once the embeddings are created, they must be stored in a database. They can then also be queried, and other embeddings can be provided to find matches from the existing embeddings inside the database.

Namespaces and indexes are important concepts when working with vector databases. They play a crucial role in organizing and efficiently querying the embeddings or vectors stored in the database.

A namespace is a logical grouping or categorization of embeddings within a vector database. They are used to segregate different types of data or embeddings. They provide a way to organize and manage data more effectively, especially in cases where you have diverse sets of embeddings to store and query. This grouping comes in providers like Pinecone.

Indexes are the next level in the hierarchical data structures built on top of the embeddings in a vector database to optimize retrieval and query performance. They help you quickly locate and retrieve embeddings based on their similarity to a given query vector. In vendors like Pinecone, it's termed as indexes; in vendors like Weaviate, it's termed as classes.

## Vector Databases and AI Orchestration

Vector databases play a crucial role in AI orchestration, particularly in scenarios like Retrieval-Augmented Generation (RAG) and other Natural Language Processing (NLP) tasks. In AI orchestration, the goal is to combine multiple AI models and components to work together seamlessly. Vector databases, which store and manage high-dimensional vector representations of data, offer several key advantages in this context.

One of the primary reasons vector databases are essential in AI orchestration is their ability to efficiently store and retrieve embeddings, which are compact vector representations of data. These embeddings are central to various AI models and applications, including RAG, where they capture the essence of documents, queries, and other data sources. Vector databases are optimized for fast similarity search and retrieval of vectors, making them ideal for tasks like identifying relevant documents in a knowledge base for generating responses in NLP models. This capability is critical for enhancing the performance of AI systems that rely on embeddings.

Moreover, vector databases support the management and versioning of embeddings, allowing AI orchestrators to maintain and update the vector representations as new data becomes available or models evolve. This dynamic management of embeddings is crucial for AI orchestration's adaptability and continuous improvement.

In AI orchestration for RAG, a typical scenario might involve a vector database that stores embeddings of a knowledge base, such as a collection of text documents. When a user query is received, the orchestration system can quickly search this database for relevant documents, retrieve their embeddings, and use them to augment the generation process of the response. 

## Integrating with Vector Databases

Before using all these functions of vector databases in your Orkes Conductor workflows, you need to integrate your cluster with vector databases from specific providers. Popular vector database providers such as **Pinecone**, **Weaviate**, **Postgres Vector Database**, and **Mongo Vector Database** are natively supported in Orkes Conductor (more coming soon). Once the database is configured, you can configure the required indexes to be used in your applications. Indexes are the highest-level organizational unit of vector data (similar to the TABLE concept in a relational database).

For example, if you are using Pinecone as the vector database, then you can configure different indexes within the Pinecone configuration. 

### Steps to Integrate Vector Databases with Orkes Conductor

The first step is integrating the required vector databases with your Orkes Conductor cluster. 

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+New integration** button from the top-right of your window.
3. Under the **Vector Databases** section, choose from the required provider. 

<p align="center"><img src="/content/img/add-integrations-for-dbs.png" alt="Add New Integrations for Databases" width="100%" height="auto"></img></p>

4. Click **+Add** and provide the required parameters for the chosen provider.
5. Enable the **Active** button to activate the integration instantly.
6. Click **Save**.

:::note
Currently, we support integration with popular models Pinecone, Weaviate, Postgres Vector Database, and Mongo Vector Database. The integration parameters to be configured differ with these models. Refer to the [Vector DB Integrations](/content/category/integrations/vector-databases) document for detailed steps to integrate each model.
:::

## RBAC - Governance on who can use Integrations

Now, the integration with the required vector database is ready. Next, we should determine the access control to these models. 

Orkes Conductor has built-in access controls that specify which users or applications in an organization can use various resources available in the cluster. One supported resource type is an integrated vector database like the one above. Having this level of granularity in access control for databases ensures that its usage is done in a well-governed manner in an organization.

The permission can be granted to applications/groups within the Orkes Conductor. 

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Integrations** tab, select the required integrations with the necessary permissions. 

<p align="center"><img src="/content/img/add-integration-permission-for-vector-db.png" alt="Add Permissions for Integrations with Vector Database" width="60%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

## Using Vector Databases in LLM Tasks in Orkes Conductor

The Vector Databases integrated are now ready to be used in your workflows in Orkes Conductor. To do that, you must add the system tasks requiring a vector database while creating workflows in Orkes Conductor.

The following system tasks require a vector database to be configured:

- [LLM Get Embeddings](/content/reference-docs/ai-tasks/llm-get-embeddings)
- [LLM Store Embeddings](/content/reference-docs/ai-tasks/llm-store-embeddings)
- [LLM Search Index](/content/reference-docs/ai-tasks/llm-search-index)
- [LLM Index Document](/content/reference-docs/ai-tasks/llm-index-document)
-  [LLM Index Text](/content/reference-docs/ai-tasks/llm-index-text)

### Creating Workflow with LLM Tasks

If you are creating the workflow via the UI method,

1. Navigate to **Definitions > Workflow** from the left menu on your Orkes Conductor cluster. 
2. Click **+Define Workflow** from the top-right corner. 
3. Click **Start** on the diagram and add the required system task based on your use case.
4. Choose the configured vector database and indexes.

<p align="center"><img src="/content/img/llm-kitchen-sink-workflow.png" alt="Workflow showing LLM tasks" width="60%" height="auto"></img></p>

5. Set the required temperature, topP, stop words, and token limit.
6. **Save** the workflow.

### Running Workflow

1. From the left menu, click **Run Workflow**.
2. Choose your workflow name and the version.
3. Provide the required input parameters.
4. Click **Run Workflow**.