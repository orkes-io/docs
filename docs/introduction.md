---
displayed_sidebar: mainSidebar
sidebar_position: 1
---
# Introduction to Conductor

## What is Conductor?

Conductor is a platform originally developed at Netflix to orchestrate workflows that span across applications or microservices.

* Orchestration Platform for building stateful applications without the overhead of managing a state machine
* Enables development of highly resilient and scalable distributed systems with built-in features that empower rapid development of business applications
* Used for a wide range of use cases such as - business process automations, data pipelines, CI/CD pipelines, order management workflows etc.
* Run 100s to millions of workflows per day - scales seamlessly for a wide range of applications
* Conductor is an open-source, **Apache 2.0** licensed workflow orchestration framework
* Build workflows using many popular languages with SDKs

## Conductor Overview

* With conductor - we create orchestration flows called as [Workflows](getting-started/concepts/workflows)
* Workflow consists of [tasks](getting-started/concepts/tasks-and-workers) and [operators](getting-started/concepts/operators)
* Tasks can be System managed (no-code deployment) or your [custom code](how-tos/Workers/write-workers)
* Tasks are managed by persistent task queues transparent to users
* Custom code tasks can be written in any language and can connect to a workflow using the [client SDKs](how-tos/SDKs)
* Tasks can be run like a programming language - [sub workflows](docs/reference-docs/sub-workflow-task), step-by-step, [parallel tasks](reference-docs/fork-task), [conditional tasks](reference-docs/switch-task), [dynamic tasks](reference-docs/dynamic-fork-task) etc. [are supported](reference-docs)

<p style={{textAlign: "center"}}><img src="/content/img/anatomy.png" alt="adding a secret via UI" width="600" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## What use cases can Conductor solve?

Conductor is a general-purpose orchestration engine that is language agnostic and has been adopted widely across
multiple industries, ranging from Media to security to finance and more. Some common use cases that have been
solved by Conductor are:

1. Supply chain management
2. Media Processing Pipelines (Image Processing, Video Transcoding, etc..)
3. Security and Threat detection workflows
4. Order Management workflows
5. Financial transactions
6. Distributed Transactions
7. Human-centric business process automation
8. Orchestrating Microservices (HTTP,  background services, etc.)
9. Orchestrating business logic across various cloud functions (AWS Lambda, GCP functions, etc.)
10. Infrastructure Provisioning
11. CI CD Pipelines
12. Long-running processes and workflows
13. Monitoring
14. Distributed Transactions
15. Localization Pipelines
16. Content Management and Publishing Workflows