---
slug: conductor-has-secrets
title: SHH! Conductor has secrets!
authors: doug 
tags: [Netflix Conductor, orchestration, security, 2022]
image: https://orkes.io/content/img/recycle_logo.jpeg
---


We are really excited to announce the latest feature to Orkes' cloud hosted version of Netflix Conductor.  It is now no longer a secret - we support the use of secrets in your workflow definitions! Now you can be certain that your secret keys, tokens and values that you use in your workflows are secure!


<!--truncate-->

## What do you mean by secrets?

In many of applications today, interaction with third party applications is common. Typically this will require some form of authentication to gain access.  When you are coding, there is a concept of a local secure store where sensitive values are kept (and thus not shared to GitHub etc.)  This prevents accidental disclosure of your secrets when posting code to GitHub or when sharing your code to other teams.

Until now, there has been no way to securely use any sensitive value in a Conductor workflow.  Just about every developer has a story of accidentally posting a sensitive value on GitHub. Here's my story of accidentally sharing a sensitive value with a COnductor workflow:

In the [`order fulfillment` codelab](https://orkes.io/content/docs/codelab/orderfulfillment5#adding-a-error-flow), the failure workflow has a Slack token that is unique, and if publicly accessible could be used to SPAM a Slack channel.  When writing the tutorial, I shared the task definition in the docs - *with* the Slack token.

Slack caught this:

<p align="center"><img src="/content/img/slack_oops.jpg" alt="aaccidently shared a hardcoded slack token" width="600" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Super embarrassing, but no serious consequences (in this instance).

## Don't let this happen to you!

In Orkes hosted instances of Netflix Conductor, we now feature secrets.  You can save your secret on the Conductor server, and Conductor will *use* the value when required, but will not expose the value in any outputs from the workflow.

It is a very easy setup - simply login to your instance of Netflix Conductor at Orkes (or try our [Playground](https://play.orkes.io) for free!).  In the left navigation, click `Secrets`.  This will lead to a table of your secrets (which is probably empty). 

<p align="center"><img src="/content/img/secrets_dashboard.jpg" alt="the Orkes Cloud Secrets dashboard" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Click `Add Secret`, give it a name, paste in your value, and press save. That's all there is to it.

## Using your secret

In Conductor workflows, secrets use a similar format to other variables.  For example, to reference an input variable called `address` you'd use `${workflow.input.address}`.

If you had a secret called `Stripe_api_key`, you reference this value with the variable `${workflow.secrets.Stripe_api_key}`.

## An example

Accessing GitHubs APIs requires an API token.  In the following HTTP task, I call a GitHub API, and can reference the secret `Doug_github` for the authorization header.

```json
{
      "name": "Get_repo_details",
      "taskReferenceName": "Get_repo_details_ref",
      "inputParameters": {
        "http_request": {
                 // highlight-next-line
          "uri": "https://api.github.com/repos/${workflow.input.gh_account}/${workflow.input.gh_repo}",
          "method": "GET",
          "headers": {
                 // highlight-next-line
            "Authorization": "token ${workflow.secrets.Doug_github}",
            "Accept": "application/vnd.github.v3.star+json"
          },
          "readTimeOut": 2000,
          "connectionTimeOut": 2000
        }
      },
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }
```

When this workflow is run, other variables are replaced, but the value of the secret remains a secret.  Note that in the uri, `${workflow.input.gh_account}/${workflow.input.gh_repo}` is replaced with `netflix/conductor`, but the authorization header remains obfuscated.

```json
{
  "headers": {
         // highlight-next-line
    "Authorization": "token ${workflow.secrets.Doug_github}",
    "Accept": "application/vnd.github.v3.star+json"
  },
  "method": "GET",
  "readTimeOut": 2000,
       // highlight-next-line
  "uri": "https://api.github.com/repos/netflix/conductor",
  "connectionTimeOut": 2000
}

```


## Conclusion

Secrets have been one of the most requested features for Netflix Conductor when we speak to developers, and for that reason we're excited to announce this launch.  We cannot wait to hear about how this release is making workflow development more secure and opening new avenues of development - now that these values can be securely stored.

Give them a try in the [Orkes Playground](https://play.orkes.io), and we w ould love to hear what you think in our [Slack](https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg) or [Discord](https://discord.com/invite/P6vVt9xKSQ) communities