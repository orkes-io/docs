# Monitoring Task Queues

When an application or workflow needs to execute a task in the background, it adds tasks to task queues. These queues hold tasks that are pending execution and are processed later by worker services.

Monitoring task queues is crucial for maintaining optimal performance and efficiency. By tracking key metrics, such as the number of tasks waiting, the number of workers polling for tasks, and the last poll time, you can manage workflow efficiency, identify potential issues, and ensure system reliability.

## Viewing Task Queues

To monitor task queues:

1. Go to **Executions > Queue Monitor** from the left menu on your Orkes Conductor cluster.

<p align="center"><img src="/content/img/task-queue-monitor-view.png" alt="Monitoring Task Queues in Conductor" width="100%" height="auto"></img></p>

The Queue Monitor page displays the following information:

- **Queue Size** : The number of tasks waiting to be executed.
- **Worker Count** : The number of worker instances polling for tasks.
- **Last Poll Time** : The time the task was last polled.

Use the filter options to narrow down task queues based on queue size, worker count, and last poll time.

## Viewing Worker Details

To view worker details for a specific task queue:

1. Select the desired task queue from the list in the **Queue Monitor**.
2. Scroll down to the **Worker** section for details about the worker's polling tasks. This includes:
    - Worker name
    - Task-to-domain mapping (if applicable)
    - Last poll time

<p align="center"><img src="/content/img/worker-details-in-task-queue-monitor.png" alt="Worker details in task queue monitor" width="100%" height="auto"></img></p>

