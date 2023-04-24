---
slug: building-checkout-app-using-next-js-and-conductor
title: Building Checkout App using Next.js and Conductor
authors: riza
tags: [Netflix Conductor, orchestration, app building, nextjs]
---

In the past few years, have you ever had a day without using an application? Most probably, your answer would be ‘**No**’. In today’s world, we rely on mobile applications for everything, right from getting a cab, booking travel tickets, paying bills, purchasing things, and much more. And the process of purchasing/ordering things online definitely goes through a checkout process.  

<p align="center"><img src="/content/img/checkout-app-blog-image.png" alt="Checkout App with Next.js and Conductor" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

**Yes! You heard it right. You can build an app with Conductor in 10 minutes**. In this blog, I’ll walk you through the process of creating a Checkout app with Next.js and Conductor. Conductor is a platform for building distributed applications in any language of your choice. However, this article details how to build a checkout application with Next.js and Conductor.

## What you need!

You need to ensure that the device on which the application is built meets the following requirements.

- [x] Node.js version should be >= 18
- [x] TCP port 3456 should be available
- [x] Set Up Conductor Server

### Setting Up Conductor Server

The Conductor server can be set up [locally](/content/get-orkes-conductor) on your device, or you can set up the [Orkes Cloud](https://orkes.io/cloud/) version or even test out the Conductor in [Playground](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground), a free tool from Orkes for testing your application in real-time. 

In order to run your application against a server, you need to extract the access keys from your Conductor server. The access key includes two parts; Key ID and Key Secret. 

**So, let’s obtain the Access Keys from the Conductor Server.**

You need to [create an application](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#configuring-application) inside your Conductor server, from where the Key ID and Secret are to be obtained. Ensure that you have provided the worker role for the application and then generate the [access key](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#access-keys). These access keys would be shown only once, so ensure to copy and keep them securely.

Now, export your variables as below;

```shell
# set the KEY and SECRET values with the one obtained from the Conductor UI after creating an application
export KEY=
export SECRET=
# replace CONDUCTOR_SERVER with the actual hostname, the URL must end with /api
export SERVER_URL=http://CONDUCTOR_SERVER/api
# Optional checkout workflow name defaults to MyCheckout2
export CHECKOUT_WF_NAME=MyCheckout2
```

Once you have verified this, let’s move on to the next step in building your Next.js application.

## Run the Application

```Checkout the application code from:``` 

[https://github.com/orkes-io/conductor-nextjs-example](https://github.com/orkes-io/conductor-nextjs-example)

You need to install the dependencies initially.

```shell
yarn
yarn seedWf
```

Now start the app in development mode.

```shell
yarn dev
```

In order to use the app in the browser, open [https://localhost:3456/](https://localhost:3456/)

On your browser, the application will look like this:

<p align="center"><img src="/content/img/checkout-app-in-nextjs.png" alt="Checkout app in UI" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You can choose the products and add them to the cart. Once the cart is ready and when the user clicks on the **PLACE ORDER** button, the Conductor workflow begins.

## Where is Conductor used in your Checkout application?

When you put your orders in the cart and proceed to the checkout, the application needs to calculate the total credit with the available credit and check whether the user has a credit. To do this, you can make use of a workflow in Conductor. 

Let’s consider a simple workflow of a Checkout Application. The applications are built using Workflows in Conductor. Workflows are a combination of several building blocks known as tasks. These tasks orchestrate in a specified order to complete the workflow and provide durability across the flow, so even if the system goes down or there are temporary failures, the process is guaranteed to be complete - without having to write any extra code or logic!

<p align="center"><img src="/content/img/checkout-process-workflow-in-conductor.png" alt="Checkout process workflow in Conductor" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

1. When started, we have a **WAIT** task that waits for 30 seconds, which allows users to cancel the order from the UI - this is useful for the demo but may not be needed in the production environment.
2. After that, we have a **check_credit** task that checks if the user has sufficient balance to place the order - this is implemented as INLINE javascript since it's a quick check.
3. Next up, we have a decision task **switch_has_credit**, that takes the output of **check_credit** and either completes the process successfully or terminates with an insufficient balance error.  

As you move the system into production, these three tasks can be implemented to run real production code or mocked up when running tests, all without changing your NextJS application code.   

Not only that, for the folks who are monitoring the checkout application in production (think operations/customer support), they know exactly what is going on with each order.

Here is the snippet of the workflow code used:

```mjs
const createCheckoutWorkflow = () =>
  workflow(`${process.env.CHECKOUT_WF_NAME || "MyCheckout2"}`, [
    waitTaskDuration("confirmation_wait", "30 seconds"),
    generateInlineTask({
      name: "check_credit",
      inputParameters: {
        products: "${workflow.input.products}",
        totalCredit: "${workflow.input.availableCredit}",
        expression: function ($) {
          return function () {
            var totaAmount = 0;
            for (var i = 0; i < $.products.length; i++) {
              totaAmount = $.products[i].price;
            }
            return totaAmount > $.totalCredit ? "noCredit" : "hasCredit";
          };
        },
      },
    }),
    switchTask("switch_has_credit", "${check_credit_ref.output.result}", {
      noCredit: [
        terminateTask(
          "termination_noCredit",
          "FAILED",
          "User has no credit to complete"
        ),
      ],
      hasCredit: [
        terminateTask(
          "termination_successfull",
          "COMPLETED",
          "User completed checkout successfully"
        ),
      ],
    }),
  ]);
```

For the complete working code, see the [code here](https://github.com/orkes-io/conductor-nextjs-example/blob/main/scripts/workflowCreation.mjs).

## Visualizing your Checkout execution in Conductor

Conductor also provides a visual representation of the workflow with the paths taken. The green tick along the boxes represents that the task has been completed. If any of your tasks are still running, it will show a loading icon instead of the green one. This could help in quickly understanding how your application works.

In situations where your application is stuck, you can visualize them and troubleshoot the issues by looking into the path.

<p align="center"><img src="/content/img/checkout-process-executed-view.png" alt="Execution of the Checkout process" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Wrapping Up

And that’s it! Your application is now ready. 

> Why don’t you build an app on your own and share your app development stories with us? <br/>We are waiting to hear from you!

Our team at Orkes is always here to help if you have any queries. Do reach out to us on our [Slack channel](https://app.slack.com/client/T02KG20GJ1Z/C02KJ820XPW) for any help. If you are an enterprise looking to leverage Conductor for app-building processes, you can [reach out to us](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g).  