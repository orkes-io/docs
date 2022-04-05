# Parsing and Formatting JSON with JQ Transform Task
# Order Fulfillment Codelab part 7

To improve our Widget Shipping platform and support dropshipping our widgets, we've decided to implement Dynamic Forks.  There are a few steps to get ready for the Dynamic fork. In our last step, we moved all of the items we wish to run in each 'tine' into a subworkflow.

In this section, we'll jq to parse and re-format input data that is required for the Dynamic Fork to run. There are 2 sets of JSON that the Dynamic Fork will need:

* A list of all the workflows to run (this defines how many forks will be created).
* Input data for each of the Forks.

The first set of data is a JSON array, where each input names all of the ```dynamicForkTasksParam``` (this defines the number of tines in the fork). It will a JSON array wth n entries.  The name of the workflow called is in ```subworkflowParam.name```, the ```taskReferenceName``` must be unique (here we increment the last value by one), and the ```type``` must be ```SUB_WORKFLOW```:

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

To generate this array, we'll use a [JQ transform](/content/docs/reference-docs/system-tasks/json-jq-transform-task).  JQ is a command line tool that manipulates JSON in a zillion different ways. It's an invaluable tool for developers who work with JSON.  Luckily, it is also built as a System Task in Conductor, so we can do our JSON manipulation as a part of our workflow (with the only effort being "how do I do this in JQ").  Unfortunately, this can be like solving a regex, so it can take some patience.

> Tip:  JQ has a great [playground](https://jqplay.org/) to help you figure out your JQ queries.

To create the JSON above, we'll need to run two JQ commands. The first command will tell us how many addresses are in the submitted data (so we know how many forks to create). The front end team will send a JSON list of addresses in a format as follows:

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

JQ can tell us the length of this with the command ```.[] | length ```.  This simply reads the array, and returns the length.  Our Conductor task looks like: 

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

For the input sample above, this task returns ```2```.

Now that we know the length of the address JSON, we know how many dynamic forks to create. Our JQ query looks like:  

```bash
reduce range(0,${jq_address_count_ref.output.result}) as $f (.;  .dynamicTasks[$f].subWorkflowParam.name = \"Shipping_loop_workflow\" | .dynamicTasks[$f].taskReferenceName = \"shipping_loop_subworkflow_ref_\\($f)\" | .dynamicTasks[$f].type = \"SUB_WORKFLOW\")
```

The range command tells jq how many parameters to add, and uses the length determined in the first JQ transform. We defined our counter in jq as ```$f```. Each entry of the array is indexed as ```$f```, and we hardcode the name ```subWorkflowParam.name```, ```type``` and the ```taskReferenceName```.  The ```\($f)``` at the end of the ```taskReferenceName``` appends the counter value to the end of the term.  When adding this to the Conductor task, make sure you escape all the parameters. Our series of 2 system tasks will complete this first action:

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

The second JSON that must be supplied to the Dynamic task is a JSON Map of each ```taskReferenceName``` and the parameters for that task reference (in this case - the address and number of widgets).

The input to the JQ is an empty array, but we also read in the ```workflow.input.addressList``` that is given to the workflow, and the list of dynamic forks we created in the JQ task above ```${jq_create_dynamictasks_ref.output.result}```.

Now we combine these two JSONs. The key for each map is the name of the subworkflow, and the values are the addresses.

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

When this is run, the resulting JSON looks like:

```json
{
  "shipping_loop_subworkflow_ref_0": {
    "numberOfWidgets": "12",
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

Which is exactly the format that our dynamic task needs to run.  With these 3 JQ transforms, we're now ready to define our Dynamic task, creating a dropshipping workflow for our widget shipping.



