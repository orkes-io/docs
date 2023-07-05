# Routing Tasks (Task to Domain)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Typically, for each configured task type - Conductor server will maintain a queue and will distribute task work to all the 
workers connected to the server, as shown in this diagram:

<p align="center"><img src="/content/img/task-routing.png" alt="Task to domain example workflow" width="90%"
                       height="auto"/></p>

Conductor supports a feature where the same task can be routed to a different set of workers based on a concept called as
__Task to Domain__. This is a value that is supplied to the workflow when it is triggered, and if present, it routes the tasks in a different way than usual. This is illustrated as shown below.

<p align="center"><img src="/content/img/task-routing-domains.png" alt="Task to domain example workflow" width="90%"
                       height="auto"/></p>



Here - task type __send_email__ has two additional sets of worker instances that are listening to specific domain-based tasks. Domains are nothing but a label that connects the task work to the worker instance. For example, all the tasks with domain `dedicated_for_app_x` are sent to the workers configured with domain `dedicated_for_app_x`.

:::tip
The Task to Domain is the concept of limiting the task execution only to a specific worker via domain mapping. The domain name can be an arbitrary string.
:::

This feature can be really useful in the following scenarios:

* Ensuring that the work is routed to a worker with the appropriate permissions 
* Load balancing or prioritizing some tasks with a set of dedicated workers
* Implementing unique behaviors by domain
* Debugging a task with a worker deployed on a local machine or a worker running a different version of the code than the regular one

All of these cases can also be done by using a unique task name, and the domain is just an alternative way to do that. Instead of creating new tasks, we can use the same task name and still have custom routing based on the domain.


## Using Task to Domain

To successfully route a task by domain:

1. Configure your workers to start polling for work that is tagged by the domain
2. When triggering the workflow, ensure the __taskToDomain__ map is set to the right mapping values

### Configuring Workers with Domain 

Let's configure the workers with a domain label called `test`. Every worker polling for `taskName` will use `test` as domain.

<Tabs>
<TabItem value="Java" lable="Java">

| Description                                | PropertyName                           | Example                                        |
| ------------------------------------------ | -------------------------------------- | ---------------------------------------------- |
| System property by **taskName**            | `conductor.worker.${TASK_NAME}.domain` | `conductor.worker.taskName.domain=test`        |
| System property for **all** workers        | `conductor.worker.all.domain`          | `conductor.worker.all.domain=test`             |
| Class `TaskRunner` constructor param       | `taskToDomain`                         | `taskToDomain=Map.of("taskName", "test")`      |
| Annotation `@WorkerTask` constructor param | `domain`                               | `@WorkerTask(value="taskName", domain="test")` |

Code example for `TaskRunner`:
```java
private static void startTaskRunnerWorkers(TaskClient taskClient) {
      List<Worker> workers = Arrays.asList(new TaskWorker());
      TaskRunnerConfigurer.Builder builder = new TaskRunnerConfigurer.Builder(taskClient, workers);

      Map<String, String> taskToDomains = new HashMap<>();
      taskToDomains.put("task-domain-runner-simple-task", "test");
      Map<String, Integer> taskThreadCount = new HashMap<>();

      TaskRunnerConfigurer taskRunner =
              builder.withThreadCount(2)
                      .withTaskToDomain(taskToDomains)
                      .withTaskThreadCount(taskThreadCount)
                      .withSleepWhenRetry(500)
                      .withWorkerNamePrefix("task-domain")
                      .withUpdateRetryCount(3)
                      .build();

      // Start Polling for tasks and execute them
      taskRunner.init();

      // Optionally, use the shutdown method to stop polling
      taskRunner.shutdown();
  }

private static class TaskWorker implements Worker {

    @Override
    public String getTaskDefName() {
        return "task-domain-runner-simple-task";
    }

    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);

        result.getOutputData().put("key2", "value2");
        result.getOutputData().put("amount", 145);
        result.setStatus(TaskResult.Status.COMPLETED);

        return result;
    }
}
```

<br></br>

Code example for `@WorkerTask`:
```java
@WorkerTask(value="task-domain-annotated-simple-task", domain="test")
public TaskResult sendAnnotatedTaskDomain(Task task) {
    TaskResult result = new TaskResult(task);

    result.getOutputData().put("key", "value");
    result.getOutputData().put("amount", 123.45);
    result.setStatus(TaskResult.Status.COMPLETED);

    return result;
}

```

View the [complete code here](https://github.com/orkes-io/orkes-conductor-client/blob/main/example/java/io/orkes/conductor/sdk/examples/TaskDomainWorker.java).

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

```clojure
(runner-executer-for-workers options [worker] 1 {:domain 'some-domain'})
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
// You can specify on the worker
export const userInfoWorker = () => {
  return {
    domain: "myDomain",
    taskDefName: GET_USER_INFO,
    execute: async ({ inputData }) => {
      const userId = inputData?.userId;
      return {
        outputData: {
          email: `${userId}@email.com`,
          phoneNumber: "555-555-5555",
        },
        status: "COMPLETED",
      };
    },
  };
};
// or on the Poller Option
new TaskManager(
    client,
    workers,
    {
      logger: console,
      options: { concurrency: 5, pollInterval: 100, domain: "domain" },
    }
  );
// *Note* worker domain has precedence over the domain passed in the poller 
```

</TabItem>
<TabItem value="typescript" label="Typescript">

```typescript
// You can specify on the worker
export const userInfoWorker = (): ConductorWorker => {
  return {
    domain:"myDomain",
    taskDefName: GET_USER_INFO,
    execute: async ({ inputData }) => {
      const userId = inputData?.userId;
      return {
        outputData: {
          email: `${userId}@email.com`,
          phoneNumber: "555-555-5555",
        },
        status: "COMPLETED",
      };
    },
  };
}

// or on the Poller Option
new TaskManager(
    client,
    workers,
    {
      logger: console,
      options: { concurrency: 5, pollInterval: 100, domain: "domain" },
    }
  )
// *Note* worker domain has precedence over the domain passed in the poller 
```
</TabItem>

</Tabs>


### Specifying Domain while Invoking Workflow

When we start/run a workflow, we can specify which tasks must run on which domains. To run the workflow with tasks routed to the domain-based worker, we can specify the following task to domain mapping:

```json
{ 
    "task_x": "test"
}
```

## Fallback Task to Domain

Another feature of domains is that you can specify a fallback domain. The concept is simple as follows:

```javascript
{
    "task_x": "test,fallback,NO_DOMAIN"
}
```

Conductor will try to route to task workers with domain `test` if available, and if not, will try domain `fallback` and subsequently to workers with no domain.

:::tip
NO_DOMAIN is a keyword that means workers with no domain.
:::

In terms of the order of domains: 
* If **NO_DOMAIN** is provided as the last token in the list of domains, then no domain is set for the tasks.
* Otherwise, the task will be added to the last inactive domain in the list of domains, hoping that workers will soon be available for that domain.

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
