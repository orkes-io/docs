---
sidebar_position: 5
---

# Access Control: Users & Groups

With your Conductor server in a remote environment, members of your team will require a login to access the Conductor server.  With our Users & Groups functionality, and admin may perform granular "per user" or broader "per group" access control.

> Note: This feature currently only available to Admins of an Orkes Cloud instance.

To access Users and Groups, click Users in the left navigation menu.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/Aya41OiWn9c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Users

### Inviting users
To invite a users to your Orkes Cloud instance, click the `Create User` button. Enter their email address and the access level you wish them to have. On closing the window, an invite will be sent to them.


### User Roles 
A user can have the following roles:
* **Admin** - Full access to the Conductor instance.
* **User** - Access to user's workflows and tasks (and any shared Applications)
* **Metadata Manager** - An "admin" for metadata. Can Create/Update/Delete **any** workflow or task.
* **Workflow Manager** - Can Run/pause/rerun **any** workflow.

To change the access for a specific user, click on the edit button next to the user, and change the role.

<p align="center"><img src="/content/img/create_user.png" alt="Create application user" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Groups

Groups are a way to quickly share workflows and tasks amongst your team. Create a new group, and add users with the same permission level for many tasks and workflows.  

Each group has 3 tables:

* **Members**: The members of the group can be selected from all of the accounts affiliated with the Conductor instance.

Once a group of members has been created, two types of access can be given: **Roles** and **Workflow and Task Permissions**.  

> Note: It is possible to only grant one type of access to a Group - meaning that just **Roles** OR just **Workflow and Task Permissions** can be added. 

### Roles
Group roles allows you to quickly add/remove permissions to groups of users.  The roles are the same as for an individual user, but is quickly applied to everyone in the group.

There are four possible roles for members of a group: Admin, User, Metadata Manager, Workflow Manager. 

If a Role is defined for these members, they will all be given this role for the Conductor instance.  For example, if **Admin** is selected, all members of the group are now admins:

<p align="center"><img src="/content/img/admins.jpg" alt="Create application user" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Workflow and Task Permissions

Tasks and workflows to be shared amongst the group. The permission levels are the same as for [Applications](#applications).

When Workflows and Tasks are added to the group, every member of the group will be able to execute (or change or delete) these workflows and tasks - allowing easy sharing of processes in the team.

<p align="center"><img src="/content/img/group_app_task_permissions.jpg" alt="Create application user" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Example workflow permissions

In the [Orkes Playground](https://play.orkes.io), there are workflows available for all users to try out.  To share these workflows & tasks, they are shared to the `AllUsers` group.  Every person who signs up for Orkes Playground is added to this group, so they have access to see these workflows.
