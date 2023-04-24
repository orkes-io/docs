import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Write Workflows Using Code
Workflows can be written in code allowing creation of dynamic workflows that can't be pre-defined.
Support for defining workflows using code is part of all the supported SDK.

## Creating workflows in code
Here is the workflow that we are going to create using various language specific SDKs in code:
<p style={{textAlign: "center"}}><img src="/content/img/user_notification_workflow.png" alt="user notification workflow" width="50%" height="auto" style={{paddingBottom: 20, paddingTop: 20}} /></p>
<Tabs>
<TabItem value="Java" label="Java">


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

</TabItem>
<TabItem value="Python" label="Python">

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

</TabItem>
<TabItem value="Golang" label="Golang">

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

</TabItem>

<TabItem value="CSharp" label="CSharp">

```java
    // @TODO:Gustavo
    @WorkerTask("fraud-check")
    public String checkForFraud(@InputParam("amount") BigDecimal amount, @InputParam("accountId") String accountId) {
        boolean isFraud = fraudService.isFraudulentTxn(accountId, amount);
        if(isFraud) {
            return "This transaction cannot be processed as its flagged for review.";
        }
        return "Deposit of " + amount + " has processed successfully";
    }

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```java
    // @TODO:Gustavo
    @WorkerTask("fraud-check")
    public String checkForFraud(@InputParam("amount") BigDecimal amount, @InputParam("accountId") String accountId) {
        boolean isFraud = fraudService.isFraudulentTxn(accountId, amount);
        if(isFraud) {
            return "This transaction cannot be processed as its flagged for review.";
        }
        return "Deposit of " + amount + " has processed successfully";
    }

```

</TabItem>
</Tabs>
