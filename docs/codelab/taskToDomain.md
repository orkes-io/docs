# Using Task to Domain

There may be times when a task that is in production might need tweaking or updating. Perhaps you have a worker that is thrashing your database. Maybe it has a memory leak - leading to performance issues.  There's no test environment that has the correct (or complete) setup - making this fix seem impossible.

The ```task to domain``` feature in Conductor is built for exactly these circumstances.  It allows you to spin up another version of the worker and only allow specific traffic to the "test" worker - while production traffic continues running on the existing platform.

Let's learn how it works.  First, we'll construct a workflow that "has issues" that we need to fix:

## Example workflow

Let's look at a simple example.  Version 1 of the "hello_world" workflow (featured in our [codelab](https://orkes.io/content/docs/codelab/helloworld)) has one task:

<p align="center"><img src="/content/img/codelab/hw1_diagram.png" alt="run HW in playground" width="300" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This task is performed by a Java worker in the [OrkesWorkers](https://github.com/orkes-io/orkesworkers) GitHub repository, and all of these workers are available for usage on the [Orkes Playground](https://play.orkes.io/).

The Hello World worker has the following code:

```java
 @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        result.addOutputData("hw_response", "Hello World!");
        result.setStatus(TaskResult.Status.COMPLETED);
        return result;
    }
```


The worker simply returns, "Hello World!"

You can test in the Orkes Playground:

<p align="center"><img src="/content/img/run_hw.jpg" alt="run HW in playground" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

* Workflow "hello_world_doug"
* Version 1
* Input Params: {} (no parameters needed)

When you click ```Run Workflow```, the workflow adds a job to the "hello_world" task.  This task is hosted by Orkes, and when it is picked up, returns the expected text. The workflow is then concluded with the following output:

```json
{
    "hw_response":"Hello World!"
}
```

## Running an alternate version in production

What if this ```hello_world``` worker is thrashing the database or has a memory leak that is impacting performance?  A new version must be created that fixes the problem.  We can use Conductor's Task to Domain feature to spin up another version of the task - and run it in the same production workflow (without impacting production traffic!). 

To show an example of how to do this, we'll spin up a second version of ```hello_world``` on our local computer. We start by cloning [OrkesWorkers](https://github.com/orkes-io/orkesworkers) to our desktop.  Following the instructions in the [codelab](https://orkes.io/content/docs/codelab/helloworld#application-permissions), we set up application permissions:

* Create an application in the playground.
* Add the hello_world workflow and task to the application
* Create a key and secret
* Add the key/secret to the application.properties file in Orkesworkers.

Before we start the workers and begin polling the server for work, we need to slightly modify ```OrkesWorkersApplication.java```. Change ```TaskRunnerConfigurer``` to appear as follows:

```java
 public TaskRunnerConfigurer taskRunnerConfigurer(List<Worker> workersList, TaskClient taskClient) {
        log.info("Starting workers : {}", workersList);
        Map<String, String> taskToDomainMap = new HashMap<String, String>();
            taskToDomainMap.put("hello_world", "doug");
        TaskRunnerConfigurer runnerConfigurer = new TaskRunnerConfigurer
                .Builder(taskClient, workersList)
                .withThreadCount(Math.max(1, workersList.size()))
                .withTaskToDomain(taskToDomainMap)
                .build();
        runnerConfigurer.init();
        return runnerConfigurer;
    }
```

In lines 3 & 4, we created a HashMap ```taskToDomainMap``` that has one entry: mapping the "hello_world" task to the domain "doug".

We then add this to the Configurer ```.withTaskToDomain(taskToDomainMap)``` in line .

Now, when we run OrkesWorkersApplication, a new worker will appear in the playground.  Click ```Task Queues``` in the left nav, and search for ```hello_world```.  There will be 2 Workers shown with polling active:

<p align="center"><img src="/content/img/task_queue.jpg" alt="2 workers running" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The orkesworkers is our "production" version, and the Dougs-Air.home (with domain doug) is our "test" worker.

Currently, both of these workers are identical and will have the same output.  To show the difference, we can edit our local version of HelloWorld.java.  In this example, we just change the output to say "Hello World from Doug's computer!" (that's on line 17 of HelloWorld.java).  In reality, you'd be fixing your performance issues or whatever was driving a change to the task code.

Now, when we run the workflow, if we leave the Task to Domain box empty, the workflow will run in "production", but if we add:

```json
{"hello_world":"doug"}
```

the workflow will run with workflow with our "test" worker on our local machine.

## Running the test workflow

When the taskToDomain is set to ```doug```, the workflow input/output appears as follows:

<p align="center"><img src="/content/img/tasktodomain_output.jpg" alt="2 workers running" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You've just run your production workflow but bypassed one of the production tasks and ran on a test version of the task!



