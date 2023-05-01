# What is Workflow Versioning in Conductor?

Workflow versioning is the ability to manage different versions of a workflow. This feature allows you to make changes to a workflow without affecting the existing version of the workflow that is already running or scheduled to run.

By default, the workflow version is set to 1. 

```json
{
 "name": "NewWorkflow",
 "description": "Sample Description",
 "version": 1,
 "tasks": [//list of tasks ],
 "schemaVersion": 2,
}
```

## Why is workflow versioning important?

Workflow versioning is vital because it allows you to change a workflow without disrupting any ongoing or scheduled workflow executions. This is particularly useful when you want to make changes to a workflow that has already been deployed in a production environment.

## How do I create a new version of a workflow?

To create a new version of a workflow, you can make changes to your existing workflow and then save those changes by updating the version number.

## How do I view previous versions of a workflow in Conductor?

You can view previous versions of a workflow from the Workflow Definitions page. 

1. Navigate to **Workflow > Definitions**.
2. Click the required workflow.
3. You can choose the workflow version to view your definition.

<p align="center"><img src="/content/img/workflow-versioning.png" alt="Viewing different workflow versions in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Can we remove a version if not required?

Yes, you can delete the workflow version directly from the workflow definitions page by selecting the version you want to delete and then clicking the **Delete** button. 

<p align="center"><img src="/content/img/deleting-versions-in-workflow.png" alt="Deleting different workflow versions in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## How do I run different workflow versions?

While running the workflow from UI, you can choose the required version from the dropdown available. If a version is not chosen, the latest version runs by default.

<p align="center"><img src="/content/img/running-different-workflow-versions.png" alt="Running different workflow versions in Conductor" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>