---
sidebar_position: 11
slug: "/reference-docs/api/human-tasks/search-task-list"
description: "This API is used to retrieve a list of Human tasks based on the search criteria."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search Human Tasks

Used to retrieve a list of Human tasks based on the provided search criteria.

:::note
The invoking user should be a task owner, an ADMIN, or an assignee to the tasks returned. 
:::

## Input Payload

| Attribute          | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------| 
| start               | The start of the search results list, which is used for pagination.                                      |
| size                | The number of search results that should be returned from the specified start.                                                      |
| searchType          | The user making the search. Supported values: <ul><li>ADMIN</li> <li>INBOX</li></ul>                              |
| definitionNames     | An array of Human task definition names.                |
| displayNames        | An array of Human task display names.                   |
| taskRefNames        | An array of Human task reference names.                 |
| workflowIds         | An array of workflow IDs that contain the Human task.   |
| workflowNames       | An array of workflow names that contain the Human task. |
| states              | The Human task state. Supported values: <ul><li>PENDING</li> <li>ASSIGNED</li> <li>IN_PROGRESS</li> <li>COMPLETED</li> <li>TIMED_OUT</li> <li>DELETED</li></ul>                                                      |
| taskInputQuery      | Input data to the Human task.                    |
| taskOutputQuery     | Output data from the Human task.                 |
| fullTextQuery       | All data associated with the Human task. This search can be made based on an “AND” and “OR” query.                                |
| updateStartTime     | The start range for the Human task execution start time.|
| updateEndTime       | The end range for the Human task execution start time.  |
| assignees           | An array of assignees.                                  |
| assignees. user     | The assignee’s user ID.                                 |
| assignees. userType | The assignee’s user type. Supported values: <ul><li>Conductor User</li> <li>Conductor Group</li> <li>External User</li> <li>External Group</li></ul>                                               |
| claimants           | An array of claimants.                             |
| claimants. user     | The claimant’s user ID.                            |
| claimants. userType | The claimant's user type. Supported values: <ul><li>Conductor User</li> <li>Conductor Group</li> <li>External User</li> <li>External Group</li></ul>   |


:::tip
Use the UI to make searches and you can see the payload sent in the network tab to get sample values for searching.
:::

## API Endpoint 

```
POST human/tasks/search
```