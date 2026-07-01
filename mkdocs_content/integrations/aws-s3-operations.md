---
title: "AWS S3 Operations Reference"
description: "Look up the input and output parameters for each operation available in the AWS S3 integration with Orkes Conductor."
canonical_route: "integrations/aws-s3-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# AWS S3 Operations Reference

Orkes Conductor integrates with AWS S3 to let you create and manage buckets, objects, and folders directly from your workflows. Once you configure the AWS S3 integration, you can use the following operations to create, retrieve, upload, and delete data in AWS S3 without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [AWS S3 integration](/content/integrations/aws-s3).

## Create Bucket

Creates a new S3 bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to create. Must be unique across all accounts globally, i.e., no two buckets anywhere can share the same name. | string | Required. |
    | Bucket Region | The AWS region for the bucket. Defaults to the region configured in the integration if not specified. | string | Optional. | 

=== "Output Parameters"

    The operation returns the `status`, `name`, and `location` of the created bucket.


## List Buckets

Lists all S3 buckets in the AWS account.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    The operation returns a `buckets` array, where each entry includes the bucket `name` and `creationDate`.


## Search Buckets

Searches for S3 buckets by partial name match.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Search Pattern | The partial bucket name to search for. Returns all buckets if not specified. | string | Optional. |

=== "Output Parameters"

    The operation returns a `buckets` array, where each entry includes the bucket `name` and `creationDate`, along with a `count` of the total matching buckets.


## Delete Bucket

Deletes an empty S3 bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to delete. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the deletion and the `bucketName` of the deleted bucket.


## Upload Object

Uploads content as an S3 object to a specified bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to upload the object to. | string | Required. | 
    | Key | The object key (filename or path) of the object in S3. For nested objects, include the full path. For example, `folder/file.txt`. | string | Required. | 
    | Content | The file content to upload as a string. | string | Required. | 
    | Content Type | The MIME type of the object. For example, `text/plain` or `application/json`. | string | Optional. | 

=== "Output Parameters"

    The operation returns the `status` of the upload, the `bucket` name, the object `key`, and the `size` of the uploaded object in bytes.


## List Objects

Lists objects in an S3 bucket, optionally filtered by prefix.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to list objects from. | string | Required. | 
    | Prefix | The prefix to filter objects by. For example, `documents/`. | string | Optional. | 
    | Max Keys | The maximum number of objects to return. Defaults to 1000. | integer | Optional. | 

=== "Output Parameters"

    The operation returns an `objects` array, where each entry includes the object `key`, `size` in bytes, `etag`, and `lastModified` timestamp. Also returns `isTruncated` to indicate if there are more results, and `nextContinuationToken` for pagination.


## Download Object

Downloads an S3 object and returns its content as a string.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket containing the object. | string | Required. | 
    | Key | The object key (filename or path) of the object in S3. For nested objects, include the full path. For example, `folder/file.txt`. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the download, the `bucket` name, the object `key`, the `content` of the object as a string, and the `size` in bytes.


## Get Object Metadata

Retrieves metadata about an S3 object, including size, last modified date, and content type.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket containing the object. | string | Required. | 
    | Key | The object key (filename or path) of the object in S3. For nested objects, include the full path. For example, `folder/file.txt`. | string | Required. | 

=== "Output Parameters"

    The operation returns the `bucket` name, object `key`, `size` in bytes, `lastModified` timestamp, `contentType`, `etag`, `userMetadata`, and the `status` of the operation.


## Copy Object

Copies an S3 object to a destination bucket in the same AWS region.

!!! note
    The source and destination buckets must be in the same AWS region. Cross-region copying is not supported.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Source Bucket | The name of the source bucket. | string | Required. | 
    | Source Key | The object key (filename or path) of the source object. For nested objects, include the full path. For example, `folder/file.txt`. | string | Required. | 
    | Destination Bucket | The name of the destination bucket. | string | Required. | 
    | Destination Key | The object key (filename or path) for the copied object in the destination bucket. For nested objects, include the full path. For example, `folder/file.txt`. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the copy, the `sourceBucket`, `sourceKey`, `destinationBucket`, `destinationKey`, and the `etag` of the copied object.


## Delete Object

Deletes an object from an S3 bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket containing the object to delete. | string | Required. | 
    | Key | The object key (filename or path) of the object in S3. For nested objects, include the full path. For example, `folder/file.txt`. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the deletion, the `bucket` name, and the object `key`.


## Create Folder

Creates an empty folder in an S3 bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to create the folder in. | string | Required. | 
    | Folder Path | The path of the folder to create. For example, `documents/subfolder/`. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the operation, the `bucket` name, and the `folderPath` of the created folder.


## List Folders

Lists folders in an S3 bucket.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket to list folders from. | string | Required. | 
    | Max Folders | The maximum number of folders to return. Defaults to 1000. | integer | Optional. | 

=== "Output Parameters"

    The operation returns a `folders` array, where each entry includes the folder `key`, `lastModified` timestamp, `etag`, `size`, and `storageClass`.


## Delete Folder

Deletes a folder and all objects within it.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Bucket Name | The name of the bucket containing the folder to delete. | string | Required. | 
    | Folder Path | The path of the folder to delete. All contents within the folder will be removed. | string | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the deletion, the `bucket` name, the `folderPath`, the number of `deletedObjects`, and a `deletedKeys` array listing all deleted object keys.
