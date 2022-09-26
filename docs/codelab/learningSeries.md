
# Learning Conductor 
## Part 1: Configure and execute your first multi-step business process

In this article, we will learn how to implement a sample business use case as a Conductor Workflow.
:::note Use Case
For a given user id, we need to read the user details and an order detail. If their age is more than 60, we need to send an SMS notification, and in addition - regardless of age, we need to send an email notification with the order details.
:::
To test this we will assume the following (these are mock but working APIs for testing):

1. Read user details API: https://randomuser.me/api
2. Order details API: https://orkes-api-tester.orkesconductor.com/get
3. SMS API: https://orkes-api-tester.orkesconductor.com/post
4. Email API: https://orkes-api-tester.orkesconductor.com/post

This is a multistep workflow that includes a condition (age check). The defined workflow can be accessed here: [Conductor playground](https://play.orkes.io). Please note that you will only have read-only access. If we would like to edit this, we would have to make a copy. 

>Video

:::tip 
As we can see by using tasks such as HTTP, we can run a sequence of tasks to handle business use cases.
:::

Now let's add the age related condition. You can find the updated definition here: [Conductor playground](https://play.orkes.io). We can run this workflow to see how everything works. As these are HTTP API calls, its possible the server will fail to respond. In spite of this, executions won't be impacted as Conductor is capable of running our workflows resiliently with in built retries. In this video we show how to update the definition, run and see results.

>Video

### Summary

In this article we learned how to:

1. Create a workflow for a business use case
2. Use HTTP and SWITCH tasks
3. Run workflows to see the output