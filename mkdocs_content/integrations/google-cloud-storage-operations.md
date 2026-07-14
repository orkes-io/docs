---
title: "Google Cloud Storage Operations Reference"
description: "Look up the input and output parameters for each operation available in the Google Cloud Storage integration with Orkes Conductor."
canonical_route: "integrations/google-cloud-storage-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Google Cloud Storage Operations Reference, Google Cloud Storage Operations Reference integration, Google Cloud Storage Operations Reference workflow automation"
---

# Google Cloud Storage Operations Reference

Orkes Conductor integrates with Google Cloud Storage to let you manage buckets and objects directly from your workflows. Once you configure the Google Cloud Storage integration, you can use the following operations to upload, download, and manage data in Google Cloud Storage without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Google Cloud Storage integration](/content/integrations/google-cloud-storage).

## Upload Object From Base64

Upload a file to a Google Cloud Storage bucket using base64-encoded content.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Object Name | The name of the object to upload, including any folder path (e.g., `folder/file.txt`). | string | Required. |
    | Content Type | The MIME type of the object (e.g., `text/plain`, `image/png`). | string | Optional. |
    | Base 64 Content | The base64-encoded content of the file to upload. | string | Required. |
    | Bucket Name | The name of the bucket to upload the object to. If not specified, uses the default bucket configured in the integration. | string | Optional. |

=== "Output Parameters"

    The output is a JSON object containing the bucket name, object name and path, file size in bytes, MIME type, generation number for versioning, a direct download URL, and the creation and last-updated timestamps in Unix milliseconds.


## Download Object Base64

Retrieve an object's content from a Google Cloud Storage bucket as base64-encoded data.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Object Name | The name of the object to retrieve, including any folder path (e.g., `folder/file.txt`). | string | Required. |
    | Bucket Name | The name of the bucket to retrieve the object from. If not specified, uses the default bucket configured in the integration. | string | Optional. |

=== "Output Parameters"

    The output contains the bucket name, object name, base64-encoded content of the retrieved object, and its MIME type.


## List Objects

List objects in a Google Cloud Storage bucket, with optional prefix filtering.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to list objects from. If not specified, uses the default bucket configured in the integration. | string | Optional. |
    | Prefix | A prefix to filter objects by (e.g., `reports/2025/`). Returns all objects if not specified. | string | Optional. |
    | Max Results | The maximum number of objects to return. Defaults to 100. | integer | Optional. |

=== "Output Parameters"

    The output contains a list of objects in the bucket, where each object includes its bucket name, object name and path, file size in bytes, MIME type, generation number for versioning, a direct download URL, and the creation and last-updated timestamps in Unix milliseconds.


## Update Object

Replace an object's content or update its metadata in Google Cloud Storage. If base64-encoded content is provided, the object's data is replaced; otherwise, only the metadata is updated.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Object Name | The name of the object to update, including any folder path (e.g., `folder/file.txt`). | string | Required. |
    | Content Type | The new MIME type for the object (e.g., `application/json`). | string | Optional. |
    | Base 64 Content | The new base64-encoded content to replace the object's data. Omit to update metadata only. | string | Optional. |
    | Bucket Name | The name of the bucket containing the object. If not specified, uses the default bucket configured in the integration. | string | Optional. |

=== "Output Parameters"

    The output contains the bucket name, object name and path, file size in bytes, updated MIME type, generation number for versioning, a direct download URL, and the creation and last-updated timestamps in Unix milliseconds.


## Delete Object

Permanently remove an object from a Google Cloud Storage bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Object Name | The name of the object to delete, including any folder path (e.g., `folder/file.txt`). | string | Required. |
    | Bucket Name | The name of the bucket containing the object. If not specified, uses the default bucket configured in the integration. | string | Optional. |

=== "Output Parameters"

    Returns `true` if the object was successfully deleted.


## List Buckets

List all Google Cloud Storage buckets in the project.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Max Results | The maximum number of buckets to return. Defaults to 100. | integer | Optional. |

=== "Output Parameters"

    The output contains a list of buckets in the project, where each bucket includes its name, geographic location, storage class, whether object versioning is enabled, and the creation and last-updated timestamps in Unix milliseconds.


## Create Bucket

Provision a new Google Cloud Storage bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | A globally unique name for the new bucket. | string | Required. |
    | Location | The geographic location for the bucket (e.g., `US`, `EU`, `ASIA`). | string | Optional. |
    | Storage Class | The storage class for the bucket. Supported values:<ul><li>`STANDARD`</li><li>`NEARLINE`</li><li>`COLDLINE`</li><li>`ARCHIVE`</li></ul>. | string | Optional. |

=== "Output Parameters"

    The output contains the name, geographic location, storage class, whether object versioning is enabled, and the creation and last-updated timestamps in Unix milliseconds for the newly created bucket.


## Get Bucket

Retrieve metadata for a specific Google Cloud Storage bucket, including location, storage class, and versioning settings.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to retrieve. | string | Required. |

=== "Output Parameters"

    The output contains the bucket name, geographic location, storage class, whether object versioning is enabled, the creation and last-updated timestamps in Unix milliseconds, and a self-link URL for the bucket resource.


## Update Bucket

Modify a Google Cloud Storage bucket's settings, such as versioning or storage class.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to update. | string | Required. |
    | Versioning Enabled | Set to `true` to enable object versioning or `false` to disable it. | boolean | Optional. |
    | Storage Class | The new storage class for the bucket. Supported values:<ul><li>`STANDARD`</li><li>`NEARLINE`</li><li>`COLDLINE`</li><li>`ARCHIVE`</li></ul> | string | Optional. |

=== "Output Parameters"

    The output contains the updated bucket name, geographic location, storage class, whether object versioning is enabled, the creation and last-updated timestamps in Unix milliseconds, and a self-link URL for the bucket resource.


## Delete Bucket

Remove a Google Cloud Storage bucket. Can delete only empty buckets.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to delete. | string | Required. |

=== "Output Parameters"

    Returns `true` if the bucket was successfully deleted.

## Related pages

- [Google Cloud Storage Integration with Orkes Conductor](/content/integrations/google-cloud-storage)
