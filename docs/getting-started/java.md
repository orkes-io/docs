---
sidebar_position: 0
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Java
Creating a Conductor workflow application in Java from scratch.

//TODO: Video
Ensure you have JDK 11 or higher installed on your system.  You will also need access to Conductor server.
### 1. Setup Conductor Server

<Install/>

### 2. Create a new spring-boot application
You can initialize a new spring-boot project using [spring initializer](https://start.spring.io/) or checkout an empty repository we have created from here:
```shell
git clone https://github.com/orkes-io/conductor-java-springboot-init
```
### 3. Add Conductor dependencies
<Tabs>
<TabItem value="Gradle" label="Gradle">

```groovy
    implementation 'io.orkes.conductor:orkes-conductor-client:1.1.12'

    //Jackson dependencies -- required for the tutorial
    implementation "com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.11.4!!"
    implementation "com.fasterxml.jackson.jaxrs:jackson-jaxrs-json-provider:2.11.4!!"
```
</TabItem>
<TabItem value="Maven" label="Maven">

```xml
    <dependency>
      <groupId>io.orkes.conductor</groupId>
      <artifactId>orkes-conductor-client</artifactId>
      <version>1.1.12</version>
    </dependency>

    <!-- Jackson dependencies -- required for the tutorial -->
    <dependency>
      <groupId>com.fasterxml.jackson.datatype</groupId>
      <artifactId>jackson-datatype-jsr310</artifactId>
      <version>2.11.4</version>
      <type>bundle</type>
    </dependency>

    <dependency>
      <groupId>com.fasterxml.jackson.jaxrs</groupId>
      <artifactId>jackson-jaxrs-json-provider</artifactId>
      <version>2.11.4</version>
      <type>bundle</type>
    </dependency>

```
</TabItem>
</Tabs>

### 4. Create a workflow
We will create a simple workflow for user notification with mock worker code.

<div style={{width:"30%"}}>

![Conductor Workflow](/img/simple_wf.png)

</div>

The workflow can be created using JSON or code. We will explore both options in this tutorial. 

First you need to add the workflow definitions to your project with the JSON file or Java code.

<details><summary>Workflow JSON - IF using JSON to create workflow</summary>
<p>

Create a file named workflow.json inside **src/main/resources** folder and paste the following:

```json title="workflow.json"
{
  "name": "user_notification",
  "version": 1,
  "tasks": [
    {
      "name": "get_user_info",
      "taskReferenceName": "get_user_info",
      "inputParameters": {
        "userId": "${workflow.input.userId}"
      },
      "type": "SIMPLE"
    },
    {
      "name": "emailorsms",
      "taskReferenceName": "emailorsms",
      "inputParameters": {
        "switchCaseValue": "${workflow.input.notificationPref}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "EMAIL": [
          {
            "name": "send_email",
            "taskReferenceName": "send_email",
            "inputParameters": {
              "email": "${get_user_info.output.email}"
            },
            "type": "SIMPLE"
          }
        ],
        "SMS": [
          {
            "name": "send_sms",
            "taskReferenceName": "send_sms",
            "inputParameters": {
              "phoneNumber": "${get_user_info.output.phoneNumber}"
            },
            "type": "SIMPLE"
          }
        ]
      },
      "defaultCase": [],
      "evaluatorType": "value-param",
      "expression": "switchCaseValue"
    }
  ],
  "inputParameters": [
    "userId",
    "notificationPref"
  ],
  "outputParameters": {},
  "schemaVersion": 2

}
```
</p>

</details>
<details><summary>Workflow Code - IF using code to create workflow</summary>
<p>

Create a new Class **Workflow** with the following inside a method. See <a href="workflow.java">Workflow.java</a> for the complete example:

```java title="Workflow.java"

import com.netflix.conductor.sdk.workflow.def.ConductorWorkflow;
import com.netflix.conductor.sdk.workflow.def.tasks.SimpleTask;
import com.netflix.conductor.sdk.workflow.def.tasks.Switch;
import com.netflix.conductor.sdk.workflow.executor.WorkflowExecutor;

public class Workflow {

    private final WorkflowExecutor executor;

    public Workflow(WorkflowExecutor executor) {
        this.executor = executor;
    }

    public ConductorWorkflow<WorkflowInput> createWorkflow() {
        ConductorWorkflow<WorkflowInput> workflow = new ConductorWorkflow<>(executor);
        workflow.setName("user_notification");
        workflow.setVersion(1);

        SimpleTask getUserDetails = new SimpleTask("get_user_info", "get_user_info");
        getUserDetails.input("userId", "${workflow.input.userId}");

        SimpleTask sendEmail = new SimpleTask("send_email", "send_email");
        // get user details user info, which contains the email field
        sendEmail.input("email", "${get_user_info.output.email}");

        SimpleTask sendSMS = new SimpleTask("send_sms", "send_sms");
        // get user details user info, which contains the phone Number field
        sendSMS.input("phoneNumber", "${get_user_info.output.phoneNumber}");

        Switch emailOrSMS = new Switch("emailorsms", "${workflow.input.notificationPref}")
                .switchCase(WorkflowInput.NotificationPreference.EMAIL.name(), sendEmail)
                .switchCase(WorkflowInput.NotificationPreference.SMS.name(), sendSMS);

        workflow.add(getUserDetails);
        workflow.add(emailOrSMS);

        return workflow;

    }
}

```
</p>
</details>


### 5. Write workers
:::tip Running Workers
In this tutorial, we are running all three workers in the same application. This is not as required as in a typical production environment, where the workers will run in their own deployments (k8s, VMs, or micro-service).
Deploying workers individually helps scale them depending on the workload.
:::

<details><summary>Worker implementation using annotations to convert methods to a Conductor worker</summary>
<p>
Create Worker.java and add the following:

```java title="Workers.java"
import com.netflix.conductor.sdk.workflow.task.InputParam;
import com.netflix.conductor.sdk.workflow.task.WorkerTask;

public class ConductorWorkers {

    @WorkerTask("get_user_info")
    public UserInfo getUserInfo(@InputParam("userId") String userId) {
        UserInfo userInfo =  new UserInfo("User X", userId);
        userInfo.setEmail(userId + "@example.com");
        userInfo.setPhoneNumber("555-555-5555");
        return userInfo;
    }

    @WorkerTask("send_email")
    public void sendEmail(@InputParam("email") String email) {
        System.out.println("Sending email to " + email);
    }

    @WorkerTask("send_sms")
    public void sendSMS(@InputParam("phoneNumber") String phoneNumber) {
        System.out.println("Sending sms to " + phoneNumber);
    }
}

```
</p></details>

<details><summary>UserInfo POJO, used by the worker</summary>
<p>
Create UserInfo.java and add the following:

```java
public class UserInfo {

    private String name;

    private String id;

    private String email;

    private String phoneNumber;

    public UserInfo() {}

    public UserInfo(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
```
</p>
</details>


### 6. Execute workflow and workers

<details><summary>Main Driver Class</summary>
<p>

Create a new Class **Main** with the following inside a method.
See <a href="Main.java">Main.java</a> for the complete example:

```java title="Main.java"

import com.google.common.util.concurrent.Uninterruptibles;
import com.netflix.conductor.common.config.ObjectMapperProvider;
import com.netflix.conductor.common.metadata.workflow.StartWorkflowRequest;
import com.netflix.conductor.common.metadata.workflow.WorkflowDef;
import com.netflix.conductor.sdk.workflow.executor.WorkflowExecutor;
import io.orkes.conductor.client.ApiClient;
import io.orkes.conductor.client.MetadataClient;
import io.orkes.conductor.client.OrkesClients;
import io.orkes.conductor.client.WorkflowClient;
import io.orkes.samples.quickstart.workers.ConductorWorkers;
import org.apache.commons.lang3.StringUtils;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) throws Exception {

        //ApiClient used to communicate to the Conductor Server
        ApiClient apiClient = getApiClient();

        OrkesClients orkesClients = new OrkesClients(apiClient);
        WorkflowClient workflowClient = orkesClients.getWorkflowClient();
        MetadataClient metadataClient = orkesClients.getMetadataClient();

        WorkflowExecutor workflowExecutor = new WorkflowExecutor(orkesClients.getTaskClient(),
                workflowClient, orkesClients.getMetadataClient(), 10);

        //Start the workers
        workflowExecutor.initWorkers(ConductorWorkers.class.getPackageName());
        String workflowName = "user_notification";
        Integer workflowVersion = 1;

        //=================== IMPORTANT ===================//
        /*TODO: Uncomment the following lines IF you are creating workflow using code */
        //=================== IMPORTANT ===================//
        /*
        UserNotificationWorkflow notificationWorkflow = new UserNotificationWorkflow(workflowExecutor);
        ConductorWorkflow<WorkflowInput> conductorWorkflow = notificationWorkflow.createWorkflow();
        workflowName = conductorWorkflow.getName();
        workflowVersion = conductorWorkflow.getVersion();
        conductorWorkflow.registerWorkflow(true);
        */


        //=================== IMPORTANT ===================//
        /*TODO: Uncomment the following lines IF you are creating workflow using JSON */
        //=================== IMPORTANT ===================//
        /*
        //Read the workflow definition from the file
        InputStream is = Main.class.getResourceAsStream("/workflow.json");
        //Register the workflow on the server
        metadataClient.registerWorkflowDef(new ObjectMapperProvider().getObjectMapper().readValue(new InputStreamReader(is), WorkflowDef.class));
        */

        StartWorkflowRequest startWorkflowReq = new StartWorkflowRequest()
                .withName(workflowName)
                .withVersion(workflowVersion)
                .withInput(Map.of("userId", "userA"));

        String workflowId = workflowClient.startWorkflow(startWorkflowReq);
        String url = getExecutionURL(apiClient, workflowId);

        //Give a couple of seconds for workers to poll and complete the workflow
        Uninterruptibles.sleepUninterruptibly(2, TimeUnit.SECONDS);

        System.out.println();
        System.out.println("=======================================================================================");
        System.out.println("UserNotificationWorkflow Execution Completed");
        System.out.println("UserNotificationWorkflow Id: " + workflowId);
        System.out.println("UserNotificationWorkflow Execution Flow UI: " + url);
        System.out.println("=======================================================================================");

        //Exit
        System.exit(0);

    }

    private static ApiClient getApiClient() {
        String key = System.getenv("KEY");
        String secret = System.getenv("SECRET");
        String conductorServer = System.getenv("CONDUCTOR_SERVER_URL");
        ApiClient apiClient;
        if (conductorServer == null) {
            conductorServer = "http://localhost:8080/api";
        }
        if (StringUtils.isNotBlank(key)) {
            apiClient = new ApiClient(conductorServer, key, secret);
        } else {
            apiClient = new ApiClient(conductorServer);
        }

        return apiClient;
    }

    private static String getExecutionURL(ApiClient apiClient, String workflowId) {
        if(apiClient.getHost().equals("localhost")) {
            return "http://localhost:5000/execution/" + workflowId;
        }
        return apiClient.getBasePath().replaceAll("api", "execution") + "/" + workflowId;
    }

}

```
</p>
</details>

:::tip Creating workflows
Workflows can be created from Conductor UI using drag-and-drop method, in Code, or JSON, depending on your development preferences.

Visit [Conductor Playground](https://play.orkes.io/) and check out the workflow design and try to create the same workflow using UI!
:::

#### Executing Workers
The following line in the code scans the source file for any workers using annotations and automatically initializes them.
```java
workflowExecutor.initWorkers(ConductorWorkers.class.getPackageName());
```

#### Worker SDK

Alternatively, you can also create workers using `Worker` interface that gives more control over the worker initialization with control over polling interval, thread count etc.

See [Task Worker SDK](/docs/worker) for more details.
