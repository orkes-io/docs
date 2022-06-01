---
slug: Breaking-up-Monolith-Architectures-Part-One
title: Breaking up Monolith Architectures Part One
authors: JamesWalker
tags: [Netflix Conductor, microservices, monolith, workflows, 2022]
---


# Breaking up Monolith Architectures Part One

![Architecture diagram comparing monoliths and microservices](https://imgur.com/gfIW09C.jpg)

Monoliths are systems developed as one homogeneous unit. The architecture revolves around a single focal point that contains the system’s entire functionality. Distinct logical areas such as the client-side UI and backend APIs are all developed within one unit.

Breaking up monoliths is one of the most common objectives of modern software refactoring. Untamed monoliths can become bloated beasts full of interlinked functionality that’s difficult to reason about and maintain. Breaking the architecture up to reflect the system's logical areas makes for a more manageable codebase and can accelerate the implementation of new features.

This article looks at what monoliths are, how they differ from modern microservice-based approaches, and how you can start to break up a monolithic system. As we'd be remiss to claim microservices are a perfect solution, we'll also assess the situations where this migration might not make sense.

## What's a Monolith?

"Monolith" has become a widely used term in the software industry, but it can mean slightly different things depending on who you ask. You’re probably dealing with a [monolith](https://en.wikipedia.org/wiki/Monolithic_application) if the system has multiple distinct units of functionality, but the project's codebase structure doesn’t mirror these. This results in little or no modularity within the system.

Monolith-based development strategies involve everyone working in the same repository irrespective of the type of feature they're building. User interface components sit side-by-side with business logic, API gateway integrations, and database routines. There’s little separation of concerns; components may directly interface with each other, resulting in fragility that makes it hard to make safe changes.

Here are some more common problems associated with monoliths:

- **Tight coupling:** When all your components sit alongside each other, it can be difficult to enforce rigid separation of concerns. Over time, pieces become tightly coupled to each other, preventing you from replacing components and making the accurate mapping of control flows more difficult.

- **Fragility:** The tight coupling observed in monolith systems leads to innate fragility. Making a change could have unforeseen consequences across the application, creating a risk of new problems each time you deploy a feature.

- **Cognitive burden:** Putting all your components into one functional unit makes it harder for developers to find the pieces they need and understand how these relate to each other. You need to keep the entire system’s operation in your mind, creating a cognitive burden that only grows over time. Eventually, the monolith becomes too complex to understand; at this point, more errors can start creeping in.

- **Longer build and deployment times:** Having everything in one codebase often leads to longer CI pipeline durations. Tools such as source vulnerability scanners, linters, and stylizers will take much longer to run when they have to look at all the code in your system each time they're used. Longer builds mean reduced throughput, limiting the amount of code you can ship each day. Developers can end up sitting idly while the automation runs to completion.

If you're experiencing any of the above, it might be time to start breaking up your monolith.

## How Did We Get Here? Or, Why Monoliths Prevail

Monoliths aren't without their benefits. Here are a few good reasons to use a monolith that help to explain why the strategy remains so pervasive:

- **Reduced overhead:** Not having to juggle multiple projects and manage the lifecycles of individual components does have advantages. You can focus more on functionality and get to work on each new feature straight away, without needing to set up a new service component. Please note that the simplicity of the monolith *strategy* is being considered here, not its impact on understanding the system you're encapsulating. As we've already seen, monoliths can make it harder to reason about characteristics of your system because everything is coupled together.

- **Easier to debug:** When problems occur in a monolith, you know they can only derive from one source. As your whole system is a single unit, log aggregation is simple, and you can quickly jump between different areas to inspect complex problem chains. Determining the root cause of issues can be trickier when using microservices because faults may ultimately lie outside the service that sent the error report.

- **Straightforward deployment:** Monoliths are easy to deploy because everything you need exists within one codebase. In many cases, web-based applications can be uploaded straight to a web server or packaged into an all-in-one container for the cloud. This is a double-edged sword: as shown above, your deployments will be rigid units with no opportunity for granular per-component scaling.

Though monoliths aren't all bad, it's important to recognize where things fall apart. Trouble often stems from teams not realizing they’re dealing with a monolith. This speaks to a disorganized development approach fixated on code, new features, and forward motion at the expense of longevity and developer experience.

Despite these pitfalls, monoliths can still be effectively used by *intentionally* adopting a similar structure. The [Monorepo approach](https://en.wikipedia.org/wiki/Monorepo), for example, uses one source control repository to encapsulate multiple logical components. You still break your system into loosely coupled units, but they can sit alongside each other in a single overarching project. This approach forces you to be deliberate in your design while offering some of the benefits of both monoliths and microservices. Many large organizations opt for a monolith-like approach, including [Google](https://research.google/pubs/pub45424) and [Microsoft](https://devblogs.microsoft.com/bharry/scaling-git-and-some-back-story).

## Why Should You Break up a Monolith?

Monoliths often develop organically over many years. Your codebase's silently growing scale may go unnoticed or be disregarded as a necessary by-product of the system's growth. The challenges associated with monoliths tend to become apparent when you need to scale your application or integrate a new technology.

A system treated as one all-encompassing unit makes it difficult to scale individual parts to meet fluctuations in demand. If your database layer starts to perform poorly, you'll need to "scale" by starting new instances of the entire application. Replacing specific components is similarly complex; they may be referenced in hundreds of places throughout the codebase, with no defined public interface.

Separating the pieces allows you to develop each one independently. This shields individual components from bugs in the broader system, helps developers focus on their specific areas, and unlocks the ability to scale your deployments flexibly. Now you can run three instances of your login gateway, two instances of your web UI, and a single replica of your little-used social media synchronization tool. This makes your system more efficient, lowering infrastructure costs.

Breaking up a monolith also gives you greater opportunities to integrate additional technologies into your stack. New integrations can be developed as standalone modules plugged in to your system. Other components can access the modules by making network calls over well-defined APIs, specifying what functionality is needed and how it will be used.

Monolith destruction often enhances the developer experience too, particularly in the case of new hires getting to grips with your codebase for the first time. Interacting with an unfamiliar monolith is usually a daunting experience that requires bridging different disciplines. Seemingly straightforward day-one tasks like adding a new UI component might need knowledge of your backend framework and system architecture, just to be able to pull data out of the tightly coupled persistence layer.

## An Alternative Approach: Microservice Architectures

Microservice architectures are the effective antithesis to the monolithic view of a system as a single unit. The microservice strategy describes an approach to software development where your distinct functional units are spun out to become their own self-contained services. The capabilities of individual services are kept as small as possible, adhering to the [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) and creating the "micro" effect.

Services communicate with each other through clearly defined interfaces. These usually take the form of HTTP APIs; services will make network calls to each other when they need to exchange data or trigger an external action. This decoupled approach is straightforward to extend, replace, and maintain. New implementations of a service have no requirements imposed on them other than the need to offer the same API surface. The replacement service can be integrated into your system by reconfiguring the application to call it instead of the deprecated version.

Microservices let you reason about logical parts of your stack in isolation. If you're working on a backend login system, you can concentrate on the parts that belong to it, without the distractions of your UI code. Changes are much less likely to break disparate parts of the system as each component can only be accessed by the API it provides. As long as that API remains consistent, you can be reasonably confident the broader application will stay compatible.

This architecture also solves the scalability challenges of monoliths. Splitting your application into self-contained pieces lets you treat each one as its own distinct deployment. You can allocate free resources to the parts of the system that most need them, reducing waste and enhancing overall performance.

Microservices do have some drawbacks, especially for people accustomed to a monolith approach. The initial setup of a distributed system tends to be more complex: you need to start each individual component, then configure the inter-component connections so services can reach each other. These steps require an understanding of your deployment platform's networking and service discovery capabilities.

Microservices can also be hard to reason about at the whole-system level. Fault sources are not always immediately clear. New classes of error emerge when the links between services are broken by flaky networking or misconfiguration. Setting up resilient monitoring and logging for each of your services is vital for tracing issues through the layers of your application. Microservice monitoring and log aggregation are distinct skills which have helped shape the modern operations engineer role, which is focused on the day-to-day deployment and maintenance of complex distributed systems.

Using an orchestration tool like [Netflix Conductor](https://conductor.netflix.com) - and using Orkes as a cloud based version of Conductor simplify many of these issues.

## Conclusion

Monolithic systems contain all their functionality within a single unit, which initially seems like an approachable and efficient way to add functionality and evolve a system over time.

In practice, monoliths are often unsuitable for today’s applications. Breaking up monoliths is an important task for software teams to guarantee stable, ongoing development at a steady pace. Separating a system into its logical constituent parts forces you to acknowledge, understand, and document the connections and dependencies within its architecture.

This article explored the problems with monoliths and looked at how microservice approaches help to address them. You also learned how monolith-like systems can still be effective when microservices aren't suitable. Deciding whether you should break up a monolith comes down to one key question: Is your architecture holding you back, making it harder to implement the changes you need? If the answer is yes, your system's probably outgrown its foundations and would benefit from being split into self-contained functional units.

When you are looking at breaking up your monolith into microservices, look at Conductor as a tool to orchestrate your microservices.