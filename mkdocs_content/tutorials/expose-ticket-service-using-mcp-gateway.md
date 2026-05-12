---
title: "Build a Ticket Service Using Orkes MCP Gateway"
description: "Learn how to expose a workflow as an MCP tool so AI agents can create support tickets through structured tool calls in Orkes Conductor."
---

# Build a Ticket Service Using Orkes MCP Gateway

This tutorial shows how to expose an API as an MCP tool using the MCP Gateway. You will build a simple ticket service that accepts issue details from an AI agent, validates the input, and triggers a workflow to generate a mock ticket ID that the agent can use in follow-up actions.

In this tutorial, you will:

1. Create a ticket workflow in Orkes Conductor.
2. Define an input schema for the workflow.
3. Create an application.
4. Configure authentication settings for the MCP service.
5. Create a ticket service.
6. Create a route.
7. Test endpoint.
8. Verify using MCP Inspector.

By the end of this tutorial, you will have an MCP tool backed by an Orkes Conductor workflow.

To follow along, ensure you have access to the free [Orkes Developer Edition](https://developer.orkescloud.com/).

## Step 1: Create a ticket workflow in Orkes Conductor

In this step, you create the workflow logic that the MCP Gateway executes when an AI agent invokes the tool.

**To create a workflow:**

1. Go to [**Definitions** > **Workflow**](https://developer.orkescloud.com/workflowDef) from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In the **Code** tab, paste the following code:

```json
{
  "name": "create_ticket_wf",
  "description": "Workflow to generate a mock ticket ID based on issue details.",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": [
    "issue",
    "priority",
    "details",
    "email",
    "name",
    "source"
  ],
  "tasks": [
    {
      "name": "generate_ticket_id",
      "taskReferenceName": "generate_ticket_id",
      "type": "INLINE",
      "inputParameters": {
        "evaluatorType": "graaljs",
        "expression": "(function () {\n  return {\n    ticketId: 'TCK-' + Math.floor(Math.random() * 100000)\n  };\n})();"
      }
    },
    {
      "name": "prepare_output",
      "taskReferenceName": "prepare_output",
      "type": "JSON_JQ_TRANSFORM",
      "inputParameters": {
        "source": {
          "ticketId": "${generate_ticket_id.output.result.ticketId}"
        },
        "queryExpression": "{ \"ticketId\": .source.ticketId }"
      }
    }
  ],
  "outputParameters": {
    "ticketId": "${prepare_output.output.result.ticketId}"
  }
}
```

4. Select **Save** > **Confirm**.

The workflow accepts ticket details as input, generates a mock ticket ID using an Inline task, and formats the output using a JSON JQ Transform task.

!!! note
    We are mocking the ticket ID creation process for demonstration purposes. However, you can modify the workflow to create an actual ticket in any of your ticketing systems.

The workflow is now ready. The next step is to define a schema that validates incoming MCP tool requests.

## Step 2: Define input schema for the workflow

The input schema ensures that only valid requests from an AI agent can trigger the workflow.

**To define an input schema:**

1. Go to [**Definitions** > **Schema**](https://developer.orkescloud.com/schemas) from the left navigation menu on your Conductor cluster.
2. Select **+ New schema**.
3. In the **Code** tab, paste the following schema:

```json
{
 "name": "CreateTicketSchema",
 "version": 1,
 "type": "JSON",
 "data": {
   "$schema": "http://json-schema.org/draft-07/schema",
   "type": "object",
   "properties": {
     "issue": {
       "type": "string",
       "description": "Short description of the issue."
     },
     "priority": {
       "type": "string",
       "enum": [
         "low",
         "medium",
         "high"
       ],
       "description": "Urgency of the ticket."
     },
     "details": {
       "type": "string",
       "description": "Additional information or context for the issue."
     },
     "email": {
       "type": "string",
       "format": "email",
       "description": "Email address of the requester."
     },
     "name": {
       "type": "string",
       "description": "Name of the requester."
     },
     "source": {
       "type": "string",
       "description": "Where the request originated. For example: agent, chatbot, or web."
     }
   },
   "required": [
     "issue",
     "priority",
     "details",
     "email",
     "name",
     "source"
   ]
 }
}
```

4. Select **Save** > **Confirm**.

The next step is to create an application with permission to execute the workflow.

## Step 3: Create an application

!!! info "Note"
    Skip the step if you are using Orkes Developer Edition. If you are using Orkes Developer Edition, you do not need to create a separate application, as it has a **Default Orkes Application**, which is automatically available and has permission to execute workflows.

Applications act as service accounts that control which workflows the MCP Gateway can execute.

**To create an application:**

1. Go to [**Access Control** > **Applications**](https://developer.orkescloud.com/applicationManagement/applications), from the left navigation menu on your Conductor cluster.
2. Select **+ Create application**.
3. Enter a **Name** for the application.
4. In **Permissions**, select **+ Add permission**.
5. In the **Workflow** tab, select the workflow created in [Step 1](/content/tutorials/expose-ticket-service-using-mcp-gateway#step-1-create-a-ticket-workflow-in-orkes-conductor).
6. Enable the **EXECUTE** permission.
7. Select **Add permissions**.

The application now has permission to execute the ticket workflow.

| Setting | Value |
| --- | --- |
| Resource | Workflow: `create_ticket_wf` |
| Permission | `EXECUTE` |
| Application | Your MCP Gateway service account, or `Default Orkes Application` in Developer Edition |

## Step 4: Configure authentication settings

Authentication settings define how MCP clients are authorized to access the tool. In this example, the service uses no authentication.

**To configure authentication settings:**

1. Go to **APIs** > **Authentication**, from the left navigation menu on your Conductor cluster.
2. Select **+ New authentication**.
3. Enter a unique name as the **ID** and select **Authentication Type** as **No Authentication**.
4. In **Application**, select the application created in the previous step. If you are using Orkes Developer Edition, use the application **Default Orkes Application** here.
5. Select **Save**.

| Setting | Tutorial value | Production note |
| --- | --- | --- |
| Authentication Type | `No Authentication` | Use authenticated MCP access outside local testing. |
| Application | The app with `EXECUTE` on `create_ticket_wf` | Use a dedicated application per MCP service. |

## Step 5: Create a ticket service

A service represents a logical grouping of MCP routes that share a common configuration.

**To create a service:**

1. Go to **APIs** > **Services**, from the left navigation menu on your Conductor cluster.
2. Select **+ New service**.
3. In **Service ID**, enter **_ticket-tools_**.
4. Enter the **Display Name** as ***Ticket Service***.
5. Enter the **Base Path** as **_/api/tickets_**.
6. Set the **Auth Config** to the authentication setting created in the previous step.
7. In **CORS Configuration**, 
    - Set **Allowed Origins** as __*__.
    - Set **Allowed Methods** to **Select All**.
    - Set **Allowed Headers** as __*__.
8. Set an optional **Description** for the service.
9. Select **Save**.

| Setting | Value |
| --- | --- |
| Service ID | `ticket-tools` |
| Display Name | `Ticket Service` |
| Base Path | `/api/tickets` |
| Auth Config | The authentication setting from Step 4 |

The service is now ready. Next, create a route to connect it to the workflow.

## Step 6: Create a route

Routes define MCP tool endpoints and map them to workflows.

**To create a route:**

1. Go to the **Services** and select the __+__ button next to the service created.
2. In **Route Definition**, set:
    - **HTTP Method** to **POST**.
    - **Path** to `/create`.
3. In **Workflow Configuration**, set the **Workflow Name** to the one created in [Step 1](/content/tutorials/expose-ticket-service-using-mcp-gateway#step-1-create-a-ticket-workflow-in-orkes-conductor). 
4. In **Schema**, set the Input Schema to the schema created in [Step 2](/content/tutorials/expose-ticket-service-using-mcp-gateway#step-2-define-input-schema-for-the-workflow).
5. Select **Save**.

| Setting | Value |
| --- | --- |
| Method | `POST` |
| Path | `/create` |
| Workflow | `create_ticket_wf` |
| Input Schema | `CreateTicketSchema` version `1` |

## Step 7: Test the endpoint

You can test the route directly from the Conductor UI.

### Test endpoint from Conductor UI

**To test a route:**

1. Go to the **APIs** > **Services**, and select the service.
2. In **Routes**, select the play icon next to the route to test.
3. In **Body**, enter the request payload as defined in the workflow. For example:

```json
{
  "issue": "Unable to log in",
  "priority": "high",
  "details": "User receives a 401 error after entering valid credentials.",
  "email": "john.doe@acme.com",
  "name": "John Doe",
  "source": "Testing from Conductor UI"
}
```

4. Select **Test Route**.
5. Review the **Response** to verify the route works as expected.

The response should include a generated ticket ID:

```json
{
  "ticketId": "TCK-12345"
}
```

You can also call the route from a client after copying the endpoint from the service details:

```bash
curl -X POST "https://<your-gateway-host>/api/tickets/create" \
  -H "Content-Type: application/json" \
  -d '{
    "issue": "Unable to log in",
    "priority": "high",
    "details": "User receives a 401 error after entering valid credentials.",
    "email": "john.doe@acme.com",
    "name": "John Doe",
    "source": "curl"
  }'
```

### Verify workflow execution

**To confirm that the workflow was triggered:**

1. Go to **Executions** > **Workflow**.
2. Select the latest execution of the **create_ticket_wf** workflow.
3. Select the **Workflow ID** to view the execution details.
4. In the **Workflow Input/Output** tab, verify that the ticket fields and generated `ticketId` were passed correctly.

### Access the endpoint details

**To view the endpoint details and supporting resources:**

1. Go to **APIs** > **Services**, and select your service. 
2. Select a route to open its details. 
3. Copy the generated cURL command for the endpoint.

You can also get the OpenAPI documentation for the service. Go to **APIs** > **Services**, select your service, and then open **Metadata & Resources** > **View API Documentation**.

## Step 8: Verify using Orkes MCP Workbench

Next, you can connect this MCP service to your preferred AI tool as an MCP tool. You need the MCP endpoint URL for this.

**To get the MCP tool endpoint:**

1. Go to **APIs** > **Services**, and select the service.
2. In **Configuration**, copy the **MCP Tool Remote Endpoint**.

Use this as the MCP server endpoint when you configure your AI tool. Verify it with Orkes MCP Workbench before plugging it into an agent.

**To test the MCP tool:**

1. Access [Orkes MCP Workbench](https://www.mcp-workbench.ai/).
2. In **Connections**, select **+ Add**.
3. In **URL**, enter the **MCP Tool Remote Endpoint** copied from Conductor.
4. In **Type**, select **Streamable HTTP (Stateless)**.
5. Select **Save**, and then select **Connect**.
6. Once the connection is successful, select **POST_create** from **Select Tool**, and enter the required parameters.
7. Select **Run Tool**.

Use the same fields you tested in Step 7 as the MCP tool input:

```json
{
  "issue": "Unable to log in",
  "priority": "high",
  "details": "User receives a 401 error after entering valid credentials.",
  "email": "john.doe@acme.com",
  "name": "John Doe",
  "source": "mcp-workbench"
}
```

The tool result should return a `ticketId`. To verify the workflow execution in Conductor, go to **Executions** > **Workflow**, open the latest run of **_create_ticket_wf_**, and review the **Input/Output** tab.

That’s it. Next, you can connect this with any AI agent that needs to invoke the MCP tool. When the MCP tool is invoked, the workflow runs automatically. 

You can extend this workflow to integrate with real ticketing systems, trigger notifications, or support downstream automation.
