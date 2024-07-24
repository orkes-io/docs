# Managing Tags in Conductor

Tags are metadata in Conductor, formatted as `key:value`, that can be applied to various entities like tasks, workflows, schedulers, secrets, webhooks, AI prompts, environment variables, integrations, and applications. Tags help in bulk permission sharing by associating permissions with specific tags.

## Adding Tags to Entities

You can add or remove tags for various entities using similar steps. Follow the instructions below based on the type of entity you wish to tag:

* Workflows
* Tasks
* Schedulers
* Secrets
* Webhooks
* AI Prompts
* Environment Variables

Steps to add a tag:

1. Navigate to **Definitions** from the left menu on your Orkes Conductor cluster.
2. Select **Workflow / Task / Scheduler / Secrets / Webhook / AI prompts / Environment Variables** depending on the entity you want to tag.
3. Locate the specific entity you wish to tag.
4. In the **Actions** column, click the tag icon.

<p align="center"><img src="/content/img/adding-tags-to-workflow.png" alt="Adding a tag to an already created workflow" width="90%" height="auto"></img></p>

5. This opens a pop-up window where you can add a new tag. Enter a tag in the `key:value` format and press enter to create it. To remove a tag, click the "x" next to the tag.

<p align="center"><img src="/content/img/editing-tags-in-conductor.png" alt="Editing a tag" width="60%" height="auto"></img></p>

## Adding Tags to Integrations

To add a tag to an integration:

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Locate the specific integration you wish to tag.
3. In the **Actions** column, click the tag icon.

<p align="center"><img src="/content/img/adding-tags-integrations.png" alt="Adding tags to integrations" width="90%" height="auto"></img></p>

4. This opens a pop-up window where you can add a new tag. Enter a tag in the `key:value` format and press enter to create it. To remove a tag, click the "x" next to the tag.

<p align="center"><img src="/content/img/tag-format-integrations.png" alt="Adding/Editing tags in integrations" width="70%" height="auto"></img></p>

## Adding Tags to Applications

To add a tag to an application:

1. Navigate to **Access Control > Applications** from the left menu on your Orkes Conductor cluster.
2. Locate the specific application you wish to tag.
3. In the **Actions** column, click the tag icon.

<p align="center"><img src="/content/img/adding-tags-application.png" alt="Adding tags to applications" width="90%" height="auto"></img></p>

4. This opens a pop-up window where you can add a new tag. Enter a tag in the `key:value` format and press enter to create it. To remove a tag, click the "x" next to the tag.

<p align="center"><img src="/content/img/tag-format-applications.png" alt="Adding/Editing tags in applications" width="70%" height="auto"></img></p>

## Using Tags for Permission Sharing in Bulk​

In addition to tagging individual entities, you can use tags for bulk permission sharing by assigning them to user groups or applications.

### Using User Groups​

To grant permissions to a group of users:

1. Tag the Entities

Ensure that the relevant entities are tagged with a specific tag, for example `team:accounts`.

2. Update Group Permissions

To add permissions to the group,

1. Navigate to **Access Control > Groups** and click the edit icon next to the group name.
2. In the **Permissions** section, click **+Add Permission**.
3. Choose the **Tag** section, select the required tag, and assign the necessary permissions. Typically, you’ll need to provide **_EXECUTE_** permission for execution rights and **_READ_** permission to list the entities.
4. Clicking **Add Permission** adds the tags to the group.
5. Click on the **>** to view all the entities tagged. 


<p align="center"><img src="/content/img/adding-tags-to-a-user-group-in-conductor.png" alt="Adding tags to a user group" width="100%" height="auto"></img></p>

This configuration grants all group members execute and read access to the tagged entities simplifying permission management for large teams.

### Using Applications

To grant permissions to an application:

1. Tag the Entities

Ensure that the relevant entities are tagged with a specific tag, for example `team:accounts`.

2. Update Group Permissions

To add permissions to an application,

1. Navigate to **Access Control > Applications** and click the edit icon next to the application name.
2. In the **Permissions** section, click **+Add Permission**.
3. Choose the **Tag** section, select the required tag, and assign the necessary permissions. Typically, you’ll need to provide **_EXECUTE_** permission for execution rights and **_READ_** permission to list the entities.
4. Clicking **Add Permission** adds the tags to the application.
5. Click on the **>** to view all the entities tagged. 

<p align="center"><img src="/content/img/adding-tags-to-application-in-orkes-conductor.png" alt="Adding tags to application in Conductor" width="100%" height="auto"></img></p>

This configuration grants the application execute and read access to the tagged entities simplifying permission management for large teams.