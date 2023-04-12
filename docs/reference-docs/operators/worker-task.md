import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Worker Task (Simple Task)

A Simple task is a Worker task that requires an external worker for polling. The Workers can be implemented in any language, and the Conductor provides additional features such as metrics, server communication, and polling threads that make the worker creation process easier.

## Definitions

```json
{
 "name": "workflow_name",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "task_name",
     "taskReferenceName": "task_name_ref",
     "inputParameters": {},
     "type": "SIMPLE"
   }
 ]
}

```

## Examples

<Tabs>
<TabItem value="UI" label="UI">
</TabItem>
<TabItem value="JSON" label="JSON">

```json
{
 "name": "workflow_name",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "task_name",
     "taskReferenceName": "task_name_ref",
     "inputParameters": {},
     "type": "SIMPLE"
   }
 ]
}
```

</TabItem>
<TabItem value="Java" label="Java">

```java
new SimpleTask(
  String taskDefName, 
  String taskReferenceName
)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
workflow.NewSimpleTask(
  taskType string, 
  taskRefName string,
) *SimpleTask
```

</TabItem>
<TabItem value="Python" label="Python">

```python
conductor.client.workflow.task.SimpleTask(
  task_def_name: str, 
  task_reference_name: str
)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
Conductor.Definition.TaskType.SimpleTask(
  string taskName, 
  string taskReferenceName
)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
simpleTask = (
  taskReferenceName: string,
  name: string,
  inputParameters:Record<string,unknown>
): SimpleTaskDef
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

<!-- Todo: @gardusig -->
```clojure

```

</TabItem>
</Tabs>

<details><summary>Sample Workflow Implementation with Java Worker</summary>
<p>
Let’s see a sample workflow  definition:

```json
{
 "name": "workflow_name",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "task_name",
     "taskReferenceName": "task_name_ref",
     "inputParameters": {},
     "type": "SIMPLE"
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "riza.farheen@orkes.io"
}
```

Once the workflow is set, you must set up the worker to poll the worker.
<br/>

**Setting Up a Sample Worker**

Suppose the worker is to be set up in Java; you need to clone the [Orkesworkers Java](https://github.com/orkes-io/orkesworkers) repo in the IDE of your choice.
:::tip Best Practice
As a best practice, under the [workers](https://github.com/orkes-io/orkesworkers/tree/main/src/main/java/io/orkes/samples/workers) folder, you can keep only the **SimpleWorker.java** file and trash the rest for an error-free running of the application.
:::

The code for the [SimpleWorker](https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/SimpleWorker.java) looks like this:

```java
package io.orkes.samples.workers;

import com.netflix.conductor.client.worker.Worker;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;
import org.springframework.stereotype.Component;

@Component
public class SimpleWorker implements Worker {

    @Override
    public String getTaskDefName() {
        return "simple_worker";
    }

    @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        result.setStatus(TaskResult.Status.COMPLETED);
        return result;
    }
}
```

In this section, you must replace “simple_worker” with the task name you created. Here, it would be “task_name”.

```java
@Override
public String getTaskDefName() {
    return "task_name";
}  
```

* Next, you need to create an application in your Conductor server and provide the authentication details. If you take the [Playground](https://play.orkes.io/) as an example, you can [create an application](/content/access-control-and-security/applications#configuring-application) and [generate the access keys](/content/access-control-and-security/applications#generating-access-keys). 
* Ensure to [provide access](/content/access-control-and-security/applications#adding-permissions) to the task & workflows while creating the application.
* Under the **application.properties** in your worker, replace the key ID and secret with that of the copied values from the Playground.

```json
conductor.server.url=https://play.orkes.io/api/
conductor.security.client.key-id=_CHANGE_ME_
conductor.security.client.secret=_CHANGE_ME_
```

This is how you wire your tasks to the worker. The next step is to run the workflow and the Java application.

**Run Worker**

You can either use the following command or run the worker through your IDE. 

```./gradlew run```

</p>
</details>