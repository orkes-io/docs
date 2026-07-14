---
title: "Jira Operations Reference"
description: "Look up the input and output parameters for each operation available in the Jira integration with Orkes Conductor."
canonical_route: "integrations/jira-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Jira Operations Reference, Jira Operations Reference integration, Jira Operations Reference workflow automation"
---

# Jira Operations Reference

Orkes Conductor integrates with Jira to let you manage issues, comments, attachments, projects, users, sprints, and transitions directly from your workflows. Once you configure the Jira integration, you can use the following operations to create, retrieve, and update data in Jira without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Jira integration](/content/integrations/jira).

## Create Issue

Creates a new issue in a Jira project.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Project Key | The project key of the Jira project where the issue will be created.<br/><br/>To find the project key, go to your project, select ··· near the project name > **Space settings**. The key is listed under **Space key**.<br/><br/>Alternatively, retrieve it from the URL. For example,  in `https://your-domain.atlassian.net/jira/software/projects/MT/boards/1`, the project key is **MT**. | string | Required. | 
    | Issue Type | The type of issue to create (e.g., `Task`, `Bug`, `Story`). | string | Required. | 
    | Summary | The title of the issue. | string | Required. | 
    | Description | The description of the issue. | string | Required. | 
    | Priority | The priority of the issue (e.g., `High`, `Medium`,` Low`). | string | Optional. | 
    | Assignee Id | The account ID of the user to assign the issue to.<br/><br/>To find the account ID, go to [Atlassian People](https://home.atlassian.com), search for the user, and copy the ID from the URL (e.g., `63610d2bfe5ff375235b6ef4` in `https://home.atlassian.com/o/{orgId}/people/63610d2bfe5ff375235b6ef4`). | string | Optional. | 

=== "Output Parameters"

    Returns the ID, key, and URL of the created issue.


## Get Issue

Retrieves the details of a specific Jira issue by its ID or key.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to retrieve. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |

=== "Output Parameters"

    Returns the issue's ID, key, URL, summary, description, type, status, priority, assignee, reporter, creator, project details, and more.


## Update Issue

Updates an existing Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to update. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Summary | The updated title of the issue. | string | Optional. |
    | Description | The updated description of the issue. | string | Optional. |
    | Priority | The updated priority of the issue (e.g., `High`, `Medium`, `Low`). | string | Optional. |
    | Assignee Id | The updated account ID of the user to assign the issue to.<br/><br/>To find the account ID, go to [Atlassian People](https://home.atlassian.com), search for the user, and copy the ID from the URL (e.g., `63610d2bfe5ff375235b6ef4` in `https://home.atlassian.com/o/{orgId}/people/63610d2bfe5ff375235b6ef4`). | string | Optional. |

=== "Output Parameters"

    Returns the status of the update operation.


## Delete Issue

Deletes an issue from Jira.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to delete. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |

=== "Output Parameters"

    Returns the status of the delete operation.


## Search Issues

Searches for Jira issues using JQL (Jira Query Language).

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Jql | The JQL query string to filter issues (e.g., `project = PROJ AND status = Open`). Leave empty to retrieve all issues. | string | Optional. |
    | Max Results | The maximum number of results to return. Defaults to 50. | integer | Optional. |
    | Fields | A comma-separated list of fields to include in the response. Defaults to `*all` (all fields). Use `*navigable` to return only fields visible in the Jira UI (e.g., `summary`, `status`, `assignee`), or specify individual field names to further limit the response. | string | Optional. |
    | Next Page Token | The pagination cursor from a previous response. Omit for the first page. | string | Optional. |

=== "Output Parameters"

    Returns a list of matching issues, each containing the issue ID, key, URL, summary, description, type, status, priority, assignee, reporter, creator, project details, and more, along with a `nextPageToken` for pagination and an `isLast` flag indicating whether the current page is the last.


## Get Transitions

Retrieves the available transitions for a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to retrieve transitions for. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |

=== "Output Parameters"

    Returns a list of available transitions, each containing the transition ID, name, and target status details.


## Transition Issue

Transitions a Jira issue to a different status.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to transition. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Transition ID | The ID of the transition to apply. Use the [Get Transitions](/content/integrations/jira-operations#get-transitions) operation to retrieve available transition IDs for the issue. | string | Required. |
    | Comment | A comment to add along with the transition. | string | Optional. |

=== "Output Parameters"

    Returns the status of the transition operation.


## Get Issue Changelog

Retrieves the change history of a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to retrieve the changelog for. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Max Results | The maximum number of changelog entries to return. Defaults to 100. | integer | Optional. |
    | Start At | The index of the first result to return for pagination. Defaults to 0. | integer | Optional. |

=== "Output Parameters"

    Returns a list of changelog entries, each containing the change ID, author details, timestamp, and the fields that were changed along with their previous and updated values, as well as pagination details.


## Notify Issue

Sends an email notification for a Jira issue and adds it to the mail queue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to send a notification for. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Subject | The subject line of the notification email. | string | Required. |
    | HTML Body | The HTML body of the notification email. | string | Optional. |
    | To User IDs | A comma-separated list of account IDs of users to notify.<br/><br/>To find the user ID, go to [Atlassian People](https://home.atlassian.com), search for the user, and copy the ID from the URL (e.g., `63610d2bfe5ff375235b6ef4` in `https://home.atlassian.com/o/{orgId}/people/63610d2bfe5ff375235b6ef4`). | string | Optional. |
    | To Group Names | A comma-separated list of Jira group names to notify.<br/><br/>Group names can be found at **admin.atlassian.com** → **Directory** → **Groups**. | string | Optional. |
    | To Reporter | Whether to include the issue reporter in the notification. | boolean | Optional. |
    | To Assignees | Whether to include the issue assignee in the notification. | boolean | Optional. |
    | To Watchers | Whether to include issue watchers in the notification. | boolean | Optional. |

=== "Output Parameters"

    Returns the status of the notification operation.


## Add Comment

Adds a comment to a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to add a comment to. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Body | The text of the comment. | string | Required. |

=== "Output Parameters"

    Returns the comment ID, URL, body, author details, and timestamps for when the comment was created and last updated.


## Get Comment

Retrieves a specific comment from a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to retrieve the comment from. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Comment Id | The ID of the comment to retrieve.<br/><br/>To find the comment ID, open the issue in Jira, right-click the comment link, and copy the `focusedCommentId` value from the URL (e.g., `10033` in `https://your-domain.atlassian.net/browse/MT-4?focusedCommentId=10033`). | string | Required. |

=== "Output Parameters"

    Returns the comment ID, URL, body, author details, and timestamps for when the comment was created and last updated.


## Get Comments

Retrieves all comments for a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to retrieve comments for. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |

=== "Output Parameters"

    Returns a list of comments, each containing the comment ID, URL, body, author details, and timestamps for when the comment was created and last updated, along with pagination details.


## Update Comment

Updates an existing comment on a Jira issue. Can update only their own comments.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue containing the comment. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Comment Id | The ID of the comment to update.<br/><br/>To find the comment ID, open the issue in Jira, right-click the comment permalink, and copy the `focusedCommentId` value from the URL (e.g., `10033` in `https://your-domain.atlassian.net/browse/MT-4?focusedCommentId=10033`). | string | Required. |
    | Body | The updated text of the comment. | string | Required. |

=== "Output Parameters"

    Returns the comment ID, URL, updated body, author details, and timestamps for when the comment was created and last updated.


## Delete Comment

Deletes a comment from a Jira issue. Can delete only their own comments.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue containing the comment. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | Comment Id | The ID of the comment to delete.<br/><br/>To find the comment ID, open the issue in Jira, right-click the comment permalink, and copy the `focusedCommentId` value from the URL (e.g., `10033` in `https://your-domain.atlassian.net/browse/MT-4?focusedCommentId=10033`). | string | Required. |

=== "Output Parameters"

    Returns the status of the delete operation.


## Add Attachment

Adds an attachment to a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to add an attachment to. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |
    | File Content Base 64 | The file content encoded as a Base64 string. | string | Required. |
    | Filename | The filename for the attachment. | string | Required. |

=== "Output Parameters"

    Returns a list of uploaded attachments, each containing the attachment ID, URL, filename, MIME type, file size, content URL, author details, and creation timestamp.


## Get Issue Attachments

Retrieves all attachments for a Jira issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Issue ID or Key | The issue key or ID of the issue to retrieve attachments for. The issue key is visible on the Jira board and in the URL. For example, in `https://your-domain.atlassian.net/browse/MT-4`, the issue ID is **MT-4**. | string | Required. |

=== "Output Parameters"

    Returns a list of attachments, each containing the attachment ID, URL, filename, MIME type, file size, content URL, author details, and creation timestamp.


## Get Attachment

Retrieves metadata for a Jira attachment by its ID.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Attachment ID | The ID of the attachment.<br/><br/>To get it, use the [Get Issue Attachments](/content/integrations/jira-operations#get-issue-attachments) operation; the response includes an `id` field for each attachment. | string | Required. |

=== "Output Parameters"

    Returns the attachment ID, URL, filename, MIME type, file size, content URL, author details, and creation timestamp.


## Remove Attachment

Removes an attachment from Jira by its ID.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Attachment ID | The ID of the attachment.<br/><br/>To get it, use the [Get Issue Attachments](/content/integrations/jira-operations#get-issue-attachments) operation; the response includes an `id` field for each attachment. | string | Required. |

=== "Output Parameters"

    Returns the status of the delete operation.


## List Projects

Retrieves all Jira projects visible to the authenticated user.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    Returns a list of projects, each containing the project ID, key, name, URL, project type, and visibility status.


## Get Project

Retrieves the details of a specific Jira project.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Project ID or Key | The project key or ID of the project to retrieve.<br/><br/>To find the project key, go to your project, select ··· > **Space settings**. The key is listed under **Space key**.<br/><br/>Alternatively, retrieve it from the URL. For example, in `https://your-domain.atlassian.net/jira/software/projects/MT/boards/1`, the project key is **MT**. | string | Required. |

=== "Output Parameters"

    Returns the project ID, key, name, URL, project type, and visibility status.


## Search Users

Searches for users in Jira.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query to filter users by name or email. Leave empty to retrieve all users. | string | Optional. |
    | Max Results | The maximum number of results to return. Defaults to 50. | integer | Optional. |

=== "Output Parameters"

    Returns a list of users, each containing the account ID, account type, display name, email address, active status, time zone, and URL.


## Get Sprint

Retrieves the details of a Jira sprint by its ID, including its name, state, dates, and goal. Sprints are only available in Scrum (company-managed) projects with the Sprints feature enabled under **Space Settings** > **Features**.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Sprint ID | The ID of the sprint to retrieve.<br/><br/>To find the sprint ID, open an issue in the sprint and copy the ID from the URL (e.g., `1` in `https://your-domain.atlassian.net/browse/MS-1`). | integer | Required. |

=== "Output Parameters"

    Returns the sprint ID, URL, name, state, start date, end date, completion date, origin board ID, and goal.


## Get Sprint Issues

Retrieves all issues in a Jira sprint. Sprints are only available in Scrum (company-managed) projects with the Sprints feature enabled under **Space Settings** > **Features**.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Sprint ID | The ID of the sprint to retrieve the issues for.<br/><br/>To find the sprint ID, open an issue in the sprint and copy the ID from the URL (e.g., `1` in `https://your-domain.atlassian.net/browse/MS-1`). | integer | Required. |
    | Max Results | The maximum number of results to return. Defaults to 50. | integer | Optional. |
    | Start At | The index of the first result to return for pagination. Defaults to 0. | integer | Optional. |

=== "Output Parameters"

    Returns a list of issues in the sprint, each containing the issue ID, key, URL, summary, description, type, status, priority, assignee, reporter, creator, sprint details, project details, and more, along with pagination details.


## Get User

Retrieves the details of a Jira user by their account ID.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Account ID | The account ID of the user to retrieve.<br/><br/>To find the account ID, go to [Atlassian People](https://home.atlassian.com), search for the user, and copy the ID from the URL (e.g., `63610d2bfe5ff375235b6ef4` in `https://home.atlassian.com/o/{orgId}/people/63610d2bfe5ff375235b6ef4`). | string | Required. |

=== "Output Parameters"

    Returns the user's account ID, account type, display name, email address, active status, time zone, locale, and URL.

## Related pages

- [Jira Integration with Orkes Conductor](/content/integrations/jira)
