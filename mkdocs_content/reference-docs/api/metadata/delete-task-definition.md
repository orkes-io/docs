---
title: "Delete Task Definition"
description: "Use the Orkes Conductor metadata API to delete Task Definition. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Delete Task Definition

**Endpoint:** `DELETE /api/metadata/taskdefs/{taskType}`

Deletes an existing task definition.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| taskType  | The name of the task definition to be deleted.<br/><br/>**Note**: Calling this API without an existing task definition name returns 404. | string | Required.          |

## Response

- Returns 200 OK, indicating that the task definition has been deleted successfully.
- Returns 404 if the specified task definition name does not exist.

## Examples

<details>
<summary>Delete an existing task definition</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/metadata/taskdefs/sample-api-test' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the task definition has been deleted successfully.

</details>
