---
slug: rknow-your-customer-workflow-with-netflix-conductor
title: Know Your Customer- Building KYC Workflows with Netflix Conductor
authors: JohannesKoch
tags: [Netflix Conductor, orchestration, usecase, 2022]
image: https://orkes.io/content/img/recycle_logo.jpeg
---

# Know Your Customer: Building KYC Workflows with Netflix Conductor

Know Your Customer (KYC) workflows are really important for banks and financial services as well as other industries. In the banking industry in most countries, having a KYC workflow is enforced by the regulators that provide the banking license—the banks are required to implement a KYC workflow and a risk-based approach to fight money laundering.

In this article, you will learn about KYC use cases and workflows, including their requirements and distinguishing features. You will also learn about using [Conductor](https://github.com/Netflix/conductor), an open source microservice and workflow orchestration framework, and the [Orkes Conductor Playground](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground) (as a Software as a Service option to host Conductor workflow) to build and test your own KYC workflow within minutes! You will build an example workflow in Conductor that you can easily run on the Orkes Conductor Cloud.

<!--truncate-->

## What Are KYC Workflows?

KYC workflows are all of the steps required for successfully onboarding a new person as your customer. If you need to do this process regularly, it makes sense to automate this process as much as possible.

## Use Cases for KYC Workflows

Consider the example of setting up a bank account. In this case, the bank implements many different KYC workflows, and most banks get hundreds of new customers every day. [KYC](https://www.msg-compliance.de/en/glossary#k), in this context, requires the bank to gather a lot of information about you to assign the appropriate customer class. The captured information is also used to prevent money laundering, terrorist financing, corruption, and other illegal activities.

During the initial KYC workflow, banks are asked by the FATF to follow a [risk-based approach](https://www.msg-compliance.de/en/glossary#r). In order to do that, they gather extensive details about you, which they also use to tailor offers of additional services or stock investments that match your [risk appetite](https://csrc.nist.gov/glossary/term/risk_appetite). It’s all about knowing who *you* are as a person. These KYC processes also help reduce fraud once you are an established customer. For example, if the bank knows that you live in Germany, it could identify credit card activity in the USA as a fraud transaction within minutes after activity in Germany and block it.

The KYC workflow of a bank or a financial service needs to cover many different steps, and the following is a simplified view of a workflow:

![KYC workflow from Conductor](https://i.imgur.com/odi99wK.png)

This example covers various use cases mentioned above but is focused on the initial customer-acceptance process. It starts with collecting details from the customer, including personal identifiable information (PII), residency information, and financial details. Afterward, the initial validations are completed—e.g., checking if the customer is on the bank’s blacklist or verifying with regulators if the first name or last name is on a [sanction list](https://www.creditsafe.com/gb/en/blog/compliance/sanctions-lists-what-do-i-need-to-do.html).

Based on the feedback from these validations, the workflow decides if the customer is acceptable for the bank or not. If the customer is not acceptable, the workflow will end, and the customer onboarding process stops. If the customer is acceptable, the workflow will calculate a risk class and assign a customer class before sending a notification to the customer.

In the next section, you will build this workflow using Netflix Conductor.

## Implementing KYC Workflows Using Netflix Conductor
Before you start to build the workflow, there are a few things you need to do so you can locally test and execute the examples that you will build. Being able to execute and test workflows locally is key to ensuring developer productivity. Later you will implement your workflow for productive use on a server or on a Software as a Service offering like [Orkes](https://play.orkes.io/newWorkflowDef](https://play.orkes.io/newWorkflowDef).

These are the prerequisites that you will need for the rest of this article:

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your PC.
- Install Java. I advise you to use [Amazon Corretto](https://docs.aws.amazon.com/corretto/index.html), which is an OpenJDK distribution mantained by AWS.
- Clone this Bitbucket repository: [Netflix/conductor](https://github.com/Netflix/conductor.git).
- Clone this Bitbucket repository: [Lock128/conductor-playground](https://github.com/Lock128/conductor-playground).
- Install and set up [AWS CLI](https://aws.amazon.com/cli/).
- Install [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) and the [CDK CLI](https://docs.aws.amazon.com/cdk/v2/guide/cli.html).

Docker Desktop and Java will be used locally to run Conductor using “[docker-compose](https://docs.docker.com/compose/).” The two repositories contain the pieces of code that you will need to run your workflow locally and to deploy the backend service to handle your workflow on AWS. The required AWS infrastructure will be deployed using AWS CDK.

### Developing and Testing Your Workflows Locally

You are now going to bring up a local instance of Conductor as described on [their documentation](https://conductor.netflix.com/gettingstarted/docker.html):

- Open a command line and go to the directory where you have cloned the [Netflix/Conductor](https://github.com/Netflix/conductor) repository. In there, go to the “docker” folder.
- Execute “docker-compose up,” and you will start seeing three different containers being built and started.
- After the containers have started successfully, you will be able to reach the Conductor UI here: [http://localhost:5000/](http://localhost:5000/).

You are now running a complete version of the workflow orchestration tool Conductor on your local PC! This includes the user interface, the backend server, and an Elasticsearch container for storing the workflow and task data.

*Note:* This is a transient data store, so every time you stop or start the container, your workflows or tasks created on this instance will be deleted.

### Creating a Workflow Task

Now you will create a new task, which is required to create a workflow:

![How to create a task](https://i.imgur.com/0QJe4VX.png)

Create one task for each of the tasks in the folder “conductor-workflows/tasks.”

![Create task](https://i.imgur.com/Yc1Nctu.png)

The creation of these tasks can also be done using a [simple API](https://conductor.netflix.com/how-tos/Tasks/creating-tasks.html). However,  for simplicity and because you only need to create a small number of tasks, you are going to do this manually as part of the tutorial.

### Creating a KYC Workflow

Now you can create our KYC workflow by following similar steps to creating a task definition in the Conductor UI:

![Create workflow](https://i.imgur.com/qxT0PAf.png)

The content of the workflow definition is in the repository Lock128/conductor-playground: [kycWorkflow](https://github.com/Lock128/conductor-playground/blob/main/conductor-workflows/kycWorkflow).

The workflow cannot be executed using the built-in [workbench](http://localhost:5000/workbench) in the conductor UI:

![Start workflow in Conductor UI workbench](https://i.imgur.com/FnKBQZY.png)

Using the “start” button, you can now trigger the execution of the workflow:

![Starting the workflow and the result](https://i.imgur.com/g6hvcJi.png)

This initial execution has failed. The root cause is that the workflow has been added but the backend API is not yet available. You can verify the error message by clicking on the execution id:

![Failed workflow execution](https://i.imgur.com/V9CrFgN.png)

This is an important lesson: conductors are able to orchestrate microservices and tasks, but they cannot execute real actions.

### Deploying the Backend Microservices

This is the architecture that you will deploy next:

![Architecture overview](https://i.imgur.com/vRcEKse.png)

As you have seen in the error message, the backend part that is supposed to be running your microservices or APIs that you are connecting using Conductor is not yet available.

You can now use the CDK CLI to deploy the required backend infrastructure to AWS. To do so, navigate to the folder “Lock128/conductor-playground/conductor-cdk.” There, you execute “cdk deploy,” which will provision the infrastructure defined in the code (one API gateway with two functions). The implementation presented here is “mocked,” which means that we are not expecting the functions to really assess a customer class or do a risk ranking; they simulate the endpoint to showcase the workflow. You can implement the business logic as per your personal need.

In the output produced by this execution, you will also see the generated URL endpoint for your API gateway:

![CDK output](https://i.imgur.com/u3RYPSr.png)

If you navigate to the [CloudFormation](https://eu-central-1.console.aws.amazon.com/cloudformation) section in the AWS console, you should now see a successful deployment of your CloudFormation stack named “ConductorSimpleApiGatewayToLambdaStack.” This stack will include the API gateway endpoint and the lambda functions. As all of the services used are “pay-per-use” (you only pay what you use and there is a free tier for all of the services), the expected costs for this deployment is 0 USD unless you start running bigger tests.

![AWS console CloudFormation stack](https://i.imgur.com/R2ZV7ma.png)

Navigate to the workflow definition of the “kycWorkflow” and replace all instances of the text “https://example.url/api” with the URL that you see in your output. Save the changes.

Now you are ready to try the workflow execution again! This time, the workflow execution should be successful:

![Successful execution of the workflow](https://i.imgur.com/aRs8OcP.png)

## Conclusion

In this article, you learned about KYC workflows and how to start Conductor locally using docker-compose. You created tasks in the Conductor UI and created an initial version of a KYC workflow. While executing the workflow using the Conductor UI workbench, you saw that Conductor requires backend infrastructure to successfully execute the workflow. In the default setup with docker-compose, a transient instance of Elasticsearch is used to store the created tasks and workflows, which is a real problem for developer productivity as every time you restart the containers, you will need to recreate the tasks and workflows.

Thankfully, Orkes offers a hosted version of Conductor that you can use to test your workflows. You can sign up for the [Orkes Conductor Playground](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground) by accessing it directly: [https://play.orkes.io/newWorkflowDef](https://play.orkes.io/newWorkflowDef). On this Playground, you can easily build, test, and execute your workflows without worrying about the state. With Orkes you can rapidly iterate new features with a visual representation of your workflows and execution status, and you can orchestrate workflows across mixed languages. This is a powerful and efficient feature as you will not need to think about managing the infrastructure for Conductor.
