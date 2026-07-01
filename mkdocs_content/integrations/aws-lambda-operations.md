---
title: "AWS Lambda Operations Reference"
description: "Look up the input and output parameters for each operation available in the AWS Lambda integration with Orkes Conductor."
canonical_route: "integrations/aws-lambda-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# AWS Lambda Operations Reference

Orkes Conductor integrates with AWS Lambda to let you invoke and manage Lambda functions directly from your workflows. Once you configure the AWS Lambda integration, you can use the following operations to create, retrieve, update, and delete Lambda functions without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [AWS Lambda integration](/content/integrations/aws-lambda).

## List Functions

Lists all Lambda functions in your AWS account.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Max Items | Maximum number of functions to return. Defaults to 50. | integer | Optional. |

=== "Output Parameters"

    Returns `count`, `nextMarker`, and a `functions` array where each entry contains `functionName`, `functionArn`, `runtime`, `role`, `handler`, `codeSize`, `description`, `timeout`, `memorySize`, `lastModified`, `codeSha256`, `version`, `state`, and `stateReason`.


## Create Function

Creates a new Lambda function from a base64-encoded ZIP package.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Function Name | Name of the Lambda function to create. | string | Required. |
    | Runtime | Runtime environment. For example, `python3.12`, `nodejs20.x`, `java21`. | string | Required. |
    | Role | ARN of the IAM role that Lambda assumes during execution.<br/><br/>**To create one**:<ol><li>Go to **IAM** > **Roles** > **Create role**.</li><li>Select **AWS service**, choose **Lambda**, and click **Next**.</li><li>Search for and attach **AWSLambdaBasicExecutionRole**, then click **Next**.</li><li>Enter a role name, for example `lambda-execution-role`, and click **Create role**.</li><li>Open the created role and copy the ARN. For example: `arn:aws:iam::1234567890:role/lambda-execution-role`.</li></ol> | string | Required. |
    | Handler | Function entry point.<br/><br/>For example, `index.lambda_handler` for Python, `index.handler` for Node.js, or `com.example.Handler::handleRequest` for Java. | string | Required. |
    | Zip File Base 64 | Function code as a base64-encoded ZIP file.<br/><br/> Create a ZIP of your code, then run `base64 -i function.zip \| tr -d '\n'` (Mac/Linux) or `[Convert]::ToBase64String([IO.File]::ReadAllBytes("function.zip"))` (Windows PowerShell) to get the encoded string.| string | Required. |
    | Description | A description of the function's purpose. | string | Optional. |
    | Memory Size | Memory allocated in MB (128–10240). Defaults to 128. | integer | Optional. |
    | Timeout | Maximum execution time in seconds (1–900). Defaults to 3. | integer | Optional. |
    | Environment Variables | Key-value pairs injected as environment variables, as a JSON string. For example, `{"KEY":"value"}`. | string | Optional. |

=== "Output Parameters"

    Returns the function's `status`, `functionName`, `functionArn`, `runtime`, `role`, `handler`, `codeSize`, `description`, `timeout`, `memorySize`, `lastModified`, `codeSha256`, `version`, and `state`.


## Get Function Details

Retrieves full configuration and code details of a specific Lambda function.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Function Name | Name of the Lambda function to retrieve. | string | Required. |

=== "Output Parameters"

    Returns the function's `status`, `functionName`, `functionArn`, `runtime`, `role`, `handler`, `codeSize`, `description`, `timeout`, `memorySize`, `lastModified`, `codeSha256`, `version`, `state`, `stateReason`, `lastUpdateStatus`, `packageType`, `code.location`, and `code.repositoryType`.


## Update Function Configuration

Updates the configuration of an existing Lambda function without redeploying code.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Function Name | Name of the Lambda function to update. | string | Required. |
    | Memory Size | Updated memory allocated in MB (128–10240). | integer | Optional. |
    | Timeout | Updated maximum execution time in seconds (1–900). | integer | Optional. |
    | Description | Updated description of the function's purpose. | string | Optional. |
    | Environment Variables | Updated key-value pairs injected as environment variables, as a JSON string. For example, `{"KEY":"value"}`. | string | Optional. |

=== "Output Parameters"

    Returns the function's updated `functionName`, `functionArn`, `memorySize`, `timeout`, `description`, and `lastModified`.


## Invoke Function

Invokes a Lambda function synchronously or asynchronously with a JSON payload.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Function Name | Name of the Lambda function to invoke. | string | Required. |
    | Payload | Input payload as a JSON string. For example, `{"message": "Hello from Lambda!"}`. | string | Required. |
    | Invocation Type | The invocation type for the request. Supported values:<ul><li>`RequestResponse` for synchronous (waits for response)</li><li>`Event` for asynchronous (returns immediately)</li></ul> Defaults to `RequestResponse`. | string | Optional. |

=== "Output Parameters"

    Returns the function's `statusCode`, `requestId`, `response`, `functionError`, and `error`.


## Delete Function

Permanently deletes an existing Lambda function.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Function Name | Name of the Lambda function to delete. | string | Required. |

=== "Output Parameters"

    Returns the `status`, `functionName`, and `message` confirming deletion.
