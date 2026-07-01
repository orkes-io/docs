---
title: "Google Cloud Functions Operations Reference"
description: "Look up the input and output parameters for each operation available in the Google Cloud Functions integration with Orkes Conductor."
canonical_route: "integrations/google-cloud-functions-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Google Cloud Functions Operations Reference

Orkes Conductor integrates with Google Cloud Functions to let you invoke and manage functions directly from your workflows. Once you configure the Google Cloud Functions integration, you can use the following operations to invoke, list, and manage your Cloud Functions without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Google Cloud Functions integration](/content/integrations/google-cloud-functions).

## List Functions

Lists serverless functions in a project and location, including 1st gen, 2nd gen, and Cloud Run functions.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Project ID | The Google Cloud project ID. If not provided, defaults to the [project ID configured in the integration](/content/integrations/google-cloud-functions#step-2-add-an-integration-for-google-cloud-functions). | string | Optional. |
    | Location | The region where the functions are deployed. For example: `us-central1`.  If not provided, defaults to the [location configured in the integration](/content/integrations/google-cloud-functions#step-2-add-an-integration-for-google-cloud-functions). | string | Optional. |
    | Page Size | The maximum number of functions to return. Accepted values: 1–500. | integer | Optional. |

=== "Output Parameters"

    Returns an array of Cloud Function objects, each containing metadata (name, state, environment), build configuration (runtime, entry point, source), service configuration (memory, CPU, timeout, environment variables), event trigger details, and labels.


## Invoke HTTP Function

Invokes an HTTP-triggered Google Cloud Function with an optional JSON payload.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Function URL | The HTTPS trigger URL of the Cloud Function. If not provided, defaults to the function URL configured in the integration. | string | Optional. |
    | Request Method | The HTTP method. For example, `POST`, `GET`. | string | Optional. |
    | Payload JSON | The JSON payload to send as the request body. | string | Optional. |

=== "Output Parameters"

    Returns an object containing the HTTP status code returned by the function and the response body; parsed as JSON if valid, otherwise returned as a raw string.
