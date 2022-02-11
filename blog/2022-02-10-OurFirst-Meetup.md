---
slug: Meetup-Using-Conductor-in-production
title: Meetup recap - Using Conductor in Production  
authors: doug
tags: [Netflix Conductor, Orkes, Conductor, meetup, presentation, video,2022]
image: https://orkes.io/content/assets/images/Simple-image-workflow-5a4043a8cc44c7d8bdef5f2456fb4105.png
---

In early Feb 2022, we had our first meetup on Netflix Conductor: [Using Conductor in Production](https://www.meetup.com/san-francisco-microservices-orchestration-meetup-group/events/283657274/). It was also co-hosted by the [Netflix Conductor](https://www.meetup.com/Netflix-Open-Source-Platform/events/283685727/) team.

We had two excellent talks from Maros Marasalek at FRINX and Nick Tomlin at Netflix.  

After the two talks, we had 2 roadmap sessions.  Ther first session was by the Netflix Conductor team - where they discussed recent releases, and walked through the Open Source roadmap for the coming months.  The second session, by our own Viren Baraiya, introduced Orkes, and our plans for extending Netflix Conductor.


## Conductor in FRINX

Maros' presentation showed how the FRINX team has integrated Conductor into their product, and how the FRINX tooling helps to build custom workflows.

<iframe width="560" height="315" src="https://www.youtube.com/embed/noVJ1owfTR0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Bridging human and system workflows with Conductor

Nick Tomlin works on the Finance team at Netflix, and his team has built a set of Conductor workflows that enable other Netflix teams to quickly build and share workflows.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xsmd5eyEVNE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Netflix Conductor roadmap

Our third talk was from the Netflix Conductor team - where they presented the roadmap for Netflix Conductor for the coming months.  

<iframe width="560" height="315" src="https://www.youtube.com/embed/du7mls9XMUE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Introducing Orkes

Finally, one of our founders (and the commiter of the first line of Conductor code) Viren Baraiya presented Orkes and *our* roadmap:

<iframe width="560" height="315" src="https://www.youtube.com/embed/MnC25X0jtYE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Q&A

Throughout the meetup, the attendees asked a number of great questions. They are reproduced here for visibility outside the meetup.

### **Hello, thanks for organizing such an event. I would like to know if there are any performance metrics for Conductor? We are planning to use it in a system with heavy traffic(multimillion requests each of them would trigger a workflow) and I would like to know if it’ll be reliable enough. Thank you :)**

Conductor is horizontally scalable and we have known users scaling to handle workloads at the scale you mentioned.  Here is a recent discussion on scale on [Github](https://github.com/Netflix/conductor/discussions/2299), and a [post from Netflix](https://netflixtechblog.com/evolution-of-netflix-conductor-16600be36bca") talking about the scale.

Conductor was built ground up for high reliability and performance. There are several companies that are running multi-million workflows on their core business flows.

### **I hear Netflix also is using Temporal.io which is cadence based. https://www.youtube.com/watch?v=JQ6FRTnQWFI How do the two overlap at Netflix and the reason behind the use of Temporal.**

Conductor is the default workflow orchestration tool of choice at Netflix. That said, engineers are free to choose the tool that’s best for their needs. The Spinnaker team at Netflix felt that Temporal is best aligned with their needs.

### **You mention CLI. Any thoughts about SDK as well?**

Yes, we are working on that - stay tuned :) (Note: Check out the Orkes video above)

### **Can AWS Lambda be hooked up as a task in workflow**

AWS Lambda can be hooked up, but it's not available as a default task. There is an extension available that will allow integrating with  AWS lambdas. We can send you details about this.

### **How often are conductor versions released to the community?**

Quoting Aravindan - Frequent releases - upto twice per month. Recent releases: https://github.com/Netflix/conductor/releases

### **From the previous presenter, what is the expected timeline for all those features to be released?**

Quoting Aravindan - Frequent releases - up to twice per month. Recent releases: https://github.com/Netflix/conductor/releases

### **Any pointers about production level setup instructions of Dynomite (with the consideration of DR) on K8s cluster?**

Hi Guru, We’d love to help out. If you are up for a meet, we can discuss in detail on what a good configuration would be to run Conductor in K8s. In the next month or so, we will also publish a detailed blog about this topic that will help community users set up Conductor in production.


## Thank you

Thank you to all the speakers for their incredible presentations, and also to our community for such great questions. This is our first of many meetups, and we hope to see all of you (and everyone else) at our next meetup.

In the meantime - don't forget to [Star the Conductor repository](https://github.com/Netflix/conductor/).

For the latest udpates on Conductor and Orkes, subscribe to our [YouTube channel](https://www.youtube.com/channel/UCI7sk4DD6F6r9CWg9gHRlVg), and follow us on [Twitter](https://twitter.com/orkesio).