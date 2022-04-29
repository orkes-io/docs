# Continuous Integration/Continuous Deployment

Deploying your Conductor workflows with a Continuous Integration/Continuous Deployment (CI/CD) is an easy process to set up. 

## Using Github

In this example, a Conductor workflow will be pushed to the Conductor Server whenever a change is pushed to GitHub.

### Authentication

This example pushes to the [Orkes Playground](https://play.orkes.io), and thus requires an authentication token. If using the open source Conductor with no authentication, this can be skipped.

The full Github action can be found [in the GitHub repo](https://github.com/dougsillars/workflowCICD/blob/main/.github/workflows/main.yml).  We'll focus on the steps in the action that update the Workflow.

```yaml
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: HTTP Request Action
      uses: fjogeleit/http-request-action@v1.9.1
      with: # Set the secret as an input
        # Request URL
        url: 'https://play.orkes.io/api/metadata/workflow'
        # Request Method
        method: 'PUT' # optional, default is POST
        # Content Type
        contentType: 'application/json' # optional
        file: 'super_weather.json'
        customHeaders: '{"X-Authorization": "${{ secrets.PLAYGROUND_TOKEn }}" }'

```

There are two steps:

1. Checkout step to allow the action to read the files in the repo
2. HTTP PUT - sending the workflow JSON to the server.


Let's look at what Step2 does:

The Github action being used is ```fjogeleit/http-request-action@v1.9.1```. The action is essentially a wrapper for curl - it allows many of the common HTTP requests to be made.  Because we are updating an existing workflow, we use the ```PUT``` method.

The API endpoint is ```/api/metadata/workflow```.

> NOTE:  The PUT workflow expects a JSON array, so make sure your workflow JSON is inside an array ```[{all your JSON}]``` for the command to work as expected.

