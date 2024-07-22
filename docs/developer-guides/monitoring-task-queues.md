# Monitoring Task Queues

Monitoring task queues is essential for ensuring optimal performance and efficiency in task processing. Task queues hold tasks that are pending execution. By monitoring these queues, you can track key metrics such as the number of tasks waiting, the number of workers polling for tasks, and the time of the last poll. This information helps manage workflow efficiency, identify potential issues, and maintain system reliability.

## Viewing Task Queues

To monitor your task queues:

1. Navigate to **Executions > Queue Monitor** from the left menu on your Orkes Conductor cluster.

<p align="center"><img src="/content/img/task-queue-monitor-view.png" alt="Monitoring Task Queues in Conductor" width="100%" height="auto"></img></p>

The task queue monitoring page provides the following details:

- **Queue Size** : Shows the number of tasks waiting to be executed.
- **Worker Count** : Displays the number of worker instances polling for tasks.
- **Last Poll Time** : Indicates the time of the last poll.

You can filter task queues based on queue size, worker count, and last poll time.

<p align="center"><img src="/content/img/filtering-task-queues.png" alt="Filtering task queues in Orkes Conductor" width="20%" height="auto"></img></p>

To view worker details:

1. Select the desired task queue.
2. View the worker name, task-to-domain mapping (if any), and last poll time as shown below:

<p align="center"><img src="/content/img/worker-details-in-task-queue-monitor.jpg" alt="Worker details in task queue monitor" width="100%" height="auto"></img></p>

