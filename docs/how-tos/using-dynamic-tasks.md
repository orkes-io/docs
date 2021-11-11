---
sidebar_position: 1
---

# Using Dynamic Tasks

Learn more about how to implement and use **Dynamic Tasks** [here](../reference-docs/dynamic-task)

Dynamic Tasks are useful in situations when need to run a task of which the task type is determined at runtime instead
of during the configuration. It is similar to the [SWITCH](../reference-docs/switch-task) use case but in this situation
we won't need to preconfigure all case options in the workflow definition itself. Instead, we can mark the task
as `DYNAMIC` and determine which underlying task does it run during the workflow execution itself. 

1. Use `DYNAMIC` task as a replacement for `SWITCH` if you have too many case options.

2. `DYNAMIC` task is an option when you want to programmatically determine the next task to run vs using expressions
