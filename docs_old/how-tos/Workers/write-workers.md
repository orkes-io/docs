# Writing Workers

## What Are Workers?

Conductor is built to connect microservices and orchestrate workflows.  In Conductor's parlance, each microservice is a `worker`.

Each worker is a microservice that is a small autonomous unit. Each worker performs a small, well-defined task.  There are defined input parameters, and the output parameters are also well-defined.

You can create your workers in any language. Our [SDKs](/content/docs/how-tos/SDKs) will help speed along the development.

## Why Create Workers

For each custom task that must be performed, a microservice is the smallest possible application that can complete the task.  

Workers poll a Conductor task, and the parameters of each invocation are defined by the task that the worker polls.

## Worker Features

### Worker Callbacks

When a worker picks up a task, it can send a callback to Conductor:
`callBackAfterSeconds` with a value in seconds.

For example, if a task sends `callBackAfterSeconds=60` to the Conductor server, the queue expects a response from the worker within 60 seconds.

If no response is received by the Conductor server within those 60s, the task is placed back into the queue, and can be picked up by another worker.

This has been used by developers as a [heartbeat mechanism](https://github.com/Netflix/conductor/issues/896) for tasks that can run for a long period, but also sometimes crash.

