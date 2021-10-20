---
sidebar_position: 8
---

# Exclusive Join Task


### What is Exclusive Join Task?

Exclusive Join task helps capture Task output from Decision Task's flow.

### What is a common Exclusive Join Task use case?

Consider a scenario, If we have a Workflow T1 -> [Decision: T2/T3] -> EJ,
then based on the decision, Exclusive Join (EJ) will produce the output from 
T2 or T3. i.e output of one of T2/T3 will be available to
downstream tasks through Exclusive Join task.

If Decision Task takes True/False as cases, then:

True: T1 -> T2 -> EJ; EJ will have T2's output.

False: T1 -> T3 -> EJ; EJ will have T3's output.

Undefined: T1 -> EJ; EJ will have T1's output.


### How is it defined?

Exclusive Join task is defined directly inside the workflow with
`"type":"EXCLUSIVE_JOIN"`.

### Example of Exclusive Join Task

```json
{
  "name": "exclusive_join",
  "taskReferenceName": "exclusiveJoin",
  "type": "EXCLUSIVE_JOIN",
  "joinOn": [
    "task2",
    "task3"
  ],
  "defaultExclusiveJoinTask": [
    "task1"
  ]
}
```

Following are the parameters in the above example :

1. `"joinOn"` - List of task reference names, which the EXCLUSIVE_JOIN 
will lookout for to capture output. From above example,
this could be ["T2", "T3"].

2. `"defaultExclusiveJoinTask"` - Task reference name, whose output should be
used incase the decision case is undefined. From above example, this
could be ["T1"].
