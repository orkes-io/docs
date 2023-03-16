# Task to Domain

The Task to Domain is the concept of limiting the task execution only to a specific worker via domain mapping. The domain name can be arbitrary.

Once a task is created, Conductor creates a queue for each task. When a workflow is run, the specific task execution is dropped into the queue and picked up by a worker. By default, any worker can pick up any task in the queue, which means that there is **NO_DOMAIN** limitation.

The task to domain functionality comes into use in situations where a specific task execution is to be done by a specific worker. For example:

- Debugging a worker - In cases like debugging a worker, you may want your test runs to hit only the test worker and the production traffic to hit only the production worker.
- Rolling out a new worker - Allocating a percentage of the task queue to the new worker in order to test it under load.

Situations like these can be tackled with a proper task to domain mapping.

## Using Task to Domain

The domain is to be provided both in the worker and while running the workflow.

### Specifying Domain while Invoking Workflow

A domain name is an arbitrary name given by the user. When you start/run a workflow, you can specify which tasks must run on which domains.

![diagram of using task to domain](/img/task_to_domain_diagram.jpg)

In the example workflow, the black line indicates the normal production environment, where Task X is polled by Worker X, where there is no domain set.

Now, let’s push a modified test version of Worker X on a different server. Here, we have given a domain **test** to Worker X. This ensures that this test worker will not pick the production tasks.

To test the workflow with the test version of worker X, we add the following while invoking the workflow.

```json
"taskToDomain: {
  "task_x": "test"
  }
```

So when we start/run the workflow, Conductor allows only the worker with the domain **test** to pick up **task x**. The workflow gets completed with the test version of the worker without affecting the production environment.

## Specifying Domain in Worker

The workflow invocation is specified with the domain **test**. Next, you need to use the same domain while configuring the worker. On your worker project, you need to edit the **OrkesWorkersApplication** file to change the **TaskRunner** configuration such that **task x** is given the domain **test**. On configuring this, the worker would only pick the tasks in a workflow executed with the same domain **test**.

Check out [Using Task to Domain](https://orkes.io/content/docs/codelab/taskToDomain) for a detailed example of using this in a sample production environment.

## Fallback Task to Domain​

When starting a workflow, multiple domains can be specified as fallbacks; for example, "domain1,domain2". Conductor keeps track of the last polling time for each task. In this case, it checks for any active workers for **domain1**; if present, the task is polled by the **domain1** worker. If not, the same check is done for the next domain in the sequence, **domain2**, and so on.

If no workers are active for the domains provided:

- If **NO_DOMAIN** is provided as the last token in the list of domains, then no domain is set for the tasks.
- Otherwise, the task will be added to the last inactive domain in the list of domains, hoping that workers will soon be available for that domain.

Also, a `*` token can be used to apply domains for all tasks. This can be overridden by providing task-specific mappings along with `*`.

### Example

```json
"taskToDomain": {
  "*": "mydomain",
  "some_task_x":"NO_DOMAIN",
  "some_task_y": "someDomain, NO_DOMAIN",
  "some_task_z": "someInactiveDomain1, someInactiveDomain2"
}
```

- Puts **some_task_x** in default queue (no domain).
- Puts **some_task_y** in **someDomain** domain, if available or in default otherwise.
- Puts **some_task_z** in **someInactiveDomain2**, even though workers are not available yet.
- And puts all other tasks in **mydomain** (even if workers are not available).

:::note

- The "fallback" domain strings can only be used when starting the workflow. When polling from the client, only one domain is used.
- The **NO_DOMAIN** token should be used last.
  :::
