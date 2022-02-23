# Role Management

The cloud implemntation has a concept of roles - where each role has different permissions, and with these permissions, a varied ability to define and run workflows.


Roles are broken down into users and groups.  Users correspond 1:1 to individuals in your oganization.  Permission to run tasks and workflows is granted to Groups, which are the users who are authorized for each workflow.

## Users

Each user (defined by a unique email address) will be granted one of two roles:  ```USER``` and ```ADMIN```

Admins have full visibility into the Orkes Cloud instance: they are able to see all workflows, tasks, events, queues, etc.  They are also able to chnage roles of other users

## Groups
