---
title: "Azure Functions Operations Reference"
description: "Look up the input and output parameters for each operation available in the Azure Functions integration with Orkes Conductor."
canonical_route: "integrations/azure-functions-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Azure Functions Operations Reference

Orkes Conductor integrates with Azure Functions to let you build workflows that interact with your Azure Functions using the available operations. Once you configure the Azure Functions integration, you can use the following operations to interact with your Function Apps directly from your workflows.

This page covers the parameters and expected output for each operation available in the [Azure Functions integration](/content/integrations/azure-functions).

## List Function Apps

Lists all Function Apps in the subscription or a specific resource group. Use this to discover available Function Apps before invoking them, or to get an overview of your Azure Functions deployment.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Resource Group | Resource group name to filter results. If not provided, lists all Function Apps across the subscription. | string | Optional. |

=== "Output Parameters"

    A JSON object containing a `functionApps` array, where each entry includes the `name`, `resourceGroup`, `region`, `state`, `defaultHostName`, `url`, and `operatingSystem` of the Function App. Also includes the total `count`, the `subscriptionId`, and optionally `warning`, `error`, `errorMessage`, or `errorType` fields.


## Get Function App Details

Retrieves detailed information about a specific Function App.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Resource Group | Resource group name. Uses the default configured resource group if not specified. | string | Optional. |
    | Function App Name | The name of the Function App to retrieve. | string | Required. |

=== "Output Parameters"

    A JSON object containing the `name`, `resourceGroup`, `region`, `state`, `defaultHostName`, `url`, `operatingSystem`, `id`, `runtime`, `appServicePlanId`, and `tags` of the specified Function App. Includes `error`, `errorMessage`, and `errorType` fields on failure.


## List Functions In App

Lists all functions within a specific Function App.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Resource Group | Resource group name. Uses the default configured resource group if not specified. | string | Optional. |
    | Function App Name | The name of the Function App to retrieve the functions from. | string | Required. |

=== "Output Parameters"

    A JSON object containing the `functionAppName`, `resourceGroup`, total `count`, and a `functions` array where each entry includes the function's `name`, `functionAppName`, and `id`. Includes `error`, `errorMessage`, and `errorType` fields on failure. For full configuration details of a specific function, use the [Get Function Details](/content/integrations/azure-functions-operations#get-function-details) operation. 


## Get Function Details

Retrieves configuration and metadata for a specific function within a Function App.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Resource Group | Resource group name. Uses the default configured resource group if not specified. | string | Optional. |
    | Function App Name | The name of the Function App to retrieve the function from. | string | Required. |
    | Function Name | Name of the function. This field is case-sensitive. | string | Required. |

=== "Output Parameters"

    A JSON object containing the `name`, `fullName` (including the app prefix), `functionAppName`, `resourceGroup`, and `id` of the function.


## Invoke HTTP Function

Invokes an HTTP-triggered Azure Function with a custom request.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Resource Group | Resource group name. Uses the default configured resource group if not specified. | string | Optional. |
    | Function App Name | The name of the Function App to retrieve the function from. | string | Required. |
    | Function Name | Name of the function. This field is case-sensitive. | string | Required. |
    | Method | HTTP method to use. Supported values: <ul><li>`GET`</li><li>`POST`</li><li>`PUT`</li><li>`DELETE`</li><li>`PATCH`</li></ul>. Defaults to `GET`. | string | Optional. |
    | Path | Additional path to append after the function name in the URL. | string | Optional. |
    | Query Params | Query parameters as a JSON string. For example, `{"name": "World"}`. | string | Optional. |
    | Headers | Custom request headers as a JSON string. For example, `{"X-Custom-Header": "value"}`. | string | Optional. |
    | Body | Request body content. Typically a JSON string for POST/PUT requests. | string | Optional. |
    | Use Function Key | Whether to use the function key for authentication. Defaults to true. | boolean | Optional. |

=== "Output Parameters"

    A JSON object containing the `statusCode`, `body`, `headers` (a map of response header names to value lists), `functionName`, `method`, and the resolved `url` that was called. For error status codes (4xx/5xx), the `body` includes additional error detail along with the request URL and method for debugging.
