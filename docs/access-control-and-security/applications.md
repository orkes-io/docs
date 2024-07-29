# Enabling Security via Applications

Orkes has added a security layer called Applications, enabling the connection between the workers and the Orkes Conductor cluster. Every connection in/out of Orkes Conductor requires an authentication header with a JSON Web Token (JWT). This header is of the format: `'X-Authorization: <JWT Token>'`.

An application represents an entity interacting with the Conductor server via APIs or SDKs. Each application can have multiple access key and secret combinations, which are used to generate an authentication token for securing and controlling access to each API request.

This document provides a detailed guide on creating application-based control for your metadata as well as the process for generating JWT tokens for each application.

## Prototyping​

For quick testing on Orkes Conductor without creating an application, you can obtain a JWT token from the Orkes Conductor dashboard. Click the account button in the bottom left corner and select "Copy Token." This token remains valid for your current session and has the same access as your user account.

## Application

Each application can generate one or more sets of keys and secrets to produce a JWT token. Applications can grant access to entities such as workflows, tasks, secrets, environment variables, tags, domains, integrations, and prompts.

### Configuring Application​

To create a new application,

1. Navigate to **Access Control > Applications** from the left menu on your Orkes Conductor console.
2. Click **+ Create application** and provide an app name.
3. Click **Save** to create the application.

Depending upon your role, you can see two different role sections that can be granted to the application.

* Unrestricted roles: Can be granted only by an Admin.
* Application roles: Can be granted by anyone with access to Applications.

<p align="center"><img src="/content/img/app-roles.png" alt="App roles" width="80%" height="auto"></img></p>

General application roles include:

* **Worker**: Poll and update tasks. It requires Execute permissions on the tasks.
* **Metadata API**: Create and manage workflow and task definitions.
* **Application API**: Create and manage applications.

The application's behavior depends on the chosen role, so select roles based on your requirements.

Admins have additional unrestricted roles, such as:

- **Unrestricted Worker** - Poll, execute updates, maintain logs, and handle any task without any constraints
- **Metadata Manager** - Create, update, delete, and administer Workflow or Task definitions permissions.
- **Workflow Manager** - Responsible for managing the lifecycle of workflows within the system. Initiate, pause, resume, rerun, delete, and oversee any Workflow operation.
- **Application Manager** - Handles the creation, modification, and deletion of applications within the system.

### Generating Access Keys​

Once permissions are assigned, generate an **Access Key**:

1. Click **+ Create access key** to generate a unique Key Id and Key Secret.
2. The key secret is shown only once; copy and store it privately.

Once a key has been created, you can perform three actions on the key:

<p align="center"><img src="/content/img/actions-on-the-generated-key.jpg" alt="Generated Key in the Conductor" width="90%" height="auto"></img></p>

* **Copy** - Use the copy button to copy the key ID.
* **Pause** - Use the pause button to temporarily restrict access to the application. 
* **Delete** - Use the delete button to permanently remove the key.

### Adding Permissions​

In this section, you can provide the application with access to workflows, tasks, secrets, environment variables, tags, domains, integrations, and prompts. 

To grant permissions to the application:

1. Click **+Add Permission**.
2. Select the required metadata to have access to selected workflows, tasks, secrets, environment variables, tags, domains, integrations, and prompts.
3. Select all targets that the application needs access to.
4. Choose the required permissions for the selected targets.
   * **Read** - The user can view the entities, but cannot modify or run them.
   * **Create** - The user can create the entities.
   * **Update** - Allows the user to update the entities. Requires Metadata API role for this.
   * **Execute** - Allows the user to run the entities. Requires Worker role for this.
   * **Delete** - Allows the user to delete the entities. Requires Metadata API role for this.
5. Click **Add Permissions**.

## Generating Token​

Access keys can be used to create JWTs for authenticating connections to the Conductor server. All of the [Conductor SDKs](/content/category/sdks) support this authentication. When using a Conductor SDK, the key and secret are provided to the SDK, and the authentication is handled automatically.

Alternatively, create a JWT via an API call. Here's an example call to the Orkes Playground:

```c
curl -s -X "POST" "https://play.orkes.io/api/token" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{"keyId": "<your keyId>","keySecret": "<your secret>"}'

 {"token":"<JWT Token>"}
 ```

Sending the key Id and secret generates a JWT. This JWT can be used to make calls to the Orkes Conductor cluster. The header for authentication is `X-Authorization:`.


For example, this call to the **_super_weather_** workflow uses a JWT token to get the weather in Beverly Hills, CA:

```c
curl -s -X "POST" "https://play.orkes.io/api/workflow/super_weather" \
   -H 'Content-Type: application/json; charset=utf-8'  \
   -H 'X-Authorization:  <JWT Token>'\
   -d '{"zip": "90210"}'
   ```

## Example

<details><summary>Example Application Setup</summary>
<p>
Let’s consider that two programs have access to Orkes Conductor workflows. Both these workflows rely on a single task, i.e., Task X, which is performed by a worker application Worker X.

One way to handle this is to create a single application with access to Workflow 1, Workflow 2, and Task X and supply keys/secrets from the application to Program 1, Program 2, and Worker X. But this violates the principle of least privilege, where applications should only have access to the endpoints they require (E.g., Here Worker X should not have access to execute the two workflows).

<p align="center"><img src="/content/img/application_access_example.jpg" alt="Example application" width="90%" height="auto"></img></p>
In order to satisfy the principle of least privilege, we'll create 3 Applications.

1. Application **Worker X** with the EXECUTE permission for **Task X**. This allows the worker to poll the task queue for work.
2. Application **Program 1** with the EXECUTE permission for **Workflow 1** and **Task X** so that it can successfully invoke Workflow 1.
3. Application **Program 2** with the EXECUTE permission for **Workflow 2** and **Task X** so that it can successfully invoke Workflow 2.

The worker application has no access to the workflows - since this application only needs to poll the task. The other two applications have only the required access to execute the workflow and the tasks inside the specific workflow.
</p>
</details>