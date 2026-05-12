---
title: "Delete Workflow Definition"
description: "Use the Orkes Conductor metadata API to delete Workflow Definition. Includes endpoint details, authentication, parameters, request bodies, response behavior."
---

# Delete Workflow Definition

**Endpoint:** `DELETE /api/metadata/workflow/{name}/{version}`

Deletes an existing task definition.

## Path parameters

| Parameter | Description                                           | Type    | Required/ Optional |
| --------- | ----------------------------------------------------- | ------- | ------------------ |
| name      | The name of the workflow definition to be deleted.<br/>**Note**: Calling this API without an existing workflow definition name returns 404.    | string  | Required.          |
| version   | The version of the workflow definition to be deleted. | integer | Required.          |

## Response

- Returns 200 OK, indicating that the workflow definition has been deleted successfully.
- Returns 404 if the specified workflow definition name does not exist.

## Examples

<details>
<summary>Delete an existing workflow definition</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/metadata/workflow/api-test/2' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the particular version of the workflow definition has been deleted successfully.

</details>
