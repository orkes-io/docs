---
slug: november-2022-updates-see-what-the-orkes-team-has-been-up-to
title: November 2022 Updates - See what the Orkes team has been up to! 
authors: riza
tags: [Netflix Conductor, orchestration, monthly updates]
---

Many exciting things are happening as we work closely with our customers and the broader developer community. This blog post is intended to recap what the team at Orkes has been up to during the past few weeks. We will be covering two broad categories - product updates and community engagement. Do let us know your thoughts and feedback by reaching out to us on our [Slack channel](https://app.slack.com/client/T02KG20GJ1Z/C02K1B5PM0X) or by [setting up a meeting with us](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g).

We kick-started Q4 2022 with a set of great events, including but not limited to KubeCon + CloudNativeCon22, IBC22, and Orkes x MongoDB meetup. In case you couldn’t make it to these events, we’ve got you covered - more events are on the way!

Now let’s go through the [product](/content/blog/november-2022-updates-see-what-the-orkes-team-has-been-up-to#product-updates) and [events](/content/blog/november-2022-updates-see-what-the-orkes-team-has-been-up-to#event-updates) updates from Orkes.

## Product Updates

### Webhook
**Nov 20, 2022**

Integration of different systems with Conductor can be enabled using Webhooks. You can now seamlessly send real-time updates from third-party systems, such as Slack, Twitter, etc., to Conductor via Webhook. Webhooks can be used to listen for a particular type of event to occur, or you can also start a new workflow when an event occurs. [Learn more](https://orkes.io/content/docs/reference-docs/system-tasks/webhook-task).

### Metadata Migration
**Nov 17, 2022**

We’re pleased to announce metadata migration that facilitates moving workflows and task definitions between various environments. This comes into use when workflows and tasks need to be tested before deploying into the production environment. Once testing is finished, you can then easily move the definitions from development to testing to production environments. 

### HTTP Poll Task
**Nov 10, 2022**

The HTTP Poll task is a powerful mechanism to check whether certain events occur in an external system. It is a smart polling mechanism that invokes the HTTP API, parses the response, and evaluates conditions (until the specified condition matches) to infer whether further polling is required. [Learn more](https://orkes.io/content/docs/reference-docs/system-tasks/http-poll-task).

### GraalJS for Inline Task
**Oct 24, 2022**

Ever since the launch of the Inline task, we have been receiving frequent requests to enable the GraalJS evaluator type. You can now use the GraalJS evaluator type while configuring Inline tasks in your workflows. It can be used to evaluate Javascript expressions using GraalJS. [Learn more](https://orkes.io/content/docs/reference-docs/system-tasks/inline-task).

## Event Updates

### DevFest Bali 2022
**Nov 27, 2022: Bali, Indonesia**

With the spirit of the DevFest season being continued, the team at Orkes was represented by our Developer Relations Engineer, Cherish Santhoshi at [DevFest Bali 2022](https://gdg.community.dev/events/details/google-gdg-bali-presents-devfest-bali-2022/), where he delivered a talk on App Modernization via Orchestration.

### DevFest Singapore 2022
**Nov 26, 2022: Singapore**

The [DevFest Singapore 2022](https://gdg.community.dev/events/details/google-gdg-singapore-presents-devfest-singapore-2022/), hosted by [GDG (Google Developers Group) Singapore](https://gdg.community.dev/gdg-singapore/), was a platform for developers around the world to connect and network with. We had Cherish Santoshi, our Developer Relations Engineer, who addressed the gathering on how developers can build applications across various cloud environments, microservices & languages.

### DeveloperWeek Enterprise 2022
**Nov 16-17,  2022: Virtual**

In the 2-day virtual conference at [DeveloperWeek Enterprise 2022](https://www.developerweek.com/enterprise-2022-speaker/?s=Boney%20Sekh&se=Building%20a%20SaaS%20Platform%20using%20Orchestration&img1=https://sessionize.com/image/e02d-400o400o2-PRJfyTUGkLDinDw5KDQMEZ.png%0D&utm_source=feathr&utm_medium=network&utm_campaign=Boney%20Sekh&discount=FTSPKOPEN&event=DeveloperWeek%20Enterprise%202022) with over 3000+ attendees, we presented the opening talk,  ‘Building a SaaS platform using Orchestration’, which was delivered by Orkes CTO Boney Sekh.

### DevFest Nagpur 2022
**Nov 5-6, 2022: Nagpur, India**

Hosted by [Google Developer Groups (GDG), DevFest](https://devfestnagpur.in/) is one of the largest developer conferences. Our Developer Relations Engineer, Cherish Santhoshi, represented Orkes by delivering a talk on how big tech giants like Netflix & Tesla use orchestration to build resilient & scalable applications. 

### API World 2022
**Oct 25 - Nov 3,  2022**

[API World 2022](https://emamo.com/event/api-world-ai-devworld-2022) was both a virtual and in-person event. Our CEO, Jeu George delivered a workshop on Building an API Orchestrator at the [in-person event](https://emamo.com/event/api-world-ai-devworld-2022/r/speaker/doug-sillars) in San Jose, CA, and our Developer Relations Engineer, Cherish Santhoshi, delivered a [virtual talk](https://emamo.com/event/api-world-ai-devworld-2022/r/speaker/cherish-santoshi) on Building Resilient Applications Using Orchestration.

### KubeCon and CloudNativeCon 2022
**Oct 24-28,  2022: Detroit, Michigan, North America**

We marked our presence at [KubeCon + CloudNativeCon22](https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/) with our CTOs, Viren Baraiya, and Boney Sekh. We had highly productive conversations with engineers, product managers, executives, and various others from organizations across the globe on how to orchestrate their business issues using Conductor workflows.

### Orkes x MongoDB Meetup
**Oct 15, 2022: Hyderabad, India**

Another exciting event where we connected deeply with developers was at the [Orkes x MongoDB meetup](https://www.meetup.com/hyderabad-software-engineers/events/288724091/) in Hyderabad, India. This event, co-hosted by [Orkes](https://orkes.io/) & [MongoDB](https://www.mongodb.com/home), gathered together the developer community from across India, who were able to gain insights into Orkes and Conductor platform along with some great integration points between Orkes and MongoDB.

### IBC2022
**Sep 9-12, 2022: Amsterdam, Netherlands**

With over 37000+ attendees from 170 countries all over the world, [IBC2022](https://ibc22.mapyourshow.com/8_0/exhibitor/exhibitor-details.cfm?exhid=10870) was a great opportunity for the team at Orkes to meet with customers and industry experts in the media space. Our CEO, Jeu George, and CPO, Dilip Lukose, attended the event to showcase how Conductor can be custom tailored to meet various organizations' workflow needs. 

### DeveloperWeek Cloud 2022
**Sep 7-14, 2022: Austin, United States**

One of the earliest fests the Orkes team has attended this summer was [DeveloperWeek Cloud 2022](https://www.developerweek.com/global/conference/cloud/). Our CTO, Viren Baraiya, delivered an in-depth talk about orchestrating workflows using Conductor.