---
slug: netflix-conductor-handling-retries-and-timeout 
title: Netflix Conductor- Handling retries and timeout
authors: orkes 
tags: [Netflix Conductor, Orkes, Conductor, orchestration, microservices, 2022]
---

## What is Conductor
[Conductor](https://github.com/Netflix/conductor) is a Microservices orchestration platform from Netflix, released under Apache 2.0 Open Source License.

## Design for failures
Failures and service degradation are the facts of any system; this is especially true with large interconnected systems running in the cloud. Conductor is designed with principles that systems can and will go down, degrade in performance and any dependencies should be able to handle such failures.

## Tasks in Conductor
Conductor workflows are the orchestration of many activities known as `tasks`. Each task represents ideally a stateless worker who does the work and produces output given a specific input. The tasks are typically running outside the Conductor server and there are many factors that could affect their availability.

## Designing for failures
Conductor allows you to define your stateful applications that can handle failures and temporary degradation of services and without having to write code.

### Configuring tasks to handle failures
Each task in Conductor can be configured in a way how it responds to availability events such as: 

1. Failures
2. Timeouts 
3. Rate limits.


Here is a sample task definition:

```
{
  "createdBy": "user",
  "name": "sample_task_name_1",
  "description": "This is a sample task for demo",
  "responseTimeoutSeconds": 10,
  "timeoutSeconds": 30,
  "timeoutPolicy": "TIME_OUT_WF",
  "retryCount": 3,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 5,
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1
}
```


```retry*``` parameters specify how to handle cases where the task execution fails and retries can be configured to be with fixed delay or exponential backoff.  Similarly ```timeout*``` parameters specify how much time to give for a task to complete execution and if the task should be marked as 'Timed Out' if it runs longer than that.

## More Details
[https://orkes.io/content/docs/how-tos/Tasks/task-configurations](https://orkes.io/content/docs/how-tos/Tasks/task-configurations)

Follow us at [https://github.com/Netflix/conductor/](https://github.com/Netflix/conductor/)
for the source code and updates.