import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Workers

A worker is a piece of code responsible for executing a task, which is custom logic that can be deployed anywhere. In Conductor, workers can be implemented in any language.

To create a worker task, you can use Conductor’s polyglot SDKs. These SDKs contain features that make it easier to create workers, such as polling threads, metrics, and server communication. Conductor maintains a registry of worker tasks. A task must be registered before being used in a workflow. This can be done by creating a Task Definition.


## Best practices for writing workers

In Conductor, each worker should embody the microservice design pattern and follow these basic principles:
* **Defined I/O**—Each worker executes a specific task and produces a well-defined output, given specific inputs.
* **Statelessness**—Workers are stateless and do not implement workflow-specific logic, like deciding what task comes next.
* **Idempotency**—Workers are meant to be idempotent and should handle cases where partially-executed tasks get rescheduled for completion.
* **Decoupled implementation**—Workers do not implement the logic to handle retries, timeouts, and other implementation details, which are handled by the Conductor server.


## Using workers in Conductor

In Conductor, you can use workers in two ways: the UI approach or the SDK-only approach. This guide will explore the UI approach.

**To use a worker in Conductor (UI approach):**
1. Create a worker to run a task.
2. Define the task in Conductor.
3. Add the task to a workflow.
4. Add worker to an application account and grant permissions for execution.
5. Launch the worker to start.


### Step 1: Create a worker task

Begin by creating a worker and defining the logic for your task. It is possible to use one worker to service multiple tasks.

**Prerequisites**

Ensure that you have installed the [Conductor SDK](/category/sdks) for your chosen language.

<Tabs>
<TabItem value="Python" label="Python">

``` bash
pip3 install conductor-python
```
</TabItem>

<TabItem value="JavaScript" label="JavaScript">

``` bash
npm i @io-orkes/conductor-javascript
```
</TabItem>
</Tabs>


**Example worker task**

Here is an example of a task that generates a random product inventory number. In this example, a domain is used to route the task to the correct worker. 

<Tabs>
<TabItem value="Python worker" label="Python">

``` python
@worker_task(task_definition_name='get-inventory', domain='john')
def get_inventory(product_id: str) -> dict:
    return dict(product_id = product_id, inventory = randrange(10))
```
</TabItem>

<TabItem value="Java worker" label="Java">

``` java
@Service
public class Worker {
    @WorkerTask(value = "get-inventory", domain = "john")
    public Map getInventory(Map<String, String> input) {
        return Map.of(
            "product_id", input.get("product_id"),
            "inventory", ThreadLocalRandom.current().nextInt(1, 11)
        );
    }
}
```
</TabItem>

<TabItem value="JavaScript worker" label="JavaScript">

``` javascript
const {
  orkesConductorClient, TaskManager,
} = require("@io-orkes/conductor-javascript");

const getInventory = {
  taskDefName: 'get-inventory',
  domain: 'john',
  execute: async ({ inputData }) => ({
    outputData: {
      product_id: inputData.product_id,
      inventory: 1 + Math.floor(Math.random() * 10)
    },
    status: "COMPLETED",
  }),
};

orkesConductorClient({
  keyId: process.env.CONDUCTOR_AUTH_KEY,
  keySecret: process.env.CONDUCTOR_AUTH_SECRET,
  serverUrl: process.env.CONDUCTOR_SERVER_URL,
}).then((client) =>
  new TaskManager(client, [ getInventory ]).startPolling()
);
```

</TabItem>
</Tabs>


For more information on creating workers in your preferred language, refer to the [SDK guides](/category/sdk). 


### Step 2: Define the task in Conductor

All worker tasks must be defined in Conductor before they can be used in a workflow. Tasks can be defined on Orkes Platform or using an API.

**To define a worker task:**

<Tabs>
<TabItem value="orkes define" label="On Orkes Platform">

1. Go to your Conductor cluster on Orkes Platform.
2. In the left navigation menu, go to **Definitions** > **Task**.
3. Select **(+) Define task**.
4. Enter the task details, such as the rate limits, retry settings, timeout settings, and expected inputs and outputs. <br\> The **Name** must match the task name defined previously in your code.
    <p align="center"><img src="/content/img/using-workers/using_workers-define_custom_task.png" alt="Define task in Orkes Platform" width="100%" height="auto"></img></p>
5. Select **Save** > **Confirm Save**.

</TabItem>

<TabItem value="api define" label="Using API">

Refer to the [Create Task Definition API](https://orkes.io/content/reference-docs/api/metadata/creating-task-definitions).
</TabItem>
</Tabs>

### Step 3: Add the task to a workflow

Once the task is defined, it can be added to a workflow definition.

**To add a worker task to a workflow:**

<Tabs>
<TabItem value="orkes add" label="On Orkes Platform">

1. Go to your Conductor cluster on Orkes Platform.
2. In the left navigation menu, go to **Definitions** > **Workflow**.
3. Select or create a workflow.
4. In the visual workflow editor, select the **(+)** icon to add a new task. There are two ways to add a worker task:
* Search for your task using its task name and select to add it to the workflow.
* Add a **Worker Task (Simple)** and enter the task name in **Task Definition**.
5. Configure the task, such as its inputs, caching, and optionality.
6. On the top right, select **Save** > **Confirm**.

<p align="center"><img src="/content/img/using-workers/using_workers-add_task_to_workflow.png" alt="Add task in Orkes Platform" width="100%" height="auto"></img></p>
</TabItem>

<TabItem value="api add" label="Using API">

Refer to the [Create Workflow Definition](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition) or [Update Workflow Definition](https://orkes.io/content/reference-docs/api/metadata/update-workflow-definitions) APIs.
</TabItem>
</Tabs>

The task cannot begin execution until the worker is connected to the Conductor server. If the workflow is run, the custom task will remain in the Scheduled state until the worker comes online to service the task. This is achieved by creating the appropriate application accounts and permissions for the worker.


### Step 4: Add worker to an application account

In Orkes, an application account with a Worker role type enables workers to authenticate and authorize against the Conductor server. To start a worker, you need to add the worker to an application account and grant Execute permission to the application.

**To add worker to application account:**

1. Go to the application account.
    1. Go to your Conductor cluster on Orkes Platform.
    2. In the left navigation menu, go to **Access Control** > **Applications**.
    3. Select an application that you will be adding your worker to. Otherwise, create an application. <br\> Ensure that the application role has **Worker** enabled.
      <p align="center"><img src="/content/img/using-workers/using_workers-application_roles.png" alt="Add worker to application account in Orkes Platform" width="100%" height="auto"></img></p>
2. Get the application access key for your worker task.
    1. Under Access Keys, select **Create access key** and store your credentials securely.
    2. Set the Key ID and Key Secret in your environment variables.
        ``` bash
        export CONDUCTOR_SERVER_URL=<SERVER_URL> // eg: https://developer.orkescloud.com/api
        export CONDUCTOR_AUTH_KEY=<KEY_ID>
        export CONDUCTOR_AUTH_SECRET=<KEY_SECRET>
        ```
3. Grant Execute permission to the application.
    1. Under Permissions, select **Add permission**.
    2. Select the **Task** tab and then your worker task.
    3. Enable the **Execute** toggle.
    4. (If Task to Domain is used) In Domain, enter the domain name used in your worker code.
    5. Select **Add Permissions**.

The application account can now execute the worker task.

<p align="center"><img src="/content/img/using-workers/using_workers-app_permissions.png" alt="Add permissions to application account in Orkes Platform" width="100%" height="auto"></img></p>

For more information on application accounts, refer to [Enabling Security via Applications](https://orkes.io/content/access-control-and-security/applications).


### Step 5: Launch the worker

You must launch the worker project before it can start executing the custom task.

**To launch the worker:**
Start your project using the respective method of your language and editor.

<Tabs>
<TabItem value="Python run" label="Python">

``` bash
python3 worker.py
```
</TabItem>

<TabItem value="Java run" label="Java">

``` bash
gradle bootRun // using Gradle
```

``` bash
mvn spring-boot:run // using Maven
```
</TabItem>

<TabItem value="JavaScript run" label="JavaScript">

```
node index.js
```
</TabItem>
</Tabs>

Run the workflow to ensure that it starts up successfully. If not, return to the previous steps and verify that all details have been entered correctly, including:
* **Server URL, Key ID, and Key Secret**— Added to your environment variables.
* **Execute permissions**—Added for the worker task in your application account.
* **(if applicable) Domain**—The domain in your code matches the domain in the run mapping and application permissions.
    ```
    // run mapping during workflow execution
    { "get-inventory": "john" }
    ```