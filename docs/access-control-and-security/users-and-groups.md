# Managing Users & Groups 

In a remote environment, ensuring secure access to the Conductor server is essential. Conductor’s RBAC functionality enables admins to easily create and manage users and groups on the server, providing a structured approach to access control.

:::note
This feature is available only to admins.
:::

## Users​​

Watch how we can configure and manage Users from the UI.

<center>
<iframe width="510" height="300" src="https://www.youtube.com/embed/O9lj4TAqldc?si=wOxzv26EzeI5pft1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe>
</center>

### Inviting Users​​

To invite a user to your Orkes Conductor cluster,

1. Navigate to **Access Control > Users** from the left menu on your Orkes Conductor cluster.
2. Click **+ Create User** from the top-right corner.
3. Enter the following user details:<ul><li>_User id_ - The email address of the user.</li><li>_Name_ - The username.</li><li>_Roles_ - Select the access level you wish the user to have. The available roles are:</li><ul><li>_Admin_ - Full access to the Orkes Conductor cluster.</li><li>_User_ - Access to permitted metadata and those created by themselves.</li><li>_Metadata Manager_ - Can read, update, and delete all metadata in the system.</li><li>_Workflow Manager_ - Can view and execute all workflows in the system.</li><li>_Read Only User_ - Access to all metadata as read-only.</li></ul><li>_Groups_ - Select the groups the user should be part of.</li></ul>
4. Click **Save**.

### Editing Users​

To change the permissions for a specific user:

1. Click the **Edit** button next to the user.
2. Update the required permissions.

<p align="center"><img src="/content/img/edit-user-roles.png" alt="Editing user roles in Conductor" width="90%" height="auto"></img></p>

### Deleting Users​

To delete a user from your Orkes Conductor cluster:

1. Click the **Trash** icon near the username.
2. Confirm the action.

## Groups​​

Groups are a way to share metadata among your team quickly.

Watch how we can manage groups in Orkes Conductor Platform.

<center><iframe width="510" height="300" src="https://www.youtube.com/embed/REIRIjEvJLg?si=h28wjxj9DZi7A6bE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></center>

### Creating Groups​​

To create a user group:

1. Navigate to **Access Control > Groups** from the left menu on your Orkes Conductor cluster.
2. Click **+ Create group** from the top-right corner.
3. Enter the following details:<ul><li>_Name_ - A name to identify your group.</li><li>_Description_ - A description of the group.</li><li>_Define group role_ - Select the required permission for the group. The available roles are:</li><ul><li>_Admin_ - An admin has full access to the Orkes Conductor cluster.</li><li>_User_ - A user can access permitted metadata and ones created by themselves.</li><li>_Metadata Manager_ -An admin for metadata who can read, update, and delete all the metadata in the system.</li><li>_Workflow Manager_ - A workflow manager who can view and execute all the workflows in the system.</li><li>_Read Only User_ - Read Only users have access to all the metadata and workflows in the system as read-only.</li></ul></ul>
:::note
 If a role is defined for these members, they will all be given this role to the Conductor cluster. For example, if Admin is selected, all the group members are now admins irrespective of their individual roles.
:::
3. Click **Save**.

<p align="center"><img src="/content/img/creating-groups.png" alt="Creating Groups in Conductor" width="90%" height="auto"></img></p>

4. You can add members by clicking **+Add User** from the **Members** section. You can add only the users that have already been created/invited. If the user you are looking for has not been added, you can invite and then add them to the groups.

**Permissions** is an additional section where you can limit the group members' access to the permitted workflows, tasks, secrets, tags, domains, integrations, prompts, and environment variables.

6. Click **+Add Permission**.
7. Choose the group to have access to selected Workflows, Tasks, secrets, environment variables, tags, domains, integrations, and prompts. Permissions that can be granted include _Read_, _Create_, _Update_, _Execute_, and _Delete_.

<p align="center"><img src="/content/img/adding-permissions-for-applications.png" alt="Granting access to specific tasks and workflows" width="90%" height="auto"></img></p>

:::note
Different cases when permissions are stacked up:
- If the role is “Read Only” and the group is given “Execute” permission for a workflow under the permissions section, then all the group members can execute that workflow, while the rest are read-only.
:::

### Editing Groups​

To modify group settings:

1. Click the group name.
2. Edit the group roles, members, and permissions.

### Deleting Groups​

To delete a group:

1. Click the **Trash** icon near the group name.
2. Confirm the action.