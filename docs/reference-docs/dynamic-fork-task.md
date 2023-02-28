---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Fork Task
```json
"type" : "FORK_JOIN_DYNAMIC"
```

## Introduction

When the number of forks must be determined at run-time, the FORK_JOIN_DYNAMIC task is needed.  (In a regular fork operation -the [FORK_JOIN](/content/docs/reference-docs/fork-task) task- the number of forks is defined during workflow creation.)

:::info Note: 
A `FORK_JOIN_DYNAMIC` can only have one task per fork.  If there is a need for multiple tasks per fork, a sub-workflow can be utilized.
:::

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/2VE2ys_85FM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Configuration

Here is a JSON example of a `FORK_JOIN_DYNAMIC` task followed by a `JOIN` task:

```json
{
  "inputParameters": {
    "dynamicTasks": "${fooBarTask.output.dynamicTasksJSON}",
    "dynamicTasksInput": "${fooBarTask.output.dynamicTasksInputJSON}"
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
},


{
"name": "image_multiple_convert_resize_join",
"taskReferenceName": "image_multiple_convert_resize_join_ref",
"type": "JOIN"
}
```

Let's look at the `inputParameters` for
the `FORK_JOIN_DYNAMIC` task.

* `dynamicForkTasksParam` This is a JSON array that lists the tasks in each fork that is to be created. Each entry corresponds to a separate fork.
* `dynamicForkTasksInputParamName` This is a JSON array where the keys are the taskReferenceName for each fork, and the values are the `inputParameters` for each task.


>NOTE: `fooBarTask` is a task that is defined prior to the FORK_JOIN_DYNAMIC in the workflow definition. This task will create the `dynamicTasks` and `dynamicTasksInput` JSON arrays that are required for the DYNAMIC task.

## Input Configuration

| Attribute      | Description |
| ----------- | ----------- |
| name      | Task Name. A unique name that is descriptive of the task function      |
| taskReferenceName   | Task Reference Name. A unique reference to this task. There can be multiple references of a task within the same workflow definition        |
| type   |  `FORK_JOIN_DYNAMIC`        |
| inputParameters   | The input parameters that will be supplied to this task.         |
| dynamicForkTasksParam | This is a JSON array listing each of the tasks/sub-workflow objects in each fork. (Note: This has a different format for ```SUB_WORKFLOW``` compared to other tasks.) |
| dynamicForkTasksInputParamName | A JSON array: keys are task/sub-workflow names for each fork, and the values are the corresponding inputParameters for each task. | 

## Example

>Note: This example is from the [Image Processing Use Case](/content/docs/usecases/image_processing).  The workers referenced in this use case are a part of the [Orkesworkers Github repo](https://github.com/orkes-io/orkesworkers). Here's the [worker that creates the inputParameters](https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/ImageMultipleConvertResizeWorker.java).

### Preparing the data

Let's assume the workflow input appears as follows:

```
{
	"fileLocation": "https://pbs.twimg.com/media/FJY7ud0XEAYVCS8?format=png&name=900x900",
	"outputFormats": ["png","jpg"],
	
	"outputSizes": [
		{"width":300,
		"height":300},
		{"width":200,
		"height":200}
	],
	"maintainAspectRatio": "true"
}
```

Note that the input has two outputFormats (png and Jpg) and two sizes (300x300 and 200x200). With two file formats and two sizes in the input, we'll be creating four images in total. We'll create a task & worker that will take the input data, and convert it into the JSON arrays that the `FORK_JOIN_DYNAMIC` requires. First, let's define what the inputs must look like:

### ```dynamicForkTasksParam``` 

This is a JSON array of task or sub-workflow objects that specifies the list of tasks or sub-workflows that needs to be forked and run in parallel.  Here we define the four tasks to be run inside the `FORK_JOIN_DYNAMIC`.

The format of this JSON array is different for subworkflows vs. other tasks.  There are two tabs below showing the code for both options:

<Tabs values={[
        {label: 'Task', value: 'Task'},
        {label: 'Subworkflow', value: 'Subworkflow'}
    ]}>
  
  <TabItem value="Task">

In this case, our dynamic fork is running a SIMPLE task: ```image_convert_resize```:

```json
{ "dynamicTasks": [
  {
    "name": :"image_convert_resize",
    "taskReferenceName": "image_convert_resize_png_300x300_0",
    "type": "SIMPLE"
  },
  {
    "name": :"image_convert_resize",
    "taskReferenceName": "image_convert_resize_png_200x200_1",
    "type": "SIMPLE"
  },
  {
    "name": :"image_convert_resize",
    "taskReferenceName": "image_convert_resize_jpg_300x300_2",
    "type": "SIMPLE"
  },
  {
    "name": :"image_convert_resize",
    "taskReferenceName": "image_convert_resize_jpg_200x200_3",
    "type": "SIMPLE"
  }
]}
```

  </TabItem>
  <TabItem value="Subworkflow" label="Java">

 In this case, our Dynamic fork is running a SUB_WORKFLOW task: ```image_convert_resize_subworkflow```

```json
{ "dynamicTasks": [
  {
    "subWorkflowParam" : {
      "name": :"image_convert_resize_subworkflow",
      "version": "1"
    },
    "type" : "SUB_WORKFLOW",
    "taskReferenceName": "image_convert_resize_subworkflow_png_300x300_0",
    ...
  },
  {
    "subWorkflowParam" : {
      "name": :"image_convert_resize_subworkflow",
      "version": "1"
    },
    "type" : "SUB_WORKFLOW",
    "taskReferenceName": "image_convert_resize_subworkflow_png_200x200_1",
    ...
  },
  {
    "subWorkflowParam" : {
      "name": :"image_convert_resize_subworkflow",
      "version": "1"
    },
    "type" : "SUB_WORKFLOW",
    "taskReferenceName": "image_convert_resize_subworkflow_jpg_300x300_2",
    ...
  },
  {
    "subWorkflowParam" : {
      "name": :"image_convert_resize_subworkflow",
      "version": "1"
    },
    "type" : "SUB_WORKFLOW",
    "taskReferenceName": "image_convert_resize_subworkflow_jpg_200x200_3",
    ...
  }
]}
```
  
  </TabItem>
</Tabs>



### `dynamicForkTasksInputParamName` 

This is a JSON map of the four `taskReferenceNames` and the `inputParameters` for each task.  

```json
{
  "dynamicTasksInput": {
    "image_convert_resize_png_300x300_0": {
      "outputWidth": 300,
      "outputHeight": 300,
      "fileLocation": "https://pbs.twimg.com/media/FJY7ud0XEAYVCS8?format=png&name=900x900",
      "outputFormat": "png",
      "maintainAspectRatio": true
    },
    "image_convert_resize_png_200x200_1": {
      "outputWidth": 200,
      "outputHeight": 200,
      "fileLocation": "https://pbs.twimg.com/media/FJY7ud0XEAYVCS8?format=png&name=900x900",
      "outputFormat": "png",
      "maintainAspectRatio": true
    },
    "image_convert_resize_jpg_300x300_2": {
      "outputWidth": 300,
      "outputHeight": 300,
      "fileLocation": "https://pbs.twimg.com/media/FJY7ud0XEAYVCS8?format=png&name=900x900",
      "outputFormat": "jpg",
      "maintainAspectRatio": true
    },
    "image_convert_resize_jpg_200x200_3": {
      "outputWidth": 200,
      "outputHeight": 200,
      "fileLocation": "https://pbs.twimg.com/media/FJY7ud0XEAYVCS8?format=png&name=900x900",
      "outputFormat": "jpg",
      "maintainAspectRatio": true
    }
  }
}
```

Here's a snip from the [worker](https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/ImageMultipleConvertResizeWorker.java) that we use to create these two JSON files. In this case, we are using a task, not a subworkflow.


```java
            //read in all the inputs
            String fileLocation = (String) task.getInputData().get("fileLocation");
            List<String> outputFormats = (List<String>)(task.getInputData().get("outputFormats"));
            List<Size> outputSizes = (List<Size>) objectMapper.convertValue(task.getInputData().get("outputSizes"), new TypeReference<List<Size>>(){});
            Boolean maintainAspectRatio = Boolean.valueOf(task.getInputData().get("maintainAspectRatio").toString());
            //create the two output files
            List<WorkflowTask> dynamicTasks =  Lists.newArrayList();
            Map<String, Object> dynamicTasksInput = Maps.newHashMap();
            //loop through the names, and create JSON files with all of the required entries.
            int i=0;
            String dynamicTaskName = "image_convert_resize";
            for (String outputFormat :
                    outputFormats) {
                for (Size size:
                     outputSizes) {
                    String taskRefName = String.format("%s_%s_%sx%s_%d",dynamicTaskName, outputFormat, size.width, size.height, i++);
                    WorkflowTask dynamicTask = new WorkflowTask();
                    dynamicTask.setName(dynamicTaskName);
                    dynamicTask.setTaskReferenceName(taskRefName);
                    dynamicTasks.add(dynamicTask);

                    Map<String, Object> dynamicTaskInput = Maps.newHashMap();
                    dynamicTaskInput.put("fileLocation", fileLocation);
                    dynamicTaskInput.put("outputFormat", outputFormat);
                    dynamicTaskInput.put("outputWidth", size.width);
                    dynamicTaskInput.put("outputHeight", size.height);
                    dynamicTaskInput.put("maintainAspectRatio", maintainAspectRatio);

                    dynamicTasksInput.put(taskRefName,dynamicTaskInput );
                }
            }

```

>Note: The [Order Fulfillment codelab](/content/docs/reference-docs/dynamic-fork-task#additional-examples) uses the JQ Transform tasks to create the JSON inputs.

### Workflow Definition

Here is the JSON representation of the  `FORK_JOIN_DYNAMIC` task followed by a `JOIN` task.  The fork is named and given a taskReferenceName, but all of the input parameters are JSON variables that we will discuss next:

```json
{      
  "name": "image_multiple_convert_resize_fork",
  "taskReferenceName": "image_multiple_convert_resize_fork_ref",
  "inputParameters": {
    "dynamicTasks": "${fooBarTask.output.dynamicTasksJSON}",
    "dynamicTasksInput": "${fooBarTask.output.dynamicTasksInputJSON}"
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
},
{
"name": "image_multiple_convert_resize_join",
"taskReferenceName": "image_multiple_convert_resize_join_ref",
"type": "JOIN"
}
```

Adding in the task that creates the inputs above the FORK creates the following workflow diagram:

<p align="center"><img src="/content/img/dynamic_fork_example.jpg" alt="a dynamic fork diagram" width="300" style={{paddingBottom: 30, paddingTop: 30}} /></p>


### Join Definition

The [JOIN](/content/docs/reference-docs/join-task) task will run after all of the dynamic tasks, collecting the output for all of the tasks.

:::note
Note: For `FORK_JOIN_DYNAMIC`, all tasks must complete before the `JOIN` will complete the fork.
:::

## Additional Examples

* [Order Fulfillment Codelab](/content/docs/codelab/orderfulfillment8): In this example, several JQ Transform System tasks are used to create the JSON inputs required for the Dynamic task to run. The outputs from the JQ transforms are used to create the `dynamicTasks` and the `dynamicTaskInputs`:

```json
  "inputParameters": {
    "dynamicTasks": "${jq_create_dynamictasks_ref.output.result}",
    "dynamicTasksInput": "${jq_create_dynamictasksParams_ref.output.result}"
  },
```