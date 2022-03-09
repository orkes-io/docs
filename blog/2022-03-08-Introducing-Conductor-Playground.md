---
slug: introducing-conductor-playground 
title: Learn by playing! Introducing the Conductor Playground
authors: dilip
tags: [Netflix Conductor, Orkes, Conductor, playground, 2022]
---

I learned how to code and fell in love with it during freshman year in college. I still remember that the first few classes were around concepts and were mostly lectures. While I was still getting an idea of what this is all about, it wasn’t until I did the first hands-on lab (in C!) when everything just snapped together and I found my passion. Soon after, I switched my major from Physics to Computer Engineering.

This also happens to be how most developers want to learn new things - by trying it out! We see that everyday when we talk to customers who might not be deeply familiar with [Conductor](https://github.com/Netflix/conductor). *Quick recap: Conductor is the microservices and workflow orchestration platform originally created and battle tested at Netflix before gaining a large adoption with developers building applications across the spectrum of scale and use cases. *

During such conversations, the excitement and curiosity is clearly higher when someone has actually played with Conductor, whether it's on their own time or together with us on a call. It is usually followed up with a concrete discussion around their questions or deep dives on particular topics. The [Conductor documentation](https://orkes.io/content/) is a great resource to show how any developer can quickly install Conductor on their laptop or their cloud environment and get started on playing with it. 

But we wanted to make it even easier and frictionless!

## Introducing the Conductor Playground

We are excited to introduce the [Conductor Playground](https://play.orkes.io/), a fully managed browser based sandbox environment for developers to try out Conductor with **no installs or configurations needed**. It is **completely free and is fully featured** so that you can just focus on exploring how everything is organized, creating different workflows, executing them, seeing the results and more. The playground shows you what all are possible with Conductor and you can let your imagination run wild on the things you could build!


<img src="/content/img/blogassets/playground-workflow.png" width="800" style={{paddingBottom: 40, paddingTop: 40}} />


The Conductor Playground is built by running Conductor as a multi-tenant cluster. When you use it, a dedicated namespace is created for you so that the tasks and workflows you create, and the executions you invoke against them are visible only to you. We also intend the playground to be a place where we can publish the latest features so that the community gets a chance to try them out early on and give us feedback. And please do [give us feedback](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g) - we go through each of them in detail and it's absolutely the best way for us to keep making Conductor even better and give back to the community.

We have also included a set of pre-built workflows for everyone so that you have a starting point in your exploration. These show the different ways in which workflows are defined and the various Conductor operators that make it possible for you to describe your business logic in an intuitive way. You can just execute them to see them in action or you can add more logic on top of that to make your own workflow to play with.

It is also worth noting the scope we had in mind when we built the playground so that you can better plan your journey of learning (and loving!) Conductor. While the playground is a great place to test your workflows and understand how Conductor works, it is not intended for production usage. When you are ready for running your production workloads, we recommend using some of the other ways in which Conductor can be run as dedicated for your needs. We are here to help you with that, whether you want to get going on [running the open source Conductor](https://orkes.io/content/docs/getting-started/install/running-locally#download-and-run) on your own or use the fully managed service from [Orkes Cloud](https://orkes.io/cloud/) which can run on your cloud or be hosted by Orkes.


## Using the Conductor Playground

Using the playground is easy - just go to [https://play.orkes.io/](https://play.orkes.io/]) and you will be presented with a simple login screen which allows us to create a dedicated namespace for you. [Once you login](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground#logging-in-to-conductor-playground), you will be dropped to the Conductor UI that organizes tasks, workflows and their executions for easy navigation. The Conductor documentation site has [more details about the various components of the playground](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground#conductor-playground-components). 

## Running a pre-installed workflow

A great next step would be to explore the pre-installed workflows. You can do that by clicking on the Workflow Definitions link on the left navigation.

<img src="/content/img/blogassets/playground-sidenav.png" width="300" style={{paddingBottom: 40, paddingTop: 40}} />

Let’s pick the PopulationMaxMin workflow. What it does is that it first queries the [datausa.io API](https://datausa.io/about/api/0) to get the population of the different states in the United States. This is done by the get_population_data task which is an [HTTP system task](https://orkes.io/content/docs/reference-docs/system-tasks/http-task) that makes an outbound call to a HTTP/S endpoints, gets the result and can hand it over to other tasks downstream. 

What the workflow does next is to fork two parallel tasks, one to find the state with the minimum population and the other to find the one with the maximum population. These tasks are of type [JQ_TRANSFORM system task](https://orkes.io/content/docs/reference-docs/system-tasks/json-jq-transform-task) where you can process the incoming JSON structured data using [JQ](https://stedolan.github.io/jq/) (Conductor moves inputs and outputs through a workflow as JSON objects). Finally, it joins the results of both and presents that to the user.

Now that you know what it does, let's test it out by running it! Click on the Run Workflow button on the left navigation and you will be presented with the screen below. Select the *PopulationMaxMin* workflow from the *Workflow Name* drop down menu - you can optionally add a unique string to the *Correlation ID* field if you want to query off of that later. Click *Run Workflow* and you just invoked an execution of the PopulationMaxMin workflow! 

<img src="/content/img/blogassets/playground-run.png" width="800" style={{paddingBottom: 40, paddingTop: 40}} />

Click on the link below the *Run Workflow* button and you can see the visual and other details about this execution!

<img src="/content/img/blogassets/playground-diagram.png" width="800" style={{paddingBottom: 40, paddingTop: 40}} />

## Build and run your own workflow with external workers

There is so much more you can do with Conductor! Going along with our approach of learning by playing, a good next step would be to learn about how external workers (e.g. a microservice written in your language of choice) can execute tasks defined in a workflow. This complements the system tasks from the earlier example where the execution of tasks happens within Conductor.

You can do that by building your own workflow from scratch as shown in [this tutorial](https://orkes.io/content/docs/getting-started/playground/first-playground-application). In addition to step by step guidance, you can also find on [Github](https://github.com/orkes-io/orkesworkers) the code for the example shown there. 

## Keep going!


We hope that these examples with the playground have helped you in understanding more about Conductor. You can continue on this journey on playground by referring to our documentation which has various [How-To](https://orkes.io/content/docs/how-tos) guides and in-depth [reference documentation](https://orkes.io/content/docs/reference-docs) about the different components and operators of Conductor. Below are some popular topics.

* Workers
    * [Building a Java Task Worker](https://orkes.io/content/docs/how-tos/Workers/build-a-java-task-worker)
    * [Building a Python Task worker](https://orkes.io/content/docs/how-tos/Workers/build-a-python-task-worker)
    * [Building a Go Task worker](https://orkes.io/content/docs/how-tos/Workers/build-a-golang-task-worker)
* Workflows
    * [Debugging Workflows](https://orkes.io/content/docs/how-tos/Workflows/debugging-workflows)
    * [Updating Workflows](https://orkes.io/content/docs/how-tos/Workflows/updating-workflows)
* Monitoring
    * [Monitoring Task Queues](https://orkes.io/content/docs/how-tos/Tasks/monitoring-task-queues)
* Tasks
    * [Creating Tasks](https://orkes.io/content/docs/how-tos/Tasks/creating-tasks)
    * [Dynamic vs Switch Tasks](https://orkes.io/content/docs/how-tos/Tasks/dynamic-vs-switch-tasks)

## Getting help and providing feedback

There are many ways to get help as you are learning more about Conductor

* [What is Conductor overview](https://orkes.io/what-is-conductor/)
* [Conductor Documentation](https://orkes.io/content/)
* Conductor community channels: [Discord](https://discord.com/invite/P6vVt9xKSQ), [Slack](https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg), [Twitter](https://twitter.com/orkesio), [YouTube](https://www.youtube.com/channel/UCI7sk4DD6F6r9CWg9gHRlVg), [LinkedIn](https://www.linkedin.com/company/orkes-inc/), [Github](https://github.com/Netflix/conductor)
* [Github discussions](https://github.com/Netflix/conductor/discussions)
* [Conductor developer meetups](https://www.meetup.com/Netflix-Open-Source-Platform/events/283685727/)
* [Meet with the Conductor founding team](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g)

We want to keep making this Conductor Playground even more useful for developers, and we need your help in doing that. If you have any questions or feedback, however simple or complex it is, we want to hear from you! There is a link on the left navigation bar to provide us your Feedback - we would highly appreciate it if you could use that to let us know or using this [link](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g). 

Happy playing & learning!
