# Scaling parallel tasks with Dynamic forks
# Order Fulfillment Codelab part 8

We've automated the shipping workflow at Bob's widgets using Conductor.  Our workflow creates shipping labels for each ordered widgets, and reorders widgets to keep the inventory up.  We added error catching when the workflow fails, sending messages to Slack whenever the workflow fails.

In the latest iteration of our order fulfillment workflow, we are adding the ability to ship to multiple addresses - also known as dropshipping.  Our sales team has determined that we can add a 15% markup if we dropship widgets for our customers, and we can accomplish this *just in code* with no other changes to the process.

## Dynamic Fork preparation

We're using a dynamic fork for our shipping - creating a set of tasks that run in parallel - one fork 'tine' per address.

In the previous sections, we prepared our workflow in incorporate dynamic tasks.  First, We moved our do/while loop and widget_shipping task into a Subworkflow task, as Dynamic forks can only have one named task.

In the last section, we used JQ Transform tasks to create the input data in the required JSON format for the Dynamic fork. 

So, now we are finally ready to build the dynamic fork that will allow for one order to have multiple shipping addresses.


## Building the Dynamic Fork

Now we can build our Dynamic fork.

The inputs parameters are the outputs of the JQ transform tasks created in the previous sections, and these are applied to ```dynamicForkTasksParam``` and ```dynamicForkTasksInputParamName```. 

* ```dynamicForkTasksParam``` lists all of the tasks that need to be created dynamically.
* ```dynamicForkTasksInputParamName``` applies the input data for each dynamically created task.

We add a JOIN to tell Conductor when to continue - and the workflow will continue when each dynamic task has completed. 

```
{
  "name": "shipping_dynamic_fork",
  "taskReferenceName": "shipping_dynamic_fork_ref",
  "inputParameters": {
    "dynamicTasks": "${jq_create_dynamictasks_ref.output.result}",
    "dynamicTasksInput": "${jq_create_dynamictasksParams_ref.output.result}"
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
},
{
"name": "shipping_multiple_addresses_join",
"taskReferenceName": "shipping_multiple_addresses_join_ref",
"type": "JOIN"
}
```

When we run the workflow - the JQ transforms create the input values for the Dynamic Fork, and the JSON determines how many branches of the fork to run.  

Next we'll take the output of the JOIN ```shipping_multiple_addresses_join_ref.output``` and add this to the output of the entire shipping workflow.  This will place all the addresses shipped (admittedly in a *very* nested JSON array) in the output of the workflow.

## One last item

The reordering task no longer works as expected. In version 2 of the workflow, there was just one ```numberOfWidgets``` value, but now there are ```numberOfWidgets``` for each address. 

To add up the ```numberOfWidgets``` we'll use another JQ transform.  The code to sum up the values is:

```bash
[.addressList[].numberOfWidgets | tonumber ] | add
```

This takes the JSON list, converts each ```numberOfWidgets`` to a number, and then adds them up. Our JQ transform looks like:

```json
{
      "name": "jq_sum_widgets",
      "taskReferenceName": "jq_sum_widgets_ref",
      "inputParameters": {
        "input": "${workflow.input.addressList}",
        "queryExpression": "[.input[].numberOfWidgets | tonumber ] | add"
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
```

Wiring the output of this task into the reordering widget now ensures that the correct number of widgets is reordered.

Now we can run our workflow, and see that every piece is working.  We can add n addresses as input, each with m widgets shipped to that address, and our workflow will create shipping labels for each one.  The total number of widgets will be reordered, and the workflow will output all of the results.

Our workflow diagram now looks like:

<p align="center"><img src="/content/img/codelab/of8_finalworkflow.png" alt="final workflopw" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>


## Conclusion

Marketing is over the moon - the the new dropshipping feature - sales are growing - and profits are up!  There was no fundamental change to the way shipping works - we just added some code that provided our customers with more value.  And adding it with COnductor tasks made it very easy and modular to change.

This ends our order fulfillment codelab. Of course, if this were the real world, your iteration may never finish.  

* Perhaps a 2nd shipping warehouse will open - forcing the workflow to fork based on east/west coast.
* Adding a 2nd shipping partner - would affect the shipping_widget simple workflow - maybe you'll have 2- or three of these as you add carriers.
* Tracking orders: Another workflow could take all the tracking numbers & email addresses - and keep your customers informed about the shipping progress of each widget.


The goal of this codelab is to show the power that Conductor can bring to your workflows. That said, we'll let you continue these additions on your own.