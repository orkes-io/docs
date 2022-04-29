
# Access Control

With [Orkes Cloud](https://orkes.io/cloud), your Conductor server may be running in a different hosted environment than your workers.  The endpoints to run your workflows are API points that are exposed on the internet.

To ensure that all workflow executions & worker tasks are only run by authorized users, Orkes has added a layer of Role Based Access Control to all parts of the Orchestration workflow lifecycle.

## Applications

In the context of Access control, an application is a collection of workflows and their respective tasks.  Each application will have its own set of Access Keys.

### Workflow & Task permissions

When an application is created, tasks and workflows are chosen that can be run under the auspices of the application.

Each workflow/task in the application can have different permissions:

* **Read** - User can see the workflow/task, but cannot modify or run.
* **Execute** - Allows the user to run the workflow or task.
* **Update** - Allows the user to update to the workflow/task.
* **Delete** = Allows the user to delete to the workflow/task.

#### Example

Click ```Applications``` and then ```Create Application```.  To add a Workflow/Task permission, click the ```+``` at the top of the  ```Workflow/Task permission``` table.   A box will open, and can be populated with a workflow or task type, the name of the item, and the permission.

<p align="center"><img src="/content/img/application_permission.png" alt="permission dialog" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Once all of the workflows and tasks have been added, the table will display them all. This application is set for running the [order fulfillment codelab](/content/docs/codelab/orderfulfillment).

<p align="center"><img src="/content/img/all_permissions.png" alt="permissions table" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>


It is possible to add, change and remove workflow/task access from this table.

### Access Keys

Once your application's permission levels are created, access must be granted to the application.  This is done by generating an ```Access Key```.  This will generate a unique Key and Secret that can be used to access the application.  These values are only shown once, so keep them in s secure location.


<p align="center"><img src="/content/img/application_secret.png" alt="application key and secret" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Once a key has been created, the table of Access Keys allows for 2 actions:

* **Pausing the key**:  Temporarily restrict access.  Access can be resumed by "un-pausing" the key access.
* **Delete the key**:  Permanently remove access.  This cannot be undone.  A new key will have to be generated.

<p align="center"><img src="/content/img/application_keytable.png" alt="application key and secret" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>


## Using Access Keys

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



## Users & Groups

> Note: This feature currently only available to Admins of a Conductor instance. 

To access Users and Groups, click Users in the left navigation menu.

### Users

A user can have the following roles:

* **Admin** - Full access to the Conductor instance.
* **User** - Access to user's workflows and tasks (and any shared Applications)
* **Metadata Manager** - An "admin" for metadata. Can Create/Update/Delete **any** workflow or task.
* **Workflow Manager** - Can Run/pause/rerun **any** workflow.


<p align="center"><img src="/content/img/create_user.png" alt="Create application user" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Groups

Groups are a way to quickly share Workflows&tasks amongst your team. Create a new group, and add users with the same permission level for many tasks and workflows.  

Each group has 3 tables:

* **Members**: The members of the group can be selected from all of the accounts affiliated with the Conductor instance.

Once a group of members has been created, two types of access can be given: **Roles** and **Workflow and Task Permissions**.  

> Note: It is possible to only grant one type of access to a Group - meaning that just roles OR just Workflow and Task Permissions can be added. 

#### **Roles**: Admin, User, Metadata Manager, Workflow Manager

If a Role is defined for these members, they will all be given this role for the Conductor instance.  For example, if **Admin** is selected, all members of the group are now admins.

#### **Workflow and Task Permissions**: Tasks and workflows to be shared amongst the group. The permission levels are the same as for [Applications](#applications).

When Workflows and Tasks are added to the group, every member of the group will be able to execute these workflows and tasks - allowing easy sharing of processes in the team.

