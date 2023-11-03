# Visual Image Search

Visual image search is a technology that allows users to search for information using images rather than text. Instead of typing keywords, users can input an image, and the system will identify and retrieve relevant information, making it a more intuitive way to explore and find content online.

With Orkes Templates, you're not just navigating the digital landscape; you're rewriting the rules of exploration. Picture this: instead of wracking your brain for the right keywords, you simply feed an image into the system, unleashing the magic of visual image search. It's like having a conversation with technology using the language of visuals.

The Orkes Templates take this experience to the next level by seamlessly fusing the capabilities of Computer Vision and Search APIs. Imagine dropping an image URL into the template, and voila! Microsoft Azure's Computer Vision APIs kick into action, unraveling the visual secrets of the image. But that's just the beginning.

Harnessing the power of Visual Search APIs, this template doesn't just stop at understanding the image; it goes on a quest to find its visual kindred spirits across the vast expanse of the internet. It's like having a digital bloodhound but for images.

So, whether you're a visual storyteller, a design maestro, or just someone who believes in the power of a picture, Orkes Templates redefine your online journey. It's not just a search; it's a visual symphony orchestrated by cutting-edge technology.

## Conductor features used

- [Workflows](https://orkes.io/content/core-concepts)
- [HTTP Task](https://orkes.io/content/reference-docs/system-tasks/http)
- [JSON JQ Transform Task](https://orkes.io/content/reference-docs/system-tasks/jq-transform)
- [Fork/Join Task](https://orkes.io/content/reference-docs/operators/fork-join)

## How to use the template

Clicking on **Import** from the workflow explorer takes you to the workflow definition page, where you can see the workflow name as **VisualImageSearch**. You can use this template as it is or modify it to suit your requirements.

Let’s take a look at the workflow and how to run it!

<p align="center"><img src="/content/img/visual-image-search-workflow.png" alt="Visual Image Search Workflow" width="70%" height="auto"></img></p>

### Workflow Logic

The input parameters to this workflow are:

- **ImageUrl** - Provide the URL of the image to perform the visual search. Ensure the image URL contains the image format; otherwise, the workflow will fail, indicating the same.

Now, let’s see how the workflow works!

- The first step in the workflow is an [HTTP task](https://orkes.io/content/reference-docs/system-tasks/http) that takes the workflow input URL and sends it to [Azure Cognitive Services](https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/cognitive-services) API for image analysis. The API is configured to extract visual features like categories and descriptions. 
- The next step is the [JSON JQ Transform task](https://orkes.io/content/reference-docs/system-tasks/jq-transform), which processes the output from the previous task. It extracts the relevant information, such as tags and captions, from the analysis results using a JQ query. The output of this task is a structured JSON object that consolidates this information.
- It is followed by a [Fork/Join task](https://orkes.io/content/reference-docs/operators/fork-join), which has two forks running in parallel. Each fork contains a JSON JQ Transform task that extracts the image captions from the JSON response obtained from the previous task. 
- On completing these parallel tasks, the [join task](https://orkes.io/content/reference-docs/operators/join), i.e., a part of the dynamic fork task, joins all the forks together.
- The output of the fork/join task is passed to the HTTP task that performs an image search on Bing using the Bing Search API. This task searches for images related to the caption extracted from the fork tasks. 
- The final task in the workflow is a JSON JQ Transform task that extracts the thumbnail URLs of the images from the Bing Image Search API response. 

The final output of the workflow contains similar image URLs along with their categories and descriptions. 

Of course, this is just a starting point. The power of the Conductor model is that you can customize this workflow (and any other ones!) to your needs. You can add additional steps to custom-tailor this workflow to best suit your business requirements. The possibilities are endless, and you can quickly build this workflow to do exactly what you want and, without any effort, scale it up as much as you want!

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

<p align="center"><img src="/content/img/run-workflow-from-ui-visual-image-search.png" alt="Run Workflow from UI" width="70%" height="auto"></img></p>

| [View Sample Execution](https://play.orkes.io/execution/67ffc938-62c6-11ee-973c-6e520ab7b222?tab=workflowInputOutput) |
|--------------------------------------------------------------------------------------------------|

Here, the input image used was:

<p align="center"><img src="/content/img/workflow-input-visual-image-search.png" alt="Input to the workflow" width="20%" height="auto"></img></p>

The output returned the following similar images: 

<p align="center"><img src="/content/img/workflow-output-visual-image-search.png" alt="Few sample output from the workflow" width="70%" height="auto"></img></p>

The above image contains only 4 samples that were generated. You can check the complete samples generated from the [Workflow Output tab of this execution](https://play.orkes.io/execution/67ffc938-62c6-11ee-973c-6e520ab7b222?tab=workflowInputOutput). 