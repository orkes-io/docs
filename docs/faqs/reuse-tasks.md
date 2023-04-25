# How can we reuse tasks?

A powerful feature of Conductor is that it supports and enables re-usability out of the box. Task workers typically perform a unit of work and are usually a part of a larger workflow. Such workers are often reusable in multiple workflows. Once a task is defined, you can reuse it multiple times in the same workflow (with a different TaskReferenceName). Once defined, tasks can also be used in multiple workflows.

When re-using tasks, it's important to think of situations that a multi-tenant system faces. By default, all the work assigned to this worker goes to the same task-scheduling queue. This could result in your worker not being polled quickly if there is a noisy neighbor in the ecosystem. You can tackle this situation by re-using the worker code but having different task names registered for different use cases. And for each task name, you can run an appropriate number of workers based on the expected load.
