---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 4: Execute Tasks in Parallel

Conductor lets us run any number of tasks in parallel. Let’s learn how to do this based on a dynamic data set. In this use case, we will read a number of stock tickers from an API, and for each ticker, we will run a series of steps. 

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">

1. Add [HTTP](/content/reference-docs/system-tasks/http) worker to retrieve stock tickers.
2. Add [Dynamic Fork](/content/reference-docs/operators/dynamic-fork) based on the output of the HTTP worker.
3. Create the [Subworkflow](/content/reference-docs/operators/sub-workflow). Include the following tasks in the subworkflow.<ul><li>Retrieve the previous day’s closing price and volume</li><li>Retrieve today's opening price</li><li>Run a trade execution</li></ul>
4. Run Workflow.

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

As we can see, this workflow triggers a sub-workflow for each ticker from the output of the previous step. Let’s try running this with 100 tickers. In this test, the API limits the tickers to 100. Still, we can run several thousand tasks in parallel, all without worrying about the state of the execution or where it's being executed. When all the forks are complete, the workflow resumes the next step enabling us to do more advanced tasks with minimal effort.

The mock APIs used in this example are available here on this repo:  

## Related Topics

- Passing [inputs into workflow for tasks](/content/guides/passing-data-task-to-task#task-inputs-referred-from-workflow-inputs)
- Passing the [output of one task to the input](/content/guides/passing-data-task-to-task#task-inputs-referred-from-other-task-outputs) of another
- [Client SDKs](/content/conductor-clients)