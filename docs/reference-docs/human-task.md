---
sidebar_position: 1
---

# Human Task
```json
"type" : "HUMAN"
```
### Introduction

The human task is used when the workflow needs to be paused for an external signal by a human to continue.

### Use Cases
HUMAN is used when the workflow needs to wait and pause for  human intervention 
(like manual approval) or an event coming from an external source such as Kafka, SQS or Conductor's internal queueing mechanism.

Some use cases where the Human task is used:
1. To add a human approval task.  When the task is approved/rejected by HUMAN task is updated using `POST /tasks` API to completion.

Here's a sample API call:

```json
curl -X POST "https://play.orkes.io/api/tasks" \
-H  "accept: text/plain" \
-H  "X-Authorization: <JWT Token>" \
-H  "Content-Type: application/json" \
-d '{"workflowInstanceId":"180f5ea5-f946-11ec-bbb8-ae81f2ae657a","taskId":"75f51499-f948-11ec-bbb8-ae81f2ae657a","outputData": {"outputdata":"yummy"},"status":"COMPLETED"}'
```


### Configuration
* taskType: HUMAN
* There are no other configurations required


