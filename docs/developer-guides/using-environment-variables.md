# Using Environment Variables

Environment variables are essential for managing variables that need to be frequently accessed across multiple workflows. By storing these variables globally, they can be reused, making workflows more efficient and easier to manage.

## Creating Environment Variables

Environment variables can be created and stored in Orkes Conductor, that can be accessed later when required. 

To create an environment variable:

1. From Orkes Conductor cluster, go to the **Definitions > Environment Variable**s from the left menu. 
2. Click **+New Environment Variable** from the top-right corner of the page.
3. Provide the following details:

<p align="center"><img src="/content/img/creating-new-environment-variable.png" alt="Creating new environment variable in Orkes Conductor" width="100%" height="auto"></img></p>

* **Name** - A unique identifier for the variable. This name will be used for referencing the variable in workflow definitions.
* **Value** - The value to be stored as the variable.
* **Value Type** - Choose between **_Plain Text_** or **_JSON_**.

4. Click **Add** to save the variable. 

## Using Environment Variables in Workflows

Once an environment variable is created, it can be utilized within workflows using the following syntax:

```
${workflow.env.variable-name}
```

Replace **variable-name** with the actual environment variable name.

## Adding Tags to Environment Variables

Tags can be used to provide permissions in bulk for the environment variables, allowing for access control via groups/applications.

To add tags to the environment variables:

1. Navigate to **Definitions > Environment Variables** and click on the tag icon next to the required variable.

<p align="center"><img src="/content/img/adding-tags-to-environment-variable.png" alt="Adding tags to environment variable in Orkes Conductor" width="100%" height="auto"></img></p>

2. Provide a name for the tag in the format **_key:value_** and click **Save**.

<p align="center"><img src="/content/img/tag-format-environment-variable.png" alt="Tag format in environment variable" width="100%" height="auto"></img></p>

The tags are now added to the variable and can be utilized where bulk permission is required. [Check out the documentation to learn more about providing bulk permissions using tags](https://orkes.io/content/access-control-and-security/tags#using-tags-for-permission-sharing-in-bulk).

## RBAC - Governance on who can access Environment Variables

Access to the environment variables can be granted via Groups/Applications in Orkes Conductor.

To provide explicit permission to Groups:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. Under the **Env variables** tab, select the required variables with the required permissions.

<p align="center"><img src="/content/img/rbac-environment-variable.png" alt="RBAC for environment variable" width="50%" height="auto"></img></p>

5. Click **Add Permissions**. This ensures that all the group members can access these environment variables in their workflows.

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Sample Workflow

<details><summary>Example Workflow</summary>
<p>

To illustrate the use of environment variables in a workflow, consider the following variable stored in Orkes Conductor.

<p align="center"><img src="/content/img/sample-environment-variable.png" alt="Sample environment variable" width="50%" height="auto"></img></p>

To pass the variable as a parameter, you can define a workflow referencing the environment variable as shown below:

```json
{
 "name": "sample-workflow",
 "description": "Workflow to demonstrate passing variables through environment variables",
 "version": 1,
 "tasks": [
   {
     "name": "http",
     "taskReferenceName": "http_ref",
     "inputParameters": {
       "uri": "${workflow.env.sample-url}",
       "method": "GET",
       "connectionTimeOut": 3000,
       "readTimeOut": "3000",
       "accept": "application/json",
       "contentType": "application/json",
       "encode": true
     },
     "type": "HTTP"
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "name@example.com"
}
```

The line **"uri": "${workflow.env.sample-url}"**, indicates that the URI for the HTTP task is referred from the environment variable “sample-url” created before.

Run the workflow using the **Run Workflow** button from Conductor UI. 

From the workflow execution page, you can verify that the stored variable has been passed as the URI for the HTTP task by clicking on the task and verifying the input parameters.

<p align="center"><img src="/content/img/sample-environment-variable-used.png" alt="Verifying sample environment variable used in workflow definition" width="100%" height="auto"></img></p>

</p>
</details>