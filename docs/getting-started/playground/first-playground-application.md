# Creating your First Conductor Workflow in the Playground

With our playground, building and testing applications is easy!  Walk through this tutorial to see how easy it is to get started with application development in our playground.

We'll closely follow the [Building your First Workflow](../run/running-first-workflow) tutorial.  The code for the worker can be found on [Github](https://github.com/orkes-io/orkesworkers).

In the tutorial, there is some setup to get your AWS S3 account provisioned with the upload_toS3.java.  If you have not previously run the [Building your First Workflow](../run/running-first-workflow) tutorial, please read that section to correctly provision your S3 account.

## Sign up

Create an account at [Orkes Playground](https://play.orkes.io) with your Google account or email account.  You'll be redirected into the playground.

## Workflow definition

To define a workflow in Orkes Playground, click ```Workflow Definitions``` from the left nav, and click the ```Define Workflow``` button.

```
{
  "updateTime": 1645804152106,
  "name": "image_convert_resize",
  "description": "Image Processing Workflow",
  "version": 1,
  "tasks": [
    {
      "name": "image_convert_resize",
      "taskReferenceName": "image_convert_resize_ref",
      "inputParameters": {
        "fileLocation": "${workflow.input.fileLocation}",
        "outputFormat": "${workflow.input.recipeParameters.outputFormat}",
        "outputWidth": "${workflow.input.recipeParameters.outputSize.width}",
        "outputHeight": "${workflow.input.recipeParameters.outputSize.height}"
      },
      "type": "SIMPLE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    },
    {
      "name": "upload_toS3",
      "taskReferenceName": "upload_toS3_ref",
      "inputParameters": {
        "fileLocation": "${image_convert_resize_ref.output.fileLocation}"
      },
      "type": "SIMPLE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }
  ],
  "inputParameters": [],
  "outputParameters": {
    "fileLocation": "${upload_toS3_ref.output.fileLocation}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": true,
  "ownerEmail": "devrel@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}
```


Since this workflow is already created, we'll just copy/paste the JSON from the tutorial into the field and press save.  This will generate the workflow, and create the diagram:

![created workflow](/img/playground-define-workflow.png)

This workflow will now appear in the ```Workflow Definitions``` table.

## Task Definition

Investigating the workflow shows that there are 2 ```SIMPLE``` tasks that will require definition: ```image_convert_resize``` and ```upload_toS3```.

Under ```Task Definitions``` press the ```Define Task``` and paste in each JSON file, one at a time.

*image_convert_resize*
```
  {
  "name": "image_convert_resize",
  "retryCount": 3,
  "timeoutSeconds": 30,
  "pollTimeoutSeconds": 30,
  "inputKeys": [
    "fileLocation",
    "outputFormat",
    "outputWidth",
    "outputHeight"
  ],
  "outputKeys": [
    "outputLocation"
  ],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 30,
  "responseTimeoutSeconds": 30,
  "concurrentExecLimit": 100,
  "rateLimitFrequencyInSeconds": 30,
  "rateLimitPerFrequency": 50,

  "ownerEmail": "devrel@orkes.io"
}
```

*upload_toS3*
```
{
"name": "upload_toS3",
"retryCount": 3,"timeoutSeconds": 30,
"pollTimeoutSeconds": 30,
"inputKeys": [
  "fileLocation"
],
"outputKeys": [
  "s3Url"
],
"timeoutPolicy": "TIME_OUT_WF",
"retryLogic": "FIXED",
"retryDelaySeconds": 30,
"responseTimeoutSeconds": 30,
"concurrentExecLimit": 100,
"rateLimitFrequencyInSeconds": 30,
"rateLimitPerFrequency": 50,
"ownerEmail": "devrel@orkes.io"
}
```

Once you have added these two tasks, they should appear in your ```Task Definitions``` table and in the ```Task Queues``` dropdown.


## Applications

In the open source Conductor, you'd now create your worker, and have it poll the tasks in your Conductor instance.  However, the playground is a multi-tenant server, and security measures must be put in place to ensure that workflows can only interact with the workers that have permission to be run.  To do this, we add a layer of security on all workflows that run in the playground.

## Setting up your application

Click ```Applications``` in the left navigation bar.  This will take you to your application list (which is probably empty.)  Click ```Create Application``` and name your application to begin.  

Click the edit *pencil* next to your new application.  There are now two tables:

* Access Keys
* Workflows and Tasks Permissions

### Access Keys

When you create an access key - a key ID and Secret will be created:

![secrets](/img/playground-app-key.png)

These should be kept securely (i.e. do not display them in tutorial screenshots).

### Workflow and Task Permissions

Each workflow and task in this application must be given ```EXECUTE``` permission to run the workflow.  In the 2nd table on the Applications page, add each workflow and task:

![permissions](/img/playground-permissions.png)

We've now created everything in the Playground that our Worker will need to connect.  The next step is to connect up the worker.

## Worker

With your key and secret, you can generate a JWT token.  This can be done via curl (with the token response shown):

```
curl -s -X "POST" "https://play.orkes.io/api/token"    -H 'Content-Type: application/json; charset=utf-8'    -d '{
 "keyId": "<key>",
 "keySecret": "<secret>"
}'
{"token":"eyJhbGciOiJIUzUxMiJ9.eyJvcmtlc19rZXkiOiJhZWQ0YWFmZi0wZDYyLTRlYTEtOTdlNS04YjBkZDA1MzlmMzMiLCJvcmtlc19jb25kdWN0b3JfdG9rZW4iOnRydWUsInN1YiI6ImFwcDo1OGExMmRjYi1jMmEyLTQ3MDAtYmJjNS1jZDY1YjA3WWI0NDEiLCJpYXQiOjE2NDU4MjIzOTY1Njd9.yDVwu2Y2j111vUwNwbxCOFKn16AUlDXG8-e4oD6wA8QSBbQF38KJhbFiK2IFc4t_DeTi9jKjydKOKKkyw5LqJQ"}

```

We now need to add this JWT token into all polling headers that hit the Playground server.

In the Orkesworkers repository, ```resources/application.properties``` ensure you have these two lines:


```
conductor.server.url=https://play.orkes.io/api/
conductor.server.auth.token=<your token>
```

In the ```OrkesWorkersApplication.java```, there is a polling mechanism.  We've added code to insert the token as the AUTHORIZATION header:

```
<snip>

 String token = env.getProperty("conductor.server.auth.token");
  
        
        //start of added code - see also lines 30 & 48

        ClientFilter filter = new ClientFilter() {
            @Override
            public ClientResponse handle(ClientRequest request) throws ClientHandlerException {
                try {
                    request.getHeaders().add(AUTHORIZATION_HEADER, token);
                    return getNext().handle(request);
                } catch (ClientHandlerException e) {
                    e.printStackTrace();
                    throw e;
                }
            }
        };
        TaskClient taskClient = new TaskClient(new DefaultClientConfig(), (ClientHandler) null, filter);
</snip>
```

Now, when you run this application, it will poll the task queue at ```play.orkes.io.``` for these two tasks. (You'll probably see a lot of errors in the console, as the other workers are not provisioned on the playground.  To emliminate these errors, you can remove the other workers from ```orkesworkers/src/main/java/io/orkes/samples/workers/```).

## Running your Worker

Now that you've defined the workflow and tasks and created the authetication Application for your workers, we're ready to test your workflow. Click the ```Run Workflow``` in the left nav:

* select ```image_convert_resize``` as your Workflow
* Input:  

```
{
	"fileLocation": "https://user-images.githubusercontent.com/1514288/155636237-caa91ec9-e19f-4ab0-aa65-106e09b381b0.png",
	"recipeParameters":{
		"outputSize": 
		{
			"width":300,
			
		},
		outputFormat:"jpg"
	}
}
```
and press ```Run Workflow```.  You'll get a workflowId. Click the ID, and you can track the progress of your workflow.

![completed workflow](/img/playground-workflow-completed.png)




Your output JSON should include a file location of a resized image:

![resized image](https://image-processing-sandbox.s3.amazonaws.com/f1b4314d-f72b-4060-8758-d07b17bbc552.jpg)


## Conclustion

You've completed your first Conductor workflow in Orkes Playground!  Build your own, workflows and see how Condutor's workflow engine makes building orchetration pipelines easy!

If you have any [feedback](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g) - please pass it on. We want to make the Orkes Cloud Conductor the best tool for you and your development team!