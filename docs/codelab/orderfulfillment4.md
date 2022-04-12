---
displayed_sidebar:     orderfulfillment
---
# Adding a REST API Task
# Order Fulfillment Codelab part 4

You're running order fulfillment at Bob's Widgets, and when you started, it was 100% manual.  In parts 1-3 of the codelab, we built the initial version of our order fulfillment workflow up and running, but there's still a lot of room for improvement.

## Keeping up the inventory

When you started in your role, there was a scrap of paper next to your computer:

<p align="center"><img src="/content/img/codelab/of4_orders.jpg" alt="order counting version 0" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You're still a bit shocked by the conversion that followed:

You: Hey Bob - what's this?

Bob: Oh. We mark the count of orders each week, and then at the end of the week, we call up our supplier to order more widgets.

Bob: It's *very, very* important that we order the right number of widgets each week.  If we miss a few ticks each week - we end up running out of widgets, and our customers get mad.

...clearly, there's room for more automation.


<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/vFpBDmId8KU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Reordering API

You talk to your widget supplier, and they have an API for re-ordering widgets.  In fact, their API lets you append your order as often as you;d like.  You set a day for shipment, and they'll box up your order nad send it out.  

So, our new plan is to update the order every time widgets are shipped one for one.  Then the supplier will ship out the total widget order every Friday morning.

You ask for the details of the API, and it turns out it is really simple:

You send a post message to the endpont ```appendorder``` with the items and quantity:

```json
{"item": "widget", "count": "2"}'
```

and the supplier will automatically append your order.  Come the end of the week, they'll pack up a bunch of widgets, and you'll have your resupply in the warehouse on Monday.

## Automating the API call

With Conductor, it is easy to add an REST API into your workflow.  Conductor has a built in System Task that can make HTTP calls for you.  

> A system task runs on the Conductor server - so there is no task deployment required - you just need to define the parameters in your workflow.

### [HTTP task](https://orkes.io/content/docs/reference-docs/system-tasks/http-task) 

We can add the HTTP Task into the workflow.  in this case, the order of the tasks doesn't really matter, we'll place the reorder after the shipping label is produced.

```JSON
{
      "name": "reorder_widgets",
      "taskReferenceName": "reorder_widgets_ref",
      "inputParameters": {
        "http_request": {
          "uri": "http://restfuldemo.herokuapp.com/appendorder",
          "method": "POST",
          "body": {
                "item": "widget",
                "count": "1"
            },
          "connectionTimeOut": 5000,
          "readTimeOut": 5000
        }
      },
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "retryCount": 3
    }
```
Let's walk through the parameters of the HTTP Task:

* ```Name```: the name of your task.
* ```inputParameters```: This is the meat of the HTTP Task.
  * ```uri```: the url that the task will ping.  This is a heroku app, and the endpoint is ```appendorder```.
  * ```method```: in this case it is a POST, but all the major methods of HTTP requests are supported.
  * ```body```: POST methods have a JSON body with the attributes needed for the 3rd party API.  In this case, we are sending the ```item``` we wish to reorder, and the ```count``` says how many to order.

We have hardcoded in the item ("widget") - since we only sell one thing.  We also hardwired the count to one, as our order form only allows for one widget to be purchased at a time (We will be fixing this later on in the codelab.)

The other thing to note is that with an HTTP task, the ```connectionTimeout``` and ```readTimeout``` can be set. Since the ```appendorder``` is located on a free Heroku instance, it sometimes needs to restart before it is available, so we give the API a full 5 seconds to reply.

## Error handling

Despite the ```connectionTimeout``` and ```readTimeout``` parameters, it can still take over 5 seconds for the heroku instance to spin up (if it has gone dormant).  We can build more error handling into this task to prevent our workflow from failing.

The HTTP Task has the ```retrycount``` built in, but let's [extend the task](/content/docs/how-tos/Tasks/extending-system-tasks) with retry values.

To do this, we'll define a new task with the same name as our HTTP Task (click "Task Definitions"  and then "Define Task").

```JSON
{
  "createdBy": "",
  "updatedBy": "",
  "name": "reorder_widgets",
  "description": "extending the reorder task to have 3 retries and fixed delay",
  "retryCount": 3,
  "timeoutSeconds": 10,
  "inputKeys": [],
  "outputKeys": [],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 5,
  "responseTimeoutSeconds": 5,
  "inputTemplate": {},
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1,
  "ownerEmail": "doug.sillars@orkes.io",
  "backoffScaleFactor": 1
}
```

Adding ```retryLogic``` and ```retryDelaySeconds``` tells conductor to retry 3 times, with e fixed delay of 5s between tries.  That way, if on the first connection we get a time out, the Heroku instance has enough time to restart and can reply to a subsequent attempt.  The workflow will continue to work, even though the API endpoint is a bit flaky.

## No more tickmarks

The shipping bay no longer has scraps of paper marking each widget that's gone out.  The inventory is updated automatically with our HTTP task sent to our supplier.

Things are looking up, but there's still a lot of automation ahead!

