# Order Fulfillment Codelab part 4

You're running order fulfillment at Bob's Widgets, and when you started, it was 100% manual.  In parts 1-3 of the codelab, you got a shipping workflow up and running, but there's still a lot of room for improvement.

## Keeping up the inventory

When you started in your role, there was a scrap of paper next to your computer:

<p align="center"><img src="/content/img/codelab/of4_orders.jpg" alt="order counting version 0" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You're still a bit shocked by the conversion that followed:

You: Hey Bob - what's this?
Bob: Oh. We mark the count of orders each week, and then at the end of the week, we call up our supplier to order more widgets.
Bob: Its very, very important that we order the right number of widgets each week.  If we miss a few ticks each week - we end up running out of widgets, and our customers get mad.

...clearly, there's room for more automation.

## Reordering API

You talk to your widget supplier, and they have an API.  Add as much to your order during the week, and they'll ship out our total widget order every Friday morning.

You ask for the details of the API, and it turns out it is really simple:

You send a post message to the endpont ```appendorder``` with the items and quantity:

```json
{"item": "widget", "count": "2"}'
```

and the supplier will automatically append your order.  Come the end of the week, they'll pack up a bunch of widgets, and you'll have your resupply in the warehouse on Monday.

## Automating the API call

With Conductor, it is easy to add an REST API into your workflow.  Conductor has a built in System Task that can make HTTP calls for you.  A system task runs on the Conductor server - so there is no task deployment required - you simply wire the [HTTP task](https://orkes.io/content/docs/reference-docs/system-tasks/http-task) into your workflow and you are off and running.

We can add this to our list of tasks.  Since it doesn't matter if it occurs before or after the shipping label, we'll place the reorder after the shipping label is produced.

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

We have hardcoded in the item ("widget") - since we only sell one thing.  We also hardwired the count to one, as our order form only allows for one widget to be purchased at a time (There's a lot of work to be done here!!).

The other thing to note is that with an HTTP task, the ```connectionTimeout``` and ```readTimeout``` can be set. Since the ```appendorder``` is located on a free Heroku instance, it sometimes needs to restart before it is available, so we give the API a full 5 seconds to reply.

## No more tickmarks

The shipping bay no longer looks like inmates marking the days on the wall.  The inventory is updated automatically with our HTTP task sent to our supplier.

Things are looking up, but there's still a lot of automation ahead!

