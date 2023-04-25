---
slug: the-genesis-of-netflix-conductor-orkes
title: The Genesis of Netflix Conductor 
authors: jeu
tags: [Netflix Conductor, Orkes, Conductor, genesis, microservices, 2021]
---

<!--truncate-->
# Age of the Monoliths

Rewind the clock back a few years, the early 2000’s. Age of the Monoliths. It was very common to have large companies
run critical pieces of their software on large boxes. Scaling was only vertical. Single points of failure were common
scenarios that developers and operations often had to deal with. We have all heard stories of companies having
multi-hour , even multi-day outages. Social media wasn't a thing back then, so you usually heard it on news sites or by
word of mouth.

<img src="/content/img/blogassets/netflix-n.jpg" width="150" style={{paddingBottom: 40, paddingTop: 40}} />

# Netflix, AWS and Microservices

As companies grew bigger and the web market grew bigger (remember Web 2.0?), they soon realized the need for redundancy
and horizontal scaling. This led to on-prem data centers. As companies started to grow, more than 30% of companies' time
and resources went into managing these data centers. That was a significant bit of distraction and lack of focus on the
core business of the company. Around 2006, Amazon saw this opportunity and created AWS, starting with their EC2
services. During this time, Netflix was going through the same set of challenges like everyone else, but their user base
was growing and there was an early bet done by Reed Hastings to pivot the company's future from the DVD business (which
was still the biggest revenue maker) to Streaming. If the bet proved successful, the potential growth of streaming would
be a really large scale. And if that happened, the company had to be focused on the core of that business (Content
Acquisition, Personalization, Content Creation, Streaming etc. at planet scale) and not spend their resources on
building a world class cloud infrastructure. The decision was made to move completely to AWS.

<img src="/content/img/blogassets/1024px-Amazon_Web_Services_Logo.png" width="120" style={{paddingBottom: 40, paddingTop: 40}} />

# Poster Child of Cloud Computing

Netflix was the very first company of its size to operate completely in the cloud. The whole paradigm shift in building
scaling applications using microservices architecture came out of this. Netflix became the poster child of cloud
computing. In the early days, AWS tooling wasn't as rich as what you see today. Netflix built out a lot of this, open
sourced it. Understandably, Amazon adopted a lot of these principles and made it available on the AWS platform.

# Golden Era of Microservices - The Beginning

The next 10 years and counting were the golden years of cloud computing and adoption of microservices architecture.
Azure, GCP and other providers followed suit as this industry blossomed. This also led to the birth of many startups in
this microservices space. Traditionally, what used to be done using desktop software, was now moving to the cloud.
Checkpoint became Z-Scaler, Tape drives became S3. Every segment of computing was now done in the cloud.

# Microservice Orchestration

This explosion in microservices was natural, given the move to the cloud, but then led to another interesting problem,
Orchestration challenges. Things that were typically done by simple function calls in monolith systems became harder to
do in the cloud. There were new dimensions to deal with, network fault tolerance, distributed transactions, service
discovery and many more. It isn't uncommon today to have more microservices than people in a company. This is true
regardless of the size of the company. Netflix, being the pioneer of microservices architecture saw this problem first.
To solve these orchestration challenges, there were several homegrown one off solutions, including peer to peer
orchestration solutions, orchestration through messaging platform based solutions, using things like Kakfa. None of
these really solved the problems that came with the microservice explosion. Netflix conductor was created out of this
need.

<img src="/content/img/blogassets/conductor-vector-x.png" width="250" style={{paddingBottom: 40, paddingTop: 40}} />

# The Birth of Conductor

As Netflix was moving its business from DVDs to streaming, the initial catalogue on the services were mostly licensed.
Licensed content however, did not provide enough differentiation to its competitors, since everyone was trying to pay for
the same pieces of content, leading to a low margin, high cost business model. Netflix, made another big bet, marking
its entry into Original programming. After seeing early signs of success, Netflix made a push to become the largest
studio in the world. Conductor was born out of this need. Netflix developers were known for doings at breakneck speed,
using very low resources. The true 10x developer !. Doing this fast, doing it without re-architecting existing systems.
Conductor was built with this in mind. It was designed to fit brownfield applications. It was designed to be language
agnostic. It was designed for operational excellence. It was designed to debug and fix things fast, when systems fail.
The very first use case for conductor was to solve for a new type of content in Netflix. Interactive Content!. It
started with kids programming and eventually moved to the mainstream with movies like Bandersnatch (Black Mirror!!) With
time it found its footprint across the entire company, it is now the service of choice for microservice and workflow
orchestration.


<img src="/content/img/blogassets/Netflix-OSS-Logo.png" width="250" style={{paddingBottom: 40, paddingTop: 40}} />

# Open Source and Industry Usage

While the focus of the company was to build the best streaming service in the world, it also led to the birth of several
great pieces of software. Netflix used a lot of open source software for its needs and also decided to contribute
towards it. Netflix OSS initiative was a part of this effort. Conductor was built as a general purpose orchestration
engine. It helped Netflix solve critical problems in the microservices space and it became a natural fit for Netflix
OSS.

Open Sourcing Conductor enabled several large and popular companies like Tesla, GitHub, Redfin and many more, to not
just use Conductor but also contribute back to it. Conductor, being built as a general purpose, language and cloud
agnostic engine further accelerated its adoption. Today, it is the software of choice, when it comes to microservice and
workflow orchestration.

<img src="/content/img/branding/orkes-logo-purple-2x.png" />

# Orkes

The industry in general, lagged the adoption of this microservices architecture by around five years after Netflix made
the big move. As these companies and newer ones continue to adopt this paradigm, orchestration challenges that Netflix
faced early on, are now becoming a burning problem in the industry. Just like AWS saw an opportunity and doubled down on
it, in the infrastructure space, Orkes is doing the same in the orchestration space. Orkes’ mission is to continue to
build a world-class, highly reliable orchestration service. The founding team of Orkes also comprises the original
founding team of Netflix Conductor. [Learn more about Orkes](https://orkes.io "Microservices and Workflow Orchestration at scale")


[Join the Orkes Conductor Slack community here](https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg "Join the Conductor Slack Community")

[Want to work at Orkes?](https://jobs.lever.co/Orkes/ "Apply to Jobs at Orkes" )


