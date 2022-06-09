# Using Task to Domain

There may be times where a task that is in production might need tweaking or updating. Perhaps you have a worker that is thrashing your database. maybe it has a memory leak - leading to performance issues.  There's no test environment that has the correct (or complete) setup - making this fix seem impossible.

The ```task to domain``` feature in Conductor is built for exactly these circumstances.  It allows you to spin up another version of the worker, and only allow specific traffic to the "test" worker - while production traffic continues running on the existing platform.

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


The worker simply returns "Hello World!"

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

What if this ```hello_world``` worker is thrashing the database, or has a memory leak that is impacting performance?  A new version must be created that fixes the problem.  We can use Conductor's Task to Domain feature to spin up another version of the task - and run it in the same production workflow (without impacting production traffic!). 

To show an example of how to do this, we'll spin up a second version of ```hellow_world``` on our local computer. We start by cloning [OrkesWorkers](https://github.com/orkes-io/orkesworkers) to our desktop.  Following the instructions in the [codelab](https://orkes.io/content/docs/codelab/helloworld#application-permissions), we set up application permissions:

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

In lines 3&4 we created a HashMap ```taskToDomainMap``` that has one entry: mapping the "hello_world" task to the domain "doug".

We then add this to the Configurer ```.withTaskToDomain(taskToDomainMap)``` in line .

Now, when we run OrkesWorkersApplication, a new worker will appear in the playground.  Click ```Task Queues``` in the left nav, and search for ```hello_world```.  There will be 2 Workers shown with polling active:

<p align="center"><img src="/content/img/task_queue.jpg" alt="2 workers running" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The orkesworkers is our "production" version, and the Dougs-Air.home (with domain doug) is our "test" worker.

Currently, both of these workers are identical and will have the same output.  To show the difference, we can edit our local version of HelloWorld.java.  In this example, we just change the output to say "Hello World from Doug's computer!" (that's on line 17 of HelloWorld.java).  In reality, you'd be fixing your performance issues, or whatever was driving a change to the task code.

Now, when we run the workflow, if we leave the Task to Domain box empty, the workflow will run in "production", but if we add:

```json
{"hello_world":"doug"}
```

the workflow will run with workflow with our "test" worker on our local machine.

## Running the test workflow

When the taskToDomain is set to ```doug```, the workflow input/output appears as follows:

<p align="center"><img src="/content/img/tasktodomain_output.jpg" alt="2 workers running" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You've just run your production workflow, but bypassed one of the production tasks and run on a test version of the task!



## A/B testing of workflows

Task To Domain could also be used to A/B test a workflow.  In his section, we'll walk through 2 approaches, with a SWITCH task, and with an INLINE task.

### AB with a SWITCH task

In the following workflow, the ```hello_world_doug``` workflow is called as a [SUBWORKFLOW](https://orkes.io/content/docs/reference-docs/sub-workflow-task).  The [SWITCH](https://orkes.io/content/docs/reference-docs/switch-task) calculates a random number (Math.random()) between 0 and 1, and if the value is over the threshold, the "A" (default) path is taken. If the value is under the threshold, the "B" (test) path is taken.  

<p align="center"><img src="/content/img/tasktodomain_abtest.jpg" alt="ab testing a workflow" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Here's how we call the SUBWORKFLOW with the ```taskToDomain``` parameter:

```json
          {
            "name": "hello_world_subworkflow_b",
            "taskReferenceName": "hello_world_subworkflow_b",
            "inputParameters": {},
            "type": "SUB_WORKFLOW",
            "decisionCases": {},
            "defaultCase": [],
            "forkTasks": [],
            "startDelay": 0,
            "subWorkflowParam": {
              "name": "hello_world_doug",
              "version": 1,
              "taskToDomain": {
                "hello_world": "doug"
              }
            },
            "joinOn": [],
            "optional": false,
            "defaultExclusiveJoinTask": [],
            "asyncComplete": false,
            "loopOver": []
          }
```

On each leg of the switch, we also set a variable called ```variant``` (and it is set to either A or B), so that it is easy to determine which version of the SUBWORKFLOW was taken.

### A/B with an INLINE task

The SWITCH task approach is a good entry, as it is easier to track the logic of the workflow.  In the INLINE task, the INLINE JavaScript defines the Task to Domain to apply to the `hello_world` SUBWORKFLOW:

<p align="center"><img src="/content/img/tasktodomain_abtestinline.jpg" alt="ab testing a workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The INLINE task is a simple JavaScript evaluator:

```json
  {
      "name": "AB_calculator",
      "taskReferenceName": "AB_calculator",
      "inputParameters": {
        "evaluatorType": "javascript",
        "expression": "function e(){var a=\"NO_DOMAIN\";return .25>Math.random()&&(a=\"doug\"),a}e();"
      },
      "type": "INLINE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    },
```

The default value for `a` is `NO_DOMAIN`.  This tells Conductor to run the workflow without any task to domain limitations (run it in production).  If Math.random() is less than 0.25, then we change the value of `a` to `doug`, and `hello_world` will run in our local instance.

The Subworkflow looks similar to the SWITCH task version, but now there is only one, and we utilize the output of the AB_calculator inline task for taskToDomain:

```json
   {
      "name": "hello_world_subworkflow",
      "taskReferenceName": "hello_world_subworkflow",
      "inputParameters": {},
      "type": "SUB_WORKFLOW",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "subWorkflowParam": {
        "name": "hello_world_doug",
        "version": 1,
        "taskToDomain": {
          "hello_world": "${AB_calculator.output.result}"
        }
      },
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }

```

The task to domain for `hello_world` will be provided by the INLINE task output.

This achieves the same result as the SWITCH version - with only 2 tasks.