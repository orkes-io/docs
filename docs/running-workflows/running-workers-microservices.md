---
sidebar_position: 3
---

# Running Workers Across Services

So far we have learned some basic aspects of Conductor such as

1. How to run Conductor locally?
2. Using system or built-in tasks such as `HTTP`
3. Creating and running our first worker task implementation

In this article we will show how to connect multiple different services using a Conductor workflow. This is one of
the key features of Conductor. Being able to wire up really complex flows using Conductor will make our life as a
developer simple and will help us focus on what matters to our business.

> Conductor helps to wire up complex flows across different services

### Prerequisites

1. Have a Conductor Server running, with search support using Elasticsearch

We can refer to the guides in this site to get this up and running.

## Step 1: Creating and Configuring a Workflow

So far in our guides, we have created workflows with just one worker. Let's take that up a notch. We will create a
workflow that has three steps.

1. Pull some arbitrary sample data from a REST API using an `HTTP` task
2. Write a worker task that consumes this data and augments in with an arbitrary data from local storage
3. Write a second worker task that consumes this updated data from the first worker and creates an output after
   additional processing

Here is an example workflow - that contains the tasks as described above.

```json
 
```

Let's use curl to upload this workflow to our conductor server:



**Some things to note:**

1. We don't have to define our workers in different services, we can have them in the same service
    1. This is helpful when we want to create modular simple workers that we can use to assemble complex flows
2. We can define our workers in any language - in our article we have chosen `Java` to demonstrate the functionality
    1. This **language agnostic workers** for our workflow is another important feature of Conductor. We no longer
       have to work within the constraints of a single language.
3. Conductor provides system tasks that can do quite a bit of the common transformations which means we don't have to
   manually implement the workers for some tasks used in this example. For the purpose of demo, we are implementing
4. In this demo, we are also learning how to read data from one worker and use it in another worker. This is what makes
   it all possible. There are advanced options on how to use this, and we can find that in our
   guides <!-- TODO LINK -->

