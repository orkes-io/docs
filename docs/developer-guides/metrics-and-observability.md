import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Metrics and Observability

The Orkes Conductor Dashboard gives a quick overview of the metrics & alerts on your Conductor console. It provides a centralized intuitive interface to track and get insights on the behavior and performance of tasks and workflows that can aid in troubleshooting errors.

Orkes Conductor uses the popular platform Prometheus for recording a rich set of metrics that will be available automatically in your deployment and pushes the metrics to Grafana/Datadog on request to dedicated clusters.

## Accessing Dashboard from Conductor Console

In this document, we’ve included a sample dashboard set using Prometheus & Grafana.

1. To access your dashboard, navigate to **Metrics** from your Conductor console. If you cannot see this option on your Conductor console, [please reach out to our team](https://app.slack.com/client/T02KG20GJ1Z/C02KJ820XPW). 

<p align="center"><img src="/content/img/accessing-dashboard.png" alt="Accessing dashboard from Conductor Console" width="100%" height="auto"></img></p>

2. It takes you to the Conductor dashboard set using Grafana. A sample one looks like this:

<p align="center"><img src="/content/img/sample-dashboard.png" alt="Sample Dashboard" width="100%" height="auto"></img></p>

## Conductor Metrics

The server publishes the following metrics. You can use these metrics to configure alerts for your workflows and tasks.

### Workflow and Task Metrics

| Metrics | Sample Visualization | Purpose | Tags |
| ------- | -------------------- | ------- | ---- | 
| Workflow Latencies (Name and Percentile)<br/><br/>**workflow_completed_seconds** | <p align="center"><img src="/content/img/workflow-completed-seconds.png" alt="Workflow Latencies" width="100%" height="auto"></img></p> | Timer indicating the time taken for completing the workflows. | workflowName, quantile |
| Workflow completion/sec<br/><br/>**workflow_completed_seconds_count** | <p align="center"><img src="/content/img/workflow-completed-seconds-count.png" alt="Workflow completion/sec" width="100%" height="auto"></img></p> | Counter indicating the number of workflows completed per second. | workflowName | 
| Workflow failures/sec<br/><br/>**workflow_completed_seconds_count** (Ensure to add the filter "FAILED" to get the failed list) | <p align="center"><img src="/content/img/workflow-completed-seconds-count-1.png" alt="Workflow failures/sec" width="100%" height="auto"></img></p> | Counter indicating the number of workflows failed per second. | workflowName |
| No of workflows currently Running<br/><br/>**workflow_running** | <p align="center"><img src="/content/img/workflow-running.png" alt="No of workflows currently running" width="100%" height="auto"></img></p> | Gauge for the number of running workflows. | workflowName |
| Workflow Start Rate/sec<br/><br/>**workflow_start_request_seconds_count** | <p align="center"><img src="/content/img/workflow-start-request-seconds-count.png" alt="Workflow Start Rate/sec" width="100%" height="auto"></img></p> | Counter for no. of workflows started. | workflowName |
| Total no. of workflows started in the time period<br/><br/>**workflow_start_request_seconds_count** | <p align="center"><img src="/content/img/workflow-start-request-seconds-count-1.png" alt="Total no. of workflows started in the time period" width="100%" height="auto"></img></p> | Counter for no. of workflows started in the time period. | workflowName | 
| Workflow Search Latency Percentile<br/><br/>**http_server_requests_seconds** | <p align="center"><img src="/content/img/http-server-requests-seconds.png" alt="Workflow Search Latency Percentile" width="100%" height="auto"></img></p> | Indicates the latency values for the search operation in workflows. | quantile | 
| Task Latencies (Name and Percentile)<br/><br/>**task_completed_seconds** | <p align="center"><img src="/content/img/task-completed-seconds.png" alt="Task Latencies" width="100%" height="auto"></img></p> | Timer for completing the tasks. | taskType, quantile |
| Task completion/sec<br/><br/>**task_completed_seconds_count** | <p align="center"><img src="/content/img/task-completed-seconds-count-1.png" alt="Task completion/sec" width="100%" height="auto"></img></p> | Counter indicating the number of completed tasks per second. | taskType |
| Task failures/sec<br/><br/>**task_completed_seconds_count** | <p align="center"><img src="/content/img/task-completed-seconds-count.png" alt="Task failures/sec" width="100%" height="auto"></img></p> | Counter indicating the number of failed tasks per second. | taskType | 

