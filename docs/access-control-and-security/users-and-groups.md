# Managing Users and Groups

:::info
This feature is only available to Admins.
:::

Create and manage users and groups on your Conductor cluster, so as to ensure secure access.


## Users

A user represents a human user that interacts with Conductor via Orkes Platform. Users are authenticated using SSO providers or email/password. Each user has one or more roles assigned to them.


### Adding users​

Users must be added to your Orkes Conductor cluster before they can sign up or log in.

**To add a user to your cluster:**
1. In the left navigation menu, go to **Access Control** > **Users**.
2. Select **(+) Create User**.
3. Enter the following information:

| Field | Description                                                                                                                                                                                                                                                     |
| ------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| User Id | The user’s email address. This cannot be changed later.                |
| Name | The username.                                                             |
| Roles | The user’s role(s), which governs the basic access level for the user. The available roles are: <ul><li>**Admin**—Superuser. Full access to the system and resources. Can manage users and groups.</li> <li>**User**—Can only access resources that they created.</li> <li>**Metadata Manager**—Can read, update, and delete all metadata in the system.</li> <li>**Workflow Manager**—Can view and execute all workflows in the system.</li> <li>**Read Only User**—Can access all metadata and workflows in the system as read-only. Cannot modify or execute workflows.</li></ul>                                                                                |
| Groups | The groups that the user should be part of. This provides additional group-level permissions to the user.                                               |

4. Select **Save**.

<br/>
<center>
<iframe width="510" height="300" src="https://www.youtube.com/embed/O9lj4TAqldc?si=wOxzv26EzeI5pft1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe>
</center>


### Editing user information

You can edit a user’s name, role, or group anytime.

**To edit a user:**
1. In the left navigation menu, go to **Access Control** > **Users**.
2. Select the **Edit** button located next to the user.
<p align="center"><img src="/content/img/RBAC/managing_users_and_groups-editing_user_information.png" alt="Editing user roles in Orkes Platform" width="90%" height="auto"></img></p>
3. Update the user’s name, roles, or groups as desired.
4. Select **Save**.

### Deleting users

**To delete a user from your cluster:**
1. In the left navigation menu, go to **Access Control** > **Users**.
2. Select the **Delete** icon located next to the user.
3. Confirm the action by entering the user’s ID and selecting **Confirm**.


## Groups

A group is a set of users. Groups are a way to quickly share roles and permissions among multiple users.

When a user is added to a group, the user automatically inherits the roles and permissions of a group. Likewise, when a user is removed from a group, the roles and permissions are automatically removed from the user.

:::note
Read Only Users cannot be added to any groups.
:::

### Configuring groups​

**To configure a group:**
1. Create a group.
    1. In the left navigation menu, go to **Access Control** > **Groups**.
    2. Select **(+) Create group**.
    3. Enter the following information:

| Field | Description                                                                                                                                                                                                                                                     |
| ------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name | A name to identify your group. For example, “Engineering”. This cannot be changed later.                                                                     |
| Description | A description of the group.                                        |
| Default group role | Optional. The role(s) that all members of the group will inherit, on top of their individually defined role(s). The available roles are: <ul><li>**Admin**—Superuser. Full access to the system and resources. Can manage users and groups.</li> <li>**User**—Can only access resources that they created.</li> <li>**Metadata Manager**—Can read, update, and delete all metadata in the system.</li> <li>**Workflow Manager**—Can view and execute all workflows in the system.</li> <li>**Read Only User**—Can access all metadata and workflows in the system as read-only. Cannot modify or execute workflows.</li></ul>                           |
&emsp;&emsp; iv. Select **Save**.<br/>&emsp;&emsp;The group has been created. You can proceed to add members or permissions to the group.

<p align="center"><img src="/content/img/RBAC/managing_users_and_groups-editing_group_information.png" alt="Group configuration screen in Orkes Platform." width="90%" height="auto"></img></p>

2. Add members to the group.
    1. In the Members section, select **+ Add User** to add an existing user to the group. If the user you are looking for does not exist, you must first add them to your cluster.
3. Add permissions to grant group-level access to resources.
    1. In the Permissions section, select **+ Add Permission**.
    <p align="center"><img src="/content/img/RBAC/managing_users_and_groups-adding_group_permissions.png" alt="Granting access to specific tasks and workflows" width="90%" height="auto"></img></p>
    2. Toggle between each resource type and select the resources to provide access to.
    3. Toggle the access levels for your selected resource:
        * **Read**—Users will be able to view the resource.
        * **Update**—Users will be able to update the resource.
        * **Execute**—Users will be able to execute the resource.
        * **Delete**—Users will be able to delete the resource.

  All group members will now have these roles and permissions, on top of their existing user-based permissions.

:::tip
You can grant permissions to **tags**, rather than to individual resources. Tags can be added to multiple resources, so that when you grant a permission to a tag, it instantly provides access to all tagged resources. Learn more about tags in [Managing Tags](/access-control-and-security/tags).
:::

<br/>
<center><iframe width="510" height="300" src="https://www.youtube.com/embed/REIRIjEvJLg?si=h28wjxj9DZi7A6bE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></center>


### Editing group information

You can edit a group’s description, default roles, members, or permissions anytime.

**To edit a group:**
1. In the left navigation menu, go to **Access Control** > **Groups**.
2. Select the group name or the **Edit** icon located next to the group name.
3. Update the group’s description, roles, members, or permissions as desired.


### Deleting groups

**To delete a group:**
1. Select the **Delete** icon located next to the group name.
2. Confirm the action by entering the group name and selecting **Confirm**.