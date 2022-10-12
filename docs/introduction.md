---
displayed_sidebar: mainSidebar
sidebar_position: 1
---
# Introduction to Conductor

## What is Conductor?

Conductor is a platform originally developed at Netflix to orchestrate workflows that span across applications or microservices.

* Orchestration Platform for building stateful applications without the overhead of managing a state machine
* Enables development of highly resilient and scalable distributed systems with built-in features that empowers the rapid development of business applications
* Used for a wide range of use cases such as business process automation, data pipelines, CI/CD pipelines, order management workflows, etc.
* Run 100s to millions of workflows per day that scales seamlessly for a wide range of applications
* Conductor is an open-source, **Apache 2.0** licensed workflow orchestration framework
* Build workflows using many popular languages with SDKs

## Conductor Overview

* With conductor - we create orchestration flows called as [Workflows](getting-started/concepts/workflows)
* The Workflow consists of [tasks](getting-started/concepts/tasks-and-workers) and [operators](getting-started/concepts/operators)
* Tasks can be system managed (no-code deployment) or your [custom code](how-tos/Workers/write-workers)
* Tasks are managed by persistent task queues transparent to users
* Custom code tasks can be written in any language and can connect to a workflow using the [client SDKs](how-tos/SDKs)
* Tasks can be run like a programming language, i.e., [sub workflows](docs/reference-docs/sub-workflow-task), step-by-step, [parallel tasks](reference-docs/fork-task), [conditional tasks](reference-docs/switch-task), [dynamic tasks](reference-docs/dynamic-fork-task), etc. [are supported](reference-docs)

<p style={{textAlign: "center"}}><img src="/content/img/anatomy.png" alt="adding a secret via UI" width="600" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## What use cases can Conductor solve?

Conductor is a general-purpose orchestration engine that is language agnostic and has been adopted widely across
multiple industries, ranging from media to security to finance and more. Some common use cases that have been
solved by Conductor are:

1. Supply Chain Management
2. Media Processing Pipelines (Image processing, video transcoding, etc..)
3. Security and Threat Detection Workflows
4. Order Management Workflows
5. Financial Transactions
6. Distributed Transactions
7. Human-centric Business Process Automation
8. Orchestrating Microservices (HTTP,  background services, etc.)
9. Orchestrating Business Logic across various cloud functions (AWS Lambda, GCP functions, etc.)
10. Infrastructure Provisioning
11. CI CD Pipelines
12. Long-running Processes and Workflows
13. Monitoring
14. Distributed Transactions
15. Localization Pipelines
16. Content Management and Publishing Workflows