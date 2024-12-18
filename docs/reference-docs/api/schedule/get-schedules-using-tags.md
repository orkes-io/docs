---
slug: "/reference-docs/api/schedule/get-schedules-using-tags"
description: "This API is used to retreive the schedules associated with a specific tag."
---

# Get Schedules Using Tags

Used to retrieve schedules associated with a specific tag.

## Input Payload

| Parameter | Description | 
| --------- | ----------- |
| tag | The name of the tag to filter schedules. |

## API Endpoint

```
GET /scheduler/schedules/tag
```

The API returns details of the schedules flagged with the specified tag.
