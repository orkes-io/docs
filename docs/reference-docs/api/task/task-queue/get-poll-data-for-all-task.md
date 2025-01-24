---
sidebar_position: 1
slug: "/reference-docs/api/task/task-queue/get-poll-data-for-all-task"
description: "This API is used to retrieve the poll data for all tasks from in all task queues."
---

# Get Poll Data for All Tasks

**Endpoint:** `GET /tasks/queue/polldata/all`

Gets the last poll data for all the tasks in the task queue. The filter parameters can be used to refine the request based on your requirements.

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| workerSize | The number of worker instances polling for all the tasks in the queue. | integer | Optional. | 
| workerOpt | Option to filter based on the worker size. Supported values:<ul><li>**GT** (Greater than)</li><li>**LT** (Less than)</li></ul> | string | Required if _workerSize_ is used. |
| queueSize | The total number of tasks in the queue waiting to be executed. | integer | Optional. | 
| queueOpt | Option to filter based on the queue size. Supported values:<ul><li>**GT** (Greater than)</li><li>**LT** (Less than)</li></ul> | string | Required if _queueSize_ is used. |
| lastPollTimeSize | The last polled time in [Unix timestamp format](https://www.unixtimestamp.com/). | integer | Optional. |
| lastPollTimeOpt | Option to filter based on the last poll time. Supported values:<ul><li>**GT** (Greater than)</li><li>**LT** (Less than)</li></ul> | string | Required if _lassPollTimeSize_ is used. | 

## Response

Returns a map containing _queueData_ and an array of _pollData_. 

- **queueData**–Indicates the size of each task queue. 
- **pollData**–Includes the _queueName_ , _workerId_, and _lastPollTime_ for each task.
    - **queueName**–The name of the task queue. For predefined tasks, this returns the task type, such as _HTTP_. For user-defined tasks, it returns the name of the task definition, such as _python_worker_.
    - **workerId**–The worker name from which the task is being polled, which is the hostname of the pod where the worker is running.
    - **lastPollTime**–The last polled time in [Unix timestamp format](https://www.unixtimestamp.com/).

If a worker has not picked up the task, no _pollData_ will be available and the array will be empty.

## Examples

<details><summary>Get the last poll data for tasks with a queue size greater than 7</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/tasks/queue/polldata/all?queueSize=7&queueOpt=GT' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```
**Response**

```json
{
  "queueData": {
    "_deciderQueue": {
      "size": 31
    },
    "WAIT": {
      "pollerCount": 1,
      "size": 18
    },
    "_batch_upload_queue0": {
      "size": 15
    }
  },
  "pollData": [
    {
      "queueName": "WAIT",
      "workerId": "acme-workers-deployment-5cf6957cdf-rn2pd",
      "lastPollTime": 1735561620048
    }
  ]
}
```

Here _pollData_ is available only for the WAIT task as only it has been picked up by the worker and the rest of the tasks are in the queue awaiting workers.
</details>
