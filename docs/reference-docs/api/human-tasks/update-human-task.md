---
sidebar_position: 6
slug: "/reference-docs/api/human-tasks/update-human-task"
description: "This API is used to update a claimed Human task."
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Update Human Task

**Endpoint:** `POST /api/human/tasks/{taskId}/update`

Updates or completes a claimed Human task with the form field inputs.

The invoking user should be one of the following:
* Cluster admin
* Task owner of the Human task
* Task claimant

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| taskId | The unique identifier for the Human task execution to be updated. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| complete | Whether to mark the task as complete or not. Set to false to keep the task in progress. Default is false. | boolean | Optional. |

## Response body

Format the request as an object containing the form field inputs.

**Example**

``` json
{
  "formFieldName": "yourInputHere",
}
```

## Examples

<details><summary>Update a claimed Human task</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/tasks/869ed0ee-cf07-11ef-a89d-86a819bd92bf/update' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "policyType": "travel",
  "payout": true
}'
```

**Response**

Returns 200 OK, indicating that the Human task has been updated successfully.

</details>


<details><summary>Complete a claimed Human task</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/tasks/869ed0ee-cf07-11ef-a89d-86a819bd92bf/update?complete=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "policyType": "travel",
  "payout": true
}'
```

**Response**

Returns 200 OK, indicating that the Human task has been completed successfully.

</details>