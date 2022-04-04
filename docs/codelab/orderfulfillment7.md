# Dynamic Forks and JQ Transform Task
# Order Fulfillment Codelab part 7


To improve our Widget Shipping platform and support dropshipping our widgets, we've decided to implement Dynamic Forks.  There are a few steps to get ready for the Dynamic fork. In our last step, we moved all of the items we wish to run in each 'tine' into a subworkflow.

In this section, we'll create the input data that is required for the Dynamic Fork to run. There are 2 sets of JSON that the Dynamic Fork will need:

* A list of all the workflows to run (this defines how many forks will be created).
* Input data for each of the Forks.

The first set of data is a JSON array, where each input names all of the ```dynamicForkTasksParam``` (this defines the number of tines in the fork). It will a JSON array wth n entries:

```JSON
{ "dynamicTasks": [
  0: {
    "name": :"shipping_loop_subworkflow",
    "taskReferenceName": "shipping_loop_subworkflow_ref_1"
  },
  1: {
    "name": :"shipping_loop_subworkflow",
    "taskReferenceName": "shipping_loop_subworkflow_ref_2"
  },
  2: {
    "name": :"shipping_loop_subworkflow",
    "taskReferenceName": "shipping_loop_subworkflow_ref_3"
  },
    3: {
    "name": :"image_convert_resize",
    "taskReferenceName": "shipping_loop_subworkflow_ref_4"
  }
]}
```

To generate this array, we'll use a JQ transform to create the  
