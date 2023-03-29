# Enabling Security via Applications

Orkes has added a security layer called Applications, enabling the connection between the workers and the Conductor instance. Every connection in/out of Orkes Conductor requires an authentication header with a JSON Web Token (JWT). This header is of the format: `'X-Authorization: <JWT Token>'`.

This document will walk you through the steps to create application-based control for your workflows and tasks and the process to generate JWT tokens for each application.

## Prototyping​

If you are looking for a quick way to test on Orkes Conductor without creating an application, you can obtain a JWT token from the Conductor dashboard. Click the account button in the top right corner, and select **Copy Token**. This token remains valid for your current session and has the same access as your user account.

## Application

Each application can generate one or more sets of keys and secrets, and these parameters are used to generate the JWT token. An application can grant access to workflows, tasks, secrets & tags.

### Configuring Application​

To create a new application,
1. From the left menu navigation, choose **ACCESS CONTROL > Applications**.
2. Click **Create Application** and provide an app name.
3. Once your application is created, click the edit button next to its name.


The following roles can be granted to the application.
* **Worker**: Poll and update tasks. It requires EXECUTE permissions on the tasks.
* **Metadata API**: Create and manage workflow and task definitions.
* **Application API**: Create and manage applications.

### Generating Access Keys​
Once your application's permission levels are chosen, access must be granted to the application. This is done by generating an Access Key. Click **Create Access Key** to generate a unique **Key Id** and **Key Secret**. These values are shown only once, so ensure to copy the credentials and store them privately.

Once a key has been created, you can perform two actions on the key:

<p align="center"><img src="/content/img/actions-on-the-generated-key.jpg" alt="Generated Key in the Conductor" width="90%" height="auto"></img></p>

* **Pause** - Use the pause button to restrict access to the application temporarily. You can resume this access by un-pausing.
* **Delete** - Use the delete button to remove the key permanently. It is a one-time action that cannot be undone.

### Adding Permissions​
In this section, you can provide the application with access to workflows, tasks, secrets, or tags. To add the permissions,
1. Click **+Add Permission** from the **Workflow and Task Permissions** section.
2. In the pop-up window, choose the required **Target Type** from Workflow/Task/Secret/Tag.
3. Select all targets that the application needs access to.

4. Choose the required permissions for the selected targets.
* **Read** - The user can view the workflow/task/secret/tags, but cannot modify or run them.
* **Create** - The user can create the workflow/task/secret/tags.
* **Update** - Allows the user to update the workflow/task/secret/tags. Requires Metadata API role for this.
* **Execute** - Allows the user to run the workflow/task/secret/tags. Requires Worker role for this.
* **Delete** - Allows the user to delete the workflow/task/secret/tags. Requires Metadata API role for this.
5. Once they have been added, the table will display the selection. It is possible to add, change or remove access from here.

:::note 
When providing permission for tasks, you can specify a domain. This allows you to direct all traffic to a specific task instance without specifying it in the API.
:::

## Generating Token​

The access keys created above can be used to create JWT to authenticate the user and allow a connection to the Conductor server. All of the [Conductor SDKs](https://github.com/conductor-sdk/) support this authentication step. When using a Conductor SDK, the Key & Secret are provided to the SDK, and the authentication is handled automatically.

A JWT may be created outside of the SDK via an API call. Here's an example call to the Orkes Playground:


```c
curl -s -X "POST" "https://play.orkes.io/api/token" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{"keyId": "<your keyId>","keySecret": "<your secret>"}'

 {"token":"<JWT Token>"}
 ```

 Sending the Key Id and Secret generates a JWT. This JWT can be used to make calls to the Conductor instance. The header for authentication is **X-Authorization:**.

For example, this call to the **super_weather** workflow uses a JWT token to get the weather in Beverly Hills, CA:

```c
curl -s -X "POST" "https://play.orkes.io/api/workflow/super_weather" \
   -H 'Content-Type: application/json; charset=utf-8'  \
   -H 'X-Authorization:  <JWT Token>'\
   -d '{"zip": "90210"}'
   ```

### Token Expiry​
Currently, these generated tokens do not have an expiry, but this is subject to change, and it is expected that in the future, these tokens will expire after a period of time.

## Example

<details><summary>Example Application Setup</summary>
<p>
Let’s consider that two programs have access to Conductor workflows. Both these workflows rely on a single task, i.e., Task X, which is performed by a worker application Worker X.

One way to handle this is to create a single application with access to Workflow 1, Workflow 2, and Task X and supply keys/secrets from the application to Program 1, Program 2, and Worker X. But this violates the principle of least privilege, where applications should only have access to the endpoints they require (E.g., Here Worker X should not have access to execute the two workflows).

<p align="center"><img src="/content/img/application_access_example.jpg" alt="Example application" width="90%" height="auto"></img></p>
In order to satisfy the principle of least privilege, we'll create 3 Applications.

1. Application **Worker X** with the EXECUTE permission for **Task X**. This allows the worker to poll the task queue for work.
2. Application **Program 1** with the EXECUTE permission for **Workflow 1** and **Task X** so that it can successfully invoke Workflow 1.
3. Application **Program 2** with the EXECUTE permission for **Workflow 2** and **Task X** so that it can successfully invoke Workflow 2.

The worker application has no access to the workflows - since this application only needs to poll the task. The other two applications have only the required access to execute the workflow and the tasks inside the specific workflow.
</p>
</details>