---
slug: "/developer-guides/getting-started-with-orkes-template-explorer"
description: "Get started by using the available templates on Orkes Platform to build your Conductor workflows."
---

# Getting Started with Orkes Template Explorer

Orkes Template Explorer offers a versatile collection of pre-designed templates. These templates are not only ready to use right out of the box but also highly customizable to align with your specific enterprise needs.

In this guide, we'll walk you through the process of getting started with Orkes Templates.

## Importing Workflow Using Templates

Follow these steps to import workflows using the template,

1. Navigate to **Template Explorer** from the left menu, on your Orkes Conductor cluster.
2. Browse through the templates and choose the one that fits your use case.
3. Click **Import**. You can also get the template repository link directly from here.

<p align="center"><img src="/content/img/workflow-template-explorer.png" alt="Workflow Template Explorer" width="100%" height="auto"/></p>

4. A pop-up displaying the chosen template's task names and workflow names appears. Append the workflow/task name to avoid any duplication.

<p align="center"><img src="/content/img/importing-workflows-in-workflow-template-explorer.png" alt="Importing Workflows via Workflow Template Explorer" width="40%" height="auto"/></p>

5. Instantly, the workflow gets created, and you can update the required parameters with your credentials.

<p align="center"><img src="/content/img/imported-workflow.png" alt="Imported Workflows via Workflow Template Explorer" width="100%" height="auto"/></p>

6. Execute the workflow using the **Run Workflow** button from the left menu. 

With these simple steps, you can generate and execute the workflow within seconds, saving you hours.

:::note
To execute certain templates, configuring workers may be necessary. The [Orkes Template](https://github.com/orkes-io/orkes-templates) repository includes these workers, and all you need to do is update the worker with your required credentials. Detailed instructions for updating the repository specific to your template can be found in the corresponding documentation.
:::

Refer to the corresponsing documentation for running the templates:
* [Automatic Subtitle Generator](https://orkes.io/content/templates/automatic-subtitle-generator)
* [StandUp Bot](https://orkes.io/blog/create-standup-bot-using-conductor-slack-integration/)
* [Availability Monitoring for HTTP(S) Endpoints](https://orkes.io/content/templates/availability-monitoring-for-http-endpoints)
* [Video Processing Workflow](https://orkes.io/content/templates/video-processing-workflows)
* [Video Transcoding](https://orkes.io/content/templates/video-processing-workflows)
* [Image Filter Effects](https://orkes.io/content/templates/image-effects)
* [Visual Image Search](https://orkes.io/content/templates/visual-image-search)
* [Document Classifier](https://orkes.io/content/templates/document-classifier)
* [Video Watermark](https://orkes.io/content/templates/video-processing-workflows)