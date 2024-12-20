---
sidebar_position: 12
slug: "/reference-docs/api/human-tasks/get-task-ui-template"
description: "This API is used to retrieve the user form used in a Human task based on its task ID."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Human Task User Forms (Templates)

Used to retrieve a human task user forms/templates by id. Use this API to retrieve a user form/template specification stored in Conductor.

## Input Payload

| Attribute | Description                                                     |
|-----------|-----------------------------------------------------------------| 
| humanTaskId        | The *id* of the human task in which the user form/template is added. | 

## API Endpoint 

```
GET human/template/{humanTaskId}
```

