---
slug: workflows-as-recipe
title: What are workflows? A recipe analogy
authors: doug
tags: [Netflix Conductor, Orkes, microservices, workflow, 2022]
image: https://orkes.io/content/img/blogassets/recipe.jpg
---

What is a workflow?  Wikipedia says "A workflow consists of an orchestrated and repeatable pattern of activity, enabled by the systematic organization of resources into processes that transform materials, provide services, or process information."

None of that is incorrect.  But it is certainly a mouthful.  If I am asked in an elevator what a workflow orchestration is, I like to use analogies to make the point as approachable as possible:


 "It's like a recipe for code. A recipe has a series of steps, that must be run in a specific order.  Iyt can also have different options for food allergies, or different ingredients you might have on hand?  A workflow is a recipe for your code, and can be built to handle many of the changes that might reasonably occur when the code runs."

## Workflows as recipes

You may have seen one of the name videos out there of parents teaching kids code by writing out the steps to create a Peanut butter and Jelly sandwich.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/Ct-lOOUqmyY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


We're not going to be quite as silly as that Dad, but we'll run through some instructions on how to [create a PB&J](https://www.instructables.com/How-to-Make-a-Peanut-Butter-and-Jelly-Sandwich-4/) from Instructables..  

> If you look at the URL of that recipe - it appears it took 4 tries to get it right :D https://www.instructables.com/How-to-Make-a-Peanut-Butter-and-Jelly-Sandwich-4/

The steps are (skipping some substeps for clarity):

1. Gather Your Ingredients for the Sandwich
2. Pull Out Two Slices of Bread
3. Open Peanut Butter and Jelly
4. Spread the Peanut Butter Onto One Slice of Bread
5. Spread the Jelly Onto the Other Slice of Bread
6. Combine the Two Slices
7. Clean Up Your Workspace
8. Enjoy Your Sandwich

(if you read closely, I skipped 3 steps - wearing gloves, removing the crust and cutting the sandwich in half... because, well - that's all just ridiculous)

The eight steps above are a workflow.  They must be performed in that order to create a sandwich - you cannot spread the PB before you lay out the bread.

## Building a Conductor Workflow

We can turn these 8 steps into a Conductor workflow. 
<p align="center"><img src="/content/img/blogassets/pbj1.png" alt="PB&J example workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

> If you'd like to see the definition of this workflow, you can check out the code on the [Orkes Playground](https://play.orkes.io/workflowDef/PBJ/1). It's free to sign up.


This workflow shows clear steps with arrows pointing to the next step - so it is visually possible to see how the workflow will progress.

## Improving the workflow

Each task is run by a microservice, so making changes and adding tasks is easy to do. In this example - you see that the recipe calls for PB to be spread first, and then the jelly.  This works for a single human - these steps each take 2 hands.  But there is no reason that the jelly cannot go first, and THEN the PB.  Or - if you had more hands - the PB and the Jelly could be spread simultaneously.

### Independent tasks

Let's remove the PB dependency from the jelly spreading - as the order of PB vs. jelly does not matter.

We can do this in Conductor with a [FORK](https://orkes.io/content/docs/reference-docs/fork-task).  A fork splits your workflow into 2 asynchronous tasks, and then a [JOIN](https://orkes.io/content/docs/reference-docs/join-task) reconnects the the workflow into a single path.

We can now apply a fork to apply PB, and a second fork to apply the jelly:

<p align="center"><img src="/content/img/blogassets/pbj2.jpg" alt="PB&J example workflow" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This is version 2 of the workflow, and you can see it in the [playground](https://play.orkes.io/workflowDef/PBJ/2)

Now, these operations are independent, and if there is space in the jelly task queue - that can be completed ahead of the PB.

## Recipe variations

Often, recipes have variations to preparation, and they can be read like an IF statement in programming (If (fresh tomatoes) {do x}, else if (tinned tomatoes) {do y}.


### Cooking a burrito

Let's look at a common example - from a burrito in my freezer.  The preparation directions vary depending on the cooking method.

<p align="center"><img src="/content/img/blogassets/burrito.jpg" alt="burrito instructions" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>


We can emulate this in a workflow using a switch task.  The Switch task takes in the workflow ovenType input ```${workflow.input.ovenType}``` and based on this value will make a decision.  The default case is for the microwave, and then second ```decisionCase``` is set to "oven".  From that input, the different tasks can be run.

<p align="center"><img src="/content/img/blogassets/burrito_workflow.png" alt="burrito workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>


## Conclusion

Workflows are a series of tasks that must be followed in a certain order. In this post, we used cooking recipes as an analogy to a workflow - they too are a series of tasks that must be followed in a certain order.

We created sample workflows for making a peanut and jelly sandwich ([version 1](https://play.orkes.io/workflowDef/PBJ/1) and [version2](https://play.orkes.io/workflowDef/PBJ/2)) and another workflow to cook a [frozen burrito](https://play.orkes.io/workflowDef/burrito) with microwave or oven instructions.

<<<<<<< Local Changes
We are able to reuse a number of tasks:

* The ```zap``` task is used twice in the microwave branch.
* The ```bake``` task in the oven branch.
* The ```flip``` task is used in both branches.

When reusing tasks, the ```taskReferenceName``` (shown at the top of the box) must be unique.=======
If you're curious about how to build a workflow orchestration - it might be a fun exercise to try your favorite recipe as a workflow.  You can build on the workflows from this post in our free playground.  Feel free to share what you came up with in our [Discord](https://discord.gg/pYYdYsYTAw). We love seeing creative uses of workflows!>>>>>>> External Changes
