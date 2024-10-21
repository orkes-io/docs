
# Document Approval Workflow

It’s a common practice in any industry that all internal and external deliverables must go through a sequential review process. A typical document process goes through various stages:

* Sent for review
* Reviewer accepts/rejects the approval
* If rejected, the document is sent back for changes
* The revised document is submitted again for approval
* Approved doc is published

A document can go through several levels of review based on the document type. This guide details the use case in which the Conductor can be utilized to streamline the approval process by creating workflows.

## Sample Workflow for approving/rejecting documents


| [See the workflow in Orkes Developer Edition](https://developers.orkes.cloud/workflowDef/document_approval_test) |
|--------------------------------------------------------------------------------------------------|

You can get the JSON file for the sample workflow detailed [here](https://github.com/conductor-sdk/conductor-examples/blob/main/document_approvals/review_approval.json).

:::note
This workflow does not have workers and is for visualization purposes only.
:::

![review cycle diagram](https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/document_approvals/images/review_cycle.png)

In this workflow, Review 1.a, Review 2 & Review 3 can reject the document and send it back for editing. Each rejection appears to add a loop into the workflow. Since all Conductor workflows are [Directed Acyclic Graphs](https://orkes.io/content/docs/reference-docs/directed-acyclic-graph), it seems this might violate the basic nature of a Conductor workflow. However, Conductor has a workaround that allows for loops that we feature in the _Review Approval_ workflow. Conductor's [DO/WHILE](https://orkes.io/content/docs/reference-docs/do-while-task) task allows for iteration of the same tasks multiple times (and to ensure the _directed_ nature of the graph, each iteration of the task is appended with `__x` (where x is the iteration count).

<p align="center"><img src="/content/img/document-approval-workflow.jpg" alt="Document Approval Workflow" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

1. The workflow starts with uploading the document. The upload process is done using the task **upload_schema**.
2. Next is the Review1 process, split into two forks, **Review 1.a** & **Review 1.b**, using the **fork_join** task. Both these forks can run asynchronously and get joined using the join task **review_join**.
3. If it passes the **Review1Check**, the workflow moves to **Review2** through the switch case **YES**. Otherwise, it loops back to being uploaded again through the switch case **LOOP**. 
4. Once it passes **Review1Check**, Reviewer 2 does the review. It is evaluated using the switch task **Review2Check**. If it passes this check, the document can either go to completion, to a third reviewer, or like a long case in “Snakes and Ladders”, the document goes back to the beginning.
5. If the document is approved after the 2nd review, the switch task proceeds with the **YES** case, and the review is completed using the **CompleteReview_1** task. On the other hand, if the document requires a third review, it proceeds with the **Review3Check**, and either gets completed using the **YES** case or is looped back using the **default** case.
6. If none of the cases matches after the **Review2Check**, the document gets looped back using the **default** case, and the workflow loops until it is completed.