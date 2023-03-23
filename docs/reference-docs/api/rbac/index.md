---
sidebar_position: 5
---

# Access Control Management

The Conductor server runs in a different hosted environment from your workers. The APIs to control, run or edit your workflows shouldn’t be exposed on the internet and therefore needs to restrict access. 
<br/>

In order to ensure that all workflow executions & worker tasks are run only by authorized users, Orkes has added a security layer defined as **Access Control** to all parts of the workflow orchestration lifecycle.
<br/>
The security aspect of this feature can be mainly categorized into the following three categories:

* Applications
* Users & Groups
* Tags
