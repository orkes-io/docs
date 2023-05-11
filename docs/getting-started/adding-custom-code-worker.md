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
2. Add a switch case for checking amounts >= 10000, and add a [Worker](/content/reference-docs/operators/worker-task) task for the case with the name `fraud-check`.
3. [Run workflow](/content/how-to-videos/run-workflow).

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="350px"
  allow="fullscreen;"
  src={"https://player.vimeo.com/video/815581464?h=ce49f5768a"}
></iframe></div>
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
<TabItem value="CSharp" label="CSharp">

```csharp dynamic https://github.com/conductor-sdk/csharp-sdk-examples/blob/clean-examples/Examples/Worker/Workers.cs section=1 ../Worker/Workers.cs
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

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
</Tabs>


Once we have cloned the repo or copied the required elements to our local machines, we can run this locally by connecting to the playground server. 
To do this, we must give the required permissions to our application.
Refer to this [video](/content/how-to-videos/app-management) to add permission to execute the custom worker we just created above (`fraud-check-<replace-with-a-unique-value>`).
After providing the permissions, we can change the definition to run our worker (`fraud-check-<replace-with-a-unique-value>`) and start the application.
We can see that now our worker is picking up the task. 

This is the __first example__ of how a distributed worker is executed in Conductor; __without__ exposing an endpoint 
or creating any sort of inbound connectivity, we were able to execute the task directly from our local machine pointing to the playground server.

:::tip Distributed workers in Conductor
We can run similar workflows in production, too, workers could live in __any applications__ or even __third-party services__ and we can connect them all together using
Conductor. All of this without worrying about creating inbound connections or exposing unwanted API endpoints.
:::

## Related Topics

- Passing [inputs into workflow for tasks](/content/developer-guides/passing-inputs-to-task-in-conductor)
- Passing the [output of one task to the input of another](/content/developer-guides/passing-inputs-to-task-in-conductor)
- [Client SDKs](/content/category/sdks)
