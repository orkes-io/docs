import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Access Control: Tags


## Introduction
Tags are metadata that are applied to tasks and workflows. They can be used in many different ways - to note what applications use the task or workflow, or in the case of this article, what application/group has access to the workflow or task.

<p align="center"><img src="/content/img/workflow_with_tags.jpg" alt="screenshot of workflow definition with a tag" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

For access control, tags work in an identical manner to [application access control](/content/docs/getting-started/concepts/access-control-applications#application), but with the advantage of visibility in the opposite direction.  With tags, every workflow and task is 'tagged' with metadata, making it easier to determine what access is being provided.


## Adding a Tag to a Workflow

There are several ways to add a tag to a workflow. In this section, choose between using the API or the Conductor UI for detailed instructions on both options.


<Tabs groupId="view"
        values={[
        {label: 'Conductor UI', value: 'Dashboard'},
        {label: 'API', value: 'API'}
        
    ]}>
  
  <TabItem value="Dashboard">

  ### Conductor UI
To add a tag to a workflow via the dasboard, navigate to the `Workflow Definitions` page, and find the workflow you wish to tag.  In the `Actions` Column, click the tag icon.

This will open a dialogue window that allows you to add a new tag. Type the key:value and press enter to add the workflow.  

You may also remove tags using the same window by clicking the "X" next to the tag you wish to delete.

<p align="center"><img src="/content/img/edit_tags.jpg" alt="editing tags via the dashboard" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>


  </TabItem>
<TabItem value="API">

### API

To add a tag `key:value` to a workflow, use the endpoint `/api/metadata/workflow/{name}/tags`. Here is the link to the [Playground Swagger](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/tags-experimental/addWorkflowTag).

There are two ways to add a tag, using a `POST` or a `PUT`.

* `PUT` **replaces** the existing tags with the tags in the payload:

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

* `GET`: lists all of the tags assigned to the workflow.

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

* `DELETE`: removes the specified tag from the workflow.

```bash
curl -X DELETE "https://play.orkes.io/api/metadata/workflow/marketing_workflow/tags" \
-H  "accept: */*" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "[{\"type\":\"METADATA\",\"key\":\"org\",\"value\":\"marketing\"}]"
```



  </TabItem>
</Tabs>

## Adding Access Control to a tag


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

<p align="center"><img src="/content/img/group_withouttag.jpg" alt="a group missing the rings:true tag" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

We can add the tag `rings:true`, and with `EXECUTE` permission to allow those users to run the workflow. Adding `READ` permission will show the workflow in the dashboard for all of the users (but they will be unable to edit).


<p align="center"><img src="/content/img/group_addingpermission.jpg" alt="adding the tag permissions" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Clicking OK adds the tag to the Group.

<p align="center"><img src="/content/img/group_withtag.jpg" alt="a group with the rings:true tag" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### Adding Tags to an Application

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/2h2Hqsw6Wbw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

In order for users to access your application via the API, an application key:secret must be assigned.  This can be added for each application and task individually, but to add a large number of workflows and tasks at once to an application, the tag can be used

By adding the `rings:true` tag to this application, any JWT token generated by the application Key:secret can access the applications with that tag.

<p align="center"><img src="/content/img/application_withtag.jpg" alt="an application with the rings:true tag" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>
  </TabItem>
<TabItem value="API">

Adding permissions via the API uses the same endpoint for adding permissions to a Group of users or to an application. The endpoint to use is the `/api/auth/authorization` [endpoint](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/authorization-resource/grantPermissions).

In this example, we would like to add the TAG "rings:true" to a GROUP called `doug_testing`. The BODY of the API call should be:


```JSON
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

To add access via a TAG to an application, WE chang ethe SUBJECT.TYPE to USER and the id to app:{id of the application}.  (NOTE: this will likely chnage  to "type":"application" and the "id" just being the application ID.)

```
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
