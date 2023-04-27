---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Step 7: Run it from your Application
We can implement this task in an application, first let's rename the task to a new unique name for ourselves - for ex: `fraud-check-<replace-with-a-unique-value>`. And now, let’s see how this custom fraud check can be implemented:

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

- Passing the [output of one task to the input of another](/content/developer-guides/passing-inputs-to-task-in-conductor)
- [Client SDKs](/content/category/sdks)