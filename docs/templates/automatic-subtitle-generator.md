---
slug: "/templates/automatic-subtitle-generator"
description: "Use this template to build an AI-enabled automatic subtitle generator."
---

# Automatic Subtitle Generator

In the fast-paced realm of technology, manual tasks are becoming a thing of the past. Our cutting-edge workflow takes the reins, transforming the time-consuming process of transcribing video subtitles into a seamless, automated symphony.

With this Orkes template, you can now easily generate subtitles for videos without manually transcribing each segment. The workflow takes care of splitting the video, transcribing each part in parallel, and then merging everything back together. 

It's a time-saving and efficient way to add subtitles to your videos, especially if you have a large number of them. This automation can be particularly useful for content creators, video editors, or anyone who wants to make their videos more accessible by providing subtitles.

## Conductor features used

- [Workflows](https://orkes.io/content/core-concepts)
- [Simple Task](https://orkes.io/content/reference-docs/worker-task)
- [JSON JQ Transform Task](https://orkes.io/content/reference-docs/system-tasks/jq-transform)
- [Dynamic Fork/Join Task](https://orkes.io/content/reference-docs/operators/dynamic-fork)

## How to use the template

Clicking on **Import** from the workflow explorer takes you to the workflow definition page, where you can see the workflow name as **automatic_subtitle_generator**. You can use this template as it is or modify it to suit your requirements.

Let’s take a look at the workflow and how to run it!

<p align="center"><img src="/content/img/automatic-subtitle-generator-workflow.png" alt="Automatic Subtitle Generator Workflow" width="60%" height="auto"></img></p>

### Workflow Logic

The input parameters to this workflow are:

- **fileLocation** - Provide the source URL of the video file whose subtitle is to be generated. 
- **outputFileNamePrefix** - Provide the prefix to be used for the output file name.
- **durationInSeconds** - Provide the duration of the video in seconds.
- **outputFileFormat** - Provide the intended format for the output file. 

Now, let’s see how the workflow works!

- The first step in the workflow is a [Simple (Worker task)](https://orkes.io/content/reference-docs/worker-task) that splits the input video into different files for easier processing. This is a worker task, meaning a worker is to be set up outside the Conductor environment. However, for ease of demonstration, we have set up the worker, and it will execute your task for seamless understanding of the template. 
- The next step is the [JSON JQ Transform task](https://orkes.io/content/reference-docs/system-tasks/jq-transform), which processes the output from the previous task. It extracts the relevant information from the analysis results using a JQ query. The output of this task is a structured JSON object that consolidates this information.
- It is followed by a [Dynamic Fork/Join task](https://orkes.io/content/reference-docs/operators/dynamic-fork), which runs the transcription process in parallel by transcribing the split video sections concurrently and then joining the results back together. This approach could speed up the transcriptions of large videos.
- The output of the dynamic fork/join task is passed to the [JSON JQ Transform task](https://orkes.io/content/reference-docs/system-tasks/jq-transform) that transforms the transcribed data using a JQ query.
- The final task is a [Simple (Worker task)](https://orkes.io/content/reference-docs/worker-task) that takes the transformed subtitle data from the previous task, along with some additional parameters and performs the task of merging subtitles with the original video.

The final output of the workflow contains the merged video with subtitles and also the subtitle file. 

### Workflow Invocation 

You can invoke the workflow in many different ways. 

#### REST

As with any workflow in Conductor, you can invoke it by calling the REST endpoint of the Conductor server and specifying the workflow name, version, and input data.

You can use the following API to start a workflow execution:

```
POST /api/workflow/{name}
```

Refer to the [start workflow API doc](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution) for more info. 

#### Conductor UI

You can navigate to the **Run Workflow** button on the left side of your Conductor UI, and from there, select the workflow's name, the version to use, and the input parameters. Using the example variables to invoke through the UI is a great way to test this workflow.

<p align="center"><img src="/content/img/run-workflow-from-ui-automatic-subtitle-generator.png" alt="Run Workflow from UI" width="70%" height="auto"></img></p>

You can check the ***Workflow Input/Output*** tab for the finalized video output along with the subtitle file.

<p align="center"><img src="/content/img/workflow-output-automatic-subtitle-generator.png" alt="Workflow Output" width="100%" height="auto"></img></p>