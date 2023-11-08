# Managing Users & Groups 

To ensure secure access to the Conductor server in a remote environment, it is critical to establish a system that enables access to the server. With Conductor’s Users & Groups functionality, an admin can easily create and manage users & groups in the Conductor server.

:::note
This feature is available only to the Admins of an Orkes Conductor instance.
:::

## Users​​

### Inviting Users​​

To invite a user to your Orkes Cloud instance,

1. From your Conductor server, navigate to **Access Control > Users** from the left menu.
2. Click the **Create User** button.
3. You need to fill in the following user details:<ul><li>**User id** - Enter the email address of the user.</li><li>**Name** - Provide the user’s name.</li><li>**Permissions** - Choose the access level you wish the user to have. The available Conductor roles are *Admin*, *User*, *Metadata Manager*, *Workflow Manager*, and *Read Only User*.</li></ul>
4. Click **Save**, and the user can now access the Conductor instance.

### User Roles​​

A user can have the following roles:

* **Admin** - An admin has full access to the Conductor instance.
* **User** - A user can access permitted workflows, tasks, and shared Applications.
* **Metadata Manager** - An "admin" for metadata who can create/update/delete any workflow or task.
* **Workflow Manager** - A workflow manager can run/pause/rerun any workflow.
* **Read Only User** - A user with read-only permissions over the workflows and tasks.

### Editing Users​

To change the permission for a specific user, click on the edit button next to the user, and update with the required permissions.

<p align="center"><img src="/content/img/edit-user-roles.png" alt="Editing user roles in Conductor" width="90%" height="auto"></img></p>

### Deleting Users​
To delete a user from your Conductor server, click the trash icon near the username and confirm the action.

## Groups​​
Groups are a way to share workflows and tasks among your team quickly.

### Creating Groups​​
To create a user group:
1. From the left menu, navigate to **Access Control > Groups**.
2. Click **Create Group** and provide the following details:<ul><li>**Name** - Provide a name to identify your group.</li><li>**Description** - Provide a suitable description for the group.</li><li>**Permissions** - Choose the required permission for the group. The Group can take the roles *Admin*, *User*, *Metadata Manager*, *Workflow Manager* or *Read Only User*. </li></ul>
3. Click **Save**.

<p align="center"><img src="/content/img/creating-groups.png" alt="Creating Groups in Conductor" width="90%" height="auto"></img></p>

4. You can add members by clicking **+Add User** from the **Members** section. You can add only the users that have already been created/invited. If the user you are looking for has not been added, you can invite and then add them to the groups.

**Permissions** is an additional section where you can limit the group members' access to the permitted workflows, tasks, secrets, tags, domains, integrations & prompts.

6. Click **+Add Permission**, and you can choose the group to have access to selected Workflows/Tasks/Secrets/Tags/Domains/Integrations/Prompts. Permissions that can be granted include Read, Create, Update, Execute & Delete.

<p align="center"><img src="/content/img/adding-permissions-for-applications.png" alt="Granting access to specific tasks and workflows" width="90%" height="auto"></img></p>

:::note
Even if certain permissions are granted under the **Permissions** section, the chosen role supersedes these permissions. This means that if both the **Permissions** section is configured and a role is selected, the role always supersedes the other.
:::

### Group Roles​
Group roles allow you to add/remove permissions to groups of users quickly. The roles are the same for an individual user but are quickly applied to everyone in the group. Group has five possible roles: Admin, User, Metadata Manager, Workflow Manager, and Read Only User.

If a role is defined for these members, they will all be given this role for the Conductor instance. For example, if Admin is selected, all the group members are now admins irrespective of their individual roles.

### Editing Groups​
The group settings can be modified by clicking the group name. This takes you to the individual group page, from where you can edit the group roles, members, and permissions.

### Deleting Groups​
To delete a group from your Conductor server, click the trash icon near the group name and confirm the action.

## Example for Workflow Permissions using Groups​
In the [Orkes Playground](https://play.orkes.io/), default workflows are available for all users to try out. To facilitate sharing of these workflows/tasks, we have included them in a particular group. So, every person who signs up for the Playground is added to this group so that they can have access to the workflows.
