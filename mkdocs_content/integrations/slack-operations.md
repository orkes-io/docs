---
title: "Slack Operations Reference"
description: "Look up the input and output parameters for each operation available in the Slack integration with Orkes Conductor."
canonical_route: "integrations/slack-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Slack Operations Reference, Slack Operations Reference integration, Slack Operations Reference workflow automation"
---

# Slack Operations Reference

Orkes Conductor integrates with Slack to let you manage channels, messages, reactions, files, users, and user groups directly from your workflows. You can use the following operations to interact with your Slack workspace without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Slack integration](/content/integrations/slack).

## Create Channel

Create a public or private channel in the Slack workspace. May fail if the workspace restricts channel creation to admins only.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the channel to create, without #. | string | Required. | 
    | Is Private | Whether the channel is private. Set to `true` to create a private channel. Defaults to` false`. | boolean | Optional. | 

=== "Output Parameters"

    Returns the created channel object, including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `topic`, and `purpose`.


## List Channels

Retrieves a list of channels in the workspace.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of channels to return. | integer | Optional. | 
    | Cursor | The cursor for pagination. To paginate through results, pass the `next_cursor` value from the previous response into this field. | string | Optional. | 
    | Exclude Archived  | Whether to exclude archived channels from the results. Set to `true` to exclude archived ones. Default is `false`. | boolean | Optional. | 
    | Types | Comma-separated channel types to list. Supported values:<ul><li>**public_channel** - Standard channels open to anyone in the workspace (e.g., #general).</li><li>**private_channel** - Invite-only channels, visible only to members.</li><li>**mpim** - Multi-person direct messages (group DMs).</li><li>**im** - Direct messages between two people (1:1 DMs).</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns a list of channel objects, each including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `num_members`, `topic`, and `purpose`. The response also includes a `next_cursor` for pagination.


## Get Channel Info

Retrieves details about a specific channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to retrieve. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Include Locale | Whether to include the locale of the channel in the response. The locale reflects the language and regional settings of the channel, such as `en-US` for US English or `ja-JP` for Japanese. | boolean | Optional. | 

=== "Output Parameters"

    Returns the channel object, including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `num_members`, `topic`, and `purpose`.


## Join Channel

Adds the bot to an existing channel. Only works for public channels. 

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to join. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Leave Channel

Removes the bot from a channel. Works for both private and public channels.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to leave. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Invite to Channel

Invites one or more users to a channel.

The bot must be a member of the channel to invite users. Use the [Join Channel](/content/integrations/slack-operations#join-channel) operation to add the bot to the channel first.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Ids | The ID of the channel to invite users to. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | User Ids | A comma-separated list of user IDs to invite (e.g., U123,U456). To get a user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation or copy it from the user's profile in Slack. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Kick from Channel

Removes a user from a channel. Works only for public channels.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to remove users from. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | User Id | A comma-separated list of user IDs to remove. To get a user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation or copy it from the user's profile in Slack.  | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Rename Channel

Renames an existing channel. The bot must be a member of the channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to rename. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | New Name | The updated name of the channel, without #. | string | Required. | 

=== "Output Parameters"

    Returns the updated channel object, including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `num_members`, `topic`, and `purpose`.


## Archive Channel

Archives a channel, making it read-only and hidden from the active channel list.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to archive. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## List Channel Members

Retrieves the list of members in a channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to retrieve. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Limit | The maximum number of channels to return. | integer | Optional. | 
    | Cursor | The cursor for pagination. To paginate through results, pass the `next_cursor` value from the previous response into this field. | string | Optional. | 

=== "Output Parameters"

    Returns a list of member IDs in the channel. The response also includes a `next_cursor` for pagination.


## Set Channel Topic

Sets or updates the topic of a channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to set the topic for. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Topic | The channel topic to set. | string | Required. | 

=== "Output Parameters"

    Returns the updated channel object, including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `topic`, and `purpose`.


## Set Channel Purpose

Sets or updates the purpose (description) of a channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to set the description for. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Purpose | The channel description to set. | string | Required. | 

=== "Output Parameters"

    Returns the updated channel object, including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `topic`, and `purpose`.


## Send Message

Send a message to an already configured channel via a Slack incoming webhook. Uses a webhook and only posts to the channel the webhook was configured for. Cannot target arbitrary channels.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Text | The message text to send. The message is delivered to the channel configured in the webhook URL set up in [Slack Integration](/content/integrations/slack#get-the-webhook-url). | string | Required. | 

=== "Output Parameters"

    Returns `ok` on success.


## Send Slack API Message

Sends a message to any channel using the Slack Web API bot token. 

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to send the message to. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Text | The message text to send. | string | Required. | 
    | ThreadTs | Thread timestamp to reply in a thread. To get the thread timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `thread_ts` value from the response on the thread to reply with.<br/><br/>To get the thread timestamp from Slack app, right-click a message in Slack, select Copy link, and extract the thread_ts query parameter from the URL: `https://yourworkspace.slack.com/archives/Cxxxxx/pxxxxxxxxxxxx?thread_ts=<YOUR-THREAD-TS>&cid=CXXXXXXX`. | string | Optional. | 

=== "Output Parameters"

    Returns the sent message object, including the `channel`, message `ts` (timestamp), and message details such as `type`, `user`, `text`, and `thread_ts`.


## Send Message and Wait for Response

Sends a message and waits for a reply before the workflow continues. If no reply is received before the timeout, the workflow proceeds. Long timeouts may affect workflow performance.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to send the message to. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Text | The message text to send. | string | Required. | 
    | Expected User Id | User ID whose reply to wait for; if omitted, accepts the first reply from any user.<br/><br/>To get a user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation or copy it from the user's profile in Slack. | string | Optional. | 
    | Timeout Seconds | The time in seconds to wait for a reply. Default is 30. | integer | Optional. | 
    | Poll Interval Ms | How often to check for a reply in milliseconds. Default is 2000. | integer | Optional. | 

=== "Output Parameters"

    Returns the sent message details under `sendResult`, the reply message under `replyMessage` (including `type`, `user`, `text`, and `ts`), and polling metadata including `polls`, `timeoutSeconds`, and `pollIntervalMs`.


## Update Message

Edits the text of an existing message sent by the bot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel that contains the message to update. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Message Ts | The timestamp of the message to update. To get the message timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `ts` value from the corresponding message in response.  | string | Required. | 
    | Text | The updated message. | string | Required. | 

=== "Output Parameters"

    Returns the updated message object, including the `channel`, `ts`, `text`, and message details such as `type`, `user`, and `thread_ts`.


## Delete Message

Deletes a message from a channel. Bots can only delete their own messages unless the bot has admin privileges.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel that contains the message to delete. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Message Ts | The timestamp of the message to delete. To get the message timestamp, use the [Send Slack API Message](/content/integrations/slack-operations#send-slack-api-message) or [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `ts` value from the response.  | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Get Channel History

Retrieves messages and events from a channel's history, with optional time range filtering.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel to retrieve history from. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. |
    | Oldest | The start of the time range as a Slack timestamp (Unix time in seconds with microseconds, e.g., "1715000000.000000"). Only messages after this timestamp are returned. | string | Optional. |
    | Latest | The end of the time range as a Slack timestamp (Unix time in seconds with microseconds, e.g., "1715000000.000000"). Only messages before this timestamp are returned. | string | Optional. |
    | Limit | The maximum number of messages to return. | integer | Optional. |
    | Inclusive | Whether to include messages at the `oldest` and `latest` timestamps. | boolean | Optional. | 

=== "Output Parameters"

    Returns a list of message objects, each including `type`, `user`, `text`, `ts`, and `thread_ts`. The response also includes a `has_more` flag indicating whether there are more results.


## Get Thread Replies

Retrieves all replies in a message thread.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel containing the thread. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Thread Ts | The timestamp of the parent message. To get the thread timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `thread_ts` value from the parent message. | string | Required. | 
    | Limit | The maximum number of replies to return. | integer | Optional. | 
    | Cursor | The cursor for pagination. To paginate through results, pass the `next_cursor` value from the previous response into this field. | string | Optional. | 

=== "Output Parameters"

    Returns a list of message objects in the thread, each including `type`, `user`, `text`, `ts`, and `thread_ts`. The response also includes a `has_more` flag indicating whether there are more results.


## Get Message Permalink

Retrieves a permanent link to a specific message.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel containing the message. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Message Ts | The timestamp of the message to retrieve the permalink for. To get the message timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `ts` value from the response. | string | Required. | 

=== "Output Parameters"

    Returns the permanent `permalink` URL to the message.


## Search Messages 

Searches for messages across the workspace matching a query. This operation utilizes the user token.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query | string | Required. |
    | Count | Results per page | integer | Optional. |
    | Page | Page number | integer | Optional. | 
    | Sort | The sort field (e.g., `timestamp`) | string | Optional. | 
    | Sort Dir | The sort direction: `asc` or `desc` | string | Optional. | 

=== "Output Parameters"

    A list of matching messages, each containing the message text, timestamp, channel ID, and user ID, along with pagination details.


## Add Reaction

Adds an emoji reaction to a message. Bots can only add reactions to messages they can read. The bot must be a member of the channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The emoji reaction name, without colons (e.g., `thumbsup`).<br/>Check out the [short code for status emoji](https://www.webfx.com/tools/emoji-cheat-sheet/). | string | Required. | 
    | Channel Id | The ID of the channel containing the message. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Message Ts | The timestamp of the message to react to. To get the message timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `ts` value from the response. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Remove Reaction

Removes an emoji reaction from a message.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The emoji reaction name to remove,  without colons (e.g., `thumbsup`). | string | Required. | 
    | Channel Id | The ID of the channel containing the message. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Message Ts | The timestamp of the message to remove the reaction from. To get the message timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `ts` value from the response. | string | Required. |

=== "Output Parameters"

    Returns `ok: true` on success.


## Get Reactions

Retrieves all reactions on a specific message.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the channel containing the message. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Required. | 
    | Message Ts | The timestamp of the message to retrieve reactions from. To get the message timestamp, use the [Get Channel History](/content/integrations/slack-operations#get-channel-history) operation and copy the `ts` value from the response. | string | Required. | 
    | Full | Whether to return the full reaction details, including the list of users who reacted. | boolean | Optional. | 

=== "Output Parameters"

    Returns the message object including its `type`, `text`, `ts`, and a `reactions` array. Each reaction includes the emoji `name`, `count`, and a list of `users` who reacted. When `Full` is set to `true`, the response also includes additional message details such as `bot_profile`, `blocks`, and `permalink`.


## Upload File

Uploads a file and optionally shares it in a channel with an initial comment.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channels | A comma-separated list of channel IDs to share the file in. | string | Required. | 
    | Filename | The name of the file to upload. | string | Required. | 
    | Content | The file contents as plain text. | string | Required. | 
    | Title | The title of the file. | string | Optional. | 
    | Initial Comment | A message to accompany the file when shared in a channel. | string | Optional. | 
    | Thread Ts | The timestamp of the parent message to post the file as a thread reply. | string | Optional. | 

=== "Output Parameters"

    Returns a list of uploaded file objects, each including `id`, `name`, `title`, `mimetype`, `filetype`, `size`, `url_private`, and `permalink`.


## List Files

Retrieves a list of files the bot has access to, with optional filters by type, user, or channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Count | The maximum number of files to return. | integer | Optional. | 
    | Cursor | The cursor for pagination. To paginate through results, pass the `next_cursor` value from the previous response into this field. | string | Optional. | 
    | Types | A comma-separated list of file types to filter by (e.g., `images`, `pdfs`). | string | Optional. | 
    | User Id | The ID of the user to filter files shared by them. To get a user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation or copy it from the user's profile in Slack. | string | Optional. | 
    | Channel Id | The ID of the channel to filter files by. To get the channel ID, use the [List Channels](/content/integrations/slack-operations#list-channels) operation or open the channel in Slack, click the channel name at the top, and scroll to the bottom to find the channel ID. | string | Optional. | 

=== "Output Parameters"

    Returns a list of file objects, each including `id`, `name`, `title`, `mimetype`, `filetype`, `size`, `url_private`, and `permalink`.


## Get File

Retrieves details about a specific file.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | File Id | The ID of the file to retrieve. To get the file ID, use the [List Files](/content/integrations/slack-operations#list-files) operation and copy the `id` value from the response. | string | Required. | 

=== "Output Parameters"

    Returns the file object, including its `id`, `name`, `title`, `mimetype`, `filetype`, `size`, `url_private`, and `permalink`.


## Open Conversation

Open or resume a direct message (DM) or multi-person DM with one or more users. This simply opens the conversation and returns an ID. This ID must be utilized to Send Messages.

This operation opens a DM or group DM from the bot's perspective. To open or join a public or private channel, use the [Join Channel](/content/integrations/slack-operations#join-channel) or [Invite to Channel](/content/integrations/slack-operations#invite-to-channel) operation instead.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Ids | A comma-separated list of user IDs to open a DM or group DM with. Pass a single user ID for a 1:1 DM, or multiple IDs for a group DM. | string | Optional. | 

=== "Output Parameters"

    Returns the conversation channel object, including its `id`, `name`, `is_channel`, `is_private`, `is_archived`, `topic`, and `purpose`.


## Close Conversation

Closes a direct message or multi-person DM.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel Id | The ID of the DM or group DM to close. To get the channel ID, use the [Open Conversation](/content/integrations/slack-operations#open-conversation) operation or the [List Channels](/content/integrations/slack-operations#list-channels) operation with `im` or `mpim` as the type filter. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Get User Info

Retrieves the account and profile details of a specified Slack user, including their username, admin status, and ownership role.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Id | The ID of the user to retrieve. To get the user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation and copy the `id` value from the response, or use the [List Channel Members](/content/integrations/slack-operations#list-channel-members) operation to get the IDs of members in a specific channel. | string | Required. | 

=== "Output Parameters"

    Returns the user object, including `id`, `name`, `real_name`, `is_admin`, `is_owner`, and a `profile` object containing `display_name`, `real_name`, `title`, `email`, `status_text`, and `status_emoji`.


## List Users

Retrieves the list of users in the workspace.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of users to return. | integer | Optional. | 
    | Cursor | The cursor for pagination. To paginate through results, pass the `next_cursor` value from the previous response into this field. | string | Optional. | 

=== "Output Parameters"

    Returns a list of user objects under `members`, each including `id`, `name`, `real_name`, `is_admin`, `is_owner`, and a `profile` object containing `display_name`, `real_name`, `title`, `email`, `status_text`, and `status_emoji`.


## Get User Profile

Retrieves the profile details of a specified Slack user, including their display name, job title, email address, current status, and any custom profile fields configured for the workspace.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Id | The ID of the user whose profile to retrieve. To get the user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation and copy the `id` value from the response, use the [List Channel Members](/content/integrations/slack-operations#list-channel-members) operation to get the IDs of members in a specific channel, or copy the member ID directly from the user's profile in Slack. | string | Required. | 
    | Include Labels | When set to `true`, includes the human-readable label for each custom profile field alongside its value in the response.<br/><br/>For example, for a custom field with ID `Xf05FFPZMMGD` will include `"label": "Phone"`, making it easier to interpret the data without needing a separate lookup. When `false` or omitted, only the field ID and its value are returned. | boolean | Optional. | 
     

=== "Output Parameters"

    Returns the user's `profile` object, including `display_name`, `real_name`, `title`, `email`, `status_text`,` status_emoji`, and `status_expiration`.


## Get User Status

Retrieves the present status of a user.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Id | The ID of the user whose status to retrieve. To get the user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation and copy the `id` value from the response, use the [List Channel Members](/content/integrations/slack-operations#list-channel-members) operation to get the IDs of members in a specific channel, or copy the member ID directly from the user's profile in Slack. | string | Required. | 

=== "Output Parameters"

    Returns the user's presence status, including `presence` (e.g., `active` or `away`).


## Update User Profile

Updates a user's profile fields such as status text and emoji. This operation needs a user token.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Profile | The profile fields to update as a JSON string. For example, `{"status_text":"In a meeting","status_emoji":":calendar:","status_expiration":0}`. <br/><br/>Check out the [short code for status emoji](https://www.webfx.com/tools/emoji-cheat-sheet/). | string | Required. | 
    | User Id | The ID of the user whose profile to update. To get the user ID, use the [List Users](/content/integrations/slack-operations#list-users) operation and copy the `id` value from the response, use the [List Channel Members](/content/integrations/slack-operations#list-channel-members) operation to get the IDs of members in a specific channel, or copy the member ID directly from the user's profile in Slack. | string | Optional. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Create User Group

Creates a new user group that can be mentioned with a handle.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the user group. | string | Required. | 
    | Handle | The handle used to mention the user group (e.g., @handle). | string | Required. | 
    | Description | A description of the user group. | string | Optional. | 
    | Channels | A comma-separated list of channel IDs to associate with the user group as default channels. | string | Optional. | 

=== "Output Parameters"

    Returns the created user group object, including `id`, `name`, `handle`, `description`, `is_disabled`, and a `users` array of member user IDs.


## Update User Group

Updates the name, handle, description, or associated channels of a user group.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Group Id | The ID of the user group to update. To get the user group ID, use the [List User Groups](/content/integrations/slack-operations#list-user-groups) operation and copy the `id` value from the response. | string | Required. | 
    | Name | The updated name of the user group. | string | Optional. | 
    | Handle | The updated handle used to mention the user group (e.g., @handle). | string | Optional. | 
    | Description | The updated description of the user group. | string | Optional. | 
    | Channels | A comma-separated list of channel IDs to associate with the user group as default channels. | string | Optional. | 

=== "Output Parameters"

    Returns the updated user group object, including `id`, `name`, `handle`, `description`, `is_disabled`, and a `users` array of member user IDs.


## Disable User Group

Disables a user group so it can no longer be mentioned.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Group Id | The ID of the user group to disable. To get the user group ID, use the [List User Groups](#list-user-groups) operation and copy the `id` value from the response. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## Enable User Group

Re-enable a previously disabled user group.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | User Group Id | The ID of the user group to enable. To get the user group ID, use the [List User Groups](#list-user-groups) operation and copy the `id` value from the response. | string | Required. | 

=== "Output Parameters"

    Returns `ok: true` on success.


## List User Groups

Retrieves the list of user groups in the workspace.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Include Users | Whether to include the list of user IDs in each group. | boolean | Optional. | 
    | Include Disabled | Whether to include disabled user groups in the results. | boolean | Optional. | 

=== "Output Parameters"

    Returns a list of user group objects, each including `id`, `name`, `handle`, `description`, `is_disabled`, and a `users` array of member user IDs.
