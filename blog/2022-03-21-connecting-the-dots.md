---
slug: workflows-connecting-the-dots
title: How a Workflow engine would have made my old job easier
authors: doug
tags: [Netflix Conductor, Orkes, Conductor, 2022]
---

I have had the opportunity in my career to work on a number of very exciting projects. I am really excited with my role at Orkes, and getting to share what I am learning about Netflix Conductor. In this post, I have dipped into my memory banks to a project that could have really benefited from the power of Conductor's workflow orchestration - simplifying and streamlining processes with the power of microservices.

In a previous role (it almost seems a lifetime ago), I worked on a project at AT&T called [Video Optimizer](https://developer.att.com/video-optimizer). It is an open source tool that is used to test mobile apps and video for issues that can affect phone battery life and data usage. Working with mobile app developers, my team was able to make top mobile applications more efficient and save battery (and saved AT&T $250M in network costs!)

But what does this have to do with Microservices?

## Our monolithic problem

After a few years of working with the team, our application (a monolithic Java app) had gone through several team leads and developers, and had become a mess of spaghetti code and patches.  No one was really sure how it all worked, and everyone 'touched wood', grabbed a rabbits' foot, or said a silent prayer at build time.  To call our code 'fragile' was a kindness.

After a **very long** refactor, things were better.  New features were again being released, and we were moving ahead.

### Manual testing

All of our application testing was done manually - by a team of very talented testers - and the analysis was done by my team.  We were always the limiting factor in finding new issues in app releases. We longed for an automated analysis that could tell us when a change occurred in a mobile app.

## Microservices to the rescue

In mid 2017, there was an internal push for breaking up large apps into microservices, and there was a big *funding pot* set aside in AT&T to aid teams in migrating applications to microservices in the cloud. 

We saw this as an opportunity to achieve several of our team's goals - making the project more structured (as microservices), but also launching a cloud based version with automated testing and basic reporting. So, we set out to re-architect the application into cloud based microservices.

### Getting funding

At AT&T, to get access to the *big pot of funding*, we had to demonstrate that our team had all of the right ideas on how to migrate Video Optimizer into microservices.  The team created excellent PowerPoint presentations of how we'd break VO into a set of microservices - and actually did some basic 'orchestration' by drawing arrows indicating the way that data would make its way through the new architecture.

### We were successful!  

WE got the money to build the new version of Video Optimizer! But privately, I was asking the team -  how are we going to build the connecting lines between our microservices - how are they going to communicate and make sure the data flows properly between these small apps?

## Workflow orchestration

Of course, the problem at hand was workflow orchestration - getting these fast, modular microservices to work together and produce the results we were used to seeing in our monolith.

The feedback from the dev team was "oh, don't worry - we'll figure something out." (which did not really bode well for the project). What we needed was a robust and off the shelf tool to "wire up" all of our microservices.

I've been at Orkes for two months now, and am learning about the power of Netflix Conductor's ability to connect microservice workflows - I realize that Conductor would have served this project.

## So What happened?

I left AT&T soon after we received the funding for the project.  I reached out to my old team - the project did get built, but was unfortunately built on a proprietary internal infrastructure - which soon broke, and was never fixed - ending the vision of a cloud based version of Video Optimizer.

I can only imagine that if given the flexibility of a better cloud, and the power of Conductor, that this project would be going strong today.  Using a tool like our [Playground](https://play.orkes.io) would have allowed the team to quickly mock up the connections between the microservices, and see that communication was working as expected.

Do you have projects that you've worked on, that in hindsight, would have been more successful with workflow orchestration?  Tell us about it in our [Discord channel](https://discord.gg/pYYdYsYTAw).