---
sidebar_position: 1
---

# What is Conductor Playground?
Conductor Playground is a free sanbox environment for developers to try out and learn more about Conductor. It is fully hosted by Orkes and is run as a multi-tenant cluster. Developers should use playground for getting familiarized with what Conductor offers and once they are ready for using Conductor for their use cases, they have multiple ways to get going
* Use Orkes Cloud for a fully managed and hosted Conductor cluster deployed to your cloud. It comes with free and paid plans!
* Install and use the open source Conductor

The workflows that you create and execute will generally be persisted in the Playground so that when you come back next time, you can continue where you left off. Having said that, Playground doesn't offer any SLA on availability of the service or the data contained in it, and is not suited for production use.


# Logging in to Conductor Playground

When you navugate to https://play.orkes.io you will be prompted to sign-up for the Playground using your google account or using an email and password. Once you are logged in, you will be directed to the Playground which is essentially the Conductor UI with a additional links.

The next time you come to the playground, if your login session hasn't expired, you will be directed directly to the Playground UI. Otherwise you will have to re-login.

# Conductor Playground Components
The user experience is the same as the Conductor UI. The difference is that its running as a multi-tenant cluster with security perimeters between users so that your workflow definitions and its executions are visible only to you.

To learn more about the various components of Conductor, please start with the [Conductor Overview](../concepts/concepts-overview.md)

# Run the pre-installed workflows

In order for yout to get to the action right away with Conductor, the Playground comes pre-installed with a set of workflows. These can be executed from within the UI. 
**Note:** please note that the executions of these pre-installed workflows are shared across all Playground users, and as such, it is not recommended to use any input data or correlation id strings that you want to keep private

# Create a new workflow
You can use the Playground to create new workflows and execute them. These will be private and visible only to you. To learn mroe about creating new workflows, pelase visit [Creating a New Workflow](../../how-tos/Workflows/create-workflow.md)

# Give us feedback!
We would love to hear from you on how we can improve the Playground, this document and our products in general. Please use [this form](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g) to let us know.