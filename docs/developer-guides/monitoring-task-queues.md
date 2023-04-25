# Monitoring Task Queues

The task queues are the collection of tasks waiting to be executed. It is useful for viewing the details, such as the number of workers polling and monitoring the queue backlog.

## Viewing Task Queues

You can monitor your task queues by navigating to **Tasks > Queue Monitor**.

<p align="center"><img src="/content/img/task-queue-monitor-view.png" alt="Monitoring Task Queues in Conductor" width="100%" height="auto"></img></p>

The task queue monitoring page shows the following details:

- Queue Size - Displays the number of tasks waiting to be executed.
- Worker Count - Displays the number of worker instances polling for the task.
- Last Poll Time - Displays the last polled time.

In addition, you also have the provision to filter the task queues based on queue size, worker count, and last poll time.
To view the worker details polling for the task, select the required task queue, and you can view the worker name along with the [task to domain](/content/developer-guides/task-to-domain) mapping as shown below:

<p align="center"><img src="/content/img/worker-details-in-task-queue-monitor.jpg" alt="Worker details in task queue monitor" width="100%" height="auto"></img></p>

## API

To view the size of the task queue:

```shell
curl 'http://localhost:8080/api/tasks/queue/sizes?taskType=<TASK_NAME>' \
 -H 'accept: */*'
 ```

 To view the worker poll information of the task queue:

 ```shell
 curl 'http://localhost:8080/api/tasks/queue/polldata?taskType=<TASK_NAME>' \
 -H 'accept: */*'
 ```

 Replace **<TASK_NAME>** with your task name.