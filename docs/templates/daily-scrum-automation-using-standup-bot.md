---
slug: "/templates/daily-scrum-automation-using-standup-bot"
description: "Use this template to automate your daily stand-ups with Orkes Conductor."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Daily Scrum Automation using Standup Bot

Conducting daily standups can be a significant challenge for remote teams, especially when employees are spread across multiple time zones. As team sizes grow, ensuring that everyone submits their updates in a timely and organized manner becomes increasingly difficult. Manual processes often lead to missed updates, miscommunication, or unnecessary back-and-forth between team members and managers.

This template automates the daily standup process using a Conductor-Slack webhook integration. It collects updates from team members via personalized Slack messages, waits for a set timeframe, and compiles the responses. Once all updates are received or the app timeout is reached, the bot posts them to a shared team channel, ensuring a seamless and organized standup.

## Conductor features used

This template utilizes the following Conductor features:

- [Fork/Join task](https://orkes.io/content/reference-docs/operators/fork-join)
- [Sub Workflow task](https://orkes.io/content/docs/reference-docs/sub-workflow-task)
- [Join task](https://orkes.io/content/reference-docs/operators/join)
- [HTTP task](https://orkes.io/content/reference-docs/system-tasks/http)
- [Do While task](https://orkes.io/content/reference-docs/operators/do-while)
- [Wait for Webhook task](https://orkes.io/content/reference-docs/system-tasks/wait-for-webhook)
- [JSON JQ Transform task](https://orkes.io/content/reference-docs/system-tasks/jq-transform)

## How to use the template

1. Import the template
2. Understand the workflow logic
3. Create a webhook
4. Create Slack app
5. Modify the workflow template
6. Run workflow

### Import the template

**To import the template:**

1. Go to **Template Explorer** from the left navigation menu on your Conductor cluster.
2. Choose **StandUp Bot** and select **Import**.
3. Rename the workflow and task names. For example, rename the workflow as “_standup_updates_main_your_name_”.
4. Select **Save**.

The workflow is now imported and ready for use.

<p align="center"><img src="/content/img/standup-bot-main-workflow.png" alt="Standup bot workflow" width="50%" height="auto"></img></p>

### Understand the workflow logic

This section explains the workflow logic and how to execute it.

**Parent workflow logic:**

- The **standup-bot-main-workflow** workflow begins with a [Fork/Join](https://orkes.io/content/reference-docs/operators/fork-join) task that splits into multiple parallel forks. The number of forks is determined based on the number of users the bot serves.
- Each fork contains a [Sub Workflow](https://orkes.io/content/docs/reference-docs/sub-workflow-task) task that invokes the **individual_updates** workflow.
- Once the forks are completed, the [Join task](https://orkes.io/content/reference-docs/operators/join) combines all the forks, and the workflow is completed.

**Sub-workflow  logic:**

<p align="center"><img src="/content/img/individual-updates-workflow.png" alt="Workflow for individual user updates" width="50%" height="auto"></img></p>

- The **individual_updates** workflow begins with an [HTTP task](https://orkes.io/content/reference-docs/system-tasks/http) that sends a welcome message to the user asking for their scrum updates.
- Next, a [Do While task](https://orkes.io/content/reference-docs/operators/do-while) captures the user inputs. The loop condition for the Do While task is checked using a [Wait for Webhook](https://orkes.io/content/reference-docs/system-tasks/wait-for-webhook) task that captures incoming events from Slack.
- It is followed by a series of [JSON JQ Transform](https://orkes.io/content/reference-docs/system-tasks/jq-transform) tasks that aggregate updates from the user, convert them into CSV format, and append the update with the user’s name.
- The final task is an HTTP task that posts the updates to a dedicated Slack channel.

### Create a webhook

The Wait for Webhook task in the workflow captures the users' updates as incoming events through the Slack webhook.

**To create a webhook in Conductor:**

1. Go to **Definitions** > **Webhook** from the left navigation menu on your Conductor cluster.
2. Select **+ New webhook.**

<p align="center"><img src="/content/img/webhook-standupbot.png" alt="Slack Webhook in Conductor for Standup bot" width="80%" height="auto"></img></p>

3. In **Webhook name**, enter a unique name for the webhook.
4. In **Workflows to receive webhook event**, select both the workflows imported in the previous step.
5. In **Source platform**, select **Slack**.
6. Select **Save**.

An unverified webhook URL will be generated. The next step is to create a Slack app that sends events to the workflow via a webhook.

### Create Slack app

**To create a Slack app:**

1. Sign in to [Slack API](https://api.slack.com/apps).
2. Select **Create an App**.
3. Enter an **App name**, and select a workspace to integrate the Slack app.
4. From the left navigation menu, go to **Features** > **Incoming Webhooks**, and turn on **Activate Incoming Webhooks**.
5. Go to **Features** > **Event Subscriptions**, and turn on **Enable events**.
    - In **Request URL**, enter the Webhook URL created in Conductor.
    - In **Subscribe to bot events**, select **Add Bot User Event** and choose **message.im** event.
    - Select **Save changes**.
6. Go to **Features** > **App Home** > **Show Tabs**.
    - In **Messages** Tab, enable the option *Allow users to send Slash commands and messages from the messages tab*.
7. Enable permissions for the Slack app by going to **Feature** > **OAuth & Permissions**.
    - In **Scopes** > **Bot Token Scopes**, select **Add an OAuth scope**.
    - Add **chat:write** permission.

The Slack app is created.

**To install the app to Slack workspace:**

1. From the [Slack API](https://api.slack.com/apps) console, go to **Settings** > **Install App**.
2. Select **Install to Test Workspace**.
3. In **Where Should [Acme Bot] post**, select the channel to install the app and select **Allow**.

<p align="center"><img src="/content/img/slack-app-installation.png" alt="Installing Slack App to the workspace" width="50%" height="auto"></img></p>

The Slack bot is integrated into the specified channel:

<p align="center"><img src="/content/img/slack-app-installed-in-workspace-channel.png" alt="Slack app installed into the specified channel" width="70%" height="auto"></img></p>

Once the app is installed in your workspace, a **Bot User OAuth Token** and a **Webhook URL** will be generated. These are to be added as secrets in Conductor.

<p align="center"><img src="/content/img/generated-tokens.png" alt="Generated tokens in Slack API" width="80%" height="auto"></img></p>

**To store the OAuth Token and Webhook URL as secrets in Conductor:**

1. Go to **Definitions** > **Secrets** from the left menu on your Conductor cluster.
2. Select **+ Add Secret** and add the following:
    - Enter **Secret name** as *slack_standup_token*.
    - In **Secret** value, enter the *Bot User OAuth token* generated in the previous step.
3. Select **Add** to save the secret.

Repeat the process to create another secret, where:

- **Secret name** is *slack_conductor_channel_url*.
- **Secret value** is the Webhook URL generated in Slack API.

:::note
The workflow is configured to use specific secret names, so the secrets must be stored with those exact names.
:::

### Modify the workflow template

Before using this template, make the following updates to the imported workflow:

1. In the *standup_updates_main* workflow, replace **user_name** and **user_id** in the sub-workflow tasks with the respective employee details.  
    - **user_name**–Enter the employee’s name.
    - **user_id**–Enter the member ID from Slack.<br/>
    **To get the Member ID:**
    - Go to **Slack workspace** > Select the user profile > **View the profile** > Click on three dots > **Copy member ID**.
    <p align="center"><img src="/content/img/member-id-slack.png" alt="Getting member ID from Slack" width="30%" height="auto"></img></p>

### Run workflow

You can run the workflow in different ways.

<Tabs>
<TabItem name="Using Scheduler" value="Using Scheduler">

The Scheduler allows you to set a predefined cadence for running a workflow. Once the schedule is configured, Conductor will automatically invoke the workflow at the specified intervals, such as 9 AM PT on weekdays.

**To schedule workflows:**

1. Go to **Definitions** > **Scheduler** from the left navigation menu on your Conductor cluster.
2. Select **+ Define Schedule**.
3. Provide a schedule name, select the workflow name and version, and set the schedule using the cron expression. 
4. Select **Save** > **Confirm**.

Refer to [Scheduling Workflows](https://orkes.io/content/developer-guides/scheduling-workflows) documentation for more details.

</TabItem>
<TabItem name="Using Conductor UI" value="Using Conductor UI">

**To run the workflow using Conductor UI:**

1. From your imported workflow, go to the **Run** tab.
2. Select **Run Workflow**.

<p align="center"><img src="/content/img/run-workflow-standup-bot.png" alt="Running workflow from Conductor UI" width="90%" height="auto"></img></p>

</TabItem>
<TabItem name="Using API" value="Using API">

Use the following endpoint to start the workflow:

```shell
POST /api/workflow/{name}
```

Refer to the [Start Workflow Execution API reference](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution) for more information.
</TabItem>
</Tabs>

## Workflow output

When the workflow is triggered, the bot requests updates from users.

<p align="center"><img src="/content/img/bot-collecting-updates.png" alt="Bot requesting updates from user" width="90%" height="auto"></img></p>

Users must send "done" after posting updates. The bot collects these and posts them to the specified channel.

<p align="center"><img src="/content/img/bot-posting-updates.png" alt="Bot posting updates to the channel" width="90%" height="auto"></img></p>

Returning to the workflow execution, you can see that the particular user's branch is completed while the workflow waits for updates from the remaining users. Once all users post their updates, the workflow gets completed.

<p align="center"><img src="/content/img/partially-completed-workflow.png" alt="Partially completed workflow" width="70%" height="auto"></img></p>

This template provides a starting point for customizing the workflow to your needs. You can easily add steps and modify it to suit your business requirements. 

## Example Modifications

If an employee is out of office, the workflow will not complete unless configured otherwise. To handle such cases, you can mark each fork as optional, ensuring the bot does not wait indefinitely for updates when someone is unavailable.

<p align="center"><img src="/content/img/forks-as-optional.png" alt="Each of the fork is marked as optional" width="70%" height="auto"></img></p>

The bot’s waiting period for updates can be configured by setting a timeout for the **individual_updates** workflow. For example, to allow a 3-hour window from the scheduled time set the timeout seconds to 10800 seconds.

<p align="center"><img src="/content/img/workflow-timeout-for-sub-workflows.png" alt="Workflow timeout set for individual updates workflow" width="70%" height="auto"></img></p>

This ensures the bot operates for 3 hours from the runtime, with the forks marked as optional. After the 3 hours, updates from users who have responded will be collected and posted to the specified channel.

## Video Guide

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/lk6BxLM8upE?si=Y6COc-3QDXlwO7MH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>