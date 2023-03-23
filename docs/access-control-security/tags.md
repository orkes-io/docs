# Managing Tags in Conductor

The tags are metadata applied to tasks, workflows, schedulers, or secrets in Conductor. The tags in Conductor are of the format **key:value**. Tags can be utilized in situations where you can easily share permissions with a group of users.
<br/>
You can either add tags directly to individual workflows/tasks/secrets/schedulers. Or you can also add tags to user groups.

## Adding Tags to Workflow​s​

To add a tag to a workflow,
1. From the left menu, navigate to **WORKFLOWS > Definitions** and find the workflow you wish to tag.
2. In the **Actions** column, click the tag icon.

<p align="center"><img src="/content/img/adding-tags-to-workflow.png" alt="Adding a tag to an already created workflow" width="90%" height="auto"></img></p>

This will open a pop-up window that allows you to add a new tag. Type a tag name in the format **key:value** and press enter to create new tags. You may also remove tags from the same window by clicking the "X" next to the tag you wish to delete.

<p align="center"><img src="/content/img/editing-tags-in-conductor.png" alt="Editing a tag" width="60%" height="auto"></img></p>

## Adding Tags to Task​s​

To add a tag to a task,
1. From the left menu, navigate to the **TASKS > Definitions** and find the task you wish to tag.
2. In the **Actions** column, click the tag icon.

This will open a pop-up window that allows you to add a new tag. Type a tag name in the format **key:value** and press enter to create new tags. You may also remove tags from the same window by clicking the "X" next to the tag you wish to delete.

## Adding Tags to Scheduler​

To add a tag to a scheduler,
1. From the left menu, navigate to **SCHEDULER > Definitions** and find the scheduler you wish to tag.
2. In the **Actions** column, click the tag icon.

This will open a pop-up window that allows you to add a new tag. Type a tag name in the format **key:value** and press enter to create new tags. You may also remove tags from the same window by clicking the "X" next to the tag you wish to delete.

## Adding Tags to Secrets​

To add a tag to a secret,
1. From the left menu, navigate to **Secrets** and find the secret you wish to tag.
2. In the **Actions** column, click the tag icon.

This will open a pop-up window that allows you to add a new tag. Type a tag name in the format **key:value** and press enter to create new tags. You may also remove tags from the same window by clicking the "X" next to the tag you wish to delete.

## Using Tags for Permission Sharing in Bulk​

The above steps mention adding tags to individual tasks/workflows/schedulers/secrets. However, you can also add tags to a user group that helps in sharing permissions in bulk.

### Using User Groups​

Suppose you have a group of users from the accounts team and want to share the workflow execution permission for all users in the group.
<br/>

To add permissions to the group,
1. Ensure that the workflow is tagged with the tag **team:accounts**. (If permission is to be shared for tasks/secrets, you need to add the tags to the corresponding items.)
2. Navigate to **ACCESS CONTROL > Groups** and click the edit icon near your group name.
3. From the **Workflow and Task Permissions** section, click **+Add Permission**.
4. Choose the **Target Type** as **Tag**, choose **team:accounts** tag, and provide EXECUTE permission.
5. Clicking **Add Permission** adds the tag to the Group.

<p align="center"><img src="/content/img/adding-tags-to-a-user-group-in-conductor.png" alt="Adding tags to a user group" width="100%" height="auto"></img></p>

This enables all the group members to have execute access to the workflow tagged with **team:accounts**. This would also provide execute access to all tasks/secrets/scheduler flagged with this tag.