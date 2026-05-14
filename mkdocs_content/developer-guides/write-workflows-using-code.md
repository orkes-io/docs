---
title: "Write Workflows Using Code"
description: "Learn how to write workflows as code using Orkes Conductor SDKs to define tasks, create dynamic workflows, and register them programmatically."
canonical_route: "developer-guides/write-workflows-using-code"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Write Workflows Using Code

You can define Conductor workflows in code when the workflow definition should be generated, versioned, tested, or registered from the same codebase as the application that owns it. The workflow still runs on Conductor's durable execution engine, while custom business logic runs in worker code written in your preferred language.

Use workflow-as-code when you need:

- Dynamic workflow definitions assembled from application configuration or templates.
- Code review, tests, and CI/CD around workflow definitions before registration.
- A typed way to compose branches, loops, worker tasks, and system tasks.
- Clear separation between orchestration logic and task implementation.

!!! tip "5-minute path"
    Define the workflow in your SDK, register it with Conductor, start an execution, then implement any custom task as a [worker](/content/developer-guides/using-workers). Workflow code describes the graph; worker code performs the business logic.

## Create workflows in code

The workflow in the following examples performs these steps:

1. **Get user details**: Retrieves the user information based on the `userId` provided as the workflow input.
2. **Determine notification type**: Uses a Switch task to check the preferred notification method from the input and determine how to notify the user.
3. **Send email**: If the notification preference is email, send a message to the user’s email address.
4. **Send SMS**: If the preference is SMS, send a text message to the phone number. 

<p style="text-align: center;"><img src="/content/img/user_notification_workflow.png" alt="user notification workflow" width="60%" height="auto" style="padding-bottom: 20px; padding-top: 20px;" /></p>

Select your preferred language and use the code example to define and register the workflow in your Conductor environment.


=== "Java"

    ```java

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

            //Execute the workflow and get the output
            WorkflowInput input = new WorkflowInput("userA");
            input.setNotificationPref(WorkflowInput.NotificationPreference.EMAIL);
            CompletableFuture<Workflow> workflowExecution = simpleWorkflow.executeDynamic(input);
            Workflow workflowRun = workflowExecution.get(10, TimeUnit.SECONDS);


    ```

=== "Python"

    ```python

        workflow = ConductorWorkflow(
            executor=workflow_executor,
            name='user_notification',
            version=1,
        )
        workflow.input_parameters = ['userId', 'notificationPref']
        get_user_info = SimpleTask('get_user_info', 'get_user_info').input('userId', '${workflow.input.userId}')

        decision_task = SwitchTask('emailorsms', '${workflow.input.notificationPref}')
        send_email = SimpleTask('send_email', 'send_email').input('email', '${get_user_info.output.email}')
        send_sms = SimpleTask('send_sms', 'send_sms').input('phoneNumber', '${get_user_info.output.phoneNumber}')

        decision_task.switch_case(NotificationPreference.EMAIL,send_email)
        decision_task.switch_case(NotificationPreference.SMS, send_sms)

        workflow >> get_user_info >> decision_task

        workflow.register(overwrite=True)  # register the workflow with the server

        workflow_run = workflow_executor.workflow_client.execute_workflow(
            body=StartWorkflowRequest(name=workflow.name,version=workflow.version),
            request_id=str(uuid.uuid4()),
            version=workflow.version,
            name=workflow.name,
            wait_until_task_ref='',
            _request_timeout= 60
        )

    ```

=== "Go"

    ```go

        getUserInfo := workflow.NewSimpleTask("get_user_info", "get_user_info").
    		Input("userId", "${workflow.input.userId}")
    	sendEmail := workflow.NewSimpleTask("send_email", "send_email").
    		Input("email", "${get_user_info.output.email}")
    	sendSMS := workflow.NewSimpleTask("send_sms", "send_sms").
    		Input("phoneNumber", "${get_user_info.output.phoneNumber}")

    	decision := workflow.NewSwitchTask("email_or_sms", "${workflow.input.notificationPref}").
    		SwitchCase(Email, sendEmail).
    		SwitchCase(Sms, sendSMS)

    	executor.NewWorkflowExecutor(
    		api.GetApiClientWithAuthentication(),
    	)
    	userNotificationWorkflow := workflow.NewConductorWorkflow(workflowExecutor).
    		Name("user_notification").
    		Version(1).
    		InputParameters("userId", "notificationPref").
    		Add(getUserInfo).
    		Add(decision)

    	userNotificationWorkflow.Register(true)

    	//Execute workflow synchronously -- and wait for it to complete
    	output, err := userNotificationWorkflow.ExecuteWorkflowWithInput(input, "")
    	if err != nil {
    		fmt.Errorf("error executing workflow %s", err.Error())
    		return
    	}
    	fmt.Printf("Completed executing workflow with id %s and output %s\n", output.WorkflowId, output.Output)

    	//Start workflow asynchronously, do not wait for it to complete
    	//Get the execution id back which can be used to monitor the workflow execution state
    	workflowId, err := userNotificationWorkflow.StartWorkflowWithInput(input)
    	if err != nil {
    		fmt.Errorf("error executing workflow %s", err.Error())
    		return
    	}
    	fmt.Printf("Started workflow with id %s\n", workflowId)

    ```

=== "C#"

    ```csharp
    var getUserInfoTask = new SimpleTask("get_user_info", "get_user_info")
        .WithInput("userId", "${workflow.input.userId}");

    var emailOrSmsTask = new SwitchTask("emailorsms", "${workflow.input.notificationPref}")
        .WithDecisionCase(
            WorkflowInput.NotificationPreference.EMAIL.ToString(),
            new SimpleTask("send_email", "send_email")
                .WithInput("email", "${get_user_info.output.email}")
        )
        .WithDecisionCase(
            WorkflowInput.NotificationPreference.SMS.ToString(),
            new SimpleTask("send_sms", "send_sms")
                .WithInput("phoneNumber", "${get_user_info.output.phoneNumber}")
        );

    return new ConductorWorkflow()
        .WithName("user_notification")
        .WithVersion(1)
        .WithInputParameter("userId")
        .WithInputParameter("notificationPref")
        .WithTask(getUserInfoTask, emailOrSmsTask);
    ```

=== "JavaScript"

    ```javascript
    const getUserDetailsTask = simpleTask(GET_USER_INFO, GET_USER_INFO, {
        userId: "${workflow.input.userId}",
      });
      const emailOrSmsTask = switchTask("emailorsms", "${workflow.input.notificationPref}", {
        email: [
          simpleTask(SEND_EMAIL, SEND_EMAIL, {
            email: "${get_user_info.output.email}",
          }),
        ],
        sms:[
          simpleTask(SEND_SMS, SEND_SMS, {
            phoneNumber: "${get_user_info.output.phoneNumber}",
          }),
        ],
      });
      
      const wf = workflow(COMPLEX_WORKFLOW_NAME, [
        getUserDetailsTask,
        emailOrSmsTask,
      ]);
      wf.inputParameters = ['userId', 'notificationPref']
      
      const client = await clientPromise;
      client.metadataResource.create(wf, true);

    return wf;
    ```

=== "Typescript"

    ```typescript 
    const getUserDetailsTask = simpleTask(GET_USER_INFO, GET_USER_INFO, {
        userId: "${workflow.input.userId}",
      });
      const emailOrSmsTask = switchTask(
        "emailorsms",
        "${workflow.input.notificationPref}",
        {
          email: [
            simpleTask(SEND_EMAIL, SEND_EMAIL, {
              email: "${get_user_info.output.email}",
            }),
          ],
          sms: [
            simpleTask(SEND_SMS, SEND_SMS, {
              phoneNumber: "${get_user_info.output.phoneNumber}",
            }),
          ],
        }
      );

      const wf = workflow(COMPLEX_WORKFLOW_NAME, [
        getUserDetailsTask,
        emailOrSmsTask,
      ]);
      wf.inputParameters = ["userId", "notificationPref"];
      
      const client = await clientPromise;
      client.metadataResource.create(wf, true);

    return wf;
    ```
