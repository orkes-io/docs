---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Step 3: Adding Custom Code Worker

Continuing the use case from the previous step, we now have a requirement to add a fraud check for all deposit transactions >= $10,000.

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">


1. In your current definition, add a [Switch](/content/reference-docs/operators/switch) task before the deposit task.
2. Add a switch case for checking amounts >= 10000, and add a [Worker](/content/reference-docs/worker-task) task for the case with the name `fraud-check`.
3. [Run workflow](/content/how-to-videos/run-workflow).

</div>
<div className="col">
<div className="embed-loom-video">
<iframe width="500" height="315" src="https://www.youtube.com/embed/-jx9XuKaL0I?si=1iK2Jb_yRtE_Jvqm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

We can see that when we run this workflow for amounts >= $10,000, it runs a fraud check. If we named the task `fraud-check`, we'd notice that it is actually executed (in playground env), but how? 
That's because there is a pre-defined task that is polling and running all the tasks named `fraud-check`. We also have the required permissions in the playground for this task.

So how can we implement this task for ourselves? First, let's rename the task to a new unique name for ourselves - for ex: `fraud-check-<replace-with-a-unique-value>`. And now, let’s see how this custom fraud check can be implemented:

View our documentation on [Conductor Clients & SDKs](/content/category/sdks) list and how to import the required dependencies in our applications. Refer to the linked repositories in the code samples below to see how to implement the worker.

<Tabs>
<TabItem value="Java" label="Java">

```java dynamic https://github.com/conductor-sdk/orkes-java-springboot2-example/blob/main/src/main/java/io/orkes/example/banking/workers/ConductorWorkers.java section=1 ../workers/ConductorWorkers.java
```

</TabItem>
<TabItem value="Python" label="Python">

```python
from conductor.client.http.models import Task, TaskResult
from conductor.client.http.models.task_result_status import TaskResultStatus
from conductor.client.worker.worker_interface import WorkerInterface
from conductor.client.configuration.configuration import Configuration
from conductor.client.configuration.settings.authentication_settings import AuthenticationSettings
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.worker.worker import Worker
from conductor.client.worker.worker_task import WorkerTask

### Add these lines if not running on unix###
from multiprocessing import set_start_method
set_start_method("fork")
#############################################

SERVER_API_URL = 'https://play.orkes.io/api'
KEY_ID = '<KEY_ID>'
KEY_SECRET = '<KEY_SECRET>'

# Create worker using a class implemented by WorkerInterface
class SimplePythonWorker(WorkerInterface):
    def execute(self, task: Task) -> TaskResult:
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('worker_style', 'class')
        task_result.add_output_data('secret_number', 1234)
        task_result.add_output_data('is_it_true', False)
        task_result.status = TaskResultStatus.COMPLETED
        return task_result

    def get_polling_interval_in_seconds(self) -> float:
        # poll every 500ms
        return 0.5

# Create worker using a function
def execute(task: Task) -> TaskResult:
    task_result = TaskResult(
        task_id=task.task_id,
        workflow_instance_id=task.workflow_instance_id,
        worker_id='your_custom_id'
    )
    task_result.add_output_data('worker_style', 'function')
    task_result.status = TaskResultStatus.COMPLETED
    return task_result

# Create worker using a WorkerTask decorator
@WorkerTask(task_definition_name='python_annotated_task', domain='cool', worker_id='decorated', poll_interval_seconds=1.0)
def python_annotated_task(input) -> object:
    return {'message': 'python is so cool :)'}

configuration = Configuration(
    server_api_url=SERVER_API_URL,
    debug=True,
    authentication_settings=AuthenticationSettings(
        key_id=KEY_ID,
        key_secret=KEY_SECRET
    ),
)

workers = [
    SimplePythonWorker(
        task_definition_name='python_task_example'
    ),
    Worker(
        task_definition_name='python_execute_example',
        execute_function=execute,
        poll_interval=0.25,
    )
]

# If there are decorated workers in your application, scan_for_annotated_workers should be set
# default value of scan_for_annotated_workers is False
with TaskHandler(workers, configuration, scan_for_annotated_workers=True) as task_handler:
    task_handler.start_processes()
    task_handler.join_processes()

```

</TabItem>
<TabItem value="Golang" label="Golang">

```java
    // @TODO:Gustavo
    @WorkerTask("fraud-check")
    public String checkForFraud(@InputParam("amount") BigDecimal amount, @InputParam("accountId") String accountId) {
        boolean isFraud = fraudService.isFraudulentTxn(accountId, amount);
        if(isFraud) {
            return "This transaction cannot be processed as its flagged for review.";
        }
        return "Deposit of " + amount + " has processed successfully";
    }

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(def fraud-check-worker
           {:name "fraud-check",
            :execute (fn [d]
                       (let [amount (get-in d [:inputData "amount"])
                             accountId (get-in d [:inputData "accountId"] )]
                         {:status  "COMPLETED"
                          :outputData {"message" (if (account-service amount accountId)
                                                   "This transaction cannot be processed as its flagged for review."
                                                   (str "Deposit of " amount   " has processed successfully"))}}))})
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp dynamic https://github.com/conductor-sdk/csharp-sdk-examples/blob/main/Examples/Worker/Workers.cs section=1 ../Worker/Workers.cs
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript dynamic https://github.com/conductor-sdk/javascript-sdk-examples/blob/main/src/banking/workers/workers.js section=1 .../workers/workers.js
```

</TabItem>
<TabItem value="Typescript" labe="typescript">

```typescript dynamic https://github.com/conductor-sdk/typescript-examples/blob/main/src/banking/workers/workers.ts section=1 ../workers/workers.ts
```

</TabItem>
</Tabs>


Once we have cloned the repo or copied the required elements to our local machines, we can run this locally by connecting to the playground server. 
To do this, we must give the required permissions to our application.
Refer to this [video](/content/how-to-videos/app-management) to add permission to execute the custom worker we just created above (`fraud-check-<replace-with-a-unique-value>`).
After providing the permissions, we can change the definition to run our worker (`fraud-check-<replace-with-a-unique-value>`) and start the application.
We can see that now our worker is picking up the task. 

This is the **first example** of how a distributed worker is executed in Conductor; **without** exposing an endpoint or creating any sort of inbound connectivity, we were able to execute the task directly from our local machine pointing to the playground server.

:::tip Distributed workers in Conductor
We can run similar workflows in production, too, workers could live in **any applications** or even **third-party services** and we can connect them all together using
Conductor. All of this without worrying about creating inbound connections or exposing unwanted API endpoints.
:::

## Related Topics

- Passing [inputs into workflow for tasks](/content/developer-guides/passing-inputs-to-task-in-conductor)
- Passing the [output of one task to the input of another](/content/developer-guides/passing-inputs-to-task-in-conductor)
- [Client SDKs](/content/category/sdks)
