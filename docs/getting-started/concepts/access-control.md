---
sidebar_position: 3
---

# Access Control

Your Conductor server may run in a different hosted environment than your workers. The APIs to control, run or edit your workflows shouldn’t be exposed on the internet and therefore needs to restrict access.

In order to ensure that all workflow executions & worker tasks are run only by authorized users, Orkes has added a security layer defined as **Access Control** to all parts of the workflow orchestration lifecycle.

The security aspect of this feature can be mainly categorized into the following three categories:

* [Applications](https://orkes.io/content/docs/getting-started/concepts/access-control-applications)
* [Users and Groups](https://orkes.io/content/docs/getting-started/concepts/access-control-users)
* [Tags](https://orkes.io/content/docs/getting-started/concepts/access-control-tags)
