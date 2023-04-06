---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 3: Adding Custom Code Worker

Continuing the use case from the previous step, we now have a requirement to add a fraud check if the deposit amount is greater than $50,000.

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">


1. In your current definition, add a [Switch](/content/reference-docs/operators/switch-task) task before the deposit task
2. Add a switch case for checking > $50,000, and add a [Worker](/content/reference-docs/operators/simple-task) task for the case with the name `fraud-check`
3. Run workflow.

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="300px"
  allow="fullscreen;"
  src={"https://www.youtube.com/embed/J0TDfs6nJhg"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

We can see that when we run this workflow for amounts > $50,000, it runs a fraud check. If we named the task `fraud-check`, we'd notice that it actually executed (in playground env), but how? 
That's because there is a pre-defined task that is polling and running all the tasks named `fraud-check`. 

So how can we implement this task? First let's rename the task to a new unique name for ourselves - for ex: `fraud-check-<replace-with-your-name>`. And now let’s see how this custom fraud check can be implemented:

View our documentation on [Conductor Clients & SDKs](/content/category/sdks)  list and how to import the required dependencies in our applications.

<Tabs>
<TabItem value="Java" label="Java">

```java

    @WorkerTask("fraud-check-<replace-with-your-name>")
    public String checkForFraud(@InputParam("amount") BigDecimal amount, @InputParam("accountId") String accountId) {
        boolean isFraud = fraudService.isFraudulentTxn(accountId, amount); 
        if(isFraud) {
            return "This transaction cannot be processed as its flagged for review.";
        }
        return "Deposit of " + amount + " has processed successfully";
    }

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

So far, we haven't done anything here even if the fraud check fails, but we can add another inline task that can check for the 
outcome of fraud check and sends a different message to our users via SMS or Email.  


<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">


1. In your current workflow, add a [Inline](/content/reference-docs/system-tasks/inline) task after the switch case
2. Add another switch case to process the deposit only if the fraud check passes
3. Run workflow.

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="300px"
  allow="fullscreen;"
  src={"https://player.vimeo.com/video/814101164?h=e8e6172101"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

## Related Topics

- Passing [inputs into workflow for tasks](/content/guides/passing-data-task-to-task#task-inputs-referred-from-workflow-inputs)
- Passing the [output of one task to the input](/content/guides/passing-data-task-to-task#task-inputs-referred-from-other-task-outputs) of another
- [Client SDKs](/content/conductor-clients)