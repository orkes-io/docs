import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Managing Applications

An application represents an application that interacts with a Conductor cluster via APIs or SDKs. The application layer in Conductor provides application-based access to resources in your cluster. 

Each application can also have one or more access key/secret pairs, which are used to grant access to Conductor SDK and API. Learn more about authentication in [Authentication and Access Keys](/sdks/authentication).


## Application roles

By default, all applications can manage workflow and task executions if they have access to the required resources. For example, an application can execute `someWorkflow` long as Execute permission is granted for those resources. Likewise, an application can view workflow executions if Read permission is granted.

Application roles grant additional access on top of this default behavior and should be selected only if your application is used for another purpose besides managing workflow executions. These additional application roles should be selected based on your application requirements. There are two categories of application roles available: 

<Tabs>
<TabItem value="application roles" label="Application Roles">

Application roles can be added by any user with access to applications. General application roles include:
* **Worker**—Poll and execute tasks that it has Execute permissions for.
    This role should be granted to a task worker application that is responsible for polling and executing a task.
* **Metadata API**—Create and manage workflow and task metadata.
    This role should be granted to an application that is responsible for retrieving and managing workflow and task definitions, such as for testing or CI/CD integration purposes.
* **Application API**—Create and manage applications.
    This role should be granted to an application that is responsible for managing other applications in the cluster.

</TabItem>

<TabItem value="unrestricted roles" label="Unrestricted Roles">

Unrestricted roles can only be added by an Admin. Unrestricted roles include:
* **Unrestricted Worker**—Poll, execute updates, maintain logs, and handle any task without any constraints
* **Metadata Manager**—Create, update, delete, and grant permissions to any workflow or task definition in the cluster.
* **Workflow Manager**—Manage the lifecycle of workflows within the system. Start, pause, resume, rerun, and delete any workflow execution.
* **Application Manager**—Manage applications in the cluster, such as creating, modifying, and deleting applications.
* **Admin**—Create, read, modify, delete, and execute this particular application.

</TabItem>
</Tabs>

<p align="center"><img src="/content/img/RBAC/app-roles.png" alt="App roles" width="80%" height="auto"></img></p>


## Configuring applications

Configure the application’s roles and permissions to control what your application can do and what resources it can access, including workflows, tasks, secrets, environment variables, tags, domains, integrations, and prompts.

**To configure an application:**
1. Create an application.
    1. In the left navigation menu, go to **Access Control** > **Applications**.
    2. Select **(+) Create application**.
    3. Enter the application name.
    4. Select **Save**.
    The application has been created. You can proceed to add roles or permissions to the application.
2. Generate access keys.
    1. In the Access Keys section, select **+ Create access key** to generate a unique keyId and keySecret. The Key Secret is shown only once, so make sure to copy and store it securely.
3. Add roles to the application.
    1. In the Application Roles or Unrestricted Roles section, toggle the different application roles for your application.
4. Add permissions to grant application-level access to resources.
    1. In the Permissions section, select **+ Add Permission**.
    2. Toggle between each resource type and select the resources to provide access to.
    3. Toggle the access levels for your selected resource:
        * **Read**—The application will be able to view the resource.
        * **Update**—The application will be able to update the resource. The application must also have the Metadata API role to update metadata resources.
        * **Execute**—The application will be able to execute the resource. The application must also have the Worker role to execute resources.
        * **Delete**—The application will be able to delete the resource. The application must also have the Metadata API role to delete metadata resources.

:::tip
You can grant permissions to **tags**, rather than to individual resources. Tags can be added to multiple resources, so that when you grant a permission to a tag, it instantly provides access to all tagged resources. Learn more about tags in [Managing Tags](/access-control-and-security/tags).
:::

<br/>
<center><iframe width="510" height="300" src="https://www.youtube.com/embed/PY34TcVzof0?si=ANSHZW6IMVDx1rI9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></center>

## Example application setup

<details><summary>Example</summary>

In this example, two programs have access to Orkes Conductor workflows. Both of these workflows rely on the same task, Task X, which is performed by a worker application, Worker X.


<p align="center"><img src="/content/img/RBAC/application_access_example.jpg" alt="Example application" width="90%" height="auto"></img></p>


One way to handle this is to create a single application with Execute access to Workflow 1, Workflow 2, and Task X and provide the application keys/secrets to Program 1, Program 2, and Worker X. However, this setup violates the principle of least privilege, where applications should only have access to the endpoints they require. In this case, Worker X should not have Execute access for the workflows.

To satisfy the principle of least privilege, we will create three applications instead:
1. **Application Worker X**—Has the Worker role and Execute permission for Task X. This allows the worker to poll the task queue for work.
2. **Application Program 1**—Has Execute permission for Workflow 1 and for Task X so that it can successfully invoke Workflow 1. No additional application role is required.
3. **Application Program 2**—Has Execute permission for Workflow 2 and for Task X so that it can successfully invoke Workflow 2. No additional application role is required.

With this set-up, the worker application has no access to the workflows, since it only needs to poll the task. Likewise, the other two applications only have the required access to execute the workflow and its necessary tasks, and no other workflows.
</details>