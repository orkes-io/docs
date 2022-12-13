import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Access Control: Tags

Tags are metadata applied to tasks and workflows which can be used in many different ways. For example, to note what applications use the task/workflow or what application/group has access to the workflow or task.

<p align="center"><img src="/content/img/workflow_with_tags.jpg" alt="screenshot of workflow definition with a tag" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

For access control, tags work identically to [application access control](/content/docs/getting-started/concepts/access-control-applications#application) but with the advantage of visibility in the opposite direction.  With tags, every workflow and task is 'tagged' with metadata, making it easier to determine what access is being provided.


## Adding Tags to Workflow​

There are several ways to add a tag to a workflow. In this section, you can choose between using the API or the Conductor UI for detailed instructions.


<Tabs groupId="view"
        values={[
        {label: 'Conductor UI', value: 'Dashboard'},
        {label: 'API', value: 'API'}
        
    ]}>
  
  <TabItem value="Dashboard">

  ### Conductor UI
To add a tag to a workflow via the Conductor UI, 

1. Navigate to **WORKFLOWS > Definitions** and find the workflow you wish to tag. 
2. In the **Actions** column, click the tag icon.

This will open a pop-up window that allows you to add a new tag. Type a tag name in the **key:value** format and press enter to create new tags. You may also remove tags from the same window by clicking the "X" next to the tag you wish to delete.

<p align="center"><img src="/content/img/edit_tags.jpg" alt="editing tags via the dashboard" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>


  </TabItem>
<TabItem value="API">

### API

To add a tag of the format `key:value` to a workflow using API, use the endpoint `/api/metadata/workflow/{name}/tags` in the [Playground Swagger](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/tags-experimental/addWorkflowTag).

There are two ways to add a tag: a `POST` or a `PUT`.

* `PUT` **replaces** the existing tags with the tags in the payload.

```bash
curl -X PUT "https://play.orkes.io/api/metadata/workflow/marketing_workflow/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```


* `POST` **appends** the existing tags with the tags in the payload.

```bash
curl -X PUT "https://play.orkes.io/api/metadata/workflow/marketing_workflow/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```


The other operators for this endpoint are:

* `GET`: Lists all tags assigned to the workflow.

```bash
curl -X GET "https://play.orkes.io/api/metadata/workflow/marketing_workflow/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
```
gives the response:

```json
[
  {
    "type": "METADATA",
    "key": "org",
    "value": "IT"
  },
  {
    "type": "METADATA",
    "key": "org",
    "value": "sales"
  },
  {
    "type": "METADATA",
    "key": "org",
    "value": "marketing"
  }
]
```

* `DELETE`: Removes the specified tag from the workflow.

```bash
curl -X DELETE "https://play.orkes.io/api/metadata/workflow/marketing_workflow/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```



  </TabItem>
</Tabs>

## Adding Tags to Task​

There are several ways to add a tag to a task. In this section, you can choose between using the API or the Conductor UI for detailed instructions.


<Tabs groupId="view"
        values={[
        {label: 'Conductor UI', value: 'Dashboard'},
        {label: 'API', value: 'API'}
        
    ]}>
  
  <TabItem value="Dashboard">

  ### Conductor UI
To add a tag to a task via the Conductor UI, 
1. Navigate to the **TASKS > Definitions** and find the task you wish to tag. 
2. In the **Actions** column, click the tag icon.

This will open a pop-up window that allows you to add a new tag. Type a tag name in the **key:value** format and press enter to create new tags. You may also remove tags from the same window by clicking the "X" next to the tag you wish to delete.

  </TabItem>
<TabItem value="API">

### API

To add a tag in the format `key:value` to a task using the API, use the endpoint `/api/metadata/task/{taskName}/tags` in the [Playground Swagger](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/tags-experimental/addTaskTag).

There are two ways to add a tag: a `POST` or a `PUT`.

* `PUT` **replaces** the existing tags with the tags in the payload.

```bash
curl -X PUT "https://play.orkes.io/api/metadata/task/marketing_task/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```


* `POST` **appends** the existing tags with the tags in the payload.

```bash
curl -X PUT "https://play.orkes.io/api/metadata/task/marketing_task/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```


The other operators for this endpoint are:

* `GET`: Lists all tags assigned to the workflow.

```bash
curl -X GET "https://play.orkes.io/api/metadata/task/marketing_task/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
```
gives the response:

```json
[
  {
    "type": "METADATA",
    "key": "org",
    "value": "IT"
  },
  {
    "type": "METADATA",
    "key": "org",
    "value": "sales"
  },
  {
    "type": "METADATA",
    "key": "org",
    "value": "marketing"
  }
]
```

* `DELETE`: Removes the specified tag from the workflow.

```bash
curl -X DELETE "https://play.orkes.io/api/metadata/task/marketing_task/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```



  </TabItem>
</Tabs>


## Adding Access Control to Tags


<Tabs groupId="view"
        values={[
        {label: 'Conductor UI', value: 'Dashboard'},
        {label: 'API', value: 'API'}
        
    ]}>
  
  <TabItem value="Dashboard">

There are two ways to provide access to a Workflow on the dashboard:

* Access to a Group of users
* Access via API with Key:secret.

Let's walk through both examples.

### Adding tags to a Group

If you have a group of users:

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/UzUgBmrB4hw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

<p align="center"><img src="/content/img/group-of-users.png" alt="Group of users in Conductor without tags" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

We can add the tag `rings:true` with `EXECUTE` permission to allow those users to run the workflow. Adding `READ` permission will show the workflow in the dashboard for alll users (but they will be unable to edit).

1. From the conductor UI, navigate to **ACCESS CONTROL > Groups** and click on the edit icon near your group name. 
2. From **Workflow and Task Permissions**, click **+Add Permission**.
3. Choose the **Target Type** as Tag, choose **rings:true** tag, and provide EXECUTE & READ permissions.

<p align="center"><img src="/content/img/adding-tags-as-access-control.png" alt="Adding tags as access control in Conductor UI" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

4. Clicking **Add Permission** adds the tag to the Group.

<p align="center"><img src="/content/img/newly-added-tags-to-a-group.png" alt="List showing the newly added tags in the group" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Adding Tags to an Application

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/2h2Hqsw6Wbw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

For the users to access your application via the API, an application key:secret must be assigned.  This can be added for each application and task individually, but to add a large number of workflows and tasks at once to an application, the tag can be used.

By adding the `rings:true` tag to this application, any JWT token generated by the application Key:secret can access the applications with that tag.

<p align="center"><img src="/content/img/tags-added-to-an-application.png" alt="Tags added to an application" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>
  </TabItem>
<TabItem value="API">

Adding permissions via the API uses the same endpoint for adding permissions to a group of users or to an application. The endpoint to use is the `/api/auth/authorization` [endpoint](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/authorization-resource/grantPermissions).

In this example, we would like to add the tag "rings:true" to a GROUP called *marketing_team*. The body of the API call should be:


```json
{
  "subject": {
    "type": "GROUP",
    "id": "marketing_team"
  },
  "target": {
    "type": "TAG",
    "id": "org:marketing"
  },
  "access": [
    "EXECUTE", "READ"
  ]
}
```

To add access via a tag to an application, you can change the SUBJECT.TYPE to USER and the id to app:{id of the application}.  (NOTE: This will likely change to "type":"application" and the "id" just being the application ID.)

```json
{
  "subject": {
    "type": "USER",
    "id": "app:f7d30148-2493-4c71-a326-9409296deb7f"
  },
  "target": {
    "type": "TAG",
    "id": "org:sales"
  },
  "access": [
    "READ","EXECUTE"
  ]
}
```



</TabItem>
</Tabs>
