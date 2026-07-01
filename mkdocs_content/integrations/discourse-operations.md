---
title: "Discourse Operations Reference"
description: "Look up the input and output parameters for each operation available in the Discourse integration with Orkes Conductor."
canonical_route: "integrations/discourse-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Discourse Operations Reference

Orkes Conductor integrates with Discourse to let you create and manage posts, categories, users, and groups directly from your workflows. Once you configure the Discourse integration, you can use the following operations to create, retrieve, and update content in Discourse without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Discourse integration.](/content/integrations/discourse)

## Create Post

Create a new topic or reply to an existing topic.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Raw | The post content in raw Markdown format. | string | Required. |
    | Title | The topic title. Required when creating a new topic. | string | Optional. | 
    | Topic Id | The topic ID to reply to. Required when replying to an existing post; ignore when creating a new topic.<br/>To get the topic ID, open the topic and the topic ID is the integer at the end of the URL: `https://<FORUM-BASE-URL>/t/<TOPIC-SLUG>/<TOPIC-ID>`. | integer | Optional. | 
    | Category | The category ID to which the new posts must be part of.<br/>To get the category ID, open the specific category and the ID is the integer at the end of the URL:`https://<FORUM-BASE-URL>/c/<CATEGORY-NAME>/<CATEGORY-ID>`. | integer | Optional. | 
    | Reply To Post Number | The post number within the topic to reply to.<br/>To get the post number, open the topic and navigate to the specific post using the timeline slider on the right. The post number is displayed on the slider and also appears at the end of the URL: `https://<FORUM-BASE-URL>/t/<TOPIC-SLUG>/<TOPIC-ID>/<POST-NUMBER>`. | integer | Optional. | 

=== "Output Parameters"

    The operation returns the created post's details, including `id`, `topicId`, `postNumber`, `username`, `createdAt`, `updatedAt`,and more.


## Get Post

Retrieve a single post by its ID.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Id | The ID of the post to retrieve.<br/>To get the post ID, navigate to the post and append `.json` to the URL: `https://<FORUM-BASE-URL>/t/<TOPIC-SLUG>/<TOPIC-ID>.json`. The `id` field in the response is the post ID.  | integer | Required. | 

=== "Output Parameters"

    The operation returns the retrieved post's details, including `id`, `topicId`, `postNumber`, `username`, `createdAt`, `updatedAt`,and more.


## List Posts

List latest posts across all topics.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Before | Load posts with an ID lower than this value. By default, the operation returns the latest posts. Use this parameter to paginate through older posts. <br/>To get the post ID, navigate to the post and append `.json` to the URL: `https://<FORUM-BASE-URL>/t/<TOPIC-SLUG>/<TOPIC-ID>.json`. The `id` field in the response is the post ID. | integer | Optional. | 

=== "Output Parameters"

    The operation returns a `latestPosts` array, where each post includes `id`, `topicId`, `postNumber`, `username`, `createdAt`, `updatedAt`, and more.


## Update Post

Update the content of an existing post.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Id | The post ID to update.<br/>To get the post ID, navigate to the post and append `.json` to the URL: `https://<FORUM-BASE-URL>/t/<TOPIC-SLUG>/<TOPIC-ID>.json`. The `id` field in the response is the post ID. | integer | Required. | 
    | Raw | The updated post content in raw Markdown format. | string | Required. | 
    | Edit Reason | The reason for the edit, which will be shown in the post history. | string | Optional. | 

=== "Output Parameters"

    The operation returns the retrieved post's details, including `id`, `topicId`, `postNumber`, `username`, `createdAt`, `updatedAt`,and more.


## Create Category

Create a new category in the Discourse forum.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The category name. This will be displayed in the forum navigation. | string | Required. | 
    | Color | The category color as a hex code without `#`. For example: `0088CC`. | string | Optional. | 
    | Text Color | The text color as a hex code without `#`. For example: `0088CC`. | string | Optional. | 
    | Parent Category | The category ID of the parent category, if creating a sub-category.<br/>To get the category ID, open the specific category and the ID is the integer at the end of the URL: `https://<FORUM-BASE-URL>/c/<CATEGORY-NAME>/<CATEGORY-ID>`. | integer | Optional. | 

=== "Output Parameters"

    The operation returns the created category's details, including `id`, `name`,` slug`, `color`, `textColor`, `topicCount`, `postCount`, and more.


## List Categories

Retrieve all categories from the forum.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Include Subcategories | Whether to include subcategories in the results. | boolean | Optional. | 

=== "Output Parameters"

    The operation returns a `categories` array, where each category includes `id`, `name`, `slug`, `color`, `textColor`, `topicCount`, `postCount`, and more.


## Update Category

Update an existing category's properties.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Id | The category ID to update.<br/>To get the category ID, open the specific category and the ID is the integer at the end of the URL: `https://<FORUM-BASE-URL>/c/<CATEGORY-NAME>/<CATEGORY-ID>`. | integer | Required. | 
    | Name | The updated category name. This will be displayed in the forum navigation. | string | Optional. | 
    | Color | The updated category color as a hex code without `#`. For example: `0088CC`. | string | Optional. | 
    | Text Color | The updated text color as a hex code without `#`. For example: `0088CC`. | string | Optional. | 

=== "Output Parameters"

    The operation returns the updated category's details, including `id`, `name`,` slug`, `color`, `textColor`, `topicCount`, `postCount`, and more.


## Create User

Create a new user account.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Username | The username. Alphanumeric characters and underscores are allowed. | string | Required. | 
    | Email | The email address of the user. | string | Required. | 
    | Password | The password for the user account. | string | Required. | 
    | Name| The display name of the user. | string | Required. | 
    | Active | Whether the user account is active. | boolean | Optional. | 
    | Approved | Whether the user account is approved. | boolean | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | success | Indicates whether the user was successfully created. | 
    | active | Indicates whether the newly created user account is active. | 
    | message | A message describing the account activation status. | 
    | userId | The ID of the created user. | 


## Get User

Get a user profile by username.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Username | The username to retrieve.<br/><br/>Admins can get the username from **Admin** > **Users**. | string | Required. | 

=== "Output Parameters"

    The operation returns the user's profile details, including `id`, `username`, `name`, `email`, `trustLevel`, `active`, `admin`, `moderator`, `createdAt`, and more.


## List Users

List users with optional filtering (admin only).

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Flag | Filter users by status. Supported values: <ul><li>active</li><li>new</li><li>staff</li><li>suspended</li><li>blocked</li><li>suspect</li></ul>Defaults to active. | string | Optional. | 
    | Order | The field to sort results by. Supported values:<ul><li>created</li><li>last_emailed</li><li>seen</li><li>username</li><li>email</li><li>trust_level</li></ul> | string | Optional. | 
    | Ascending | Whether to sort the results in ascending order. | boolean | Optional. | 
    | Page | The page number for pagination. Defaults to 1. | integer | Optional. | 

=== "Output Parameters"

    The operation returns a `users` array, where each user includes `id`, `username`, `name`, `email`, `trustLevel`, `active`, `admin`, `moderator`, `createdAt`, and more.


## Create Group

Create a new user group.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The group name in lowercase with no spaces. Used for @mentions. | string |Required. | 

    | Bio Raw | The group description in raw Markdown format. | string | Optional. | 
    | Visibility Level | The visibility level of the group. Supported values:<ul><li>0 (public)</li><li>1 (logged_in)</li><li>2 (members)</li><li>3 (staff)</li><li>4 (owners)</li></ul> | integer | Optional. | 
    | Full Name | The full display name of the group shown in the UI. | string | Optional. | 

=== "Output Parameters"

    The operation returns the created group object containing its `id`, `name`, `fullName`, `bioRaw`, `bioCooked`, `userCount`, `visibilityLevel`, `automatic`, and `primaryGroup`.


## Get Group

Get details of a specific group by name.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the group to retrieve. It must be the group name (the part that comes after @) and not the display name. | string | Required. | 

=== "Output Parameters"

    The operation returns the group object containing its `id`, `name`, `fullName`, `bioRaw`, `bioCooked`, `userCount`, `visibilityLevel`, `automatic`, and `primaryGroup`.


## List Groups

List all groups in the forum.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    The operation returns a `groups` array and a `totalRowsGroups` count. Each group object contains its `id`, `name`, `fullName`, `bioRaw`, `bioCooked`, `userCount`, `visibilityLevel`, `automatic`, and `primaryGroup`.


## Update Group

Update an existing group's properties.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Id | The group ID to update.<br/>To get the group ID, navigate to the group and append `.json` to the URL: `https://<FORUM-BASE-URL>/g/<GROUP-SLUG>.json`. The `id` field in the response is the group ID.  | string | Required. | 
    | Name | The update group name in lowercase with no spaces. Used for @mentions. This also updates the group URL and the old URL will no longer work. | string | Optional. | 
    | Full Name | The updated display name of the group shown in the UI. | string | Optional. | 
    | Bio Raw | The updated group description in raw Markdown format. | string | Optional. | 

=== "Output Parameters"

    The operation returns the updated group object containing its `id`, `name`, `fullName`, `bioRaw`, `bioCooked`, `userCount`, `visibilityLevel`, `automatic`, and `primaryGroup`.


## Add User to Group

Add one or more users to a group.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Group Id | The group ID to add the users to.<br/>To get the group ID, navigate to the group and append `.json` to the URL: `https://<FORUM-BASE-URL>/g/<GROUP-SLUG>.json`. The `id` field in the response is the group ID. | string | Required. | 
    | Usernames | The comma-separated list of usernames to add to the group. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the request, along with the list of successfully added `usernames` and `emails`.


## Remove User from Group

Remove one or more users from a group.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Group Id | The group ID to remove the users from.<br/> To get the group ID, navigate to the group and append `.json` to the URL: `https://<FORUM-BASE-URL>/g/<GROUP-SLUG>`. The `id` field in the response is the group ID. | string | Required. | 
    | Usernames | The comma-separated list of usernames to remove from the group. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the request, along with the list of successfully removed `usernames` and `emails`.
