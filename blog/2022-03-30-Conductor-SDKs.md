---
slug: SDKs-for-netflix-conductor
title: New SDKs launched for Conductor users
authors: doug
tags: [Netflix Conductor, Orkes, microservices, SDKs, Java, Python, 2022]
image: https://user-images.githubusercontent.com/1514288/160131357-d5bfa184-55e8-440f-83ed-df9d4ec89e6f.png
---

Conductor is a workflow orchestration engine that connects all of your microservices together to create fully functional workflows that can run at scale. Each workflow is comprised of tasks - and many of these tasks are powered by external workers - or microservices. These workers can be written in any language - from Conductor's point of view - data goes in, and results come out - the language that processes the data is irrelevant.

Each worker has to connect to your Conductor instance, and regularly poll for work in the queue. There has long been Java, Go and Python SDKs to easily connect your apps to Conductor, but for building in other languages, this code had to be created by each development team.

Today, we announce that major improvements to the Golang and Python SDKs, and announce C# and Clojure SDKs.

Further, all of the (non-Java) SDKs have a new GitHub home: the [Conductor SDK](https://github.com/conductor-sdk) repository is your new source for Conductor SDKs:

- [Golang](https://github.com/conductor-sdk/conductor-go)
- [Python](https://github.com/conductor-sdk/conductor-python)
- [C#](https://github.com/conductor-sdk/conductor-csharp)
- [Clojure](https://github.com/conductor-sdk/conductor-clojure)

Coming soon:

- [JavaScript/TypeScript](https://github.com/conductor-sdk/conductor-javascript)
- Rust
- Ruby
- Kotlin
- PHP

<!-- truncate -->

## What do these workers do?

When a workflow is run, each task is run in order, based on the design of the orchestration. Each task has a queue of jobs that are picked up by the workers - and then completed.

So your worker must:

- Connect (and potentially authenticate) with your Conductor server.
- Connect workers to the Conductor tasks
- Regularly poll tasks for work to be run

This can be a rather daunting bit of code to create, and with our SDKs, we abstract all of this to a few lines of configuration - allowing you to focus on the business logic and getting your workflows up and running.

## Moving Python and Golang

Conductor already has Python and Golang SDKs. These have been dramatically improved, and are now on par (or perhaps even ahead - not that this is a competition) of the Java SDK. These SDKs are being removed from the main Conductor repo to allow for faster iteration and improvements to the SDKs.

## Clojure and C#

The Clojure SDK was created by the Orkes team, and the C-Sharp SDK has been contributed by Sean McAdams. They feature all of the same great features as the Java, Python and Golang SDKs already launched (and now re-launched).

## The announcement

We announced our GitHub repo and our planning around Conductor SDKs at our [Meetup](https://www.meetup.com/san-francisco-microservices-orchestration-meetup-group/). Here's the video of our CTO Boney:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9Fzmu1NP_bg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What's next?

Over the coming weeks, we'll be working to improve the documentation and sample applications for all of the SDKs. We'll also continue work on the JavaScript SDK.

We are very excited about announcing our new SDKs and we are here to facilitate your creation of Conductor workflows. If you have any suggestions of future SDK work, drop us a note in our [Discord](https://bit.ly/35hgY8n), or send us a DM on [Twitter](https://twitter.com/orkesio). We'd love to hear what you think!
