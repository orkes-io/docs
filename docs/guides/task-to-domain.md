# Task To Domain

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Task to Domain is the concept of limiting the task execution only to a specific worker via domain mapping. The domain name can be arbitrary.

Once a task is created, the Conductor creates a queue for each task. When a workflow is run, the specific task execution is dropped into the queue and picked up by a worker. By default, any worker can pick up any task in the queue, meaning no domain limitation exists.
The task-to-domain functionality comes into use when a specific task execution is to be done by a particular worker. For example:

* Debugging a worker - In cases like debugging a worker, you may want your test runs to hit only the test worker and the production traffic to hit only the production worker.
* Rolling out a new worker - Allocating a percentage of the task queue to the new worker in order to test it under load.

Situations like these can be tackled with a proper task to domain mapping.

## Using Task to Domain​

The domain is to be provided both in the worker and while running the workflow.

### Specifying Domain while Invoking Workflow​

A domain name is an arbitrary name given by the user. When you start/run a workflow, you can specify which tasks must run on which domains.

<p align="center"><img src="/content/img/task-to-domain-illustration.png" alt="Task to domain example workflow" width="90%" height="auto"></img></p>

In the example workflow, the black line indicates the normal production environment, where Worker X polls Task X with no domain set.

Now, let’s push a modified test version of Worker X on a different server. Here, we have given a domain **test** to Worker X. This ensures that this test worker will not pick the production tasks.

To test the workflow with the test version of worker X, we add the following while invoking the workflow.

```json
 {
 "task_x": "test"
 }
 ```

 So when we start/run the workflow, Conductor allows only the worker with the domain **test** to pick up **task_x**. The workflow gets completed with the test version of the worker without affecting the production environment.

 ### Specifying Domain in Worker​

 The workflow invocation is specified with the domain **test**. Next, you need to use the same domain while configuring the worker. 
 <Tabs>
 <TabItem value="Java" lable="Java">

 <ul><li>
 
 On your worker project, you need to edit the <b>OrkesWorkersApplication</b> file to change the <b>TaskRunner</b> configuration such that <b>task x</b>  is given the domain <b>test</b>.</li><li> Create a HashMap <b>taskToDomainMap</b> with the entry: mapping the <b>task x</b> to the domain <b>test</b>. This is added to the Configurer <b>.withTaskToDomain(taskToDomainMap).</b></li><li> On configuring this, the worker would only pick the tasks in a workflow executed with the same domain <b>test</b>.</li></ul>

</TabItem>
<TabItem value="Python" label="Python">
</TabItem>
<TabItem value="Go" label="Go">
</TabItem>
<TabItem value="CSharp" label="CSharp">
</TabItem>
<TabItem value="Clojure" label="Clojure">
</TabItem>
<TabItem value="Javascript" label="Javascript">
</TabItem>
</Tabs>

 ## Fallback Task to Domain​​

When starting a workflow, multiple domains can be specified as fallbacks; for example, "domain1,domain2". The Conductor keeps track of the last polling time for each task. In this case, it checks for any active workers for domain1; if present, the task is polled by the domain1 worker. If not, the same check is done for the next domain in the sequence, domain2, and so on.

If no workers are active for the domains provided:

* If **NO_DOMAIN** is provided as the last token in the list of domains, then no domain is set for the tasks.
* Otherwise, the task will be added to the last inactive domain in the list of domains, hoping that workers will soon be available for that domain.

Also, a `*` token can be used to apply domains for all tasks. This can be overridden by providing task-specific mappings along with `*`.

In this example, 
```json
"taskToDomain": {
 "*": "mydomain",
 "x":"NO_DOMAIN",
 "y": "abc, NO_DOMAIN",
 "z": "someInactiveDomain1, someInactiveDomain2"
}
```

* Task **x** is put in the default queue (no domain).
* Task **y** is put in the **abc** domain, if available, or in default otherwise.
* Task **z** is put in **someInactiveDomain2**, even though workers are unavailable.
* All other tasks are put in **mydomain**.

:::note
* The "fallback" domain strings can only be used when starting the workflow. When polling from the client, only one domain is used.
* The **NO_DOMAIN** token should be used last.
:::

## Example

<details><summary>Hello World Workflow</summary>

Let’s look at a simple example using the **hello_world** workflow. 

<p align="center"><img src="/content/img/hello-world-sample-workflow.png" alt="Hello World Sample Workflow" width="30%" height="auto"></img></p>

Imagine that the task is polled by a [Java worker](https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/HelloWorld.java). The worker has the following code, which returns “Hello World” on running the workflow. 

```java
 @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        result.addOutputData("hw_response", "Hello World!");
        result.setStatus(TaskResult.Status.COMPLETED);
        return result;
    }
```

When you click **Run Workflow** from the left menu in Conductor UI, the workflow adds a task queue for the **hello_world** task. The worker picks up the task, executes it, and returns the result to the workflow. The workflow output looks like this:

```json
{
    "hw_response":"Hello World!"
}
```
Now, what if this worker is thrashing the database or has a memory leak that impacts the production? A new version must be created to fix the problem. 

Here, we can use the task-to-domain functionality to spin up another version of the worker and run it in the same production workflow, without affecting the production traffic. 

1. Let’s clone the [OrkesWorkers](https://github.com/orkes-io/orkesworkers) repo on your local machine. As a best practice, removing all other worker files except [HelloWorld.java](https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/HelloWorld.java) is recommended for a smooth, error-free running of the worker. 
2. [Create an application](/content/access-control-security/applications#configuring-application) in your Conductor server.
3. Generate the [key & secret](/content/access-control-security/applications#generating-access-keys).
4. [Add permissions](/content/access-control-security/applications#adding-permissions) for the application to the hello_world task and workflow. 

Now, open your java worker and slightly modify the **OrkesWorkersApplication.java**. Change **TaskRunnerConfigurer** as follows: 

```java
public TaskRunnerConfigurer taskRunnerConfigurer(List<Worker> workersList, TaskClient taskClient) {
       log.info("Starting workers : {}", workersList);
       Map<String, String> taskToDomainMap = new HashMap<String, String>();
       taskToDomainMap.put("hello_world", "sample");
       TaskRunnerConfigurer runnerConfigurer = new TaskRunnerConfigurer
               .Builder(taskClient, workersList)
               .withThreadCount(Math.max(1, workersList.size()))
               .withTaskToDomain(taskToDomainMap)
               .build();
       runnerConfigurer.init();
       return runnerConfigurer;
   }
```

In lines 3 & 4, you need to create a HashMap **taskToDomainMap** with the entry: mapping the **hello_world** task to the domain **sample**. This is added to the Configurer **.withTaskToDomain(taskToDomainMap)** in line 8.

1. Now, let’s run Java worker from the local machine. 
2. Run the workflow using the **Run Workflow** button from the Conductor UI.
3. From the left menu, navigate to **TASKS > Queue Monitor** and search for **hello_world**. It would list two active workers polling the task. 

<p align="center"><img src="/content/img/task-queue-monitor.png" alt="Task Queue Monitor for hello_world task" width="90%" height="auto"></img></p>

The **orkesworkers** is our production version, and the **Rizas-MacBook-Air.local** (with domain **sample**) is our "test" worker.

Both of these workers are identical and will have the same output. To show the difference, we can edit our local version of **HelloWorld.java**. In this example, we change the output to "Hello World from Riza’s Mac!" (on line 17 of HelloWorld.java). In reality, you'd be fixing your performance issues or whatever was driving a change to the task code.

Now, when we run the workflow, if we leave the **Task to Domain** box empty, the workflow will run in "production", but if we add the task-to-domain mapping:
```json
{"hello_world":"sample"}
```
The workflow will run with our "test" worker on your local machine. You can verify the output from the **Output** tab in the workflow execution.

<p align="center"><img src="/content/img/hello-world-execution-test-worker.png" alt="Hello World Sample Workflow execution using test worker" width="90%" height="auto"></img></p>

You've just run your production workflow but bypassed one of the production tasks and ran on a test version of the task.
</details>