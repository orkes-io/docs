---
slug: /category/access-control-and-security
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Access Control and Security

Orkes Conductor provides a robust role-based access control (RBAC) mechanism for individual users on Orkes Platform, as well as for applications that use Conductor APIs. Conductor’s RBAC ensures fine-grained access to the following metadata resources:
* Workflows
* Tasks
* Secrets
* Environment variables
* Integrations
* Prompts
* User forms
* Event handlers
* Schedules
* Webhooks
* Domains

Get started with using Orkes’ RBAC suite by understanding what are users, groups, applications, tags, roles, and permissions.


## Users

A user represents a human user that interacts with Conductor via Orkes Platform. Users are authenticated using SSO providers or email/password. Each user has one or more roles assigned to them.


## Groups

A group is a set of users. Groups are a way to quickly share permissions among multiple users.

Each Conductor group can be associated with one or more roles. Groups can also be assigned a set of permissions, which provides access to specific Conductor resources. When a user is added to a group, the user automatically inherits the group's roles and permissions. Likewise, when a user is removed from a group, the roles and permissions are automatically removed from the user. 


## Applications

An application represents an application that interacts with a Conductor server via APIs or SDKs. Applications can be assigned a set of permissions, which provides it with access to specific Conductor resources. Each application can also have one or more access key/secret pairs, which are used to grant access to Conductor SDK and API.


## Tags

A tag is a key-value pair that can be added to any metadata resource, such as a workflow, task, schedule, secret, and so on.

Tags serve as a useful shorthand for sharing permissions across many resources or users. When you grant tag permissions to a group or application, it provides access to all resources containing that tag. 


## Roles

A role in Conductor represents a set of broad-level, default permissions to resources. Roles can be assigned to a user, group, or application.

If multiple roles are granted, they will have all granted role-level permissions. For example, a group with both User and Workflow Manager roles can not only create their own workflows, but also read all workflows in the cluster.

<Tabs>
<TabItem value="user-group=roles" label="User/Group Roles">

| Role | Description                                                                                                                                                                                                                                                     |
| ------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| User | Regular user. Can only access resources that they created.                |
| Read Only User | Can access all metadata and workflows in the system as read-only. Cannot modify or execute workflows. <br/><br/> **Note:** Read Only Users cannot read secret values.                                                                     |
| Workflow Manager | Can view and execute all workflows in the system.             |
| Metadata Manager | Can read, update, and delete all metadata in the system.      |
| Admin | Superuser. Full access to the system and resources. Can manage users and groups.                                                                            |

</TabItem>

<TabItem value="application roles" label="Application Roles">

| Role | Description                                                                                                                                                                                                                                                     |
| ------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Worker | Can poll and execute tasks that it has Execute permissions for. <br/> <br/> Should be granted to a task worker application that is responsible for polling and executing a task.                                                                  |
| Metadata API | Can create and manage workflow and task metadata. <br/> <br/> Should be granted to an application that is responsible for retrieving and managing workflow and task definitions, such as for testing or CI/CD integration purposes.           |
| Application API | Can create and manage applications. <br/> <br/> Should be granted to an application that is responsible for managing other applications in the cluster.                                                                           |
| Unrestricted Worker | Worker role with full access to poll and execute any task in the cluster. <br/> <br/> This role can only be granted by an Admin.                |
| Metadata Manager | Can create, update, delete, and grant permissions to any workflow or task definition in the cluster. <br/> <br/> This role can only be granted by an Admin.                                                                             |
| Workflow Manager | Can start, pause, resume, rerun, and delete any workflow execution in the cluster. <br/> <br/> This role can only be granted by an Admin.                                                                             |
| Application Manager | Can create, update, and delete any application in the cluster. <br/> <br/> This role can only be granted by an Admin.                             |

</TabItem>
</Tabs>


## Permissions

Besides the role-based permissions, you can add granular permissions to **groups** or **applications**. These permissions grant access to specific resources:
* Workflows
* Tasks
* Secrets
* Environment variables
* Integrations
* Prompts
* Tags
* Domains

Unlike other permission targets, **tags** and **domains** provide bulk access to multiple resources. Tags can be used to grant resources across almost every resource type. When you grant access for a tag “x”, all resources with the tag “x” will be made available to the group or application.

Domain is used to grant access to all tasks under a particular domain. This is useful for mass-granting a worker application to execute all tasks under a specific domain, instead of having to add individual tasks and specifying its domain. Refer to [Routing Tasks](docs/developer-guides/task-to-domain.md) to learn more about domains.


### Permission stacking

These granular permissions provide additional access on top of the user’s or application’s role-based permissions. For example, even though default Users can only access their own resources, they can also access other resources shared at the group level.


## Guides for access control

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />