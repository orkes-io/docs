---
slug: reduce-reuse-recycle-to-simplify-workflow-creation
title: Reduce, Reuse, Recycle - Optimizing workflows in Conductor with Operators
authors: doug 
tags: [Netflix Conductor, orchestration, 2022]
image: https://orkes.io/content/img/recycle_logo.jpeg
---

# Reduce, Reuse, Recycle - Creating Efficient Conductor Workflows

The idea of reduce, reuse and recycle is reverberated around the world as a conservation technique - if we use fewer materials, and reuse or recycle what we already are using, we lower our burden on the earth and its ecosystem.

As developers, we love the idea of reducing, reusing and recycling code.  Just look at the prevalent use of StackOverflow, and the huge use of open source and libraries - if someone else has built it well - why not recycle the code and reuse it?

In this pose, we'll apply the 3 R's of reduce, reuse and recycling to the topic of Conductor workflows - helping us create workflows that are compact, and easier to follow, and complete the desired task.


<!--truncate -->

## An analogy

Netflix Conductor is a workflow orchestration engine.  But for our workflow, let's shift gears to a different type of orchestration and conductor.

In the classical period (think Mozart and Haydn), the 3rd movement of symphonies pretty much were all in the style of a "minuet and trio."  If you looked at the musical score (the workflow in this loose analogy), the 3rd movement appears to be short... until you look at the details.

A minuet is a dance, and so the lines repeat themselves a lot. Rather than write out the music over and over, the repeat sign is used:

<p align="center"><img src="/content/img/repeat.png" alt="a simple fork diagram" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The big thick line with two dots in the middle of the staff denote the region to be repeated.  When you hit the "right repeat" the musicians all know to go back to the "left repeat". Just like coders use brackets to denote a function, the repeat sign is part of musical nomenclature. Repeats can also be flexible - in this example, the 2nd playback is *slightly* different at the ending. 

This of course saved paper, ink, and the wrists of the music copyists.

In a minuet and trio, there are four total musical phrases.  The minuet has 2 sections (A & B), and the trio has 2 sections (C & D).  Each section is repeated after being played.  (4 sections repeated - that's 8 sections total.) But there's more! After the trio is played, the dance has a "da capo." If you know Italian, this means "back to the top". The Minuet is played again - but this time without repeats. So we end up with 10 sections to the movement:

*  minuet A A B B
*  trio C C D D
*  minuet (Da Capo) A B 


Let's build a workflow where Netflix Conductor simulates a orchestral conductor performing a minuet and trio.

## The Workflow

### Reusing tasks

If you were attempting to build a `minuet_and_trio` workflow in Conductor, you can define 4 tasks and reuse them over and over:

* minuet_a
* minuet_b
* trio_c
* trio_d

[Reusing tasks](/content/docs/how-tos/Tasks/reusing-tasks) is a common use case in Conductor. As long as the taskReferenceName is different, you can reuse tasks as often as you desire.

Knowing this, you might create a minuet_trio workflow with the 4 tasks, but with 10 `taskReferenceNames`:

<p align="center"><img src="/content/img/minuet_v1.jpg" alt="minuet treio - but not efficiently" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Even with re-using tasks, we can make this workflow smaller - I'm exhausted scrolling *past* this workflow.

## Recycling tasks 

###  DO/WHILE loop

Another way that we can reduce the amount of code in our workflow is to place tasks that repeat into a loop.  

In music, the repeat notation keeps us from writing out the same music more than once.  In this case, we'll use a DO_WHILE loop to repeat each section. 

For example a workflow describing just the minuet section could look like this:

<p align="center"><img src="/content/img/minuet_subworkflow.jpg" alt="using loops to simulate a repeat" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>



Here is the JSON that defines a minuet workflow:

```json showLineNumbers 

{
  "updateTime": 1658836852189,
  "name": "minuet",
  "description": "Edit or extend this sample workflow. Set the workflow name to get started",
  "version": 1,
  "tasks": [
    {
      "name": "minuet_a_loop",
      "taskReferenceName": "minuet_a_loop",
      "inputParameters": {
           // highlight-next-line
        "repeats": "${workflow.input.repeats}"
      },
      "type": "DO_WHILE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
       // highlight-next-line
      "loopCondition": "$.minuet_a_loop['iteration'] < $.repeats",
      "loopOver": [
        {
          "name": "minuet_a",
          "taskReferenceName": "minuet_a1",
          "inputParameters": {},
          "type": "SIMPLE",
          "decisionCases": {},
          "defaultCase": [],
          "forkTasks": [],
          "startDelay": 0,
          "joinOn": [],
          "optional": false,
          "defaultExclusiveJoinTask": [],
          "asyncComplete": false,
          "loopOver": []
        }
      ]
    },
    {
      "name": "minuet_b_loop",
      "taskReferenceName": "minuet_b_loop",
      "inputParameters": {
           // highlight-next-line
        "repeats": "${workflow.input.repeats}"
      },
      "type": "DO_WHILE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
       // highlight-next-line
      "loopCondition": "$.minuet_b_loop['iteration']<$.repeats",
      "loopOver": [
        {
          "name": "minuet_b",
          "taskReferenceName": "minuet_b1",
          "inputParameters": {},
          "type": "SIMPLE",
          "decisionCases": {},
          "defaultCase": [],
          "forkTasks": [],
          "startDelay": 0,
          "joinOn": [],
          "optional": false,
          "defaultExclusiveJoinTask": [],
          "asyncComplete": false,
          "loopOver": []
        }
      ]
    }
  ],
  "inputParameters": [
     // highlight-next-line
    "repeats"
  ],
  "outputParameters": {
    "minueta_output": "${minuet_a_loop.output}",
    "minuetb_output": "${minuet_b_loop.output}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "doug.sillars@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}

```

A few items to note:

* The two loops have an inputParameter called `repeats`. The looping definition is set to continue as long as the counter is less than the number of repeats:

```javascript
"$.minuet_a_loop['iteration'] < $.repeats",
```

* This is a complete workflow - not a part of the bigger minuet and trio workflow. We can call this inside our minute_trio workflow as a SUBWORKFLOW.

### Subworkflow

Subworkflows are a GREAT way to recycle your code.  Create a self contained subworkflow and then call it any time that it is needed.  

If we go back to our minuet and trio analogy, the playback is 

1. minuet  A
2. minuet  A
3. minuet  B
4. minuet  B
5. trio    C
6. trio    C
7. trio    D
8. trio    D
9. minuet  A
10. minuet  B

the minuet subworkflow above can replace lines 1-4 by setting the `repeats` input to 2.  This will cause both minuet A and B to repeat twice: AA BB.

Additionally, if we set `repeats` to 1, we can also call this subworkflow to replace lines 9 and 10 (AB).

If we imagine creating a similar workflow for the Trio section (to play lines 5-8 CCDD), our new minuet_trio workflow could look like this:


<p align="center"><img src="/content/img/minuet_trio_v3.jpg" alt="minuet trio workflow with subworkflows" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Let's just *imagine* creating this trio SUBWORKFLOW, because there is one more reduce, reuse and recycle trick up our sleeve: the Dynamic task

## DYNAMIC Task

The DYNAMIC task is a placeholder that will run whatever task it it given at runtime.

So, rather than having 2 subworkflows, one for the minuet and one for the trio - we can have just one subworkflow.

The DO/WHILE with the `repeats` variable are the same, but inside the loops, we put in a DYNAMIC task, and call in the first phrase and the 2nd phrase.

```json
{
  "updateTime": 1659113580244,
  "name": "dynamic_minuet",
  "description": "Edit or extend this sample workflow. Set the workflow name to get started",
  "version": 1,
  "tasks": [
    {
      "name": "minuet_a_loop",
      "taskReferenceName": "minuet_a_loop_ref",
      "inputParameters": {
        "repeats": "${workflow.input.repeats}"
      },
      "type": "DO_WHILE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopCondition": "if ($.minuet_a_loop_ref['iteration'] < $.repeats) {true;} else {false;}",
      "loopOver": [
        {
          "name": "musica",
          "taskReferenceName": "muaica_ref",
          "inputParameters": {
            // highlight-next-line
            "taskToExecute": "${workflow.input.firstPhrase}"
          },
          "type": "DYNAMIC",
          "dynamicTaskNameParam": "taskToExecute",
          "decisionCases": {},
          "defaultCase": [],
          "forkTasks": [],
          "startDelay": 0,
          "joinOn": [],
          "optional": false,
          "defaultExclusiveJoinTask": [],
          "asyncComplete": false,
          "loopOver": []
        }
      ]
    },
    {
      "name": "minuet_b_loop",
      "taskReferenceName": "minuet_b_loop_ref",
      "inputParameters": {
        "repeats": "${workflow.input.repeats}"
      },
      "type": "DO_WHILE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopCondition": "$.minuet_b_loop_ref['iteration']< $.repeats",
      "loopOver": [
        {
          "name": "musicb",
          "taskReferenceName": "musicb_ref",
          "inputParameters": {
            // highlight-next-line
            "taskToExecute": "${workflow.input.secondPhrase}"
          },
          "type": "DYNAMIC",
          "dynamicTaskNameParam": "taskToExecute",
          "decisionCases": {},
          "defaultCase": [],
          "forkTasks": [],
          "startDelay": 0,
          "joinOn": [],
          "optional": false,
          "defaultExclusiveJoinTask": [],
          "asyncComplete": false,
          "loopOver": []
        }
      ]
    }
  ],
  "inputParameters": [],
  "outputParameters": {
    "loopa_output": "${minuet_a_loop_ref.output}",
    "loopb_output": "${minuet_b_loop_ref.output}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "doug.sillars@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}

```
The only difference is that instead of directly calling the first and second musical phrases - it can be called via a variable.  

We can npw use this subworkflow to call the beginning of the minuet:


```json
{
    "firstPhrase":"minuet_a",
    "secondPhrase":"minuet_b",
    "repeats:2
}
```

Or the trio:

```json
{
    "firstPhrase":"trio_c",
    "secondPhrase":"trio_d",
    "repeats:2
}
```

We can also call the da capo:

```json
{
    "firstPhrase":"minuet_a",
    "secondPhrase":"minuet_b",
    "repeats:1
}
```


## One more DO/WHILE

Now that our subworkflow has been optimized to play any part of the minuet trio, we can simplify the entire workflow to play ANY minuet and trio, assuming that we have the tasks available.

Imagine this input:


```json
{"phraseList": [
  {
  "firstPhrase": "minuet_a",
  "secondPhrase": "minuet_b",
  "repeats":2
  },
    {
  "firstPhrase": "trio_c",
  "secondPhrase": "trio_d",
  "repeats":2
  },
    {
  "firstPhrase": "minuet_a",
  "secondPhrase": "minuet_b",
  "repeats":1
  }
]
}

```

This is now generalized for any minuet_trio song that might exist.  Just supply the tasks and number of repeats, and the DO/WHILE loop can run the subworkflows for us:


<p align="center"><img src="/content/img/minuet_trio_final.jpg" alt="minuet trio workflow with subworkflows" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

> Why the Inline task?  The inline task is extracting the JSON for each subworkflow from the input JSON array.  Also note that the DO/WHILE counter starts at one, and the JSON array counter starts at zero, so we decrease the counter by one to extract the correct data from the JSON array.


## Conclusion

By using loops, subworkflows and dynamic tasks, we have taken what was initially a workflow hardcoded for one `minuet_trio` and abstracted it so that it could be used for **any** minuet and trio, as long as the tasks are available to play the different musical phrases.

Assuming the tasks are available, this workflow could play the 3rd movement from Haydn's [Surprise Symphony](https://www.youtube.com/watch?v=JESXMWrwzVQ), or Mozart's [Haffner Symphony](https://www.youtube.com/watch?v=--6Y9sNOgMI) by inputing the musical phrases and the standard repetitions.


Now for the fun sentence of the blog post:
We've built orchestration inside Netflix Conductor so that it is the conductor of a musical orchestration.


Do you want to try this yourself?  The workflow is available on the [Orkes Playground](https://play.orkes.io/workflowDef/minuet_trio), and there are 4 workers polling: minuet_a, minuet_b, trio_c and trio_d.  
