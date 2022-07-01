# Task to Domain

Task to domain helps to support task debugging and development (even while the task is running in production). 

Once a task is created, Conductor creates a queue for each task.  When a workflow is run, the specific task execution is dropped into the queue and picked up by a worker. By default, any worker can pick up any task in the queue (there is `NO_DOMAIN` limitation).

There are times when it may be important to send a specific task iteration to a specific worker. 

* Debugging a worker - you want your test runs to hit the test worker only (and production traffic to hit the production worker only).
* Rolling out a new worker - allocating a percentage of the task queue to the new worker in order to test it under load.

![diagram of using task to domain](/img/task_to_domain_diagram.jpg)

This is where task to domain comes in.

## Domain
A domain is any arbitrary name given to the worker by the developer. When the workflow is started, input parameters can specify which tasks need to run on which specific domains.  This forces the workflow's tasks to be run on specific workers outside of the general pool of workers.

In the example workflow above, we'll modify the domains for Task X. In production, worker X is polling the Task X queue to complete any production jobs that are created. 

Now, let's push a modified test version of Worker X on a different server.  We want to ensure that Program 1 tasks are not sent to the test version of Worker X. We can apply a domain to our test worker (in this case calling the domain "test".)  This ensures that the production traffic will not get picked up by this worker.

We can test the workflow with the test version of worker X.  We add:

```json
"taskToDomain: {
  "task_x": "test"
  }
```
when we start the workflow.  This directs conductor to only allow Worker X with domain `test` to pick up this task - and the workflow will complete wit the test version of the worker.

## Fallback task to domain

When starting a workflow multiple domains can be specified as a fall backs, for example "domain1,domain2". Conductor keeps track of last polling time for each task, so in this case it checks if the there are any active workers for "domain1" then the task is put in "domain1", if not then the same check is done for the next domain in sequence "domain2" and so on.

If no workers are active for the domains provided:

- If `NO_DOMAIN` is provided as last token in list of domains, then no domain is set.
- Else, task will be added to last inactive domain in list of domains, hoping that workers would soon be available for that domain.

Also, a `*` token can be used to apply domains for all tasks. This can be overridden by providing task specific mappings along with `*`. 

## Example

```json
"taskToDomain": {
  "*": "mydomain",
  "some_task_x":"NO_DOMAIN",
  "some_task_y": "someDomain, NO_DOMAIN",
  "some_task_z": "someInactiveDomain1, someInactiveDomain2"
}
```

- puts `some_task_x` in default queue (no domain).
- puts `some_task_y` in `someDomain` domain, if available or in default otherwise.
- puts `some_task_z` in `someInactiveDomain2`, even though workers are not available yet.
- and puts all other tasks in `mydomain` (even if workers are not available).


<b>Note</b> that this "fall back" type domain strings can only be used when starting the workflow, when polling from the client only one domain is used. `NO_DOMAIN` token should be used last.



