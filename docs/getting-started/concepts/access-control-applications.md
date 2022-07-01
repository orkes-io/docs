---
sidebar_position: 4
---

# Access Control: Applications

With [Orkes Cloud](https://orkes.io/cloud), your Conductor server may be running in a different hosted environment than your workers.  The API endpoints to control/run and edit your workflows, and the task polling queues are exposed on the internet - so restricting access is is required.

To ensure that all workflow executions & worker tasks are only run by authorized users, Orkes has added a layer of Access Control to all parts of the Orchestration workflow lifecycle.

> **EVERY** connection in/out of Orkes Cloud requires an Authentication header with a JWT token.  This header has the format: `'X-Authorization:  <JWT Token>'`.

IN this document, we will walk through the steps to create application based control of your workflows and tasks, as well as the process to generate JWT tokens for each application.

## Prototyping

If you are looking for a quick way to test on Orkes Cloud without creating an application, you can obtain a JWT token from the Cloud dashboard. Click the account button in the upper right corner, and select `Copy Token`.  This token remains valid for your current session in Orkes Cloud - and has the same access as your user account.

<p align="center"><img src="/content/img/copy_token.jpg" alt="screenshot of user menu in Orkes Cloud" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>


## Application

In the context of Access control, an application is how you grant access to a workflow or task.  Each application is able to generate one or more sets of a key and secret, and these parameters are used to generate the JWT token. 

Each application can generate one or more sets Access Keys for access control to the application.  An application can grant access to workflows, tasks or both. 

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/0QgnwYMtNj8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

### Configuring your Application

Create a new application from Orkes Cloud by clicking `Applications`, and then by clicking the `Create Application` button.

Once your application is created, click the edit button next to its name:

<p align="center"><img src="/content/img/empty_application.jpg" alt="Starting off with an empty Orkes Cloud application" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Application Roles

When an application is created, tasks and workflows are chosen that can be run under the auspices of the application.  There are several roles in the Access Control (Role Based Access Control or RBAC) that can be turned on and off in the UI:

* **Worker**: Poll and update Tasks. (Default on)
* **Metadata API**: Create and manage Workflow and Task Definitions. (Default off)
* **Application API**: Create and manage Applications & Access Keys. (Default off)

### Access Keys

Once your application's permission levels are created, access must be granted to the application.  This is done by generating an ```Access Key```.  This will generate a unique Key and Secret that can be used to access the application.  These values are only shown once, so keep them in s secure location.


<p align="center"><img src="/content/img/application_secret.png" alt="application key and secret" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Once a key has been created, the table of Access Keys allows for 2 actions:

* **Pausing the key**:  Temporarily restrict access.  Access can be resumed by "un-pausing" the key access.
* **Delete the key**:  Permanently remove access.  This cannot be undone.  A new key will have to be generated.

<p align="center"><img src="/content/img/application_keytable.png" alt="application key and secret" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Workflow & Task permissions

Each workflow/task in the application can have different permissions:

* **Read** - User can see the workflow/task, but cannot modify or run. 
* **Execute** - Allows the user to run the workflow or task. Requires **Worker** Role to be on.
* **Update** - Allows the user to update to the workflow/task. Requires **Metadata API** Role to be on.
* **Delete** = Allows the user to delete to the workflow/task. Requires **Metadata API** Role to be on.

To add a Workflow/Task permission, click the ```+``` at the top of the  ```Workflow/Task permission``` table.   A box will open, and can be populated with a workflow or task type, the name of the item, and the permission.

<p align="center"><img src="/content/img/application_permission.png" alt="permission dialog" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

> Note: When adding tasks, you can specify a [domain](http://localhost:3000/content/docs/codelab/taskToDomain). This allows you to direct all traffic to a specific instance of a task - without specifying in the API.

Once all of the workflows and tasks have been added, the table will display the selection. The application below is set for running the [order fulfillment codelab](/content/docs/codelab/orderfulfillment).

<p align="center"><img src="/content/img/all_permissions.png" alt="permissions table" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>


It is possible to add, change and remove workflow/task access from this table.


## Generating a Token

The Access Key & Secret created above can be used to create a Java Web Token (JWT) that is used to authenticate the user, and allow a connection to the Conductor server.  All of the [Conductor SDKs](https://github.com/conductor-sdk/) support this authentication step. When using a Conductor SDK, the Key & Secret is provided to the SDK, and the authentication is handled automatically.

Outside of the SDK, a JWT may be created via an API call.  Here's an example call to the [Orkes Playground](https://play.orkes.io):

```bash
curl -s -X "POST" "https://play.orkes.io/api/token" \
   -H 'Content-Type: application/json; charset=utf-8' \
   -d '{"keyId": "<your keyId>","keySecret": "<your secret>"}'

  {"token":"<JWT Token>"}
```

Sending the keyId and Secret generates a JWT. This JWT can be used to make calls to the Conductor instance.  The header for authentication is ```X-Authorization:```.

For example, this call to the ```super_weather``` workflow uses a JWT token to get the weather in Beverly Hills, CA:

```bash
curl -s -X "POST" "https://play.orkes.io/api/workflow/super_weather" \
    -H 'Content-Type: application/json; charset=utf-8'  \
    -H 'X-Authorization:  <JWT Token>'\
    -d '{"zip": "90210"}'
```


## Example Application setup

Let's walk through the Application setup for the following example:

We have 2 programs that access 2 Conductor workflows.  These workflows both rely on `task_x` that is performed by a worker application `Worker_x`.

We could create one application with access to Workflow_1, Workflow_2 and task_x, and supply keys/secrets from the one application's access keys to Program_1, Program_2 and Worker_x.  But this violates the principal of least privilege, where applications should only have access to the endpoints they require (e.g. worker_x should not have access to execute the two workflows). 

<p align="center"><img src="/content/img/application_access_example.jpg" alt="Example application" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

To satisfy the principle of least privilege, we'll create 3 Applications.

1. Application `WorkerX` will be given `EXECUTE` permission for task_x. This allows the worker to poll the task queue for work.
2. Application `Program1` will be given `EXECUTE` permission for Workflow_1 and task_x. so that it can successfully invoke `workflow_1`.
3. Application `Program2`will be given `EXECUTE` permission for Workflow_2 and task_x, so that it can successfully invoke `workflow_2`.

The worker application has no access to the workflows - since this application only needs to poll the task.  The two applications have the minimum access to execute the workflow and the tasks inside the workflow.