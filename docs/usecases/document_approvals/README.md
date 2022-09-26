
# Document Approvals

Document approval workflows are a common practice in many industries.  A document is created, and the gets reviewed by several parties before it is released. Ideally, every document moves ahead through the process - but inevitably, a document will be rejected by a reviewer and require editing before the review process can continue. In the diagram below, Review 1a, 2 and 3 can reject the document and send it back for editing:

## [Document Approval](https://github.com/conductor-sdk/conductor-examples/blob/main/document_approvals/review_approval.json)


|[See the workflow in Orkes Playground](https://play.orkes.io/workflowDef/document_approval_test)|
|---|

:::note
This workflow does not have workers, and thus is for visualization purposes only.
:::

![review cycle diagram](https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/document_approvals/images/review_cycle.png)

Looking at this flow, a rejection appears to add a loop into the workflow.  Since all Conductor workflows are [Directed Acyclic Graphs](https://orkes.io/content/docs/reference-docs/directed-acyclic-graph), it seems this might violate the basic nature of a Conductor workflow.

There is a workaround in Conductor that allows for loops that we feature in the _Review Approval_ workflow. Conductor's [DO/WHILE](https://orkes.io/content/docs/reference-docs/do-while-task) task allows for iteration of the same tasks multiple times (and to ensure the _directed_ nature of the graph, each iteration of the task is numbered with `__x` (where x is the iteration count).

![review cycle workflow](https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/document_approvals/images/approval_workflow.jpg)

1. Document is uploaded
2. Review 1a & 1b can be run asynchronously. If it passes: Review 2, otherwise, it loops back to being uploaded again.
3. Reviewer 2 does their review.  If it passes - the document can either go to completion, to a third review - or like a long snake in "Snakes and Ladders" the document goes back to the start.



