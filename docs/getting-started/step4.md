---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 4: Execute Tasks in Parallel

Conductor lets you run any number of tasks in parallel. Let’s learn how to do this based on a dynamic data set. In this use case, we will read a number of stock tickers from an API, and for each ticker, we will run a series of steps. 

<Tabs>
<TabItem value="UI" label="UI">

1. Add [HTTP](https://orkes.cloud/content/reference-docs/system-tasks/http) worker to retrieve stock tickers.
2. Add [Dynamic Fork](https://orkes.cloud/content/reference-docs/operators/dynamic_fork) based on the output of the HTTP worker.
3. Create the [Subworkflow](https://orkes.cloud/content/reference-docs/operators/sub_workflow). Include the following tasks in the subworkflow.<ul><li>Retrieve the previous day’s closing price and volume.</li><li>Retrieve today's opening price.</li><li>Run a trade execution.</li></ul>
4. Run Workflow.

</TabItem>
</Tabs>

As you can see, this workflow triggers a sub-workflow for each ticker from the output of the previous step. Let’s try running this with 100 tickers. In this test, the API limits the tickers to 100. Still, we can run several thousand tasks in parallel, all without worrying about the state of the execution or where it's being executed. When all the forks are complete, the workflow resumes the next step enabling us to do more advanced tasks with minimal effort.

The mock APIs used in this example are available here: 

## Looking Ahead

* 
* 