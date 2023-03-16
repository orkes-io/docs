# Use Case: Video Processing Workflow

The [video_recipes.json](https://github.com/conductor-sdk/conductor-examples/blob/main/video_processing/video_recipes.json) workflow has several potential invocations.

You can find two example invocations of the workflow that do slightly different tasks here:

1. [Video Transcoding](#video-transcoding): Take one video and convert it into different formats.
2. [Watermark a video](#video-watermarking): Add a watermark to your video, and upload it to S3.

| [Try it in Orkes Playground](https://play.orkes.io/workflowDef/video_recipes/1) |
| ------------------------------------------------------------------------------- |

## Setting up Workers

The workers that power these workflows can be found in the [orkesworkers](https://github.com/orkes-io/orkesworkers) GitHub repository. There are 2 workers used here:

1. video_recipes_prefork: This worker takes the input parameters and creates all the parameters required for the dynamic forks, i.e; the number of forks to be created and the parameters for each of the forks.
2. video_recipes: This worker takes the inputs and (in the 2 examples below) either transcodes or adds a watermark to the video.

:::note
These workers are configured to run in Orkes Playground by default.
:::

## Video Transcoding

### Workflow definition

The video_recipes.json workflow (see it live on [Orkes Playground](https://play.orkes.io/workflowDef/video_recipes)) is a general-purpose workflow designed for doing various recipes around video processing. One of the provided recipes includes `transcode`.

You need to provide the following input parameters:

- fileLocation: A http location to a video file
- recipeInfos: An array of recipe names (‘transcode’, ‘watermark’ etc..) and their corresponding parameters, i.e; recipeParmaters
- outputSizes: An array of sizes. Each size object has a width and height property

Here is an example of an input payload to transcode an mp4 file into 4 different formats and encodes

```json
{
  "fileLocations": [
    "https://file-examples.com/storage/fe9e2635216297e77988972/2017/04/file_example_MP4_480_1_5MG.mp4"
  ],
  "recipeInfos": [
    {
      "recipe": "transcode",
      "recipeParameters": {
        "videoEncoder": "h264",
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioBitRate": 27780,
        "audioSamplingFrequency": 96000,
        "outputFileFormat": "mp4"
      }
    },
    {
      "recipe": "transcode",
      "recipeParameters": {
        "videoEncoder": "h264",
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioBitRate": 27780,
        "audioSamplingFrequency": 96000,
        "outputFileFormat": "mov"
      }
    },
    {
      "recipe": "transcode",
      "recipeParameters": {
        "videoEncoder": "libvpx",
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "libvorbis",
        "outputFileFormat": "webm"
      }
    },
    {
      "recipe": "transcode",
      "recipeParameters": {
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioBitRate": 27780,
        "audioSamplingFrequency": 96000,
        "outputFileFormat": "mp4"
      }
    }
  ]
}
```

- Transcode mp4 into h264 mp4 with aac audio and different bit rates, frame rates and audioSamplingFrequency
- Transcode mp4 into h264 mov with aac audio and different bit rates, frame rates and audioSamplingFrequency
- Transcode mp4 into libvpx webm with libvorbis audio and different bit rates, frame rates and audioSamplingFrequency
- Transcode mp4 into another mp4 with the same encoder as input but with aac audio and different bit rates, frame rates and audioSamplingFrequency

### Visual Workflow Definition

You can view the [video_recipes](https://play.orkes.io/workflowDef/video_recipes) workflow in Playground.

![screenshot of the workflow](https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/video_processing/images/video_recipes.jpg)

### Invoking a Workflow

The workflow can be invoked using the following ways:

UI: There is a _Run Workflow_ option in the Conductor UI to invoke a workflow and see the results.

![run workflow screenshot](https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/video_processing/images/run_video_recipes.jpg)

### Workflow Executions

You can view a specific workflow invocation using the workflow invocation ID that is returned as part of the invocation. For example, the successful [execution](https://play.orkes.io/execution/978dc7e7-e238-11ec-a6d8-32508b865be6) of the workflow.

You can also view a workflow's execution from the workflow execution console. In the execution view, you have multiple tabs showing the workflow name, workflow ID, start/end time, status of the workflow, etc.

![screenshot of workflow search](https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/video_processing/images/workflow_execution.jpg)

### Invocation path

Input and outputs of the workflow

Input

```json
{
  "fileLocations": [
    "https://file-examples.com/storage/fe9e2635216297e77988972/2017/04/file_example_MP4_480_1_5MG.mp4"
  ],
  "recipeInfos": [
    {
      "recipe": "transcode",
      "recipeParameters": {
        "videoEncoder": "h264",
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioBitRate": 27780,
        "audioSamplingFrequency": 96000,
        "outputFileFormat": "mp4"
      }
    },
    {
      "recipe": "transcode",
      "recipeParameters": {
        "videoEncoder": "h264",
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioBitRate": 27780,
        "audioSamplingFrequency": 96000,
        "outputFileFormat": "mov"
      }
    },
    {
      "recipe": "transcode",
      "recipeParameters": {
        "videoEncoder": "libvpx",
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "libvorbis",
        "outputFileFormat": "webm"
      }
    },
    {
      "recipe": "transcode",
      "recipeParameters": {
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioBitRate": 27780,
        "audioSamplingFrequency": 96000,
        "outputFileFormat": "mp4"
      }
    }
  ]
}
```

Output

```json
{
  "fileLocations": {
    "video_recipes_file_example_MP4_480_1_5MG.mp4_transcode_0": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/991fa7d0-3b13-4940-9265-6cc328d38f91-TRANSCODE.mp4",
      "recipe": "TRANSCODE",
      "recipeParameters": {
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioSamplingFrequency": 96000,
        "audioBitRate": 27780,
        "videoEncoder": "h264",
        "outputFileFormat": "mp4"
      }
    },
    "video_recipes_file_example_MP4_480_1_5MG.mp4_transcode_1": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/5abf642a-5fc3-49ac-b83c-f6e6c047c3cb-TRANSCODE.mov",
      "recipe": "TRANSCODE",
      "recipeParameters": {
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioSamplingFrequency": 96000,
        "audioBitRate": 27780,
        "videoEncoder": "h264",
        "outputFileFormat": "mov"
      }
    },
    "video_recipes_file_example_MP4_480_1_5MG.mp4_transcode_2": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/84e9a990-d586-48c3-b04b-917e16d3ae72-TRANSCODE.webm",
      "recipe": "TRANSCODE",
      "recipeParameters": {
        "videoBitRate": 971520,
        "frameRate": 24,
        "audioEncoder": "libvorbis",
        "videoEncoder": "libvpx",
        "outputFileFormat": "webm"
      }
    },
    "video_recipes_file_example_MP4_480_1_5MG.mp4_transcode_3": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/11865799-b573-4623-8e3c-4786df25a996-TRANSCODE.mp4",
      "recipe": "TRANSCODE",
      "recipeParameters": {
        "frameRate": 24,
        "audioEncoder": "aac",
        "audioSamplingFrequency": 96000,
        "audioBitRate": 27780,
        "outputFileFormat": "mp4"
      }
    }
  }
}
```

You can see that the output blob has 4 different transcoded videos.

- [webm formatted video](https://image-processing-orkes.s3.amazonaws.com/84e9a990-d586-48c3-b04b-917e16d3ae72-TRANSCODE.webm)

- [mov formatted video](https://image-processing-orkes.s3.amazonaws.com/5abf642a-5fc3-49ac-b83c-f6e6c047c3cb-TRANSCODE.mov)

## Video Watermarking

Here you deal with the same workflow, but by changing the input parameters, you can obtain a different result.

### Input parameters

The recipe changes to `watermark`, and there is just one `recipeParameters`, the `watermarkFileLocation`.

```json
{
  "fileLocations": [
    "https://image-processing-sandbox.s3.amazonaws.com/test-files/V3c0kxFjLsk-CCL-Youtube.mp4"
  ],
  "recipeInfos": [
    {
      "recipe": "watermark",
      "recipeParameters": {
        "watermarkFileLocation": "https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png"
      }
    }
  ]
}
```

### Output parameters

```json
{
  "fileLocations": {
    "video_recipes_V3c0kxFjLsk-CCL-Youtube.mp4_watermark_0": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/86daa8e3-e35f-42dc-94d2-94092ce366a8-WATERMARK.mp4",
      "recipe": "WATERMARK",
      "recipeParameters": {
        "watermarkFileLocation": "https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png"
      }
    }
  }
}
```
