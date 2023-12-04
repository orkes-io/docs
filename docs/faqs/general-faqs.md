# General FAQs

<FAQStructuredData faqs={faqs} />

import FAQStructuredData from '../../src/theme/FAQStructuredData';

export const faqs = [
  {
    question: 'Is it possible to have different environments like production, staging, and review environments in Conductor?',
    answer:
      "Yes, our clusters can be configured directly from the cloud portal as per your requirements. Our typical customers have production, UAT, and development environments. ",
  },
  {
    question: 'Do you have any restrictions regarding the processing of medical data?',
    answer:
      "We offer deployment models that include running the entire workload from a customer's isolated cloud account, which is audited for compliance like HIPAA. Additionally, we can provision on-prem clusters that operate outside of a cloud stack.",
  },
  {
    question: "From a latency perspective, is it realistic to facilitate a use case where a user's journey on a website is determined by pulling data from various endpoints, evaluating the results against predefined rules, and dynamically redirecting the user to different pages based on the assessed outcomes?",
      answer:
      "Yes, such use cases are possible with Conductor. The various steps included in such cases are: aggregating data from various endpoints, running basic rule evaluations against this data, running custom workers on the data pulled to determine their existence, use the user identifier to get the previous user details, & dynamically redirect the page for users based on the results. From an orchestration point of view and depending on the cluster configuration, inter-API communications can be managed with a latency rate of under 10s of milliseconds. Assume a max cost of 50 ms (typical P95, P75 could be < 20 ms) between steps, and each step will need to account for its own latency."
  },
];

### Is it possible to pull data from multiple endpoints simultaneously rather than sequentially?

Yes, it’s possible to pull data from multiple endpoints simultaneously. Have a look at this [workflow execution](https://play.orkes.io/execution/7f438f95-e907-11ed-b7d4-364566de507d). You can see that the parallel execution, which is the construct supported in Conductor, can run 10s of thousands of parallel executions.

### Can we start a workflow not from the start but from any steps within the workflow? 

The Conductor workflow always starts from step 1 and follows the sequence. However, once the workflow is executed, you can [skip a particular task from execution](https://orkes.io/content/reference-docs/api/workflow/skip-task-from-workflow). Alternatively, you can create the workflow definitions programmatically with only the required steps. 

### What is the difference between restarting and rerunning a workflow?

Once you run a workflow and it starts the execution, and for any reason, if the workflow fails/or is manually terminated, you can restart or re-run it.

<p align="center"><img src="/content/img/rerun-and-restart.png" alt="Rerun Vs Restart" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

1. Restart Workflow

- **Restart with Current Definitions** - Instantly restarts the same execution with the existing workflow definition.
- **Restart with Latest Definitions** - Restarts the workflow, but if there have been any changes to the workflow definition, it will run the latest definition.

2. Re-run Workflow

Re-run Workflow takes you to the run workflow screen, where you can trigger a brand new instance of the workflow. You can also change the input parameters, correlation ID, or task to domain mapping before triggering the new execution.

### How do you clone a workflow?

You can clone a workflow by navigating to **Definitions > Workflows** and clicking on the "Clone" button towards the right end of the workflow name.

<p align="center"><img src="/content/img/clone-workflow.jpg" alt="Clone Workflow" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You’ll get a confirmation window with the workflow name appended with numerical 1, where you can also rename the workflow and choose the required version if needed.

<p align="center"><img src="/content/img/clone-workflow-confirmation.jpg" alt="Clone Workflow Confirmation" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>