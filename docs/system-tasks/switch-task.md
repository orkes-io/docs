---
sidebar_position: 1
---

# Switch Task


### What is Switch Task?

A switch task is similar to `case...switch` statement in a programming
language. The `switch` expression, however, is simply an input parameter 
(`value-param` evaluator) or a complex javascript expression 
(`javascript` evaluator). Only two evaluators are supported by default
in conductor.

### What is a common Switch Task use case?


### How is it defined?

Switch task is defined directly inside the workflow with
`"type":"SWITCH"`.

### Example of Switch Task

```json
{
  "name": "switch_task",
  "taskReferenceName": "switch",
  "inputParameters": {
    "case_value_param": "${workflow.input.movieType}"
  },
  "type": "SWITCH",
  "evaluatorType": "value-param",
  "expression": "case_value_param",
  "decisionCases": {
    "Show": [
      {
        "name": "setup_episodes",
        "taskReferenceName": "se1",
        "inputParameters": {
          "movieId": "${workflow.input.movieId}"
        },
        "type": "SIMPLE"
      },
      {
        "name": "generate_episode_artwork",
        "taskReferenceName": "ga",
        "inputParameters": {
          "movieId": "${workflow.input.movieId}"
        },
        "type": "SIMPLE"
      }
    ],
    "Movie": [
      {
        "name": "setup_movie",
        "taskReferenceName": "sm",
        "inputParameters": {
          "movieId": "${workflow.input.movieId}"
        },
        "type": "SIMPLE"
      },
      {
        "name": "generate_movie_artwork",
        "taskReferenceName": "gma",
        "inputParameters": {
          "movieId": "${workflow.input.movieId}"
        },
        "type": "SIMPLE"
      }
    ]
  }
}
```

Following are the parameters in the above example : 

1. `"evaluatorType"` - Type of the evaluator used. Supported types: 
`value-param`, `javascript`.

2. `"expression"` - Expression that depends on the evaluator type. 
For `value-param` evaluator, expression is input parameter,
for `javascript` evaluator, it is the javascript expression.

3. `"decisionCases"` - Map where key is possible values that can result
from `expression` being evaluated by `evaluatorType` with value being
list of tasks to be executed.

4. `"defaultCase"` - List of tasks to be executed when no matching 
value if found in decision case (default condition).

Following is the output of Switch Task : 

1. `"evaluationResult"` - A List of string representing the list of cases 
that matched.




