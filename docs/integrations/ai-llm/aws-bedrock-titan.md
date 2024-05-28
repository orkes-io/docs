# Integrating with AWS Bedrock Titan in Orkes Conductor

To effectively utilize AI and LLM tasks in Orkes Conductor, it's essential to integrate your Conductor cluster with the necessary AI and LLM models. 

AWS Bedrock Titan offers a range of models that can be incorporated into the Orkes Conductor console. The choice of model depends on your unique use case, the functionalities you require, and the specific natural language processing tasks you intend to tackle. 

This guide will provide the steps for integrating the AWS Bedrock Titan provider with Orkes Conductor.

## Steps to integrate with AWS Bedrock Titan

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials from your AWS account. 

- AWS Account ID & region where the resource is located. 
- Amazon Resource Name (ARN) to setup the connection.
- External ID - When you assume a role belonging to another account in AWS, you need to provide the external ID, which can be used in an IAM role trust policy to designate the person to assume the role. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html). 
- [Access Key & Secret from AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). 

## Integrating with AWS Bedrock Titan as a model provider

Let’s integrate AWS Bedrock Titan with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor console.
2. Click **+New integration** button from the top-right of your window.
3. Under the **AI/LLM** section, choose **AWS Bedrock Titan**. 
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/create-new-aws-bedrock-titan-integration.png" alt="Create AWS Bedrock Titan Integration" width="60%" height="auto"></img></p>

| Parameters | Description |
| ---------- | ----------- | 
| Integration name | Provide a name for the integration. |
| Connection type | Choose the required connection type. Depending upon how the connection is to be established, it can take the following values:<ul><li>**Current Conductor Role** - Choose this if you are using the current Conductor role to establish the connection.</li><li>**Assume External Role** - Choose this if you are assuming a role belonging to another AWS account. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).</li><li>**Access Key/Secret** - Choose this if you are establishing the connection using the access key and secret.</li></ul> | 
| Region | Provide the valid AWS region where the resource is located. |
| Account ID | Provide your AWS Account ID. This field is optional. |
| Role ARN | Specify the Amazon Resource Name (ARN) required to set up the connection.<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Assume External Role_**. |
| External ID | If applicable, provide the external ID to assume the role.<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Assume External Role_**. |
| Access key | Provide the AWS Access key.<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Access Key/Secret_**. |
| Access secret | Provide the AWS Access secret.<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Access Key/Secret_**. |
| Description | Provide a description of your integration. |

5. You can toggle-on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Adding AWS Bedrock Titan models to integration

You have now integrated your Conductor console with the AWS Bedrock Titan provider. The next step is to integrate with the specific models. 

AWS Bedrock Titan has different models: Amazon Titan Text Premier, Amazon Titan Text Express, Amazon Titan Text Lite, and more. Each model is intended for different use cases, such as text completion and generating embeddings.

Depending on your use case, you must configure the required model within your AWS Bedrock Titan configuration.

To add a new model to the AWS Bedrock Titan integration:

1. Navigate to the integrations page and click the '+' button next to the integration created.

<p align="center"><img src="/content/img/create-new-aws-bedrock-titan-integration-model-from-integrations-page.png" alt="Create AWS Bedrock Titan Integration Model from Listed Integrations" width="100%" height="auto"></img></p>

2. Click **+New model**.
3. Provide the model name and an optional description for the model. The complete [list of models in AWS Bedrock Titan is available here](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html). 

<p align="center"><img src="/content/img/create-new-aws-bedrock-titan-integration-model.png" alt="Create AWS Bedrock Titan Integration Model" width="70%" height="auto"></img></p>

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

<p align="center"><img src="/content/img/rbac-aws-bedrock-titan-integration.png" alt="Add Permissions for Integrations" width="70%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows. 

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application). 

:::note
Once the integration is ready, [start creating workflows](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) with [LLM tasks](https://orkes.io/content/category/reference-docs/ai-tasks).
:::