---
sidebar_position: 9
slug: "/reference-docs/system-tasks/update-secret"
description: "The Update Secret task is used to update the value of any secret."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Secret

The Update Secret task is used to update the value of any secret, provided that the user has permission to update the secret. 

The update secret task updates a secret based on provided parameters. It requires a **secretKey** and **secretValue**. If the user does not have update permission for the specified **secretKey**, the workflow will terminate with a 403 error. 


## Task parameters 

Configure these parameters for the Update Secret task.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| inputparameters.**_secrets** | A nested object within `inputParameters` containing the `secretKey` and `secretValue` fields. | Required. | 
| inputparameters.**_secrets.secretKey** | The name of the secret key to be updated. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. | 
| inputparameters.**_secrets.secretValue** | The new value for the secret key. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. | 

## Task configuration

This is the task configuration for an Update Secret task.

```json
{
 "name": "update_secret_task",
 "taskReferenceName": "update_secret_task_ref",
 "type": "UPDATE_SECRET",
 "inputParameters": {
   "_secrets": {
     "secretKey" : "secret_key_name",
     "secretValue" : "updated_secret_value"
   }
 }
}
```

## Task output

During execution, the secret is replaced with whatever value is passed. If the secret does not exist, it will be created with the provided secret value. 

## Adding an Update Secret task in UI

**To add an Update Secret task:**

1. In your workflow, select the (**+**) icon and add a **Update Secret** task.
2. In **Secret key**, enter the secret name to be updated.
3. In **Secret value**, enter the new value for the secret.

<center><p><img src="/content/img/update-secret-ui-guide.png" alt="Adding Update Secret task" width="80%" height="auto"/></p></center>

## Examples

Here are some examples for using the Update Secret task.

<details><summary>Using Update Secret task in a workflow</summary>
<p>

To demonstrate the Update Secret task, consider the following secret already saved.

<center><p><img src="/content/img/saved-secret.png" alt="Saved secret in Orkes Conductor" width="80%" height="auto"/></p></center>

Let’s update this secret with the following workflow containing an update secret task.

```json
//workflow definition

{
 "name": "update_secret_task",
 "taskReferenceName": "update_secret_task_ref",
 "type": "UPDATE_SECRET",
 "inputParameters": {
   "_secrets": {
     "secretKey" : "my_token",
     "secretValue" : "abcd"
   }
 }
}
```

In this example, we will update the value of a secret key named **my_token** to a new value **abcd**.

Now, run the workflow. Once the execution is successful, navigate to the **Definitions > Secrets** tab, search for the secret name, and click the eye icon to verify the updated secret value.

<center><p><img src="/content/img/updated-secret.png" alt="Updated secret in Orkes Conductor using update secret task" width="80%" height="auto"/></p></center>

</p>
</details>