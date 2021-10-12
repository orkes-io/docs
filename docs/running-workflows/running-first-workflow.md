---
sidebar_position: 1
---

# Running Hello World Workflow

In this article we will explore how you can run a really simple workflow that runs without any microservice. Yes!
Conductor has in-built tasks that you can use to run quite a bit of things. We will use one of these in-built tasks to
run your very first workflow.

Using system or in-built tasks is a great way to run a lot of your code in production.

After following the steps listed in this article, you would have:

1. Run your first workflow
2. Learn how system or in-built tasks work - specifically the HTTP_TASK

This post is specifically for running a sample workflow in your environment to ensure that everything is working as
expected. You can refer to one of the following posts to set up your environments before continuing with the post if you
don’t already have an environment.

1. [Running Locally - From Code](../getting-started-local/running-locally.md)
2. [Running Locally - Docker Compose](../getting-started-local/running-locally-docker.md)
3. [Running Locally - Kubernetes](../getting-started-local/running-locally-minikube.md)

---

## Running your First Workflow

This is a sample workflow that you can leverage for your test.

```json
{
  "createTime": 1627629229443,
  "updateTime": 1630694890267,
  "name": "sample_workflow_v1",
  "description": "Demo Workflow",
  "version": 1,
  "tasks": [
    {
      "name": "get_population_data",
      "taskReferenceName": "get_population_data",
      "inputParameters": {
        "http_request": {
          "uri": "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
          "method": "GET"
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
  ],
  "inputParameters": [],
  "outputParameters": {
    "data": "${get_population_data.output.response.body.data}",
    "source": "${get_population_data.output.response.body.source}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "example@email.com",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {}
}
```

This is an example workflow that queries a publicly available JSON API to retrieve some data. This workflow doesn’t
require any worker implementation as the tasks in this workflow are managed by the system itself. This is an awesome
feature of Conductor. For a lot of typical work, you won’t have to write any code at all.

Let's talk about this workflow a little more so that you can gain some context.

```json
"name": "sample_workflow_v1"
```

