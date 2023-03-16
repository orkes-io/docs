---
sidebar_position: 5
---

# Managing Users & Groups in Conductor

To ensure secure access to the Conductor server in a remote environment, it is critical to establish a system that enables access to the server. With Conductor’s Users & Groups functionality, an admin can easily create and manage users & groups in the Conductor server.

:::note
This feature is available only to the Admins of an Orkes Cloud instance.
:::

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/Aya41OiWn9c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Users

### Inviting Users

To invite a user to your Orkes Cloud instance,

1. From the left navigation menu, choose **ACCESS CONTROL > Users**.
2. Click **Create User** button.
3. You need to fill in the following user details:
   - **Email** - Enter the email address of the user.
   - **Name** - Provide the user’s name.
   - **Roles** - Choose the access level you wish the user to have. The available Conductor roles are _Admin_, _User_, _Metadata Manager_, _Workflow Manager_, and _Read Only User_.
4. Click **Create**, and an email invitation will be sent to the user with the instructions to access the Conductor instance.

### User Roles

A user can have the following roles:

- **Admin** - An admin has full access to the Conductor instance.
- **User** - A user can access permitted workflows and tasks and any shared Applications.
- **Metadata Manager** - An "admin" for metadata who can create/update/delete any workflow or task.
- **Workflow Manager** - A workflow manager can run/pause/rerun any workflow.
- **Read Only User** - A user with read-only permissions over the workflows and tasks.

### Editing Users

To change the access for a specific user, click on the edit button next to the user, and change the role by clicking the toggle button for the relevant roles.

<p align="center"><img src="/content/img/edit-user-roles.png" alt="Editing user roles in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Deleting Users

To delete a user from your Conductor server, click the trash icon near the username and confirm the action.

## Groups

Groups are a way to quickly share workflows and tasks amongst your team.

### Creating Groups

To create a user group:

1. From the left menu, navigate to **ACCESS CONTROL > Groups**.
2. Click **Create Group** and provide the following details:
   - **Group ID** - Provide a name to identify your group.
   - **Description** - Provide a suitable description for the group.
   - **Roles** - Choose the role for the group. The available roles for a group are _Admin_, _User_, _Metadata Manager_, _Workflow Manager_, and _Read Only User_.
3. Click **Create**.
<center><img src="/content/img/creating-groups.png" alt="Creating Groups in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

4. Once the group is created, you can add members by clicking **+Add User** from the **Members** section. You can add only the users that have already been created/invited. If the user you are looking for has not been added, you can [invite](/content/docs/getting-started/concepts/access-control-users#inviting-users) and then add them to the groups.

**Workflow and Tasks Permissions** is an additional section where you can limit the group members' access to the permitted workflows and tasks.

5. Click **+Add Permission**, and you can choose the group to have access to selected Workflows/Tasks/Secrets/Tags. The permissions that can be granted include Read, Create, Update, Execute & Delete.
<center><img src="/content/img/workflows-and-tasks-permissions.png" alt="Granting access to specific tasks and workflows" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

:::info
Even if certain permissions are granted under the **Workflow and Tasks Permissions** section, the chosen role supersedes these permissions. This means that if both the Workflow and Tasks Permissions section is configured and a role is selected, the role always supersedes the other.
:::

### Group Roles

Group roles allow you to add/remove permissions to groups of users quickly. The roles are the same for an individual user but are quickly applied to everyone in the group. Group has five possible roles: Admin, User, Metadata Manager, Workflow Manager, and Read Only User.

If a role is defined for these members, they will all be given this role for the Conductor instance. For example, if Admin is selected, all the group members are now admins irrespective of their individual roles.

### Editing Groups

The group settings can be modified by clicking the group name. This takes you to the individual group page, from where you can edit the group roles, members, and permissions.

### Deleting Groups

To delete a group from your Conductor server, click the trash icon near the group name and confirm the action.

## Example for Workflow Permissions using Groups

In the [Orkes Playground](https://play.orkes.io), default workflows are available for all users to try out. To facilitate sharing of these workflows/tasks, we have included them in a particular group. So, every person who signs up for the Playground is added to this group so that they can have access to them.
