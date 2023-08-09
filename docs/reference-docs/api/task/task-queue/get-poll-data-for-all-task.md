---
sidebar_position: 1
---

# Get Poll Data for All Task 

Used to retrieve the poll data for all the tasks from the task queue.

## Input Payload

| Attribute | Decsription |
| --------- | ----------- |
| workerSize | Indicates the number of worker instances polling for all the tasks. |
| workerOpt | You can filter the worker size based on the following parameters:<ul><li>GT : Greater than</li><li>LT : Less than</li></ul> |
| queueSize | Indicates the total number of tasks waiting to be executed. |
| queueOpt | You can filter the queue size based on the following parameters:<ul><li>GT : Greater than</li><li>LT : Less than</li></ul> |
| lastPollTimeSize | Indicates the last polled time for all the tasks. |
| lastPollTimeOpt | You can filter the last polled time based on the following parameters:<ul><li>GT : Greater than</li><li>LT : Less than</li></ul> |

## API Endpoint

```
GET /tasks/queue/polldata/all
```