---
title: "Save All Integrations"
description: "Use the Orkes Conductor integrations API to save All Integrations. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/integrations/save-all-integrations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Save All Integrations, Save All Integrations API, API orchestration, API gateway"
---

# Save All Integrations

## Quick reference

Use this integrations endpoint to save All Integrations. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/integrations`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/integrations`

Creates or updates one or more integrations in bulk. Each integration in the array is upserted along with its associated models or APIs. If an integration already exists, its `type` cannot be changed.

Password-type configuration values (such as `api_key` and `password`) are automatically stored as secrets.

## Request body

Format the request body as an array of integration objects:

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The unique name for the integration provider. Cannot be changed after creation. | string | Required. | 
| type | The integration type. Cannot be changed after creation. Supported values:<ul><li>ollama</li><li>azure_openai</li><li>openai</li><li>perplexity</li><li>grok</li><li>cohere</li><li>mistral</li><li>anthropic</li><li>vertex_ai</li><li>vertex_ai_gemini</li><li>huggingface</li><li>aws_bedrock_anthropic</li><li>aws_bedrock_cohere</li><li>aws_bedrock_titan</li><li>pineconedb</li><li>weaviatedb</li><li>pgvectordb</li><li>mongovectordb</li><li>amqp</li><li>kafka</li><li>nats</li><li>aws_sqs</li><li>azure_service_bus</li><li>gcp_pubsub</li><li>ibm_mq</li><li>aws</li><li>gcp</li><li>relational_db</li><li>sendgrid</li><li>git</li></ul> | string | Required. | 
| category | The category of the integration. Supported values:<ul><li>AI_MODEL: For [AI/LLM](/content/category/integrations/ai-llm) integrations.</li><li>VECTOR_DB: For [Vector database](/content/category/integrations/vector-databases) integrations.</li><li>MESSAGE_BROKER: For [message broker](/content/category/integrations/message-broker) integrations.</li><li>CLOUD: For [cloud provider](/content/category/integrations/cloud-provider) integrations.</li><li>RELATIONAL_DB: For [relational database](/content/category/integrations/rdbms) integrations.</li><li>GIT: For [Git repository](/content/integrations/git-repository) integrations.</li><li>EMAIL: For [email provider](/content/integrations/email/sendgrid) integrations.</li></ul> | string | Optional. | 
| description  | A description for the integration. | string | Optional. | 
| enabled | Whether the integration is active and available for use. | boolean | Optional. | 
| configuration | A key-value map of provider-specific configuration, such as API keys and endpoints. Keys and required values vary by integration type. See [Configuration keys by integration type](/content/reference-docs/api/integrations/save-all-integrations#configuration-keys-by-integration-type). | object | Optional. |
| tags | A list of key-value tag objects for organizing or filtering integrations. Each tag contains a key (string) and value (string). | array | Optional. | 
| apis | A list of models or APIs to associate with this integration provider. See [Integration model object](/content/reference-docs/api/integrations/save-all-integrations#integration-model-object). | array | Optional. | 

### Integration model object

While adding integrations for [AI/LLMs](/content/category/integrations/ai-llm), [Vector databases](/content/category/integrations/vector-databases) or [Relational databases](/content/category/integrations/rdbms), you must add the associated models, indexes, or tables, respectively. They must be formatted within the `apis` field as an array of the following object:

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| apis.**integrationName** | Name of the parent integration provider to which the model must be attached to. Must match the enclosing integration's name. | string | Required. | 
| apis.**api** | Name of the specific model or API under the provider (e.g., `gpt-4o`, `text-embedding-3-small`). | string | Required. | 
| apis.**description** | A human-readable description of this model or API. | string | Required. | 
| apis.**enabled** | Whether this model/API is active and available for use. | boolean | Optional. | 

For example, if you are adding an OpenAI integration with `gpt-4o` as the model; format the request body as follows: 

```json
{
      "name": "<YOUR-INTEGRATION-NAME>",
      "type": "openai",
      "category": "AI_MODEL",
      "description": "<YOUR-DESCRIPTION>",
      "enabled": true,
      "configuration": {
        "api_key": "<YOUR-API-KEY>"
      },
      "apis": [
        {
          "integrationName": "<YOUR-INTEGRATION-NAME>",
          "api": "gpt-4o", // model name
          "description": "GPT-4o model", // model description
          "enabled": true
        }
      ]
    }
```

### Configuration keys by integration type

The `configuration` object is a key-value map of provider-specific configuration, such as API keys and endpoints. Keys and required values vary by integration type.

| Parameter | Required keys | Optional keys | 
| --------- | ------------- | ------------- | 
| [ollama](/content/integrations/ai-llm/ollama#step-2-add-an-integration-for-ollama) | endpoint | header, api_key | 
| [azure_openai](/content/integrations/ai-llm/azure-open-ai#step-3-add-an-integration-for-azure-openai) | api_key, endpoint | - | 
| [openai](/content/integrations/ai-llm/open-ai#step-2-add-an-integration-for-openai) | api_key | endpoint,organizationId | 
| [perplexity](/content/integrations/ai-llm/perplexity#step-2-add-an-integration-for-perplexity) | api_key | – | 
| [grok](/content/integrations/ai-llm/grok#step-2-add-an-integration-for-grok) | api_key | - | 
| [cohere](/content/integrations/ai-llm/cohere#step-2-add-an-integration-for-cohere) | api_key, endpoint | – | 
| [mistral](/content/integrations/ai-llm/mistral#step-2-add-an-integration-for-mistral) | api_key, endpoint | – | 
| [anthropic](/content/integrations/ai-llm/anthropic-claude#step-2-add-an-integration-for-anthropic-claude) | api_key, endpoint | completionsPath, version, betaVersion | 
| [vertex_ai](/content/integrations/ai-llm/vertex-ai#step-2-add-an-integration-for-google-vertex-ai) | projectName, environment, publisher, file | – | 
| [vertex_ai_gemini](/content/integrations/ai-llm/google-gemini-ai#step-2-add-an-integration-for-google-gemini-ai) | projectName, environment, file | – | 
| [huggingface](/content/integrations/ai-llm/hugging-face#step-2-add-an-integration-for-hugging-face) | api_key, namespace | – | 
| [aws_bedrock_anthropic](/content/integrations/ai-llm/aws-bedrock-anthropic#step-2-add-an-integration-for-aws-bedrock-anthropic) | connectionType, region<br/>Based on the `connectionType` value, the following additional keys may be required:<ul><li>ACCESS_KEY: Requires user (access key) and api_key (access secret).</li><li>EXTERNAL_ROLE: Requires roleArn and externalId.</li><li>CONDUCTOR_ROLE: No additional keys required.</li></ul> | awsAccountId | 
| [aws_bedrock_cohere](/content/integrations/ai-llm/aws-bedrock-cohere#step-2-add-an-integration-for-aws-bedrock-cohere) | connectionType, region<br/>Based on the `connectionType` value, the following additional keys may be required:<ul><li>ACCESS_KEY: Requires user (access key) and api_key (access secret).</li><li>EXTERNAL_ROLE: Requires roleArn and externalId.</li><li>CONDUCTOR_ROLE: No additional keys required.</li></ul> | awsAccountId | 
| [aws_bedrock_titan](/content/integrations/ai-llm/aws-bedrock-titan#step-2-add-an-integration-for-aws-bedrock-titan) | connectionType, region<br/>Based on the `connectionType` value, the following additional keys may be required:<ul><li>ACCESS_KEY: Requires user (access key) and api_key (access secret).</li><li>EXTERNAL_ROLE: Requires roleArn and externalId.</li><li>CONDUCTOR_ROLE: No additional keys required.</li></ul> | awsAccountId | 
| [pineconedb](/content/integrations/vector-databases/pinecone#step-2-add-an-integration-for-pinecone) | api_key, projectName, environment | – | 
| [weaviatedb](/content/integrations/vector-databases/weaviate#step-2-add-an-integration-for-weaviate) | api_key, endpoint | – | 
| [pgvectordb](/content/integrations/vector-databases/postgres-vector-database#step-2-add-an-integration-for-postgres-vector-database) | user, password, datasourceURL, dimensions, distance_metric, indexing_method | inverted_list_count | 
| [mongovectordb](/content/integrations/vector-databases/mongo-vector-database#step-2-add-an-integration-for-mongo-vector-database) | endpoint, namespace, dimensions, distance_metric | inverted_list_count | 
| [amqp](/content/integrations/message-broker/amqp#step-2-add-an-integration-for-amqp) | protocol, user, password, endpoint, port, namespace | – | 
| [kafka](/content/integrations/message-broker/apache-kafka#step-2-add-an-integration-for-apache-kafka) | endpoint, connectionType, protocol | groupId | 
| [nats](/content/integrations/message-broker/nats-messaging#step-2-add-an-integration-for-nats-messaging) | endpoint, connectionType, authenticationType, protocol, tls | – | 
| [aws_sqs](/content/integrations/message-broker/aws-sqs#step-2-add-an-integration-for-aws-sqs) | connectionType, region<br/>Based on the `connectionType` value, the following additional keys may be required:<ul><li>ACCESS_KEY: Requires user (access key) and api_key (access secret).</li><li>EXTERNAL_ROLE: Requires roleArn and externalId.</li><li>CONDUCTOR_ROLE: No additional keys required.</li></ul> | awsAccountId | 
| [azure_service_bus](/content/integrations/message-broker/azure-service-bus#step-2-add-an-integration-for-azure-service-bus) | connectionType | endpoint, namespace | 
| [gcp_pubsub](/content/integrations/message-broker/gcp-pub-sub#step-2-add-an-integration-for-gcp-pub-sub) | projectName, location, file | – | 
| [ibm_mq](/content/integrations/message-broker/ibm-mq#step-2-add-an-integration-for-ibm-mq) | endpoint, port, queueManager, channel, protocol, pubSubMethod, authenticationType, tls | – | 
| [aws](/content/integrations/cloud-provider/aws#step-2-add-an-integration-for-aws) | connectionType, region<br/>Based on the `connectionType` value, the following additional keys may be required:<ul><li>ACCESS_KEY: Requires user (access key) and api_key (access secret).</li><li>EXTERNAL_ROLE: Requires roleArn and externalId.</li><li>CONDUCTOR_ROLE: No additional keys required.</li></ul> | awsAccountId | 
| [gcp](/content/integrations/cloud-provider/gcp#step-2-add-an-integration-for-gcp) | projectName, environment, file | – | 
| [relational_db](/content/integrations/rdbms/relational-database#step-2-add-an-integration-for-relational-database) | jdbcDriver, user, password, datasourceURL | – | 
| [sendgrid](/content/integrations/email/sendgrid#step-2-add-an-integration-for-sendgrid-email) | api_key | – | 
| [git](/content/integrations/git-repository#step-2-add-an-integration-for-git-repository) | user, api_key | – | 

For example, if you are adding an Anthropic Claude integration, the configuration looks like this:

```json
{
      "name": "<YOUR-INTEGRATION-NAME>",
      "type": "anthropic",
      "category": "AI_MODEL",
      "description": "<YOUR-DESCRIPTION>",
      "enabled": true,
      "configuration": {
        "api_key": "<YOUR-API-KEY>",
        "endpoint": "https://api.anthropic.com/v1"
      },
      "apis": [
        {
          "integrationName": "<YOUR-INTEGRATION-NAME>",
          "api": "claude-sonnet-4-6", // model name
          "description": "claude-sonnet-4-6 model", // model description
          "enabled": true
        }
      ]
    }
```

## Response

| Status | Description | 
| ------ | ----------- | 
| 200 OK | Indicates that the integration is saved successfully. | 
| 400 Bad Request | Returns for an invalid input. For example, attempting to change the `type` of an existing integration. | 
| 401 Unauthorized | Indicates that the request is not authenticated. | 
| 403 Forbidden | Indicates that the authenticated user does not have permission to update one or more integrations. | 

## Examples

<details>
<summary>Save all integrations</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/integrations/' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
    {
      "name": "open-ai-test",
      "type": "openai",
      "category": "AI_MODEL",
      "description": "OpenAI integration for LLM tasks",
      "enabled": true,
      "configuration": {
        "api_key": "sk-..."
      },
      "apis": [
        {
          "integrationName": "open-ai-test",
          "api": "gpt-4o",
          "description": "GPT-4o model",
          "enabled": true
        }
      ]
    },
    {
      "name": "sendgrid-test",
      "type": "sendgrid",
      "category": "EMAIL",
      "description": "SendGrid integration for email tasks",
      "enabled": true,
      "configuration": {
        "api_key": "SG...."
      },
"apis": []
    }
  ]'
```

**Response**

Returns 200 OK, indicating that the integrations have been saved successfully.

</details>
