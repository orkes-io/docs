---
title: "Task Timeouts and Retries"
description: "Cookbook recipes for response timeouts, total timeouts, retry policies, exponential backoff, and lease extension in Orkes Conductor."
---

# Task timeouts and retries

Practical recipes for making workers resilient. Each recipe is a complete task definition you can register with `POST /api/metadata/taskdefs`.

---

### Exponential backoff with a cap

Retries with exponential backoff for a task that calls an external API. The cap prevents the delay from growing indefinitely; jitter prevents multiple failing workers from hammering the API at the same time.

```json
{
  "name": "call_payment_api",
  "ownerEmail": "payments@example.com",
  "retryCount": 6,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "retryDelaySeconds": 2,
  "maxRetryDelaySeconds": 60,
  "backoffJitterMs": 3000,
  "responseTimeoutSeconds": 30,
  "timeoutSeconds": 600,
  "timeoutPolicy": "RETRY"
}
```

**Delay schedule** (`retryDelaySeconds=2`, `maxRetryDelaySeconds=60`, `backoffJitterMs=3000`):

| Attempt | Base delay | After cap | Actual range |
| :--- | :--- | :--- | :--- |
| 1 | 2s | 2s | 2.0 – 5.0s |
| 2 | 4s | 4s | 4.0 – 7.0s |
| 3 | 8s | 8s | 8.0 – 11.0s |
| 4 | 16s | 16s | 16.0 – 19.0s |
| 5 | 32s | 32s | 32.0 – 35.0s |
| 6 | 64s | **60s** | 60.0 – 63.0s |

---

### Lease extension for long-running workers

`responseTimeoutSeconds` is the heartbeat window: if the worker doesn't report back within this duration, Conductor marks the task `TIMED_OUT` and retries it. For tasks that take longer than the heartbeat window, workers extend the lease by posting an `IN_PROGRESS` update with `callbackAfterSeconds`.

**Task definition**

```json
{
  "name": "transcode_video",
  "ownerEmail": "media@example.com",
  "retryCount": 2,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 10,
  "responseTimeoutSeconds": 30,
  "timeoutSeconds": 3600,
  "timeoutPolicy": "RETRY"
}
```

`responseTimeoutSeconds: 30` — Conductor will reschedule the task if the worker is silent for 30 seconds.
`timeoutSeconds: 3600` — the task itself can take up to 1 hour across all heartbeats.

**Worker: extend the lease every 25 seconds**

```python
import time
from conductor.client.http.models import TaskResult

def transcode_video(task):
    task_id = task.task_id
    workflow_id = task.workflow_instance_id

    for chunk in video_chunks(task.input_data["file_url"]):
        transcode_chunk(chunk)

        # Extend the lease before responseTimeoutSeconds (30s) expires.
        # callbackAfterSeconds tells Conductor to leave this task invisible
        # in the queue for another 25s — resetting the response clock.
        heartbeat = TaskResult(
            task_id=task_id,
            workflow_instance_id=workflow_id,
            status="IN_PROGRESS",
            callback_after_seconds=25,
            output_data={"progress": chunk.index / len(video_chunks)}
        )
        conductor_client.update_task(heartbeat)

    return TaskResult(
        task_id=task_id,
        workflow_instance_id=workflow_id,
        status="COMPLETED",
        output_data={"output_url": upload_result.url}
    )
```

**What happens without a heartbeat:**

```
t=0s   Worker polls task → IN_PROGRESS
t=30s  responseTimeoutSeconds expires → TIMED_OUT → retry scheduled
t=40s  Worker finishes (too late, task already terminated)
```

**What happens with a heartbeat every 25s:**

```
t=0s   Worker polls task → IN_PROGRESS
t=25s  Worker: POST IN_PROGRESS, callbackAfterSeconds=25 → clock resets
t=50s  Worker: POST IN_PROGRESS, callbackAfterSeconds=25 → clock resets
...
t=90s  Worker: POST COMPLETED → task done
```

---

### Hard SLA with `totalTimeoutSeconds`

Use `totalTimeoutSeconds` when you need a guaranteed upper bound on how long a task can take across all of its retries. This is independent of `retryCount` — whichever limit is hit first wins.

```json
{
  "name": "sync_crm_record",
  "ownerEmail": "crm@example.com",
  "retryCount": 20,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 5,
  "totalTimeoutSeconds": 120,
  "responseTimeoutSeconds": 15,
  "timeoutPolicy": "TIME_OUT_WF"
}
```

`retryCount: 20` — would normally allow 20 retries.
`totalTimeoutSeconds: 120` — but if the 2-minute wall-clock budget is consumed first, no more retries are queued and the workflow is failed.

This is useful for SLA-sensitive tasks where you need to know that, regardless of transient failures, the workflow will either succeed or surface as failed within a bounded time window.

**Timeline example** (`retryDelaySeconds=5`, `totalTimeoutSeconds=30`):

```
t=0s   Attempt 1 → FAILED
t=5s   Attempt 2 → FAILED
t=10s  Attempt 3 → FAILED
t=15s  Attempt 4 → FAILED
t=20s  Attempt 5 → FAILED
t=25s  Attempt 6 → FAILED
t=30s  totalTimeoutSeconds exceeded → workflow FAILED, no more retries
        (10 retries still remained in retryCount)
```

---

### Thundering herd prevention

When hundreds of tasks fail simultaneously (e.g., a downstream service goes down), all retries are scheduled at the same time. Without jitter, they all hit the recovering service at once. `backoffJitterMs` spreads them across a time window.

```json
{
  "name": "send_webhook",
  "ownerEmail": "platform@example.com",
  "retryCount": 5,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "retryDelaySeconds": 1,
  "maxRetryDelaySeconds": 30,
  "backoffJitterMs": 5000,
  "responseTimeoutSeconds": 10,
  "concurrentExecLimit": 200
}
```

With `backoffJitterMs: 5000`, 500 tasks that all fail at `t=0` will retry at uniformly random times between `t=1s` and `t=6s` — spreading the retry load across 5 seconds instead of hitting the service in a single burst.

---

### Choosing the right combination

| Scenario | Recommended config |
| :--- | :--- |
| External API with rate limits | `EXPONENTIAL_BACKOFF` + `maxRetryDelaySeconds` + `backoffJitterMs` |
| Long-running processing job | `responseTimeoutSeconds` (short) + heartbeats from worker + `timeoutSeconds` (long) |
| SLA-bounded task | `totalTimeoutSeconds` + `FIXED` or `EXPONENTIAL_BACKOFF` |
| High fan-out with many concurrent failures | `backoffJitterMs` + `concurrentExecLimit` |
| Non-retryable error | Return `FAILED_WITH_TERMINAL_ERROR` from the worker |

See the [Task Definition reference](/content/reference-docs/task-definition) for all available parameters.
