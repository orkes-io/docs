import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Guide to Scaling Workers
Workers are responsible for executing business logic in the workflow applications. Scaling and performance tuning workers are dependent on the following metrics:

1. No. of pending requests in the task queue
2. Throughput of a single worker
3. Total number of worker processes running

Conductor servers publish metrics that allow you to monitor the health of your workers. Here is a guide to using these metrics:
[PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/)

:::tip
Each of the below metrics contains `taskType` as a tag that can be used to monitor the metrics for a specific task.
:::

## Pending requests (Gauge)

```javascript
max(task_queue_depth{taskType=})
```
**How to use the metric:**
1. The goal should be to keep the queue depth constant (it may not be zero if the tasks are long running)
2. Configure alerts and autoscaling policies for your workers based on the increase/decrease in the queue depth in a given time period.

## No. of tasks completed per second (Counter)
`task_completed_seconds_count` is published as a counter with taskType as a tag.

```javascript
rate(task_completed_seconds_count{taskType=}[$__rate_interval])
```
**How to use the metric:**
1. The metric shows the throughput.  The goal is to keep the throughput at a threshold depending on the application's needs.
2. Configure alerts and autoscaling policies for your workers based on the increase/decrease in the throughput.


## Amount of time the task was in the queue (Timer)
This metric measures the time the task was sitting in the queue before getting picked up by a worker.

```javascript
max(task_queue_wait_time_seconds{quantile=, taskType=})
```

**How to use the metric:**

If the value is very large (more than a few seconds), check the following:
1. No. of workers and if they are busy processing the tasks.  If so, increase the no. of workers.
2. Check the polling interval for the worker and reduce the polling interval if needed.
:::note
Reducing the polling interval could increase the no of API requests to the server triggering system limits.
:::