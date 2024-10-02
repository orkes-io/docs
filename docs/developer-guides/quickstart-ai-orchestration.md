# Quickstart - AI Orchestration

Orkes Conductor provides you the ability to build applications that leverage generative AI models and vector databases easily. In this quickstart guide we will show you how you can build such an application and we will demonstrate how you can do it using command line or with the UI that comes with Orkes Conductor. For more information about the AI Orchestration capabilities in Orkes Conductor, please refer to the [announcement blog](https://orkes.io/blog/introducing-ai-orchestration-and-human-task-in-orkes-conductor/).

The example we will be using is to build a document classifier that identifies the type of document passed (e.g. a driver’s license, a W2 form, a mortgage application etc). The associated workflow in Conductor takes in as the input parameter a document file, checks that it is a pdf document, extracts the content from it, sends that information alongside a prompt to a LLM and obtains the classification result from the LLM. 

This workflow is available as a [template in the Template Explorer](https://orkes.io/content/templates/document-classifier) in Orkes Conductor and in this guide we will be using the free Orkes Playground (you can use this example with your own Orkes Conductor cluster as well).

## Command Line

1. Obtain a token from the Orkes Playground.
    - Login to https://play.orkes.io/ - you can bookmark this URL for easy access.
    - Obtain the access token by clicking on the **Copy Token** link at the bottom of the left hand navigation.
2. Obtain an API key from Open AI by going [here](https://platform.openai.com/account/api-keys).
3. Setup Environment Variables.
    - export CONDUCTOR_ACCESS_TOKEN=(The key you copied from Playground)
    - export OPEN_AI_KEY=(Your OPENAI API KEY)
4. Run the shell script below to create your document classifier application, execute it and view the output:

:::info
*Please note: This script uses jq. If you do not have it installed, please follow instructions [here](https://jqlang.github.io/jq/download/)*.
:::

```shell
curl -s https://raw.githubusercontent.com/orkes-io/orkes-templates/main/document-classifier/shell/create_document_classifier.sh | bash
```

## Conductor UI

### Step 1: Login to Orkes Playground

1. Login to https://play.orkes.io/ - you can bookmark this URL for easy access.

### Step 2: Create an LLM integration

1. Navigate to **Integrations** from the left menu.
2. Click on **New Integration** on the top right hand corner.

<p align="center"><img src="/content/img/quickstart-add-integrations.png" alt="Quickstart - Add Integrations" width="80%" height="auto"></img></p>

3. Click on the **Add** button for the **Open AI** integration. 

<p align="center"><img src="/content/img/quickstart-new-integration.png" alt="Quickstart - New Integrations" width="60%" height="auto"></img></p>

4. Provide a name and description for the integration in addition to the Open AI API key which you can obtain from [here](https://platform.openai.com/account/api-keys).
5. In the integrations listings page, click on the **+** icon for the integration you just created to add a model.
6. Click on **Add New Model**.

<p align="center"><img src="/content/img/quickstart-empyt-model.png" alt="Empty model while adding integrations" width="50%" height="auto"></img></p>

7. Enter **gpt-3.5-turbo** as the model name and provide a description. Note: in this example we are using **gpt-3.5-turbo**, but you can choose to use other models from Open AI.

<p align="center"><img src="/content/img/quickstart-add-integration-model.png" alt="Adding models to integration" width="80%" height="auto"></img></p>

### Step 3: Create an AI Prompt

1. Navigate to **AI Prompts** from the left menu.
2. Click on **Add AI Prompt** in the top right corner.
3. Provide a name in the **Prompt Name** field.
4. In the **Model(s)** field, select the model that was integrated in the previous step.
5. Provide a **Description** for your prompt.
6. Enter the text below to the **Prompt Template** field. Note: You can change this to fine tune the response from the LLM.

>
We have a document that was scanned using OCR. You need to classify the document based on the provided OCR content. The document could be one of these: W2, Drivers License, Paystub, Employment Verification Letter, Mortgage Application. If the provided content does not match with any of those documents, you must reply NO_MATCH. Here is the content of a document that was scanned using OCR: \n\n ${text} \n\n Your response:

<p align="center"><img src="/content/img/quickstart-ai-prompts.png" alt="Adding AI Prompts" width="60%" height="auto"></img></p>

7. Click **Save** on top right corner and then **Close**.

### Step 4: Export & configure document classification workflow from the Template Explorer

1. Navigate to **Template Explorer** from the left menu.
2. Click on the **Import** button for the **Document Classifier** template.

<p align="center"><img src="/content/img/quickstart-document-classifier.png" alt="Document Classifier" width="80%" height="auto"></img></p>

:::tip
Append a string to the provided name so that your workflow name does not conflict with other workflows.
:::

3. In the workflow definition page scroll down to the **classify_using_llm task** and click on it.

<p align="center"><img src="/content/img/quickstart-classify-using-llm.png" alt="Classify using LLM task" width="70%" height="auto"></img></p>

4. On the right hand side configurations pane: Select the **LLM Provider integration** and the associated **Model** that was setup in the previous step.
5. Select the **Prompt Template** that was created in the earlier step.

<p align="center"><img src="/content/img/quickstart-example.png" alt="LLM Provider & Model" width="70%" height="auto"></img></p>

6. Click on **Save** and then **Confirm** on the upper right hand side to save the workflow definition.

### Step 5: Test the workflow

1. Click on **Run Workflow** on the left menu.
2. Provide name of the workflow definition you had created earlier for the **Workflow name**.
3. Provide the below value (or the URL of a text based pdf file you wish to use) for the **Input params**:

```json
{
 "document_url": "https://image-processing-orkes.s3.amazonaws.com/test-w2-form-full-text.pdf"
}
```

4. Click **Run Workflow**.

:::info
You are now running this workflow using your user identity. The next section will show how to run this from an external application (e.g. CLI) using application level identity credentials
:::

5. The workflow execution link will be shown at the top of the page. Click on it.
6. View the output by going to the **Workflow Input/Output** tab in the workflow execution view.

### Step 6: Call the workflow externally (e.g. from the CLI, from another application)

#### Create Application Key

1. Navigate to **Access Control > Applications** from the left menu.
2. Click on **Create Application** button on top right corner.
3. Open the newly created application and enable *Worker*, *Metadata API*, and *Application* API permissions.
4. Click **Create Access Key** to create the *KEY* and *SECRET*. A dialog box opens with the newly generated Key and Secret.

:::info
Important: Copy and store the secret in a safe location, as it is never displayed again.
:::

5. In the **Permissionss** section, click on **Add permission**:
    - Select the **Workflow** tab and search for the name of the workflow you had created earlier. Select the workflow name and turn on the **READ** and **Execute** button.
    - Select the **Integrations** tab and search for the Open AI model integrations you had created earlier. Select the model integration name and turn on the **READ** and **Execute** button.
    - Select the **Prompts** tab and search for the AI Prompt Template you had created earlier. Select the Prompt name and turn on the **READ** and **Execute** button.
    - Click **Add Permission**. This will provide the application the required permissions to execute and observe the workflow execution.

<p align="center"><img src="/content/img/quickstart-give-permission.png" alt="Providing Access" width="70%" height="auto"></img></p>

#### Invoke workflow from CLI

1. Obtain the JWT access token from the key and secret obtained from the earlier step by running the curl command below. Note down the value of the JWT token that is returned to use in the next step.

```shell
curl -s -X 'POST' \
  'https://play.orkes.io/api/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "keyId": "<YOUR_KEY>",
  "keySecret": "YOUR_SECRET"
}'
```

2. Invoke the workflow from CLI by running the curl command below. Make sure to add the JWT token obtained in the previous step as well as replace the placeholder with the name of your workflow. You can also replace the **document_url** with a different one that you wish to use.

```shell
curl -s -X 'POST' \
'https://play.orkes.io/api/workflow/<WORKFLOW_NAME>?priority=0' \
 -H 'accept: text/plain' \
 -H 'X-Authorization: <YOUR_JWT_TOKEN>' \
 -H 'Content-Type: application/json' \
 -d '{
 "document_url": "https://image-processing-orkes.s3.amazonaws.com/test-w2-form2.pdf"
}'
```

The command will return a workflow id. Note it down for use in the next step.

3. Get the status and output of the workflow execution by running the curl command below. Make sure to add the JWT token obtained in the earlier step as well as replace the placeholder with the id of your workflow execution.

```shell
curl -s -X 'GET' \
'https://play.orkes.io/api/workflow/<WORKFLOW_EXECUTION_ID>/status?includeOutput=true&includeVariables=false' \
 -H 'accept: */*' \
 -H 'X-Authorization: <YOUR_JWT_TOKEN>'
```

This output will contain the result of the document classification (e.g. ‘W2’).

:::tip
You can pipe the output of above to the command below (requires [installing of jq](https://jqlang.github.io/jq/download/)) to directly capture the result:
      ```jq -r '.output.result'``
:::

4. You can view the execution visually by going to the Conductor UI and searching for it or directly via the URL below (make sure to replace the placeholder with your workflow execution id).

```json
https://play.orkes.io/execution/<WORKFLOW_EXECUTION_ID>
```