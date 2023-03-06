---
sidebar_position: 6
---
# Using Secrets in Conductor

You may often be required to use sensitive values that shouldn’t be exposed, like usernames, passwords, API keys, authorization tokens, etc. Using such values directly in the workflow can end up with your private keys being opened up to vulnerabilities. 
<br/>
With Conductor, you can save these values as Secrets and then use them in your workflow without exposing the actual values. 

## Creating Secrets

Follow the below steps to create and store secrets in Conductor:
<br/>

1. From your Orkes Console, navigate to the **Secrets** option from the left menu. The *Secrets* page lists all the secrets associated with your account.
2. Click **Add Secrets** and provide the following values:<ul><li>**Secret Name** - Provide a name to store your secret.</li><li>**Secret Value** - Copy and paste the required value to be stored as secret.</li></ul>
3. Clicking **Add** saves the secret to your Conductor console.

## Using Secrets in Workflow

Once the secret is created, you can use them in the workflow using the variable **${workflow.secrets.secret_name}**.

## Viewing Secrets
Once you have created your secret, click on the eye icon next to the secret name to view the secret key. 

## Editing Secrets
Click the pencil icon next to the secret name to edit and replace the secret key. 

## Deleting Secrets
Click the trash icon next to the secret name to delete redundant keys. 

## Adding Tags to Secrets
Conductor also provides the provision to add tags to secret keys. This helps in quickly sharing the secret to a group/application.

### Enabling Permissions for Secrets via Groups

If a secret is to be shared among a User Group in Conductor, 
<br/>

1. Add the required tag in the format **key:value** to the secret. 
2. Navigate to **ACCESS CONTROL** > **Groups** and click the edit icon near your group name.
3. From the **Workflow and Task Permissions** section, click **+Add Permission**.
4. Choose the **Target Type** as **Tag**, and choose your tag with the required permissions. You can select from READ, UPDATE, CREATE, EXECUTE & DELETE permissions.
5. Clicking **Add Permissions** adds the tag to the group, thus enabling permission to all group members.

### Enabling Permissions for Secrets via Applications

If a workflow uses a Secret, we need to add access control permissions for the application to access the secret.
<br/>

1. Add the required tag in the format **key:value** to the secret. 
2. Navigate to **ACCESS CONTROL > Applications** and click the edit icon near your app name.
3. Scroll down to the **Workflow and Task Permissions** section, and click **+Add Permission**.
4. Choose the **Target Type** as **Tag**, and choose your tag with the required permissions. You can select from READ, UPDATE, CREATE, EXECUTE & DELETE permissions.
5. Clicking **Add Permissions** adds the tag to the group, thus enabling permission to the application.

## Example​

The US Postal Service offers APIs to help automate the shipping process with the post office. Each API call requires a **UserID** to be submitted. This **UserID** can be used to buy postage, so it needs to be kept secure. We've created a secret called **post_office_username** that can be used in all API calls.
<br/>
Here’s a snippet from the workflow that references this secret:

```json
USERID=${workflow.secrets.post_office_username}
```

Using **${workflow.secrets.post_office_username}**, the sensitive value is hidden and never appears in the workflow execution or any output files of Conductor. Yet, we can connect with the USPS and obtain the postage price for our package.