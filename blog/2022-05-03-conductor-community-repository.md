---
slug: announcing-conductor-community-repository
title: Announcing Conductor Community Repository
authors: orkes
tags: [Netflix Conductor, Orkes, open source, collaboration, 2022]
image: https://orkes.io/content/img/blogassets/collaboration.jpg
---

# Announcing Conductor Community Repository

> Tl;dr We are announcing a new community contribution repository for Conductor - https://github.com/Netflix/conductor-community, and Netflix and [Orkes](https://orkes.io) are partnering to co-manage it.

Conductor is a workflow orchestration engine developed and open-sourced by Netflix.  At Netflix, Conductor is the de facto orchestration engine, used by a number of teams to orchestrate workflows at scale.
If you are new to Conductor, we highly recommend taking a look at our [GitHub repository](https://github.com/Netflix/conductor) and [documentation](https://netflix.github.io/conductor/). 

Conductor was designed by Netflix to be extensible, making it easy to add or change components - even major components like queues or storage.  This extendability makes adding new features and tasks easy to incorporate, without affecting the Conductor core. These implementations are based on well-defined interfaces and contracts that are defined in the core conductor repository.

Since open sourcing Conductor, we have seen huge community adoption and active interest from the community providing patches, features and extensions to Conductor.  
Some of the key features that have been developed and contributed by the community into Conductor open source repository today are:

1. Support for Postgres and MySQL backends
2. Elasticsearch 7 support 
3. Integration with AMQP and NATS queues
4. GRPC support
5. Support for Azure blob stores
6. Postgres based external payload storage
7. Do While loops 
8. External Metrics collectors such as Prometheus and Datadog
9. Support for Kafka and JQ tasks 
10. Various bug fixes, patches including most recent the fix for log4j vulnerabilities and many other more features and fixes

The number of community contributions, especially newer implementations of the core contracts in Conductor has increased over the past few years. We love that Conductor is finding use in many other organizations (link to the list), and that these organizations are submitting their changes back to the community version of Conductor,

This increase in engagement and growth of the community, while incredible, is a double edged sword.  By no means does the Conductor team want to slow or limit these contributions, but the integration of third party implementations has been slower than we would like due to the team’s bandwidth.

In order to encourage (and to speed up the integration of) community-contributions to Conductor, we are announcing a new repository dedicated to supporting community contributions.  The repository will be hosted at https://github.com/Netflix/conductor-community and will be seeded with the existing community contributed modules. Further, we are partnering with Orkes (https://orkes.io/) to co-manage the community repository along with Netflix, helping us with code reviews and creating releases for the community contributions.

We think this new structure will enable us to review the PRs and community contributions in a timely manner and allow the community to be more autonomous  longer term.  

We will continue to publish artifacts from the community repository at the same maven coordinates under com.netflix.conductor group and the artifact names will remain the same with full binary compatibility.  This means that there is no change to users of Conductor: install, updates and usage remain the same.

Please see https://github.com/Netflix/conductor-community#readme for the details on the modules and release details.  You can also find [FAQs](https://github.com/Netflix/conductor-community#faq) that address the most common questions.

We look forward to continued engagement with the community making Conductor the best open source orchestration engine.

