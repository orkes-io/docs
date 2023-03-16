---
sidebar_position: 4
---

# Workflow CI/CD

## Using Conductor APIs For CI/CD

With the Conductor APIs, it is possible to utilize Continuous Integration/Continuous Deployment of your Conductor workflows and tasks. This document will provide a rough outline of the API calls required to enable CI/CD into your Conductor server and also has a full walkthrough of a CI/CD integration with GitHub Actions.

## API Endpoints

To use the API endpoints in Orkes Cloud, you'll need to first authenticate your [application](/content/docs/getting-started/concepts/access-control-applications).

Once you have generated a token, the endpoints for automatically updating workflows and tasks are

- `/api/metadata/workflow`
- `/api/metadata/taskdefs`

Assuming that the workflows and tasks already exist in your Conductor instance, the call will be a `PUT` to the endpoint. The body of the request will be the JSON of your task or workflow.

> NOTE: if you are updating a task, place the JSON for your workflow in an array `[]`. For task updates, just the JSON is fine.

Example CURL command to update a workflow:

```bash
curl -X PUT "https://play.orkes.io/api/metadata/workflow?overwrite=true" \
-H  "accept: */*" \
-H  "X-Authorization: <token>" \
-H  "Content-Type: application/json" \
 -d "[<your Workflow JSON>]"
```

Example CURL command to update a Task:

```bash
curl -X PUT "https://play.orkes.io/api/taskdefs/workflow?overwrite=true" \
-H  "accept: */*" \
-H  "X-Authorization: <token>" \
-H  "Content-Type: application/json" \
 -d "<your Task JSON>"
```

### Updating Workflows/tasks

When a workflow is updated, Conductor undertakes the following logic:

<p align="center"><img src="/content/img/cicd_logic.jpg" alt="Conductor's logic on updating a workflow" width="600" style={{paddingBottom: 40, paddingTop: 40}} /></p>

- If the current version is unchanged - nothing happens
- If there is a change:
  - If a new version - update
  - If an existing version - only update if overwrite=true

## CI/CD with GitHub Actions

Continuous Integration Continuous Deployment (CI/CD) is frequently updating your code and immediately pushing the updates into production.

In this tutorial, we will use GitHub Actions to update our Conductor "super_weather" workflow definitions in GitHub, and also immediately push the changes to our Conductor server.

Our GitHub repo can be found at https://github.com/orkes-io/workflowCICD. Fork this repo into your GitHub Repository to follow along.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/QN1Aa4bbsX4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

### Creating the workflow

We begin by manually creating a workflow in [Orkes Playground](https://play.orkes.io). We choose `Workflow Definitions` and press the `Define Workflow` button. We can paste the contents of the `suoer_weather_v1.json` into the form, and save/confirm to save the workflow.

We now have a workflow in our Conductor server. Now, we'll set up the CI/CD to update the workflow from GitHub.

### Access Control

Our Conductor server is the [Orkes Playground](https://play.orkes.io) which has Access Control enabled (this is a feature of Orkes' Cloud and not in the open-source Conductor). If using the Open Source Conductor, skip this section.

In the Playground, select `Applications`, and create a new application.

<p align="center"><img src="/content/img/application_view.png" alt="empty application view" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

First, we will _turn on_ the Metadata API slider. This gives our application permission to update workflow definitions.

Second, we'll create an Access Key. Save the KeyId and Secret in a safe place.

Thirdly, we'll add Workflow permission. Click the `+`, then choose workflow, pick `super_weather`, and give the permission `Update` (if you want your users to be able to execute with the same access keys, you can add this permission as well.)

<p align="center"><img src="/content/img/weather_application_view.png" alt="weather application view" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This establishes the Access Control required to update your Workflow.

#### GitHub Secrets

The GitHub Action that updates the workflow must authenticate to the Playground. To do this, we'll have to create GitHub Secrets. On the GitHub page for the repository, click `Settings` from the top menu bar. Choose `Secrets` in the left navigation. Click Actions and create 2 `New Repository Secrets`: `ORKES_WEATHER_KEY` and `ORKES_WEATHER_SECRET`.

<p align="center"><img src="/content/img/creating_secrets.png" alt="secret creation" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now we're ready to create the GitHub Action.

### GitHub Action Basics

Having never created a GitHub action, there are a number of templates one can begin with:

```yaml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [main]
  pull_request:
    branches: [main]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

So, what does this do?

- This workflow runs on push or pull_request to the main branch.
- There is 1 `Job` called `build` with a number of steps.

Our Action is built on this template, so we'll just show the steps (there are 4 steps):

```yaml
- name: Checkout
      uses: actions/checkout@v2
    - name: authenticate
      id: authenticate
      uses: fjogeleit/http-request-action@v1.9.1
      with:
        # Request URL
        url: 'https://play.orkes.io/api/token'
        # Request Method
        method: 'POST' # optional, default is POST
        # Content Type
        contentType: 'application/json' # optional
        data: '{"keyId": "${{ secrets.ORKES_WEATHER_KEY }}", "keySecret": "${{ secrets.ORKES_WEATHER_SECRET }}"}'
    - name: update workflow v1
      uses: fjogeleit/http-request-action@v1.9.1
      with: # Set the secret as an input
          # Request URLss
          url: 'https://play.orkes.io/api/metadata/workflow'
          customHeaders: '{"X-Authorization": "${{ fromJson(steps.authenticate.outputs.response).token }}"}'
          # Request Method
          method: 'PUT' # optional, default is POSTss
          # Content Type
          contentType: 'application/json'
          file: "super_weather_v1.json"
    - name: update workflow v2
      uses: fjogeleit/http-request-action@v1.9.1
      with: # Set the secret as an input
          # Request URLss
          url: 'https://play.orkes.io/api/metadata/workflow'
          customHeaders: '{"X-Authorization": "${{ fromJson(steps.authenticate.outputs.response).token }}"}'
          # Request Method
          method: 'PUT' # optional, default is POSTss
          # Content Type
          contentType: 'application/json'
          file: "super_weather_v2.json"
```

1. Checkout - This enables the action to access the files in the repository (since we need to upload them to Conductor).
2. Authenticate - When using an Orkes version of Conductor, authentication with a Key & Secret is required to create a JWT to upload the workflow.
   - This uses the `http-request-action` to generate the API token at `https://play.orkes.io/api/token`. The Body of the POST is the Key and Secret that we have stored in our GitHub Secrets.
3. Update Workflow 1. This is an HTTP PUT request that updates version 1 of the workflow. Let's walk through the process:
   - The endpoint is `'https://play.orkes.io/api/metadata/workflow'`
   - The headers reference the output of the authentication step. `fromJson` parses the JSON string into a JSON object, allowing us to extract the value of the `token`.
   - The method is `PUT`
   - The JSON uploaded is `super_weather_v1.json`, which contains v1 of the workflow.
4. This is identical to step 2, except we upload v2 of the workflow.

:::tip
The PUT command for Conductor expects a JSON array. If we examine the JSON files, the JSON is encapsulated in `[]`.
:::

:::note
We could have included both V1 and V2 versions in the same file; however, we opted to upload 2 distinct files for readability.
:::
