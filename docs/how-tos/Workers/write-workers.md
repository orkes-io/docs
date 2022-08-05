# Writing Workers

## What Are Workers?

Conductor is built to connect microservices together and orchestrate workflows.  In Conductor's parlance, each microservice is a `worker`.

Each worker is a microservice that is a small autonomous unit. Each worker performs a small, well-defined task.  There are defined input parameters, and the output parameters are also well defined.

You can create your workers in any language. Our [SDKs](/content/docs/how-tos/SDKs) will help speed along the development.

## Why Create Workers

For each custom task that must be performed, a microservice is the smallest possible application that can complete the task.  

Workers poll a Conductor task, and the parameters of each invocation is defined by the task that the worker polls.

## Worker Features

### Worker Callbacks



### Control Poll timing
### Long running tasks
### adding Execution logs
### Adding Output
### Failing Tasks