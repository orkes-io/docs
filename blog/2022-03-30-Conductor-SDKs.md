---
slug: SDKs-for-netflix-conductor
title: New SDKs launched for Conductor users
authors: doug
tags: [Netflix Conductor, Orkes, microservices, SDKs, Java, Python, 2022]
image: https://user-images.githubusercontent.com/1514288/160131357-d5bfa184-55e8-440f-83ed-df9d4ec89e6f.png
---

Conductor is a workflow orchestration engine that connects all of your microservices together to create fully functional workflows that can run at scale.  Each workflow is comprised of tasks - and many of these tasks are powered by external workers - or microservices.  These workers can be written in any language - from Conductor's point of view - data goes in, and results come out - the language that processes the data is irrelevant.

Each worker has to connect to your Conductor instance, and regularly poll for work in the queue.  There has long been Java, Go and Python SDKs to easily connect your apps to Conductor, but for building in other languages, this code had to be created by each development team.

Today, we announce that major improvements to the Golang and Python SDKs, and announce C# and Clojure SDKs.

Further, all of the (non-Java) SDKs have a new GitHub home: the [Conductor SDK](https://github.com/conductor-sdk) repository is your new source for Conductor SDKs:

* [Golang](https://github.com/conductor-sdk/conductor-go)
* [Python](https://github.com/conductor-sdk/conductor-python)
* [C#](https://github.com/conductor-sdk/conductor-csharp)
* [Clojure](https://github.com/conductor-sdk/conductor-clojure)

Coming soon (the SDK is in active development):

* [JavaScript](https://github.com/conductor-sdk/conductor-javascript)

<!-- truncate -->

## What do these workers do?

When a workflow is run, each task is run in order, based on the design of the orchestration.  Each task has a queue of jobs that are picked up by the workers  - and then completed.

This means that every worker must poll the Conductor server at regular intervals, pick up assigned tasks and then complete them.  

Connecting the Worker to Conductor (including authentication), and creating the polling can now be done with just a few lines of code.

## Moving Python and Golang

The Python and Golang SDKs are moving from the main Conductor repo to allow for faster iteration and improvements to the SDKs.

## Clojure and C#

The Clojure SDK was created by the Orkes team, and the C-Sharp SDK has been contributed by Sean McAdams.  


## What's next?

Over the coming weeks, we'll be working to improve the documentation and sample applications for all of the SDKs.  We'll also continue work on the JavaScript SDK.