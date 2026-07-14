---
title: "Azure Storage Operations Reference"
description: "Look up the input and output parameters for each operation available in the Azure Storage integration with Orkes Conductor."
canonical_route: "integrations/azure-storage-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Azure Storage Operations Reference, Azure Storage Operations Reference integration, Azure Storage Operations Reference workflow automation"
---

# Azure Storage Operations Reference

Orkes Conductor integrates with Azure Storage to let you build workflows that interact with your Azure Storage using the available operations. Once you configure the Azure Storage integration, you can use the following operations to interact with your blob containers and blobs directly from your workflows.

This page covers the parameters and expected output for each operation available in the [Azure Storage integration](/content/integrations/azure-storage).

## List Containers

Lists all blob containers in the storage account. Use this to discover available containers before uploading files or to get an overview of your storage organization.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    A JSON object containing a `containers` array with each container's `name` and `lastModified` timestamp, along with the total `count` of containers.


## Create Container

Creates a new blob container. Use this to organize files into logical groups, create isolated storage spaces for different projects or customers, or set up a new storage location for workflow outputs.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container to create. Can contain only lowercase letters, numbers, and hyphens. | string | Required. |

=== "Output Parameters"

    A JSON object containing the creation `status`, the `container` name, and the `url` of the newly created container.


## Delete Container

Deletes a blob container and all its contents. Use this for cleanup operations, removing test containers, or archiving completed projects. This permanently deletes all blobs in the container.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container to delete. | string | Required. |

=== "Output Parameters"

    A JSON object containing the deletion `status` and the `container` name of the deleted container.


## List Blobs

Lists blobs in a container with optional prefix filtering and pagination support. Use this to discover what files exist before processing, iterate through large collections, or filter files by folder-like prefixes (e.g., `reports/2024/`).

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container to list blobs from. | string | Required. |
    | Prefix | Prefix to filter blobs by. For example, `folder/`. | string | Optional. |
    | Max Results | Maximum number of blobs to return. Defaults to 100, with a maximum of 5000. | integer | Optional. |
    | Continuation Token | Continuation token for pagination, retrieved from a previous response. | string | Optional. |

=== "Output Parameters"

    A JSON object containing the `container` name, a `blobs` array with each blob's `name`, `size`, `lastModified` timestamp, `blobType`, and `contentType`, along with the total `count`, a `hasMore` flag indicating if more results exist, and a `continuationToken` for pagination.


## Upload Blob

Uploads base64-encoded content as a blob to a container. Use this when file content is already in memory, such as generated reports, AI-generated images, processed data, or converted documents.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container to upload the blob to. | string | Required. |
    | Blob Name | Name or path of the blob. For example, `folder/file.pdf`. | string | Required. |
    | Base 64 Content | Base64-encoded content of the file to upload. | string | Required. |
    | Content Type | MIME type of the blob. Auto-detected from the file extension if not provided. | string | Optional. |
    | Metadata | Metadata for the blob as `key=value`,`key2=value2` pairs. | string | Optional. |
    | Overwrite | Whether to overwrite the blob if it already exists. | boolean | Optional. |

=== "Output Parameters"

    A JSON object containing the upload `status`, `blob` name, `container` name, file `size`, `contentType`, `url` of the uploaded blob, any `metadata`, and the `sourceUrl` if uploaded from a URL.


## Upload Blob From URL

Uploads a blob by fetching content from an external URL, without requiring local download first. Use this to import files from external sources such as images, mirrored content, or web resources. Supports HTTP/HTTPS only.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container to upload the blob to. | string | Required. |
    | Blob Name | Name or path of the blob. For example, `folder/file.pdf`. | string | Required. |
    | Source URL | Source URL to fetch content from. Supports HTTP and HTTPS only. | string | Required. |
    | Content Type | MIME type of the blob. Uses the response Content-Type if not provided. | string | Optional. |
    | Metadata | Metadata for the blob as `key=value`,`key2=value2` pairs. | string | Optional. |
    | Overwrite | Whether to overwrite the blob if it already exists. | boolean | Optional. |
    | Max Size MB | Maximum allowed file size in MB. Defaults to 100 MB, with a maximum of 500 MB. | integer | Optional. |

=== "Output Parameters"

    A JSON object containing the upload `status`, `blob` name, `container` name, file `size`, `contentType`, `url` of the uploaded blob, any `metadata`, and the `sourceUrl` used to fetch the content.


## Get Blob Properties

Retrieves properties and metadata of a specific blob. Use this to check if a file exists, retrieve its size or type before downloading, or read custom metadata without downloading the full content.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container containing the blob to retrieve. | string | Required. |
    | Blob Name | Name or path of the blob. For example, `folder/file.pdf`. | string | Required. |

=== "Output Parameters"

    A JSON object containing the `exists` flag, `blob` name, `container` name, `size`, `contentType`, `lastModified` timestamp,` eTag`, `blobType`, and `url` of the blob.


## Download Blob

Downloads blob content as a base64-encoded string. Use this to retrieve stored files for processing, pass file contents into AI or LLM tasks, or transfer files to other systems.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container containing the blob to download. | string | Required. |
    | Blob Name | Name or path of the blob. For example, `folder/file.pdf`. | string | Required. |

=== "Output Parameters"

    A JSON object containing the `blob` name, `container` name, `size`, and the `base64` encoded content of the downloaded blob.


## Delete Blob

Deletes a specific blob from a container. Use this for cleanup operations, removing temporary files, or managing file lifecycle in workflows.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Container Name | Name of the container containing the blob to delete. | string | Required. |
    | Blob Name | Name or path of the blob. For example, `folder/file.pdf`. | string | Required. |

=== "Output Parameters"

    A JSON object containing the deletion `status`, `blob` name, and  `container`name containing the deleted blob.
