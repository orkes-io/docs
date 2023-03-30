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


1. In your current workflow, add a [fork-join](/content/reference-docs/operators/forkjoin) task after the deposit task
2. Add the SMS and email tasks as fork tasks
3. Join the two fork tasks using the join operation
4. Run workflow

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

We can see that when we run this workflow for amounts > $50,000, it runs a fraud check. Let’s see how this fraud check can be implemented:

Click [here](./conductor-clients) to browse the client SDK list and how to import the required dependencies in our applications.

<Tabs>
<TabItem value="Java" label="Java">

```java
@WorkerTask("fraud-check")
public String checkForFraud(@InputParam("amount") BigDecimal amount, @InputParam("accountId") String accountId) {
    boolean isFraud = fraudService.isFraudulentTxn(accountId, amount);
    if (isFraud) {
        return "This transaction cannot be processed as its flagged for review.";
    }
    return "Deposit of " + amount + " has been processed successfully";
}
```

</TabItem>
<TabItem value="Python" label="Python">

```python
def check_for_fraud(task: Task):
  amount = task.input_data["amount"]
  account_id = task.input_data["accountId"]
  if fraud_service.is_fraudulent_txn(account_id, amount):
    return 'This transaction cannot be processed as its flagged for review.'
  return f'Deposit of {amount} has been processed successfully'

fraud_worker = Worker(
  task_definition_name='task_name',
  execute_function=check_for_fraud,
)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func CheckForFraud(t *model.Task) (interface{}, error) {
	amount := t.InputData["amount"]
	accountId := t.InputData["accountId"]
	if fraudService.isFraudulentTxn(accountId, amount) {
		return "This transaction cannot be processed as its flagged for review.", nil
	}
	return fmt.Sprintf("Deposit of %s has been processed successfully", amount), nil
}
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

<!-- @TODO:Gustavo -->
```csharp

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
const checkForFraud = (inputData) => {
  const amount = inputData.amount
  const accountId = inputData.accountId
  taskResult = {
    outputData: {
      "message": `Deposit of ${amount} has been processed successfully`
    },
    status: "COMPLETED"
  }
  if (fraudService.isFraudulent(accountId, amount)) {
    taskResult.outputData.message = 'This transaction cannot be processed as its flagged for review.'
  }
  return taskResult
};
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

<!-- @TODO:Gustavo -->
```clojure

```

</TabItem>
</Tabs>

## Looking Ahead

- Passing [inputs into workflow for tasks](/content/guides/passing-data-task-to-task).
- Passing the [output of one task to the input](/content/guides/passing-data-task-to-task) of another
- [Client SDKs](/content/conductor-clients)