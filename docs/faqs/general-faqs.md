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