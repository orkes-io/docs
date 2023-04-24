import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Integration with CI/CD
Conductor workflows are the core part of your application and should be versioned, controlled, and released similarly to the code.

### Conductor Workflows
Workflows have two main components:
1. Workflow definition that is maintained as a file (JSON or code)
2. Worker implementation used by the workflows

### Workflows
Workflow definitions should be maintained as an independent unit that can be unit and integration tested before releasing to the production environment.

For details on how to unit test workflows, see [Unit and Regression Testing Workflows](/content/developer-guides/unit-and-regression-tests).

#### Steps to publish your workflows as part of the ci/cd
:::note Notes
See [Generating Tokens](/access-control-and-security/applications#generating-token) ([Video](/content/how-to-videos/access-key-and-secret)) on how to generate an access token for the API requests below.
:::

#### Downloading workflows from Conductor server to check into your version control
1. Download the JSON from the Conductor UI (Use the download button on the definition page).
2. (Alternatively) Use the API to download JSON for the workflow.
    ```shell
    # Get the workflow definition given name and version
    GET -H "X-Authorization:<TOKEN>" /api/metadata/workflow/{name}?version=<version>
    ```
    ```shell
    # Retrieve all the workflows
    GET -H "X-Authorization:<TOKEN>" /api/metadata/workflow/
    ```
#### Publish workflows to the Conductor server from your deployment scripts
Inject `ORKES_ACCESS_KEY`, `ORKES_ACCESS_SECRET` and `ORKES_CONDUCTOR_SERVER_URL` variables with the appropriate values in your deployment pipeline.

The following script cycles through all the workflow definitions in the current folder and uploads it to the Conductor server.

```shell dynamic https://github.com/orkes-io/workflow-cicd/blob/main/src/deploy_workflows.sh section=1 .../src/deploy_workflows.sh



```


### CI/CD for workers
Workers are application-specific code and should be maintained, tested, and released as any other code released to production.

#### Best practices for maintaining workers
1. Keep worker deployments and maintenance separate from the workflows.
2. Unit test workers based on the expected inputs and outputs similar to any other application code. 
3. Workers are the unit of scale for your workflows.  Either deploy each worker in an independent container or group set of workers that typically need to be scaled up/down together.