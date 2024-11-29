# Visual Image Search

Visual image search technology enables users to search for information using images instead of text. Users can input an image, and the system identifies and retrieves relevant information, providing a more intuitive method of exploring content online.

With Orkes Templates, you can enhance your experience with visual image search. Instead of searching for keywords, you can input an image and allow the technology to analyze it.

The Orkes Templates take this experience to the next level by seamlessly fusing the capabilities of Computer Vision and Search APIs. By inserting an image URL into the template, [Microsoft Azure's Computer Vision APIs](https://learn.microsoft.com/en-us/rest/api/computer-vision/) analyze the image and extract visual features. Subsequently, leverages the Visual Search APIs to locate similar images across the internet.


## Conductor features used

- [Workflows](https://orkes.io/content/core-concepts)
- [HTTP Task](https://orkes.io/content/reference-docs/system-tasks/http)
- [JSON JQ Transform Task](https://orkes.io/content/reference-docs/system-tasks/jq-transform)
- [Fork/Join Task](https://orkes.io/content/reference-docs/operators/fork-join)

## How to use the template

Clicking on **Import** from the workflow explorer takes you to the workflow definition page, where you can see the workflow name as **VisualImageSearch**. You must modify this template with your APIs.

Let’s take a look at the workflow and how to run it!

<p align="center"><img src="/content/img/visual-image-search-workflow.png" alt="Visual Image Search Workflow" width="70%" height="auto"></img></p>

### Workflow Logic

The input parameters to this workflow are:

- **ImageUrl** - Provide the URL of the image to perform the visual search. Ensure the URL contains the image format; otherwise, the workflow will fail, indicating the same.

Now, let’s see how the workflow works!

- The first step in the workflow is an [HTTP task](https://orkes.io/content/reference-docs/system-tasks/http) that takes the workflow input URL and sends it to [Microsoft Azure's Computer Vision](https://learn.microsoft.com/en-us/rest/api/computer-vision/) API for image analysis. The API is configured to extract visual features like categories and descriptions. 
:::note
The template includes an internal Orkes testing URL with usage limits; consider using your API in the workflow.
:::
- The next step is the [JSON JQ Transform task](https://orkes.io/content/reference-docs/system-tasks/jq-transform), which processes the output from the previous task. It extracts the relevant information, such as tags and captions, from the analysis results using a JQ query. This task's output is a structured JSON object that consolidates this information.
- It is followed by a [Fork/Join task](https://orkes.io/content/reference-docs/operators/fork-join) with two forks running in parallel. Each fork contains a JSON JQ Transform task that extracts the image captions from the JSON response obtained from the previous task. 
- After completing these parallel tasks, the [join task](https://orkes.io/content/reference-docs/operators/join), which is part of the dynamic fork task, joins all the forks together.
- The output of the fork/join task is passed to the HTTP task that performs an image search on Bing using the [Bing Search API](https://www.microsoft.com/en-us/bing/apis). This task searches for images of the caption extracted from the fork tasks.
:::note
Replace the sample API with your Bing Search API.
:::
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

You can navigate to the Run Workflow button on the left side of your **Conductor UI** and select the workflow's name, the version to use, and the input parameters. Invoking the example variables through the UI is a great way to test this workflow.

<p align="center"><img src="/content/img/run-workflow-from-ui-visual-image-search.png" alt="Run Workflow from UI" width="70%" height="auto"></img></p>

Here, the input image used was:

<p align="center"><img src="/content/img/workflow-input-visual-image-search.png" alt="Input to the workflow" width="20%" height="auto"></img></p>

The output returned the following similar images: 

<p align="center"><img src="/content/img/workflow-output-visual-image-search.png" alt="Few sample output from the workflow" width="70%" height="auto"></img></p>

The image above contains only four samples from the output.