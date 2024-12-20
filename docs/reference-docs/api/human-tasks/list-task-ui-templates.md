---
sidebar_position: 15
slug: "/reference-docs/api/human-tasks/list-task-ui-templates"
description: "This API is used to retrieve a list of Human task user forms stored in Orkes Conductor based on the search criteria."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# List Human Task Template

Used to list all human task templates stored in Conductor and optionally filter by name and version.

## Input Parameters

| Attribute | Description         |
|-----------|---------------------| 
| name      | The user-form/template name to be filtered.   | 
| version   | The version of the user-form/template to be filtered.| 

## API Endpoint 

```
GET human/template
```

