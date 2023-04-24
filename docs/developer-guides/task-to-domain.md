# Routing Tasks (Task to Domain)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Typically, for each configured task type - Conductor server will maintain a queue and will distribute task work to all the 
workers connected to the server as shown in this diagram:

<p align="center"><img src="/content/img/task-routing.png" alt="Task to domain example workflow" width="90%"
                       height="auto"/></p>

Conductor supports a feature where the same task can be routed to a different set of workers based on a concept called as
__Task to Domain__. This is a value that is supplied to the workflow when its triggered and if present it routes the tasks in a
different way to usual. This is illustrated as shown below.

<p align="center"><img src="/content/img/task-routing-domains.png" alt="Task to domain example workflow" width="90%"
                       height="auto"/></p>



Here - task type __send_email__ has two additional sets of worker instances who are listening to specific domain based tasks.
Domains are nothing but a label that connects the task work to the worker instance. As an example
all the tasks with domain `dedicated_for_app_x` is sent to the workers configured with domain `dedicated_for_app_x`.

:::tip
The Task to Domain is the concept of limiting the task execution only to a specific worker via domain mapping. The domain name can be arbitrary string.
:::

This feature can be really useful. Some example scenarios are:

* Ensuring that the work is routed to a worker with the appropriate permissions 
* Load balancing or prioritizing some tasks with a set of dedicated workers
* Implementing unique behaviors by domain
* Debugging a task with a worker deployed on local machine or a worker running a different version of the code that the regular one

All of these cases can also be done by using a unique task name, and domain is just an alternative way to do that. 
Instead of having to create new tasks, we can use the same task name and still have custom routing based on the domain.


## Using Task to Domain

To successfully route a task by domain:

1. Configure your workers to start polling for work that is tagged by the domain
2. When triggering the workflow, ensure the __taskToDomain__ map is set to the right mapping values

### Configuring Workers with Domain 

Let's configure the workers with a domain label called `test`

<Tabs>
<TabItem value="Java" lable="Java">

TODO: Coming soon

</TabItem>
<TabItem value="Python" label="Python">

TODO: Coming soon

</TabItem>
<TabItem value="Go" label="Go">

TODO: Coming soon

</TabItem>
<TabItem value="CSharp" label="CSharp">

TODO: Coming soon

</TabItem>
<TabItem value="Clojure" label="Clojure">

TODO: Coming soon

</TabItem>
<TabItem value="Javascript" label="Javascript">

TODO: Coming soon

</TabItem>
</Tabs>


### Specifying Domain while Invoking Workflow

When we start/run a workflow, we can specify which tasks must run on which domains. To run the workflow with task routed to domain based worker, we can specify the following task to domain mapping:

```json
{ 
    "task_x": "test"
}
```

## Fallback Task to Domain

Another feature of domains is that you can specify a fall back domain. The concept is simple, for the following configuration:

```javascript
{
    "task_x": "test,fallback,NO_DOMAIN"
}
```

Conductor will try to route to task workers with domain `test` if available, and if not will try domain `fallback` and subsequently to workers with no domain.

:::tip
NO_DOMAIN is a keyword that means workers with no domain.
:::

In terms of the order of domains: 
* If **NO_DOMAIN** is provided as the last token in the list of domains, then no domain is set for the tasks
* Otherwise, the task will be added to the last inactive domain in the list of domains, hoping that workers will soon be available for that domain

Also, a `*` token can be used to apply domains for all tasks. This can be overridden by providing task-specific mappings along with `*`.

In this example, 
```json
"taskToDomain": {
   "*": "mydomain",
   "task-a": "NO_DOMAIN",
   "task-b": "abc, NO_DOMAIN",
   "task-c": "someInactiveDomain1, someInactiveDomain2"
}
```

* Task **task-a** is put in the default queue (no domain)
* Task **task-b** is put in the **abc** domain, if available, or in default otherwise
* Task **task-c** is put in **someInactiveDomain2**, even though workers are unavailable
* All other tasks in this workflow are put in **mydomain**

:::note
* The "fallback" domain strings can only be used when starting the workflow. When polling from the client, only one domain is used
* The **NO_DOMAIN** token should be used last
:::
