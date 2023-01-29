# Parsing and Formatting JSON with JQ Transform Task
# Order Fulfillment Codelab part 7

To improve our Widget Shipping platform and support dropshipping our widgets, we've decided to implement Dynamic Forks.  Dynamic forks will allow our workflow to change dynamically at runtime to ship multiple widgets to multiple addresses.

There are a few steps to get ready for the Dynamic fork. In our last step, we moved all of the tasks we wished to run simultaneously (for each address) into a subworkflow.

In this section, we'll use jq to parse and re-format the data we have into the formats that are required for the Dynamic Fork to run. JQ is a powerful command line tool for JSON data manipulation.  There is also a Conductor System [JQ transform](/content/docs/reference-docs/system-tasks/json-jq-transform-task) task that can do the same. It's an invaluable tool for developers who work with JSON.  Luckily, it is also built as a System Task in Conductor, so we can do our JSON manipulation as a part of our workflow (with the only effort being "how do I do this in JQ").  Unfortunately, this can be like solving a regex, so that it can take some patience.

> Tip:  JQ has a great [playground](https://jqplay.org/) to help you figure out your JQ queries.


<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/qixjZpylaiQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


## The data we need

There are 2 sets of JSON that the Dynamic Fork will need:

* ```dynamicForkTasksParam```: A list of all the workflows to run (this defines how many forks will be created).
* ```dynamicForkTasksInputParamName```: Input data for each of the Forks.

The first set of data is a JSON array, where each input names all of the ```dynamicForkTasksParam``` (this defines the number of tines in the fork). It will be a JSON array with n entries.  The name of the workflow called is ```subworkflowParam.name```, the ```taskReferenceName``` must be unique (here we increment the last value by one), and the ```type``` must be ```SUB_WORKFLOW```:

```JSON
{ "dynamicTasks": [
  {
    "subWorkflowParam": {
      "name": "Shipping_loop_workflow"
    },
    "taskReferenceName": "shipping_loop_subworkflow_ref_0",
    "type": "SUB_WORKFLOW"
  },
  {
    "subWorkflowParam": {
      "name": "Shipping_loop_workflow"
    },
    "taskReferenceName": "shipping_loop_subworkflow_ref_1",
    "type": "SUB_WORKFLOW"
  },
  {
    "subWorkflowParam": {
      "name": "Shipping_loop_workflow"
    },
    "taskReferenceName": "shipping_loop_subworkflow_ref_2",
    "type": "SUB_WORKFLOW"
  }

  
]}
```

To create the JSON above, we'll need to run two JQ commands. The first command will tell us how many addresses are in the submitted data (so we know how many forks to create). 

Let's assume that this version of the workflow (this will be version 3) will have input data that looks like this (knowing that the number of addresses will vary on each order):

```
{ "addressList":[
    {
        "numberOfWidgets": "12",
        "name": "Bob McBobFace",
        "street": "21 Bob Lane",
        "city": "Bobville",
        "state": "OR",
        "zip": "53111"
    },{
        "numberOfWidgets": "1",
        "name": "BobBobBob BobraAnn",
        "street": "1 Surf Street",
        "city": "Kokomo",
        "state": "FL",
        "zip": "53111"
     }

]
}
```

JQ can tell us the length of this with the command ```.[] | length ```.  This simply reads the array and returns the length.  Our Conductor task looks like this: 

```json
 {
      "name": "jq_address_count",
      "taskReferenceName": "jq_address_count_ref",
      "inputParameters": {
        "input": "${workflow.input.addressList}",
        "queryExpression": ".[] |length"
      },
      "type": "JSON_JQ_TRANSFORM",
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
```

For the input sample above, this task returns the value ```2```.

Now that we know the length of the address JSON, we know how many dynamic forks to create. Our JQ query looks like this:  

```bash
reduce range(0,${jq_address_count_ref.output.result}) as $f (.;  .dynamicTasks[$f].subWorkflowParam.name = \"Shipping_loop_workflow\" | .dynamicTasks[$f].taskReferenceName = \"shipping_loop_subworkflow_ref_\\($f)\" | .dynamicTasks[$f].type = \"SUB_WORKFLOW\")
```

The range command tells jq how many parameters to add (and uses the length determined in the first JQ transform). We define our counter in jq as ```$f```. Each entry of the array is indexed as ```$f```, and we hardcode a number of parameters:

* The task name: ```subWorkflowParam.name``` = "Shipping_loop_workflow" 
* ```type``` =  "SUB_WORKFLOW" 
*  ```taskReferenceName``` = shipping_loop_subworkflow_ref_

At the end of The ```taskReferenceName``` there is a ```\($f)``` term. This appends the counter value to the end - giving the ```taskReferenceName``` a unique value.  When adding this to the Conductor task, make sure you escape all the parameters. Our series of 2 system tasks will complete this first JSON input for our Dynamic Task:

```JSON
    {
      "name": "jq_address_count",
      "taskReferenceName": "jq_address_count_ref",
      "inputParameters": {
        "input": "${workflow.input.addressList}",
        "queryExpression": ".[] |length"
      },
      "type": "JSON_JQ_TRANSFORM",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    },
    {
      "name": "jq_create_dynamictasks",
      "taskReferenceName": "jq_create_dynamictasks_ref",
      "inputParameters": {
        "input": "{}",
        "queryExpression": "reduce range(0,${jq_address_count_ref.output.result}) as $f (.; .dynamicTasks[$f].name = \"shipping_loop_subworkflow\" | .dynamicTasks[$f].taskReferenceName = \"shipping_loop_subworkflow_ref_\\($f)\" )"
      },
      "type": "JSON_JQ_TRANSFORM",
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
```

Running this creates a JSON array in the format shown at the top of this section.

## Creating the data array for our dynamic tasks

The second JSON that must be supplied to the Dynamic task is ```dynamicForkTasksInputParamName``` - a JSON Map of each ```taskReferenceName``` and the parameters for that task reference (in this case - the address and number of widgets).

For our use case, we want the output to look like this:

```JSON
{
  "shipping_loop_subworkflow_ref_0": {
    "numberOfWidgets": "2",
    "name": "Bob McBobFace",
    "street": "21 Bob Lane",
    "city": "Bobville",
    "state": "OR",
    "zip": "53111"
  },
  "shipping_loop_subworkflow_ref_1": {
    "numberOfWidgets": "1",
    "name": "BobBobBob BobraAnn",
    "street": "1 Surf Street",
    "city": "Kokomo",
    "state": "FL",
    "zip": "53111"
  }
}

```

Here is the JQ command we use to generate this JSON:

```JSON
 {
      "name": "jq_create_dynamictaskParams",
      "taskReferenceName": "jq_create_dynamictasksParams_ref",
      "inputParameters": {
        "input": "{}",
        "addresses": "${workflow.input.addressList}",
        "taskList": "${jq_create_dynamictasks_ref.output.result}",
        "queryExpression": "reduce range(0,${jq_address_count_ref.output.result}) as $f (.; .dynamicTasksInput.\"shipping_loop_subworkflow_ref_\\($f)\" = .addresses[$f])"
      },
      "type": "JSON_JQ_TRANSFORM",
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
```

The input to the JQ is an empty array, but we also read in the ```workflow.input.addressList``` that is given to the workflow, and the list of dynamic forks we created in the JQ task above ```${jq_create_dynamictasks_ref.output.result}```.

The reduce creates a JSON of the correct length, and then we name each parameter with the ```shipping_loop_subworkflow_ref_<n>```, and give it the value of the address parameters for the same index. 

```json
.dynamicTasksInput.\"shipping_loop_subworkflow_ref_\\($f)\" = .addresses[$f])
```

When this is run, the resulting JSON matches the required format.  With these 3 JQ transforms, we've completed all of the prep work for our Dynamic task - creating a sub workflow and formatting all of the input data for the task.

We are now ready to define our Dynamic task, creating a dropshipping workflow for our widget shipping.



