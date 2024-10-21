# Video Processing Workflows

Video processing refers to the process of optimizing video files from one format to another to suit different devices/platforms. The format/quality/size of the videos to deliver varies depending on the business requirements. If the video is streaming among different types of devices, such as mobile phones or TVs, the video's bitrate should be different. The look and feel of viewing videos also vary with the device models, operating systems, etc. It can also help improve the video's quality by converting it to different codecs or formats. 

With Orkes Templates, you can execute the workflow to align with your video transcoding requirements. This template gives you an out-of-box experience, where you must input the video file with the required elements, and the workflow transcodes the video to suit your requirements. In addition, you can also add a watermark image to the transcoded files. 

In this video transcoding template, we’ve included the concept of external workers. If you aren’t familiar with this, the workflows can have two types of tasks. One is the system task that runs on the Conductor server. The second type is the worker tasks that require a worker to be set up outside the Conductor environment. 

You can use transcoders from any vendor in this template, and Orkes Conductor will orchestrate the workflow. We have implemented the worker as a Java project that utilizes the popular FFmpeg transcoder. You can use this template directly or replace the transcoder with vendors of your choice. 

## Conductor features used

- [Workflows](https://orkes.io/content/core-concepts)
- [Simple Task](https://orkes.io/content/reference-docs/worker-task)
- [Dynamic Fork](https://orkes.io/content/reference-docs/operators/dynamic-fork)
- [Task to Domain](https://orkes.io/content/developer-guides/task-to-domain)

## How to use the template

Clicking on **Use This Template** from the workflow explorer takes you to the workflow definition page, where you can see the workflow name as **video_recipes**. You can use this template as it is or modify it to suit your requirements.

Let’s take a look at the workflow and how to run it!

<p align="center"><img src="/content/img/video-encoding-workflow.png" alt="Video Encoding Workflow" width="50%" height="auto"></img></p>

### Workflow Logic

The input parameters to this workflow are:

- **fileLocations** - Indicates an array of files containing the locations of the videos to be processed by the workflow. 
- **recipeInfos** - Specifies the information about how the video is to be processed. The template currently supports two types of recipes: **watermark** and **transcode**. 
- For the **watermark** effect, the input parameters look like this:
```
{
 "recipeInfos": [
   {
     "recipe": "watermark",
     "recipeParameters": {
       "watermarkFileLocation": "https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png"
     }
   }
 ],
 "fileLocations": [
   "https://image-processing-orkes.s3.amazonaws.com/nasa-artemis1-launch.mp4"
 ]
}
```
You need to provide the **watermarkFileLocation**, i.e., the location of the file to be added as the watermark.

- For the **transcode** effect, the input parameters look like this:

```
{
 "fileLocations": [
"https://image-processing-orkes.s3.amazonaws.com/nasa-artemis1-launch.mp4"
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
   }
 ]
}
```

Here, you can provide the required transcode parameters such as **videoEncoder**, **videoBitRate**, **frameRate**, **audioEncoder**, **audioBitRate**, **audioSamplingFrequency**, and **outputFileFormat**.

Now, let’s see how the workflow works!

- The first step in the workflow is a [Simple task](https://orkes.io/content/reference-docs/worker-task), which is a task defined prior to the dynamic fork task. This task takes the workflow input and creates the input arrays required for the dynamic fork task.
- The next step is the [Dynamic Fork Join task](https://orkes.io/content/reference-docs/operators/dynamic-fork), which processes the output from the previous task as its input. Here, the task dynamically determines the number of forks to be created based on the input data. For example, if a video file is to be transcoded into four different formats, the fork task dynamically spawns four parallel tasks. 
- The dynamic fork tasks need a worker for polling. For this, an external worker with a proper task to domain mapping needs to be written. This template implements a Java worker that utilizes an **FFmpeg** transcoder for transcoding the images.
- On completing these parallel tasks, the [join task](https://orkes.io/content/reference-docs/operators/join), i.e., a part of the dynamic fork task, joins all the forks together. 
- The output of the dynamic fork task is stored in a location. This output is fed as the final workflow output with the transcoded video files. In this template, the output files are stored in an **Orkes-owned Amazon S3 bucket**.  

### Setting Up Worker

The template requires a worker to run the tasks. This section will walk you through the steps to write an external worker. 

If you want to run the workflow quickly, you can try to run them in Orkes Developer Edition. Since you haven’t set up the worker here, our Orkes workers will complete the task. Let’s see how to run this in the Developer Edition. 

| [Run Video Recipe in Developer Edition](https://developers.orkes.cloud/runWorkflow) |
|------------------------------------------------------------------------------| 

1. Under **Workflow name**, choose the workflow **video_recipe.**
2. Provide the **inputFileLocation** and **recipeInfos**. You can use the following example:
```
{
 "recipeInfos": [
   {
     "recipe": "watermark",
     "recipeParameters": {
       "watermarkFileLocation": "https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png"
     }
   }
 ],
 "fileLocations": [
   "https://image-processing-orkes.s3.amazonaws.com/nasa-artemis1-launch.mp4"
 ]
}
```

:::note
We have used a video downloaded from [NASA Image and Video Library](https://images.nasa.gov/details/A1Launch) and stored in an [Orkes location](https://image-processing-orkes.s3.amazonaws.com/nasa-artemis1-launch.mp4). The watermark image used is the [Orkes logo](https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png).
:::

3. Click **Run Workflow**.

When the workflow execution begins, the **orkesworkers** catch up the tasks, and the workflow gets completed. 

| [View Sample Execution](https://play.orkes.io/execution/963cb659-be59-11ed-99ea-b2b080784892) |
|------------------------------------------------------------------------------| 

The workflow output is stored in an Orkes-owned Amazon S3 bucket. In the output file, you can see the transcoded video with the Orkes logo as the watermark.

| [View Sample Output with Watermark Recipe](https://image-processing-orkes.s3.amazonaws.com/f380e542-3a9c-486c-aecf-f91b855f7b36-WATERMARK.mp4) |
|------------------------------------------------------------------------------| 

### Writing External Workers

**Pre-requisites**

**Install FFmpeg** - Ensure you have installed the FFmpeg transcoder on the local machine where the worker will be set up.

| [Download and Install FFmpeg](https://ffmpeg.org/download.html) |
|------------------------------------------------------------------------------| 

:::note
If your device doesn’t have the FFmpeg installed/not appropriately configured, you may encounter errors while running the worker. 
:::

#### Download Java project from Orkes

Next, download the [Java project for Video Transcoding](https://github.com/orkes-io/orkes-templates/tree/main/video-processing/workers/java/src/main/java/io/orkes/samples/workers) from the GitHub repository. 

1. Navigate ​​to the [Orkes Template repository](https://github.com/orkes-io/orkes-templates) and click the **Code** button in the top right corner.
2. Click **Download ZIP**. 
3. Extract the content of the ZIP file to a directory on your device.
4. Open the directory on any IDE of your choice.
5. Create a new project and specify the directory where the extracted content from the ZIP file is stored as the project location.
6. Open the [Java project for Video Transcoding](https://github.com/orkes-io/orkes-templates/tree/main/video-processing/workers/java/src/main/java/io/orkes/samples/workers).

:::tip
While creating the project, as a best practice, removing all other template examples is recommended for a hassle-free experience.
:::

The worker file contains two workers:

- **VideoRecipesPreForkWorker** - This worker takes the workflow input and creates the input for the dynamic fork task.
- **VideoRecipeWorker** - This worker checks the type of recipe, runs the FFmpeg to process the video, and uploads the output file to the Orkes-owned Amazon S3 bucket. This URL from the S3 bucket is the final output of the workflow. 

:::note
We have designed this template to store the output files in an Orkes-owned Amazon S3 bucket. This is intended only for you to understand the working of the template. This bucket is open to the public and is managed by Orkes. So kindly refrain from adding anything confidential or using it as a long-term repository. You can edit the worker implementation to store output files in your preferred locations, such as internal drives or cloud provider services like Amazon S3, Azure Blob Storage, or GCP Cloud Storage.
:::

#### Setting Up AWS Credentials

**Pre-requisite** - Ensure you have set up the [AWS CLI](https://aws.amazon.com/cli/) on your local machine. Failure to do so can result in the worker encountering issues related to the access denied error to the AWS account.

To map your AWS account with the worker, you must [get your access key ID and secret access key](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/signup-create-iam-user.html) from your AWS account.

1. Log in to your Amazon AWS console and click on your username at the top right corner of the page.
2. Choose **Security Credentials**.
3. From the section **Access keys**, click **Create Access Keys**.
4. An **Access Key ID & Secret Access Key** will be generated.
5. Copy and keep the credentials safely.

Once you get the access keys, you must set credentials in the AWS credentials profile file on your local system, located at

- ```vi ~/.aws/credentials``` -  On Linux, macOS, or Unix.
- ```C:\Users\USERNAME\.aws\credentials``` - On Windows.

For Mac, Linux, or Unix users, open the terminal on your device and run the command ```vi ~/.aws/credentials```. It opens up a file in the following format. 

```
[default]
Aws_access_key_id = your_access_key
Aws_secret_access_key = your_secret_access_key
```

Replace the values with your AWS credentials copied earlier. In case you are setting up AWS CLI for the first time, store the values in this format in the above-specified locations.

Next, open the Java project on your local machine. In the [VideoRecipeWorker](https://github.com/orkes-io/orkes-templates/blob/main/video-processing/workers/java/src/main/java/io/orkes/samples/workers/VideoRecipeWorker.java), update the following with your Amazon S3 bucket where the file is to be uploaded.

```json
String s3BucketName = "your-amazon-s3-bucket";
```

#### Set Up Connection between the Worker and Conductor

To set up the connection between the worker and your Conductor instance:

1. Navigate to **Access Control > Applications** on your Conductor instance.
2. Click **Create application**, and provide an app name. 
3. Open your application and click **Create access key**.
4. Copy and keep your Key ID & Key secret. Ensure to store the key secret securely, as they will be shown only once.
5. Open your Java project, and navigate to [application.properties](https://github.com/orkes-io/orkes-templates/blob/main/video-processing/workers/java/src/main/resources/application.properties) file.

```
conductor.server.url=https://developers.orkes.cloud/api/
conductor.security.client.key-id=your_key_id
conductor.security.client.secret=your_key_secret
```

Replace the above values with your credentials. If you are testing this in the Developer Edition, **conductor.server.url** field remains the same. If you are using your own Conductor server, replace the URL with your server URL.

Next, you need to provide “execute” access to the workflows and tasks.
1. Inside the **Application** created, navigate to the section **Workflow and tasks permissions**.
2. Click **+Add permission**.
3. Under the **Workflow** section, search for **video_recipes** workflow and enable EXECUTE permissions.
4. Similarly, under the **Task** section and enable EXECUTE permissions for the tasks, **video_recipes_prefork**, and **video_recipes**. 

This configuration ensures the connection between the worker and the Conductor.

#### Using Task to Domain 

The [Task to Domain](https://orkes.io/content/developer-guides/task-to-domain) is the concept of limiting the task execution only to a specific worker via domain mapping. No domain limitation exists by default, and any worker can pick up any task.

Consider a situation where the **video_recipe** workflow is being run by two individuals, A & B, without any task to domain mapping. Here, there can be situations where Worker A can pick up Task B, and vice versa, and complete the workflow. To avoid such scenarios, you can utilize Task to Domain functionality, where a domain is added in the worker and also while invoking the workflow. 

#### Adding Task to Domain Mapping in Worker

In the [OrkesWorkersApplication](https://github.com/orkes-io/orkes-templates/blob/main/video-processing/workers/java/src/main/java/io/orkes/samples/OrkesWorkersApplication.java) file on your Java project, update **mycustomdomain** with a domain name you intend to use. 

```
taskToDomainMap.put("video_recipes_prefork", "mycustomdomain");
taskToDomainMap.put("video_recipes", "mycustomdomain");
```

It means that only a workflow invoked with the domain **mycustomdomain** can execute these tasks.

#### Run Worker

You can either use the following command or run the worker through your IDE. 

```
./gradlew run
```

#### Adding Task to Domain Mapping during Workflow Invocation

Next, you need to add the same domain while invoking the workflow.

To run the workflow from the Conductor UI,

<p align="center"><img src="/content/img/video-encoding-workflow_run.png" alt="Video Encoding Workflow Execution" width="90%" height="auto"></img></p>

1. From the left menu, navigate to **Run Workflow**.
2. Select the workflow name as **video_recipe** and provide the input parameters.
3. Under the **Tasks to Domain Mapping** section, provide your domain name in the following format:

```
{
 "*": "mydomain",
 "video_recipes_prefork": "mycustomdomain",
 "video_recipes": "mycustomdomain"
}
```
Replace **mycustomdomain** with the domain name you’ve used in the worker. This ensures that only your worker can execute your tasks

4. **Run Workflow.**

Once completed, you can view the final output in the specified S3 bucket on your AWS account.
