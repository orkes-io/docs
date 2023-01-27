---
sidebar_position: 5
---

# Access Control: Users & Groups

With your Conductor server in a remote environment, your team members will require a login to access the Conductor server. With our Users & Groups functionality, an admin can perform granular "per user" or broader "per group" access control.

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
    * **Email** - Enter the email address of the user.
    * **Name** - Provide the user’s name.
    * **Roles** - Choose the access level you wish the user to have. The available Conductor roles are *Admin*, *User*, *Metadata Manager*, *Workflow Manager*, and *Read Only User*.
4. Click **Create**, and an email invite will be sent to the user with the instructions to access the Conductor instance.

### User Roles 
A user can have the following roles:
* **Admin** - An admin has full access to the Conductor instance.
* **User** - Access to user's workflows and tasks (and any shared Applications).
* **Metadata Manager** - An "admin" for  metadata who can create/update/delete **any** workflow or task.
* **Workflow Manager** - Has the privilege to run/pause/rerun **any** workflow.
* **Read Only User** - Has read-only permissions over the workflows and tasks.

To change the access for a specific user, click on the edit button next to the user, and change the role by clicking the toggle button for the relevant roles.

<p align="center"><img src="/content/img/edit-user-roles.png" alt="Editing user roles in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Groups

Groups are a way to quickly share workflows and tasks amongst your team.

### Creating Groups

To create a user group:
1. From the left menu, navigate to **ACCESS CONTROL > Groups**.
2. Click **Create Group** and provide the following details:
    * **Group ID** - Provide a name to identify your group.
    * **Description** - Provide a suitable description for the group.
    * **Roles** - Choose the role for the group. The available roles for a group are *Admin*, *User*, *Metadata Manager*, *Workflow Manager*, and *Read Only User*. 
3. Click **Create**.
<center><img src="/content/img/creating-groups.png" alt="Creating Groups in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

4. Once the group is created, you can add members by clicking **+Add User** from the **Members** section. You can only add users already associated with the Conductor instance. If the user you are looking for has not been added, you can [invite](/content/docs/getting-started/concepts/access-control-users#inviting-users) and then add them to the groups.

**Workflow and Tasks Permissions** is an additional section where you can limit the group members' access to limited workflows and tasks.

6. Click **+Add Permission**, and you can choose the group to have access to selected Workflows/Tasks/Secrets/Tags. The permissions that can be granted include Read, Create, Update, Execute & Delete. 
<center><img src="/content/img/workflows-and-tasks-permissions.png" alt="Granting access to specific tasks and workflows" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></center>

:::note
Even if certain permissions are granted under the section **Workflow and Tasks Permissions**,  the role chosen supersedes these permissions. This means that if both the **Workflow and Tasks Permissions** section is configured and a role is also chosen, then the role always supersedes. 
:::

### Group Roles
Group roles allow you to quickly add/remove permissions to groups of users. The roles are the same for an individual user but are quickly applied to everyone in the group.

Group members have five possible roles: Admin, User, Metadata Manager, Workflow Manager, and Read Only User.

If a role is defined for these members, they will all be given this role for the Conductor instance.  For example, if **Admin** is selected, all the group members are now admins irrespective of their individual roles.

## Example for Workflow Permissions

In the [Orkes Playground](https://play.orkes.io), there are default workflows available for all users to try out. To facilitate sharing of these workflows/tasks, we have included them in the `AllUsers` group. So, every person who signs up for Orkes Playground is added to this group so that they can have access to them.

